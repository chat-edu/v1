import openai from "../../../../llm/openai";

import {gradeFreeResponseQuestion, gradeMultipleChoiceQuestion} from "@/llm/openai/grading/gradeSubmission";

import {addEnrollment} from "@/cosmosPostgres/services/enrollments";
import {findAssignmentsByTopicId} from "@/cosmosPostgres/services/assignments";
import {findTopicsByNotebookId} from "@/cosmosPostgres/services/topic";
import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";
import {addSubmission, updateSubmissionGrade} from "@/cosmosPostgres/services/submissions";
import {addUser, findAllUsers} from "@/cosmosPostgres/services/user";

import {QuestionTypes} from "@/types/assignment/Question";
import {MultipleChoiceKey} from "@/types/commands/MultipleChoiceQuestion";
import {FreeResponseQuestionRow} from "@/cosmosPostgres/types";
import {NotebookIdParams} from "@/app/api/populateNotebook/[notebookId]/NotebookIdParams";
import {UserRoles} from "@/types/User";
import {generateUserAssignmentSummary} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/generate";
import {generateUserNotebookSummary} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/generate";
import {
    addAssignmentSummary,
    addNotebookSummary,
    addUserAssignmentSummary,
    addUserNotebookSummary,
    getAssignmentSummary,
    getNotebookSummary,
    getUserNotebookSummary,
    updateAssignmentSummary,
    updateNotebookSummary,
    updateUserNotebookSummary
} from "@/cosmosPostgres/services/summaries";
import {generateAssignmentSummary} from "@/app/api/summaries/assignment/[assignmentId]/generate";
import {generateNotebookSummary} from "@/app/api/summaries/notebook/[notebookId]/generate";
import {Model} from "@/types/Model";

