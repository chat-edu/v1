import openai from "@/openai";

import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";
import {findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";

import {FreeResponseQuestionRow, MultipleChoiceQuestionRow, UserRow} from "@/cosmosPostgres/types";
import {QuestionTypes} from "@/types/assignment/Question";
import {Assignment} from "@/types/assignment/Assignment";


export const generateUserAssignmentSummary = async (
    userId: UserRow["id"],
    assignmentId: Assignment["id"]
): Promise<string | null> => {
    const [
        mcqQuestions,
        frqQuestions,
        mcqSubmissions,
        frqSubmissions
    ] = await Promise.all([
        findFreeResponseQuestionsByAssignmentId(assignmentId),
        findMultipleChoiceQuestionsByAssignmentId(assignmentId),
        findUserSubmissionsByAssignment(userId, assignmentId, QuestionTypes.MultipleChoice),
        findUserSubmissionsByAssignment(userId, assignmentId, QuestionTypes.FreeResponse)
    ]);

    const questionMap: {[key: number]: FreeResponseQuestionRow | MultipleChoiceQuestionRow} = {};
    mcqQuestions.forEach(q => questionMap[q.id] = q);
    frqQuestions.forEach(q => questionMap[q.id] = q);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    The student has completed an assignment and their response have been graded.

                    Your goal is to provide a two sentence summary of the student's performance, which will inform both the student and the teacher of the student's understanding and knowledge gaps.

                    The questions of the assignmet are as follows:

                    ${[...mcqQuestions, ...frqQuestions]
                    .sort((a, b) => a.question_number - b.question_number)
                    .map((question) => JSON.stringify(question))
                    .join("\n")
                }

                    The student's responses are as follows:

                    ${[...mcqSubmissions, ...frqSubmissions]
                    .sort((a, b) => questionMap[a.question_id].question_number - questionMap[b.question_id].question_number)
                    .map((submission) => JSON.stringify(submission))
                    .join("\n")
                }

                    Respond in JSON format with the following structure:

                    {
                        summary: <string>
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

    return JSON.parse(response.choices[0].message.content).summary;
}