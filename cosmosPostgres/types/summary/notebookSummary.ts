import {NotebookRow} from "@/cosmosPostgres/types";

export interface NotebookSummaryRow {
    notebook_id: NotebookRow["id"];
    summary: string;
}