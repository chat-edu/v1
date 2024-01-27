import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

// used on the client side to create a new note
export interface NoteInput {
    name: string;
    content: string;
    notebookId: Notebook["id"];
    orderPosition: number;
    topicId: Topic["id"] | null;
}

// used on the client side to display a note
export interface Note extends NoteInput {
    id: number;
}