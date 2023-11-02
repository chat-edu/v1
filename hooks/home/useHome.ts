import {useState} from "react";

import {Note} from "@/types/Note";
import useSubjects from "@/hooks/queries/useSubjects";

const useHome = () => {

    const { subjects, loading } = useSubjects();

    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Note) => {
        setNotes([...notes, note]);
    };

    const removeNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
    }

    return {
        notes,
        subjects,
        loading,
        addNote,
        removeNote
    }

}

export default useHome;