import {
    UserRow,
    NotebookRow,
    RankedRow,
    NotebookScorePartialRow
} from "@/azure/cosmos/types/score";

export interface NotebookScoreRow extends NotebookScorePartialRow {
    notebook_name: NotebookRow["name"];
    author_username: UserRow["username"];
    author_verified: UserRow["verified"];
    num_notes: string;
}

export interface RankedNotebookRow extends NotebookScoreRow, RankedRow {}