import {AssignmentSummaryRow} from "@/cosmosPostgres/types";
import {AssignmentSummary} from "@/types/AssignmentSummary";

export const transformSummary = (summary: AssignmentSummaryRow): AssignmentSummary => ({
    userId: summary.user_id,
    assignmentId: summary.assignment_id,
    summary: summary.summary
})