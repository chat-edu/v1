import {NotebookRow, UserRow} from "@/cosmosPostgres/types";
import {
    findUserAssignmentSummariesByUserId
} from "@/cosmosPostgres/services/summaries";
import openai from "../../../../../../../llm/openai";
import {getUser} from "@/cosmosPostgres/services/user";
import generateUserNotebookSummaryPrompt from "@/prompts/commands/generateUserNotebookSummaryPrompt";

export const generateUserNotebookSummary = async (
    notebook_id: NotebookRow["id"],
    user_id: UserRow["id"]
): Promise<string | null> => {
    const userAssignmentSummaries = await findUserAssignmentSummariesByUserId(user_id, notebook_id);

    const user = await getUser(user_id);

    if (user === null) {
        return null;
    }

    const prompt = generateUserNotebookSummaryPrompt(user, userAssignmentSummaries);

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
