import {AssignmentIdParams} from "@/app/api/submissions/freeResponse/assignment/[assignmentId]/AssignmentIdParams";

export interface UserIdParams extends AssignmentIdParams {
    userId: string
}