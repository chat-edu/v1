import {User} from "@/types/User";
import {MultipleChoiceQuestion} from "@/types/assignment/MultipleChoiceQuestion";
import {Assignment} from "@/types/assignment/Assignment";

export interface SubmissionInput {
    userId: User["id"];
    questionId: MultipleChoiceQuestion["id"];
    answer: string;
}

export interface Submission extends SubmissionInput {
    id: number;
}

export interface UserSubmission {
    userId: User["id"];
    assignmentId: Assignment["id"];
    submissions: Submission[];
}