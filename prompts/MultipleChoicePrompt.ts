import {Prompt, PromptTypes} from "@/prompts/Prompt";

import {questionResponseTag} from "@/prompts/questions";

export const multipleChoiceResponseTag = questionResponseTag('Multiple Choice');
const multipleChoiceResponseDescription = 'Multiple choice questions should be challenging and force the user to demonstrate understanding of the topic. They SHOULD NOT simply be a definition or a fact. They should be a question that requires the user to think about the topic and apply their knowledge. Feel free to use examples of scenarios or practice examples to help the user understand the topic better.'
const multipleChoiceResponseFormatting = `
    <question>?\n
    A) <answer 1>\n
    B) <answer 2>\n
    C) <answer 3>\n
    D) <answer 4>\n
    Answer: <letter of correct answer>
`

export const multipleChoicePromptTag = 'Multiple Choice Prompt';
const multipleChoicePrompt = 'Please ask me a multiple choice question';

import {MultipleChoiceQuestion} from "@/types/prompts/MultipleChoiceQuestion";

export class MultipleChoicePrompt extends Prompt<MultipleChoiceQuestion> {
    constructor() {
        super(
            multipleChoiceResponseTag,
            multipleChoiceResponseDescription,
            multipleChoiceResponseFormatting,
            multipleChoicePromptTag,
            multipleChoicePrompt,
            PromptTypes.MULTIPLE_CHOICE
        );
    }

    parseResponse = (content: string, id: string): MultipleChoiceQuestion => {
        const lines = content.split('\n');
        return {
            id,
            question: content?.length > 0 ? content[0] + '?' : '',
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