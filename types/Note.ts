export interface NoteInput {
    title: string;
    content: string;
    notebookId: string;
}

export interface Note extends NoteInput {
    id: string;
    score: number;
}