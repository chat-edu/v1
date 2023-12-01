import {
    UserRow,
    NotebookRow,
    RankedRow,
    NotebookScorePartialRow
} from "@/cosmosPostgres/types";

export interface NotebookScoreRow extends NotebookScorePartialRow {
    notebook_name: NotebookRow["name"];
    author_id: UserRow["id"];
    author_username: UserRow["username"];
    author_verified: UserRow["verified"];
    num_notes: string;
}

export interface RankedNotebookScoreRow extends NotebookScoreRow, RankedRow {}