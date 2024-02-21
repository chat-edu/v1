import {findUserAssignmentSummariesByAssignmentId} from "@/cosmosPostgres/services/summaries";
import openai from "@/openai";
import generateClassSummaryPrompt from "@/prompts/commands/generateClassSummaryPrompt";

import {Assignment} from "@/types/assignment/Assignment";

export const generateAssignmentSummary = async (assignmentId: Assignment["id"]): Promise<string | null> => {
    const userAssignmentSummaries = await findUserAssignmentSummariesByAssignmentId(assignmentId);

    const prompt = generateClassSummaryPrompt(userAssignmentSummaries);

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