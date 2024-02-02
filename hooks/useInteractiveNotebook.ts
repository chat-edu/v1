import {useState} from "react";

import {Note} from "@/types/Note";
import {Assignment} from "@/types/assignment/Assignment";

export enum Modes {
    CONTENT,
    CHAT,
    ASSIGNMENT
}

const useInteractiveNotebook = () => {

    const [selectedLesson, setSelectedLesson] = useState<Note | null>(null);

    const [selectedNotes, setSelectedNotes] = useState<Note[]>([]);

    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

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

    const selectAssignment = (assignment: Assignment) => {
        setSelectedAssignment(assignment);
        setMode(Modes.ASSIGNMENT);
    }

    return {
        selectedLesson,
        selectedNotes,
        selectedAssignment,
        mode,
        selectLesson,
        deselectLesson,
        selectNotes,
        selectAssignment,
    }
}

export default useInteractiveNotebook;