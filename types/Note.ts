export interface NoteInput {
    title: string;
    content: string;
    courseId: string;
}

export interface Note extends NoteInput {
    id: string;
    score: number;
}