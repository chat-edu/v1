import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";

export interface StudentIdParams extends AssignmentIdParams {
    studentId: string;
}