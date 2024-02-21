import openai from "@/openai";

import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";
import {findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";

import {FreeResponseQuestionRow, MultipleChoiceQuestionRow, UserRow} from "@/cosmosPostgres/types";
import {QuestionTypes} from "@/types/assignment/Question";
import {Assignment} from "@/types/assignment/Assignment";
import generateSummaryPrompt from "@/prompts/commands/generateSummaryPrompt";


export const generateUserAssignmentSummary = async (
    userId: UserRow["id"],
    assignmentId: Assignment["id"]
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
    const prompt = generateSummaryPrompt(mcqQuestions, frqQuestions, mcqSubmissions, frqSubmissions, questionMap);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: prompt,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    if(response.choices[0].message.content === null) {
        return null;
    }

    return JSON.parse(response.choices[0].message.content).summary;
}