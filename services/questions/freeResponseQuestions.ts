import { FreeResponseQuestion, FreeResponseQuestionInput } from "@/types/assignment/FreeResponseQuestion";
import {FreeResponseQuestionRow, QuestionRowInput} from "@/cosmosPostgres/types";
import {emitAssignmentChangedEvent} from "@/cosmosPostgres/eventEmitters/assignmentEventEmitter";
import {Assignment} from "@/types/assignment/Assignment";

// CREATE
export const addFreeResponseQuestion = async (question: FreeResponseQuestionInput) =>
    fetch(`/api/questions/freeResponse/create`, {
        method: "POST",
        body: JSON.stringify(transformFreeResponseQuestionInput(question)),
    })
    .then(async (res) => {
        const frqRow = await res.json() as FreeResponseQuestionRow;
        if(frqRow) {
            emitAssignmentChangedEvent(question.assignmentId);
        }
        return frqRow;
    })
    .catch(null);

// UPDATE
export const updateFreeResponseQuestion = async (
    questionId: FreeResponseQuestion["id"],
    question: Partial<FreeResponseQuestionInput>,
    assignmentId: Assignment["id"]
) =>
    fetch(`/api/questions/freeResponse/${questionId}/update`, {
        method: "PATCH",
        body: JSON.stringify(transformPartialFreeResponseQuestionInput(question)),
    })
    .then(async res => {
        const success = await res.json() as boolean;
        if(success) {
            emitAssignmentChangedEvent(assignmentId);
        }
        return success;
    })
    .catch(null);

// DELETE
export const deleteFreeResponseQuestion = async (questionId: FreeResponseQuestion["id"]) =>
    fetch(`/api/questions/freeResponse/${questionId}/delete`, {
        method: "DELETE",
    })
    .then(async (res) => (await res.json()) as boolean)
    .catch(() => false);

const transformFreeResponseQuestionInput = (question: FreeResponseQuestionInput): QuestionRowInput => ({
    assignment_id: question.assignmentId,
    question_number: question.questionNumber,
    question: question.question,
})

const transformPartialFreeResponseQuestionInput = (question: Partial<FreeResponseQuestionInput>): Partial<QuestionRowInput> => ({
    assignment_id: question.assignmentId,
    question_number: question.questionNumber,
    question: question.question,
});