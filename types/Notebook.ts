import {User} from "@/types/User";

export interface NotebookInput {
    name: string;
    userId: string;
}

export interface Notebook extends NotebookInput {
    id: number;
    username: User["username"];
    numNotes: number;
}

export interface NotebookWithTotalScore extends Notebook {
    totalScore: number;
}

export interface RankedNotebook extends NotebookWithTotalScore {
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
    num_notes: string;
}

export interface NotebookWithTotalScoreRow extends NotebookRow {
    total_score: string;
}

export interface RankedNotebookRow extends NotebookWithTotalScoreRow {
    rank: string;
}

export interface NotebookScoreRow extends NotebookRow {
    score: number;
}