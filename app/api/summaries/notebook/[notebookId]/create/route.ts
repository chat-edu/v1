import openai from "@/openai";

import {addNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";
import {findUserNotebookSummariesByNotebook} from "@/cosmosPostgres/services/summaries";

import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";

export const POST = async (req: Request, { params }: {params: NotebookIdParams}) => {
    const body = await req.json()

    const userNotebookSummaries = await findUserNotebookSummariesByNotebook(params.notebookId);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Each student's performance in the class are summarized.

                    Your goal is to provide a two sentence summary of the class's performance and understanding of the course material, which will inform the teacher of their students' strengths and knowledge gaps.

                    The summaries are as follows:

                    ${userNotebookSummaries.map((summary) => JSON.stringify(summary)).join("\n")}

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

    return Response.json(await addNotebookSummary({
        notebook_id: params.notebookId,
        summary: body.summary
    }))
}