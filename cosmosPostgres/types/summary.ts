import {UserRow} from "@/cosmosPostgres/types/user";
import {AssignmentRow} from "@/cosmosPostgres/types/assignment";

export interface AssignmentSummaryRow {
    user_id: UserRow["id"];
    assignment_id: AssignmentRow["id"];
    summary: string
}