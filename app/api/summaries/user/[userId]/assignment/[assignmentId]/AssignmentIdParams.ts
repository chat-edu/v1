import {UserIdParams} from "@/app/api/summaries/user/[userId]/UserIdParams";
import {AssignmentRow} from "@/cosmosPostgres/types";

export interface AssignmentIdParams extends UserIdParams {
    assignmentId: AssignmentRow["id"];
}