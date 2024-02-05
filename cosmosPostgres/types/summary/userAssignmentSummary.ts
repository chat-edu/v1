import {UserRow} from "@/cosmosPostgres/types/user";
import {AssignmentRow} from "@/cosmosPostgres/types/assignment";
import {NotebookRow} from "@/cosmosPostgres/types/notebook";

export interface UserAssignmentSummaryRow {
    user_id: UserRow["id"];
    assignment_id: AssignmentRow["id"];
    summary: string
}