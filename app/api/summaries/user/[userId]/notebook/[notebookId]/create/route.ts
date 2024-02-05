import openai from "@/openai";

import {
    addUserNotebookSummary,
    findUserAssignmentSummariesByAssignmentId,
    findUserAssignmentSummariesByNotebookId,
    findUserAssignmentSummariesByUserId,
    findUserNotebookSummariesByNotebook
} from "@/cosmosPostgres/services/summaries";

import {NotebookIdParams} from "@/app/api/summaries/user/[userId]/notebook/[notebookId]/NotebookIdParams";

export const POST = async (req: Request, {params}: {params: NotebookIdParams}) => {
    const userAssignmentSummaries = await findUserAssignmentSummariesByNotebookId(params.notebookId);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    The student has completed several assignments and their responses have been graded and summarized.

                    Your goal is to provide a two sentence summary of the student's performance and understanding of the class material, which will inform both the student and the teacher of the student's understanding and knowledge gaps.

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

    return Response.json(await addUserNotebookSummary({
        user_id: params.userId,
        notebook_id: params.notebookId,
        summary: response.choices[0].message.content
    }))
}