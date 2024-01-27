import {useState} from "react";

import {Note} from "@/types/Note";

export enum Modes {
    CONTENT,
    CHAT
}

const useSelectLesson = () => {

    const [selectedLesson, setSelectedLesson] = useState<Note | null>(null);

    const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

    const [mode, setMode] = useState<Modes>(Modes.CONTENT);

    const selectLesson = (lesson: Note) => {
        setSelectedLesson(lesson);
        setMode(Modes.CONTENT)
    }

    const deselectLesson = () => {
        setSelectedLesson(null);
    }

    const selectNotes = (notes: Note[]) => {
        setSelectedNotes(notes);
        setMode(Modes.CHAT);
    }

    return {
        selectedLesson,
        selectedNotes,
        mode,
        selectLesson,
        deselectLesson,
        selectNotes,
    }
}

export default useSelectLesson;