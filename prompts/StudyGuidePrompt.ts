import {Prompt, PromptTypes} from "@/prompts/Prompt";

import {StudyGuide} from "@/types/prompts/StudyGuide";

export const studyGuideResponseTag = 'Study Guide';
export const studyGuideResponseDescription = 'Study guides should summarize the notes and be at most one tenth of the length of the notes and should only include the most important information. Study guides must be in markdown and should use heading 1s, 2s, and 3s, and bullet points to organize the content.';
export const studyGuideResponseFormatting = '<content>';

export const studyGuidePromptTag = `Study Guide Prompt`;
export const studyGuidePromptContent = `Please make me a study guide`;

export class StudyGuidePrompt extends Prompt<StudyGuide> {
    constructor() {
        super(
            studyGuideResponseTag,
            studyGuideResponseDescription,
            studyGuideResponseFormatting,
            studyGuidePromptTag,
            studyGuidePromptContent,
            PromptTypes.STUDY_GUIDE
        );
    }

    parseResponse(content: string, id: string): StudyGuide {
        return {
            id: id,
            content: content
        }
    }
}