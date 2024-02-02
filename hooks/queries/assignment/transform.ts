import {AssignmentRow, AssignmentRowWithQuestions} from "@/cosmosPostgres/types";
import {Assignment, AssignmentWithQuestions} from "@/types/assignment/Assignment";
import {Question, QuestionTypes} from "@/types/assignment/Question";
import {MultipleChoiceQuestion} from "@/types/assignment/MultipleChoiceQuestion";
import {FreeResponseQuestion} from "@/types/assignment/FreeResponseQuestion";

export const transformAssignment = (assignment: AssignmentRow): Assignment => {
    return {
        id: assignment.id,
        name: assignment.name,
        topicId: assignment.topic_id
    }
}

export const transformAssignmentWithQuestions = (assignment: AssignmentRowWithQuestions): AssignmentWithQuestions => {
    const multipleChoiceQuestions: Question<MultipleChoiceQuestion>[] = assignment.multiple_choice_questions.map((question) => {
        return {
            tag: QuestionTypes.MultipleChoice,
            question: {
                id: question.id,
                question: question.question,
                options: {
                    A: question.option_a,
                    B: question.option_b,
                    C: question.option_c,
                    D: question.option_d
                },
                answer: question.answer,
                assignmentId: assignment.id,
                questionNumber: question.question_number
            }
        }
    })
    const freeResponseQuestions: Question<FreeResponseQuestion>[] = assignment.free_response_questions.map((question) => {
        return {
            tag: QuestionTypes.FreeResponse,
            question: {
                id: question.id,
                question: question.question,
                assignmentId: assignment.id,
                questionNumber: question.question_number
            }
        }
    })
    return {
        ...transformAssignment(assignment),
        questions: [...multipleChoiceQuestions, ...freeResponseQuestions]
    }
}