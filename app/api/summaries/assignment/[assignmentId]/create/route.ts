import openai from "@/openai";

import {
    addAssignmentSummary,
    findUserAssignmentSummariesByAssignmentId,
} from "@/cosmosPostgres/services/summaries";

import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";

export const POST = async (req: Request, {params}: {params: AssignmentIdParams}) => {
    const userAssignmentSummaries = await findUserAssignmentSummariesByAssignmentId(params.assignmentId);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Each student's performance on the assignment are summarized

                    Your goal is to provide a two sentence summary of the class's performance and understanding of the course material, which will inform the teacher of their students' strengths and knowledge gaps.

                    The summaries are as follows:

                    ${userAssignmentSummaries.map((summary) => JSON.stringify(summary)).join("\n")}

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

    return Response.json(await addAssignmentSummary({
        assignment_id: params.assignmentId,
        summary: response.choices[0].message.content
    }))
}