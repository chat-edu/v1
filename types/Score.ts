export interface Score {
    userId: string;
    notebookId: number;
    score: number;
}

export interface UserScore extends Score {
    username: string;
}

export interface NotebookScore extends Score {
    notebookName: string;
}

export interface ScoreRow {
    user_id: string;
    notebook_id: number;
    score: number;
}

export interface UserScoreRow extends ScoreRow {
    username: string;
}

export interface NotebookScoreRow extends ScoreRow {
    notebook_name: string;
}