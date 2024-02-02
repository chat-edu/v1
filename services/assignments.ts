import {Assignment, AssignmentInput} from "@/types/assignment/Assignment";
import {AssignmentRow, AssignmentRowInput} from "@/cosmosPostgres/types";
import {GeneratedAssignment} from "@/types/assignment/GeneratedAssignment";
import {Topic} from "@/types/Topic";
import {addFreeResponseQuestion, addMultipleChoiceQuestion} from "@/services/questions";
import {MultipleChoiceQuestion} from "@/types/commands/MultipleChoiceQuestion";
import {TextBasedQuestion} from "@/types/commands/TextBasedQuestion";
import {QuestionTypes} from "@/types/assignment/Question";
import {emitAssignmentChangedEvent} from "@/cosmosPostgres/eventEmitters/assignmentEventEmitter";
import {emitAssignmentsChangedEvent} from "@/cosmosPostgres/eventEmitters/assignmentsEventEmitter";

export const addAssignment = async (assignment: AssignmentInput) => fetch(`/api/assignment/create`, {
    method: "POST",
    body: JSON.stringify(transformAssignmentInput(assignment)),
})
    .then(async (res) => {
        const assignment = await res.json() as AssignmentRow;
        if(assignment) {
            emitAssignmentsChangedEvent(assignment.id);
        }
        return assignment;
    })
    .catch(null);

export const updateAssignment = async (assignmentId: Assignment["id"], assignment: Partial<AssignmentInput>) =>
    fetch(`/api/assignment/${assignmentId}/update`, {
        method: "PATCH",
        body: JSON.stringify(transformPartialAssignmentInput(assignment)),
    })
        .then(async res => {
            const success = await res.json() as boolean;
            if(success) {
                emitAssignmentChangedEvent(assignmentId)
            }
            return success;
        })
        .catch(null);

export const deleteAssignment = async (assignmentId: Assignment["id"]) =>
    fetch(`/api/assignment/${assignmentId}/delete`, {
        method: "DELETE",
    })
        .then(async (res) => (await res.json()) as boolean)
        .catch(() => false);

export const generateAssignment = async (assignmentId: Assignment["id"]) =>
    fetch(`/api/assignment/generate`, {
        method: "POST",
        body: JSON.stringify({assignmentId}),
    })
        .then(async (res) => (await res.json()) as GeneratedAssignment)
        .catch(null);

export const saveGeneratedAssignment = async (assignment: GeneratedAssignment, topicId: Topic["id"]) => {
    const assignmentRow = await addAssignment({
        name: assignment.name,
        topicId,
    });

    if(!assignmentRow) {
        return null;
    }

    const questionRows = await Promise.all(assignment.questions.map((question, index) => {
        if(question.tag === QuestionTypes.MultipleChoice) {
            const questionContent = question.question as MultipleChoiceQuestion;
            return addMultipleChoiceQuestion({
                assignmentId: assignmentRow.id,
                questionNumber: index + 1,
                ...questionContent
            });
        } else {
            const questionContent = question.question as TextBasedQuestion
            return addFreeResponseQuestion({
                assignmentId: assignmentRow.id,
                questionNumber: index + 1,
                question: questionContent.question,
            });
        }
    }));
}

const transformAssignmentInput = (assignment: AssignmentInput): AssignmentRowInput => ({
    name: assignment.name,
    topic_id: assignment.topicId,
})

const transformPartialAssignmentInput = (assignment: Partial<AssignmentInput>): Partial<AssignmentRowInput> => ({
    name: assignment.name,
    topic_id: assignment.topicId,
});