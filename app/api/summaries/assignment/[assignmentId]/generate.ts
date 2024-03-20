import {generateWithSystemPrompt} from "@/llm";

import {findUserAssignmentSummariesByAssignmentId} from "@/cosmosPostgres/services/summaries";

import generateClassSummaryPrompt from "@/prompts/commands/generateClassSummaryPrompt";

import {Assignment} from "@/types/assignment/Assignment";

import {Model} from "@/types/Model";

export const generateAssignmentSummary = async (assignmentId: Assignment["id"], model: Model): Promise<string | null> => {
    const userAssignmentSummaries = await findUserAssignmentSummariesByAssignmentId(assignmentId);

    const prompt = generateClassSummaryPrompt(userAssignmentSummaries);

    console.log(model);

    const response = await generateWithSystemPrompt(prompt, model);

    if(response === "") {
        return null;
    }

    return JSON.parse(response).summary;
}