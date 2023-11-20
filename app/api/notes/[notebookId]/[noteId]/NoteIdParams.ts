import {NotebookIdParams} from "@/app/api/notes/[notebookId]/NotebookIdParams";

export interface NoteIdParams extends NotebookIdParams {
    noteId: string;
}