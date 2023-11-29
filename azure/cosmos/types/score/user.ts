import {
    UserRow,
    NotebookRow,
    UserScorePartialRow,
    RankedRow, NotebookScorePartialRow
} from "@/azure/cosmos/types";

export interface UserScoreRow extends UserScorePartialRow {
    username: UserRow["username"];
    verified: UserRow["verified"];
}

export interface UserNotebookScoreRow extends UserScoreRow, NotebookScorePartialRow {
    author_username: UserRow["username"];
    notebook_name: NotebookRow["name"];
    num_notes: string;
}

export interface RankedUserNotebookRow extends UserScoreRow, RankedRow {}

export interface UserCreatorScoreRow extends UserScoreRow {
    num_notebooks: string;
}

export interface RankedUserCreatorScoreRow extends UserCreatorScoreRow, RankedRow {}