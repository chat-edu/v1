import openai from "@/openai";

import {
    findUserNotebookSummariesByNotebook
} from "@/cosmosPostgres/services/summaries";

import {Notebook} from "@/types/Notebook";

export const generateNotebookSummary = async (notebookId: Notebook["id"]): Promise<string | null> => {
    const userNotebookSummaries = await findUserNotebookSummariesByNotebook(notebookId);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Each student's performance in the class is summarized.

                    Your goal is to provide a two sentence summary of the class's overall performance and understanding of the course material, which will inform the teacher of their students' strengths and knowledge gaps.

                    The summaries are as follows:

                    ${userNotebookSummaries.map((summary) => JSON.stringify(summary)).join("\n")}

                    Respond in the second person as if you are talking to the teacher.
                    
                    Respond in JSON format with the following structure:

                    {
                        summary: <string>
                    }
                    
                    The summary should use markdown to format the text, bolding the most important information with asterisks.
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