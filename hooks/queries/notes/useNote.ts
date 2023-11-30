import {Note} from "@/types/Note";

import useItemData from "@/hooks/queries/utilities/useItemData";
import {transformNote} from "@/hooks/queries/notes/transformers";

const useNote = (noteId: Note["id"]) => {
    const [note, loading, error] = useItemData(`/api/notes/${noteId}`, transformNote);

    return {
        note,
        loading,
        error
    }
}

export default useNote;