import {UserAssignmentSummary, UserNotebookSummary, AssignmentSummary, NotebookSummary} from "@/types/summary";
import {UserAssignmentSummaryRow, UserNotebookSummaryRow, AssignmentSummaryRow, NotebookSummaryRow} from "@/cosmosPostgres/types";

export const transformUserAssignmentSummary = (summary: UserAssignmentSummaryRow): UserAssignmentSummary => ({
    userId: summary.user_id,
    assignmentId: summary.assignment_id,
    summary: summary.summary
})

export const transformUserNotebookSummary = (summary: UserNotebookSummaryRow): UserNotebookSummary => ({
    userId: summary.user_id,
    notebookId: summary.notebook_id,
    summary: summary.summary
})

export const transformAssignmentSummary = (summary: AssignmentSummaryRow): AssignmentSummary => ({
    assignmentId: summary.assignment_id,
    summary: summary.summary
})

export const transformNotebookSummary = (summary: NotebookSummaryRow): NotebookSummary => ({
    notebookId: summary.notebook_id,
    summary: summary.summary
})