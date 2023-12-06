import {NoteRow} from "@/cosmosPostgres/types/note";
import {Note} from "@/types/Note";

export const transformNote = (row: NoteRow): Note => ({
    id: row.id,
    notebookId: row.notebook_id,
    content: row.content,
    name: row.name,
});