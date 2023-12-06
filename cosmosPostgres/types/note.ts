// used on the server side to create a new note
import {Notebook} from "@/types/Notebook";

export interface NoteRowInput {
    name: string;
    content: string;
    notebook_id: Notebook["id"];
}

// returned from the database when querying for a note
export interface NoteRow extends NoteRowInput {
    id: number;
}