import {Message} from "ai";

import {StudyGuide} from "@/types/StudyGuide";

export const studyGuideTag = 'Study Guide';

export const studyGuidePrePrompt = `Study guides should be in markdown and should be 5% of the length and should only include the most important information.
    They must be in the following format:
    ${studyGuideTag}: <content>?\n
`;

export const parseStudyGuide = (message: Message): StudyGuide => ({
    id: message.id,
    content: message.content.split('Guide: ')[1]
})