import {Command, PromptTypes} from "@/types/prompts/Command";
import {TextBasedQuestion} from "@/types/prompts/TextBasedQuestion";
import {PromptTags, ResponseTags} from "@/prompts/tags";

export const responseDescription = 'Text-based understanding questions should ask the user to demonstrate their understanding of the topics covered in their notes. They should be able to explain the concepts and why they are relevant.';
const responseFormatting = '<question>?';
const promptContent = `Please ask me an understanding question`;

export const understandingQuestionCommand: Command<TextBasedQuestion> = {
    responseTag: ResponseTags.UNDERSTANDING,
    responseDescription,
    responseFormatting,
    promptTag: PromptTags.UNDERSTANDING,
    promptContent,
    promptType: PromptTypes.TEXT_BASED,
    parseResponse: (content: string, id: string): TextBasedQuestion => {
        return {
            id,
            question: content
        }
    }
}