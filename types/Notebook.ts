import {User} from "@/types/User";

export interface NotebookInput {
    name: string;
    userId: string;
}

export interface Notebook extends NotebookInput {
    id: number;
    username: User["username"];
    verified: User["verified"];
    numNotes: number;
}

export interface RankedNotebook extends Notebook {
    totalScore: number;
    rank: number;
}

export interface NotebookScore extends Notebook {
    userScore: number
}

export interface NotebookRowInput {
    name: string;
    user_id: string;
}

export interface NotebookRow extends NotebookRowInput {
    id: number;
    username: string;
    verified: boolean;
    num_notes: string;
}

export interface RankedNotebookRow extends NotebookRow {
    total_score: string;
    rank: string;
}

export interface NotebookScoreRow extends NotebookRow {
    score: string;
}