import openai from "@/openai";

import {
    findUserNotebookSummariesByNotebook
} from "@/cosmosPostgres/services/summaries";

import {Notebook} from "@/types/Notebook";
import generateNotebookSummaryPrompt from "@/prompts/commands/generateNotebookSummaryPrompt";

export const generateNotebookSummary = async (notebookId: Notebook["id"]): Promise<string | null> => {
    const userNotebookSummaries = await findUserNotebookSummariesByNotebook(notebookId);

    const prompt = generateNotebookSummaryPrompt(userNotebookSummaries);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: prompt,
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