import {NotebookRow, UserRow} from "@/cosmosPostgres/types";

export interface UserNotebookSummaryRow {
    user_id: UserRow["id"];
    notebook_id: NotebookRow["id"];
    summary: string;
}