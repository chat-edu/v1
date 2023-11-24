import {Notebook} from "@/types/Notebook";

export interface NoteInput {
    name: string;
    content: string;
    notebookId: Notebook["id"];
}

export interface Note extends NoteInput {
    id: number;
}

export interface NoteRowInput {
    name: string;
    content: string;
    notebook_id: Notebook["id"];
}

export interface NoteRow extends NoteRowInput {
    id: number;
}