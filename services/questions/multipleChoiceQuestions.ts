import { MultipleChoiceQuestion, MultipleChoiceQuestionInput } from "@/types/assignment/MultipleChoiceQuestion";
import {MultipleChoiceQuestionRow, MultipleChoiceQuestionRowInput} from "@/cosmosPostgres/types";
import {emitAssignmentChangedEvent} from "@/cosmosPostgres/eventEmitters/assignmentEventEmitter";
import {Assignment} from "@/types/assignment/Assignment";

// CREATE
export const addMultipleChoiceQuestion = async (question: MultipleChoiceQuestionInput) =>
    fetch(`/api/questions/multipleChoice/create`, {
        method: "POST",
        body: JSON.stringify(transformMultipleChoiceQuestionInput(question)),
    })
        .then(async (res) => {
            const mcqRow = await res.json() as MultipleChoiceQuestionRow;
            if(mcqRow) {
                emitAssignmentChangedEvent(question.assignmentId);
            }
            return mcqRow;
        })
        .catch(null);

// UPDATE
export const updateMultipleChoiceQuestion = async (
    questionId: MultipleChoiceQuestion["id"],
    question: Partial<MultipleChoiceQuestionInput>,
    assignmentId: Assignment["id"]
) =>
    fetch(`/api/questions/multipleChoice/${questionId}/update`, {
        method: "PATCH",
        body: JSON.stringify(transformPartialMultipleChoiceQuestionInput(question)),
    })
        .then(async (res) => {
            let success = await res.json() as boolean;
            if(success) {
                emitAssignmentChangedEvent(assignmentId);
            }
            return success;
        })
        .catch(null);

// DELETE
export const deleteMultipleChoiceQuestion = async (questionId: MultipleChoiceQuestion["id"]) =>
    fetch(`/api/questions/multipleChoice/${questionId}/delete`, {
        method: "DELETE",
    })
        .then(async (res) => (await res.json()) as boolean)
        .catch(() => false);

const transformMultipleChoiceQuestionInput = (question: MultipleChoiceQuestionInput): MultipleChoiceQuestionRowInput => ({
    assignment_id: question.assignmentId,
    question_number: question.questionNumber,
    question: question.question,
    answer: question.answer,
    option_a: question.options.A,
    option_b: question.options.B,
    option_c: question.options.C,
    option_d: question.options.D,
})

const transformPartialMultipleChoiceQuestionInput = (question: Partial<MultipleChoiceQuestionInput>): Partial<MultipleChoiceQuestionRowInput> => ({
    assignment_id: question.assignmentId,
    question_number: question.questionNumber,
    question: question.question,
    answer: question.answer,
    option_a: question.options?.A,
    option_b: question.options?.B,
    option_c: question.options?.C,
    option_d: question.options?.D,
});