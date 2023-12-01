import {
    UserRow,
    UserScorePartialRow,
    RankedRow,
    NotebookScoreRow
} from "@/cosmosPostgres/types";

export interface UserScoreRow extends UserScorePartialRow {
    name: UserRow["name"];
    username: UserRow["username"];
    profile_picture_url: UserRow["profile_picture_url"];
    verified: UserRow["verified"];
}

export interface RankedUserScoreRow extends UserScoreRow, RankedRow {}

export interface UserCreatorScoreRow extends UserScoreRow {
    num_notebooks: string;
}

export interface RankedUserCreatorScoreRow extends UserCreatorScoreRow, RankedRow {}

export interface UserNotebookScoreRow extends UserScoreRow, NotebookScoreRow {}

export interface RankedUserNotebookScoreRow extends UserNotebookScoreRow, RankedRow {}