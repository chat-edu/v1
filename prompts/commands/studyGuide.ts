import {PromptTags, ResponseTags} from "@/prompts/tags";

import {Command, PromptTypes} from "@/types/prompts/Command";
import {StudyGuide} from "@/types/prompts/StudyGuide";

export const studyGuideResponseDescription = `Study guides should SUMMARIZE the notes and should only include the most important information. Study guides must be in markdown and should use heading 1s (#), 2s (##), and 3s (###), and bullet points (-) to organize the content. Make sure to include the opening ${ResponseTags.STUDY_GUIDE} and the title of the study guide.`;
export const studyGuideResponseFormatting = `
    # <title>
    <study guide content>
`;
export const studyGuidePromptContent = `Please make me a study guide`;

export const studyGuideCommand: Command<StudyGuide> = {
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