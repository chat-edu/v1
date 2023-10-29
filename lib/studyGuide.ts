import {Message} from "ai";

import {StudyGuide} from "@/types/StudyGuide";

export const studyGuidePromptTag = `Study Guide Prompt`;
export const studyGuideAnswerTag = 'Study Guide';

export const studyGuidePrePrompt = `Study guides must be in markdown and should be 5% of the length and should only include the most important information.
    They must be in the following format:
    ${studyGuideAnswerTag}: <content>?\n
`;

export const studyGuidePrompt = `${studyGuidePromptTag}: Please make me a study guide`;

export const parseStudyGuide = (message: Message): StudyGuide => ({
    id: message.id,
    content: message.content.split('Guide: ')[1]
})