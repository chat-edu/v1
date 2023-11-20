import {useState} from "react";

import {Note} from "@/types/Note";

const useHome = () => {

    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Note) => {
        setNotes([...notes, note]);
    };

    const removeNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
    }

    return {
        notes,
        addNote,
        removeNote
    }

}

export default useHome;