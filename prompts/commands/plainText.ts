import {CommandTags, ResponseTags} from "@/prompts/tags";

import {Command, CommandTypes} from "@/types/commands/Command";
import {PlainText} from "@/types/commands/PlainText";
import {Stringified} from "@/types/utilities/Stringified";

const plainTextDescription = "The user has sent you this message."
const plainTextResponseFormat: Stringified<PlainText> = {
    response: 'string: <response>'
};

export const plainTextCommand = (promptContent: string): Command<PlainText> => ({
    responseTag: ResponseTags.PLAIN_TEXT,
    responseDescription: plainTextDescription,
    responseFormatting: plainTextResponseFormat,
    promptTag: CommandTags.PLAIN_TEXT,
    promptContent,
    promptType: CommandTypes.PLAIN_TEXT
})