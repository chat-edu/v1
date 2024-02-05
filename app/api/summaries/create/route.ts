import {addSummary} from "@/cosmosPostgres/services/summaries";
import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";
import {findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";
import {QuestionTypes} from "@/types/assignment/Question";
import {FreeResponseQuestionRow, MultipleChoiceQuestionRow} from "@/cosmosPostgres/types";
import openai from "@/openai";

export const POST = async (req: Request) => {
    const body = await req.json();

    if(!body.user_id) return Response.json({error: "user_id is required"}, {status: 400});
    if(!body.assignment_id) return Response.json({error: "assignment_id is required"}, {status: 400});

    const [
        mcqQuestions,
        frqQuestions,
        mcqSubmissions,
        frqSubmissions
    ] = await Promise.all([
        findFreeResponseQuestionsByAssignmentId(body.assignment_id),
        findMultipleChoiceQuestionsByAssignmentId(body.assignment_id),
        findUserSubmissionsByAssignment(body.user_id, body.assignment_id, QuestionTypes.MultipleChoice),
        findUserSubmissionsByAssignment(body.user_id, body.assignment_id, QuestionTypes.FreeResponse)
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
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    const summary = {
        user_id: body.user_id,
        assignment_id: body.assignment_id,
        summary: JSON.parse(response.choices[0].message.content).summary
    };

    return Response.json(await addSummary(summary));
}