import {CommandTags, ResponseTags} from "@/prompts/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {Stringified} from "@/types/utilities/Stringified";
import {DontKnow} from "@/types/commands/DontKnow";

const dontKnowResponseDescription = 'The user doe';
const dontKnowResponseFormat: Stringified<DontKnow> = {
    explanation: 'string: <explanation>'
};
const dontKnowPromptContent = 'I don\'t know.';

export const dontKnowCommand: Command<DontKnow> = {
    responseTag: ResponseTags.DONT_KNOW,
    responseDescription: dontKnowResponseDescription,
    responseFormatting: dontKnowResponseFormat,
    promptTag: CommandTags.DONT_KNOW,
    promptContent: dontKnowPromptContent,
    promptType: CommandTypes.DONT_KNOW
}