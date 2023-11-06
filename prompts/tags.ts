export const questionResponseTagSuffix = 'Question';
export const promptTagSuffix = 'Prompt';

export enum ResponseTags {
    MULTIPLE_CHOICE = `Multiple Choice ${questionResponseTagSuffix}`,
    TEXT_BASED = `Text Based ${questionResponseTagSuffix}`,
    ANSWER_CORRECTNESS = `Answer Correctness`,
    HINT = `Hint`,
    STUDY_GUIDE = `Study Guide`
}

export enum PromptTags {
    MULTIPLE_CHOICE = `Multiple Choice ${promptTagSuffix}`,
    TEXT_BASED = `Text Based ${promptTagSuffix}`,
    ANSWER_CORRECTNESS = `Answer Correctness ${promptTagSuffix}`,
    HINT = `Hint ${promptTagSuffix}`,
    STUDY_GUIDE = `Study Guide ${promptTagSuffix}`
}