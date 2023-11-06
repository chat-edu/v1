import {PromptTags, ResponseTags} from "@/prompts/tags";

import {Prompt, PromptTypes} from "@/types/prompts/Prompt";
import {StudyGuide} from "@/types/prompts/StudyGuide";

export const studyGuideResponseDescription = 'Study guides should summarize the notes and be at most one tenth of the length of the notes and should only include the most important information. Study guides must be in markdown and should use heading 1s (#), 2s (##), and 3s (###), and bullet points (-) to organize the content.';
export const studyGuideResponseFormatting = '<content>';

export const studyGuidePromptContent = `Please make me a study guide`;

export const studyGuidePrompt: Prompt<StudyGuide> = {
    responseTag: ResponseTags.STUDY_GUIDE,
    responseDescription: studyGuideResponseDescription,
    responseFormatting: studyGuideResponseFormatting,
    promptTag: PromptTags.STUDY_GUIDE,
    promptContent: studyGuidePromptContent,
    promptType: PromptTypes.STUDY_GUIDE,
    parseResponse: (content: string, id: string): StudyGuide => {
        return {
            id,
            content
        }
    }
}