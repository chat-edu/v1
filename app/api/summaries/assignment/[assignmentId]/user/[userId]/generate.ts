import openai from "../../../../../../../llm/openai";

import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";
import {findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";

import {FreeResponseQuestionRow, MultipleChoiceQuestionRow, UserRow} from "@/cosmosPostgres/types";
import {QuestionTypes} from "@/types/assignment/Question";
import {Assignment} from "@/types/assignment/Assignment";
import generateSummaryPrompt from "@/prompts/commands/generateSummaryPrompt";
import {Model} from "@/types/Model";
import {generateWithSystemPrompt} from "@/llm";


export const generateUserAssignmentSummary = async (
    userId: UserRow["id"],
    assignmentId: Assignment["id"],
    model: Model
): Promise<string | null> => {
    const [
        mcqQuestions,
        frqQuestions,
        mcqSubmissions,
        frqSubmissions
    ] = await Promise.all([
        findFreeResponseQuestionsByAssignmentId(assignmentId),
        findMultipleChoiceQuestionsByAssignmentId(assignmentId),
        findUserSubmissionsByAssignment(userId, assignmentId, QuestionTypes.MultipleChoice),
        findUserSubmissionsByAssignment(userId, assignmentId, QuestionTypes.FreeResponse)
    ]);

    const questionMap: {[key: number]: FreeResponseQuestionRow | MultipleChoiceQuestionRow} = {};
    mcqQuestions.forEach(q => questionMap[q.id] = q);
    frqQuestions.forEach(q => questionMap[q.id] = q);

    // TODO - mcqQuestions is of type FreeResponseQuestionRow and vice versa for frqQuestions
    const content = await generateWithSystemPrompt(
        generateSummaryPrompt(mcqQuestions, frqQuestions, mcqSubmissions, frqSubmissions, questionMap),
        model
    );

    if(content === "") {
        return null;
    }

    return JSON.parse(content).summary;
}