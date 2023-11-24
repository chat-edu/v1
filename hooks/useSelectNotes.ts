import {useState} from "react";

import {Note} from "@/types/Note";

const useSelectNotes = () => {

    const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

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