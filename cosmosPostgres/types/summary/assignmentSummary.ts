import {AssignmentRow} from "@/cosmosPostgres/types";

export interface AssignmentSummaryRow {
    assignment_id: AssignmentRow["id"];
    summary: string
}