import {Message} from "ai";

import {StudyGuide} from "@/types/StudyGuide";

export const studyGuidePromptTag = `Study Guide Prompt`;
export const studyGuideAnswerTag = 'Study Guide';

export const studyGuidePrePrompt = `
    Content: Study guides should summarize the notes and be at most one tenth of the length of the notes and should only include the most important information.
    
    Formatting: Study guides must be in markdown and should use heading 1s, 2s, and 3s, and bullet points to organize the content. They MUST be in the following format:
        
    ${studyGuideAnswerTag}: <content>?\n
`;

export const studyGuidePrompt = `${studyGuidePromptTag}: Please make me a study guide`;

export const parseStudyGuide = (message: Message): StudyGuide => ({
    id: message.id,
    content: message.content.split('Guide: ')[1]
})