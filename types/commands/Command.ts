import {CommandTags, ResponseTags} from "@/prompts/tags";
import {Stringified} from "@/types/utilities/Stringified";

export enum CommandTypes {
    REGULAR,
    MULTIPLE_CHOICE,
    TEXT_BASED,
    STUDY_GUIDE,
    HINT,
    PLAIN_TEXT,
    DONT_KNOW

}

export interface Command<ResponseType> {
    responseTag: ResponseTags;
    responseDescription: string;
    responseFormatting: Stringified<ResponseType>;
    promptTag: CommandTags;
    promptContent: string;
    promptType: CommandTypes;
}