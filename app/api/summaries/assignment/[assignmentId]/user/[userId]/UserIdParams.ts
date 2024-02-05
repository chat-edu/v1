import {UserRow} from "@/cosmosPostgres/types";
import {AssignmentIdParams} from "@/app/api/summaries/assignment/[assignmentId]/AssignmentIdParams";

export interface UserIdParams extends AssignmentIdParams {
    userId: UserRow["id"];
}