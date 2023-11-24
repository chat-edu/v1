export interface NotebookInput {
    name: string;
    userId: string;
}

export interface Notebook extends NotebookInput {
    id: number;
}

export interface NotebookRowInput {
    name: string;
    user_id: string;
}

export interface NotebookRow extends NotebookRowInput {
    id: number;
}