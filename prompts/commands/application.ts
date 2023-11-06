import {Command, PromptTypes} from "@/types/prompts/Command";
import {TextBasedQuestion} from "@/types/prompts/TextBasedQuestion";
import {PromptTags, ResponseTags} from "@/prompts/tags";

export const responseDescription = 'Text-based application questions should ask the user to apply the concepts covered in their notes. They should be able to demonstrate their understanding of the concepts by applying them to a new situation. Create examples or practice problems based on the concepts covered in the notes. Do NOT include any indication of the answer.';
const responseFormatting = '<question>?';
const promptContent = `Please ask me an application question`;

export const applicationQuestionCommand: Command<TextBasedQuestion> = {
    responseTag: ResponseTags.APPLICATION,
    responseDescription,
    responseFormatting,
    promptTag: PromptTags.APPLICATION,
    promptContent,
    promptType: PromptTypes.TEXT_BASED,
    parseResponse: (content: string, id: string): TextBasedQuestion => {
        return {
            id,
            question: content
        }
    }
}