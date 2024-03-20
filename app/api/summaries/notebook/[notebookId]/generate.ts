import {
    findUserNotebookSummariesByNotebook
} from "@/cosmosPostgres/services/summaries";
import {Notebook} from "@/types/Notebook";
import generateNotebookSummaryPrompt from "@/prompts/commands/generateNotebookSummaryPrompt";
import {Model} from "@/types/Model";
import {generateWithSystemPrompt} from "@/llm";

export const generateNotebookSummary = async (notebookId: Notebook["id"], model: Model): Promise<string | null> => {

    const userNotebookSummaries = await findUserNotebookSummariesByNotebook(notebookId);

    const content = await generateWithSystemPrompt(generateNotebookSummaryPrompt(userNotebookSummaries), model);

    console.log(content);

    if(content === "") {
        return null;
    }

    return JSON.parse(content).summary;
}