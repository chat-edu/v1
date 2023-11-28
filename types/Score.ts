export interface Score {
    userId: string;
    notebookId: number;
    score: number;
}

export interface UserScore extends Score {
    username: string;
    verified: boolean;
}

export interface ScoreRow {
    user_id: string;
    notebook_id: number;
    score: number;
}

export interface UserScoreRow extends ScoreRow {
    username: string;
    verified: boolean;
}