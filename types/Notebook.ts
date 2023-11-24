import {User} from "@/types/User";

export interface NotebookInput {
    name: string;
    userId: string;
}

export interface Notebook extends NotebookInput {
    id: number;
    userName: User["name"];
    numNotes: number;
}

export interface TopNotebook extends Notebook {
    totalScore: number;
}

export interface NotebookRowInput {
    name: string;
    user_id: string;
}

export interface NotebookRow extends NotebookRowInput {
    id: number;
    user_name: string;
    num_notes: string;
}

export interface TopNotebookRow extends NotebookRow {
    total_score: string;
}