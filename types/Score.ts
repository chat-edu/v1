export interface Score {
    id: number;
    userId: string;
    notebookId: number;
    score: number;
}

export interface ScoreRowInput {
    user_id: string;
    notebook_id: number;
    score: number;
}

export interface ScoreRow extends ScoreRowInput {
    id: number;
}