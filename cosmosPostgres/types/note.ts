import {NotebookRow} from "@/cosmosPostgres/types/notebook";
import {TopicRow} from "@/cosmosPostgres/types/topic";


// used on the server side to create a new note
export interface NoteRowInput {
    name: string;
    content: string;
    notebook_id: NotebookRow["id"];
    topic_id: TopicRow["id"] | null;
    order_position: number;
}

// returned from the database when querying for a note
export interface NoteRow extends NoteRowInput {
    id: number;
}