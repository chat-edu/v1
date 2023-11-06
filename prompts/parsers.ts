import {Message} from "ai";

import {ResponseTags} from "@/prompts/tags";

import {parseAnswerCorrectnessContent} from "@/prompts/answerCorrectness";
import {parseHintContent} from "@/prompts/hint";
import {parseMultipleChoiceContent} from "@/prompts/multipleChoice";
import {parseStudyGuideContent} from "@/prompts/studyGuide";
import {parseTextBasedContent} from "@/prompts/textBased";

import {PromptResponse} from "@/types/prompts/PromptResponse";

const parseResponse = <ResponseType extends PromptResponse>(
    message: Message,
    responseTag: ResponseTags,
    parser: (content: string, id: string) => ResponseType
): ResponseType => parser(message.content.split(`${responseTag}: `)[1], message.id);

export const parseAnswerCorrectness = (message: Message) =>
    parseResponse(message, ResponseTags.ANSWER_CORRECTNESS, parseAnswerCorrectnessContent)

export const parseHint = (message: Message) =>
    parseResponse(message, ResponseTags.HINT, parseHintContent)

export const parseMultipleChoice = (message: Message) =>
    parseResponse(message, ResponseTags.MULTIPLE_CHOICE, parseMultipleChoiceContent)

export const parseStudyGuide = (message: Message) =>
    parseResponse(message, ResponseTags.STUDY_GUIDE, parseStudyGuideContent)

export const parseTextBased = (message: Message) =>
    parseResponse(message, ResponseTags.TEXT_BASED, parseTextBasedContent)

