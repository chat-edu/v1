import {NotebookRow} from "@/cosmosPostgres/types/notebook";
import {UserRow} from "@/cosmosPostgres/types/user";

interface Score {
    score: string | number;
}

export interface UserScorePartialRow extends Score {
    user_id: UserRow["id"];
}

export interface NotebookScorePartialRow extends Score {
    notebook_id: NotebookRow["id"];
}

export interface ScoreRow extends UserScorePartialRow, NotebookScorePartialRow {}

export interface RankedRow {
    rank: string;
}

export * from "./user";
export * from "./notebook";