export const POST = async (req: Request, { params }: { params: NotebookIdParams}) => {

    const notebookId = params.notebookId;

    const userId = Math.random().toString(36).substring(7);
    const user = await generateUser();

    if(!user) return new Response("Failed to generate user", {status: 500});

    // create student
    const student = await addUser({
        // random id
        id: userId,
        // random username
        username: user.username,
        // random email
        email: user.email,
        name: user.name,
        profile_picture_url: `https://api.multiavatar.com/${userId}.png`,
        role: UserRoles.STUDENT
    });

    if(!student) return new Response("Failed to create student", {status: 500});

    // enroll student in notebook
    const enrollmentRow = await addEnrollment({
        user_id: userId,
        notebook_id: notebookId
    });

    if(!enrollmentRow) return new Response("Failed to enroll student", {status: 500});

    // get all assignments

    const topics = await findTopicsByNotebookId(notebookId)

    const assignments = (await Promise.all(topics.map(async (topic) => {
        return await findAssignmentsByTopicId(topic.id);
    }))).flat();

    // create submissions for each assignment

    const submissions = await Promise.all(assignments.map(async (assignment) => {
        // create a random variable that will represent what percent of questions the user gets wrong. It should have an average of 5% and a standard deviation of 5%
        const wrongPercent = getWrongPercentage();
        const [multipleChoiceQuestions, freeResponseQuestions] = await Promise.all([
            findMultipleChoiceQuestionsByAssignmentId(assignment.id),
            findFreeResponseQuestionsByAssignmentId(assignment.id)
        ]);
        // for each multiple choice question, create a submission where the user picks the correct answer 90% of the time
        await Promise.all([
            ...multipleChoiceQuestions.map(async (question) => {
                const answer = Math.random() > wrongPercent ? question.answer : question.option_a;
                const userSubmission = await addSubmission({
                    user_id: userId,
                    question_id: question.id,
                    answer,
                }, QuestionTypes.MultipleChoice);
                if(!userSubmission) return false;
                const gradeExplanation = await gradeMultipleChoiceQuestion(question, answer as MultipleChoiceKey);
                if(!gradeExplanation) return false;
                await updateSubmissionGrade(userSubmission.id, gradeExplanation, QuestionTypes.MultipleChoice);
                return true;
            }),
            ...freeResponseQuestions.map(async (question) => {
                const answer = await getFreeResponseAnswer(question, wrongPercent);
                const userSubmission = await addSubmission({
                    user_id: userId,
                    question_id: question.id,
                    answer,
                }, QuestionTypes.FreeResponse);
                if(!userSubmission) return false;
                const gradeExplanation = await gradeFreeResponseQuestion(question, answer);
                if(!gradeExplanation) return false;
                await updateSubmissionGrade(userSubmission.id, gradeExplanation, QuestionTypes.FreeResponse);
                const userAssignmentSummary = await generateUserAssignmentSummary(userId, assignment.id, Model.OPENAI);
                if(!userAssignmentSummary) return false;
                const userAssignmentSummaryRow = await addUserAssignmentSummary({
                    user_id: userId,
                    assignment_id: assignment.id,
                    summary: userAssignmentSummary
                });
                return userAssignmentSummaryRow !== null;
            })
        ]);
        const userNotebookSummary = await generateUserNotebookSummary(notebookId, userId);
        if(!userNotebookSummary) return false;
        let userNotebookSuccess: boolean;
        if(await getUserNotebookSummary(userId, notebookId)) {
            userNotebookSuccess = await updateUserNotebookSummary(userId, notebookId, {
                summary: userNotebookSummary
            });
        } else {
            const userNotebookSummaryRow = await addUserNotebookSummary({
                user_id: userId,
                notebook_id: notebookId,
                summary: userNotebookSummary
            });
            userNotebookSuccess = userNotebookSummaryRow !== null;
        }
        if(!userNotebookSuccess) return false;

        const assignmentSummary = await generateAssignmentSummary(assignment.id, Model.OPENAI);
        if(!assignmentSummary) return false;

        let assignmentSummarySuccess: boolean;
        if(await getAssignmentSummary(assignment.id)) {
            assignmentSummarySuccess = await updateAssignmentSummary(assignment.id, {
                summary: assignmentSummary
            });
        } else {
            const assignmentSummaryRow = await addAssignmentSummary({
                assignment_id: assignment.id,
                summary: assignmentSummary
            });
            assignmentSummarySuccess = assignmentSummaryRow !== null;
        }
        return assignmentSummarySuccess;
    }));



    if(submissions.every(submission => submission)) {
        const noteboookSummary = await generateNotebookSummary(notebookId, Model.OPENAI);
        if(!noteboookSummary) return new Response("Failed to generate notebook summary", {status: 500});

        let notebookSummarySuccess: boolean;
        if(await getNotebookSummary(notebookId)) {
            notebookSummarySuccess = await updateNotebookSummary(notebookId, {
                summary: noteboookSummary
            });
        } else {
            const notebookSummaryRow = await addNotebookSummary({
                notebook_id: notebookId,
                summary: noteboookSummary
            });
            notebookSummarySuccess = notebookSummaryRow !== null;
        }

        if(notebookSummarySuccess) {
            return new Response("Successfully created submissions", {status: 200});
        } else {
            return new Response("Failed to create notebook summary", {status: 500});
        }
    } else {
        return new Response("Failed to create submissions", {status: 500});
    }
}

const getFreeResponseAnswer = async (question: FreeResponseQuestionRow, wrongPercent: number) => {
    const shouldBeCorrect = Math.random() > wrongPercent;
    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Given a free response question, provide a response.
                    
                    The question is:
                    
                    ${question.question}
                    
                    The response should be ${shouldBeCorrect ? "correct" : "incorrect"}.
                    
                    Respond in JSON format with the following structure:
                    
                    {
                        answer: <string>
                    }
                `,
            }
        ],
        response_format: {
            type: "json_object",
        }
    });
    if(response.choices[0].message.content === null) {
        return "I don't know";
    } else {
        return JSON.parse(response.choices[0].message.content).answer;
    }
}

const generateUser = async (): Promise<{name: string, username: string, email: string}| null> => {

    const users = await findAllUsers();

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Your goal is to create a user with a random username, email, and profile picture.
                    
                    The user should not be the same as any of the existing users:
                    
                    ${users.map((user) => JSON.stringify(user)).join("\n")}
                    
                    Respond in JSON format with the following structure:
                    
                    {
                        name: <string>,
                        username: <string>,
                        email: <string>,
                    }
                `,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    if(response.choices[0].message.content === null) {
        return null;
    }

    return JSON.parse(response.choices[0].message.content);
}


// make a standard normal variable that has a mean of 0.15 and a standard deviation of 0.075
const getWrongPercentage = (): number => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return getWrongPercentage(); // resample between 0 and 1
    num = num * 0.075 + 0.15; // Scale to 0.15 -> 0.225
    if (num > 1 || num < 0) return getWrongPercentage(); // resample between 0 and 1
    return num;
}