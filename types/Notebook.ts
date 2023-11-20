export interface NotebookInput {
    name: string;
    userId: string;
}

export interface Notebook extends NotebookInput {
    id: string;
}