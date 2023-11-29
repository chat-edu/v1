import {Notebook} from "@/types/Notebook";

// used on the client side to create a new note
export interface NoteInput {
    name: string;
    content: string;
    notebookId: Notebook["id"];
}

// used on the client side to display a note
export interface Note extends NoteInput {
    id: number;
}