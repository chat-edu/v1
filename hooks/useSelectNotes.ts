import {useEffect, useState} from "react";

import {Note} from "@/types/Note";
import useNote from "@/hooks/queries/notes/useNote";

const useSelectNotes = (initialNoteId?: Note["id"]) => {

    const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

    const { note } = useNote(initialNoteId || 0);

    useEffect(() => {
        if (note && !selectedNotes.find((selectedNote) => selectedNote.id === note.id)) {
            addNote(note);
        }
    }, [note]);

    const addNote = (note: Note) => {
        setSelectedNotes([...selectedNotes, note]);
    };

    const removeNote = (id: Note["id"]) => {
        setSelectedNotes(selectedNotes.filter((note) => note.id !== id));
    }

    return {
        selectedNotes,
        addNote,
        removeNote
    }

}

export default useSelectNotes;