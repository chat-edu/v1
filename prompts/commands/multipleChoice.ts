import {CommandTags, ResponseTags} from "@/prompts/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {MultipleChoiceQuestion} from "@/types/commands/MultipleChoiceQuestion";
import {Stringified} from "@/types/utilities/Stringified";

const multipleChoiceResponseDescription = 'Multiple choice questions should be challenging and force the user to demonstrate understanding of the topic. They SHOULD NOT simply be a definition or a fact. They should be a question that requires the user to think about the topic and apply their knowledge. Feel free to use examples of scenarios or practice examples to help the user understand the topic better. Ensure there are no ambiguities in the answers, meaning there is ONLY ONE correct answer to the problem. DO NOT include any explanation of the correct answer.'
const multipleChoiceResponseFormatting: Stringified<MultipleChoiceQuestion> = {
    question: 'string: <question>?',
    options: `object: {
        "A": string,
        "B": string,
        "C": string,
        "D": string
    }`,
    answer: "string: <A/B/C/D>"
}
const multipleChoicePromptContent = 'Please ask me a multiple choice question';

export const multipleChoiceCommand: Command<MultipleChoiceQuestion> = {
    responseTag: ResponseTags.MULTIPLE_CHOICE,
    responseDescription: multipleChoiceResponseDescription,
    responseFormatting: multipleChoiceResponseFormatting,
    promptTag: CommandTags.MULTIPLE_CHOICE,
    promptContent: multipleChoicePromptContent,
    promptType: CommandTypes.MULTIPLE_CHOICE
}