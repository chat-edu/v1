import {PromptTags, ResponseTags} from "@/prompts/tags";

import {Prompt, PromptTypes} from "@/types/prompts/Prompt";
import {MultipleChoiceQuestion} from "@/types/prompts/MultipleChoiceQuestion";

const multipleChoiceResponseDescription = 'Multiple choice questions should be challenging and force the user to demonstrate understanding of the topic. They SHOULD NOT simply be a definition or a fact. They should be a question that requires the user to think about the topic and apply their knowledge. Feel free to use examples of scenarios or practice examples to help the user understand the topic better.'
const multipleChoiceResponseFormatting = `
    <question>?
    A) <answer 1>
    B) <answer 2>
    C) <answer 3>
    D) <answer 4>
    Answer: <letter of correct answer>
`

const multipleChoicePromptContent = 'Please ask me a multiple choice question';

export const multipleChoicePrompt: Prompt<MultipleChoiceQuestion> = {
    responseTag: ResponseTags.MULTIPLE_CHOICE,
    responseDescription: multipleChoiceResponseDescription,
    responseFormatting: multipleChoiceResponseFormatting,
    promptTag: PromptTags.MULTIPLE_CHOICE,
    promptContent: multipleChoicePromptContent,
    promptType: PromptTypes.MULTIPLE_CHOICE,
    parseResponse: (content: string, id: string): MultipleChoiceQuestion => {
        if(content == undefined || content.length == 0 ) return {
            id,
            question: '',
            options: [],
            answerIndex: -1
        };
        const lines = content.split('\n').filter(Boolean);
        return {
            id,
            question: lines?.length > 0 ? lines[0] : '',
            options: lines.slice(1, lines.length - 1).filter((option) => option !== '' && option !== ' '),
            answerIndex: letterToIndex(content.split('Answer: ')[1]?.substring(0, 1))
        }
    }
}

const letterToIndex = (letter: string): number => {
    switch (letter) {
        case 'A':
            return 0;
        case 'B':
            return 1;
        case 'C':
            return 2;
        case 'D':
            return 3;
        default:
            return -1;
    }
}