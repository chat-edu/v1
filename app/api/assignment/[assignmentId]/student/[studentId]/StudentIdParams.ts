import {AssignmentIdParams} from "@/app/api/assignment/[assignmentId]/AssignmentIdParams";

export interface StudentIdParams extends AssignmentIdParams {
    studentId: string;
}