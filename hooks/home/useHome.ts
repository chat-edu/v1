import {useState} from "react";

import useNotebooks from "@/hooks/queries/useNotebooks";
import useAuth from "@/hooks/auth/useAuth";

import {Note} from "@/types/Note";

const useHome = () => {

    const { user } = useAuth();

    const { notebooks, loading } = useNotebooks(user?.uid);

    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (note: Note) => {
        setNotes([...notes, note]);
    };

    const removeNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
    }

    return {
        notes,
        notebooks,
        loading,
        addNote,
        removeNote
    }

}

export default useHome;