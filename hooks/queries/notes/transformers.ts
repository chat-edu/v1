import {NoteRow} from "@/azure/cosmos/types/note";
import {Note} from "@/types/Note";

export const transformRowToNote = (row: NoteRow): Note => ({
    id: row.id,
    notebookId: row.notebook_id,
    content: row.content,
    name: row.name,
});