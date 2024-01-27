import {useState} from "react";

import {Note} from "@/types/Note";

const useSelectLesson = () => {

    const [selectedLesson, setSelectedLesson] = useState<Note | null>(null);

    const selectLesson = (lesson: Note) => {
        setSelectedLesson(lesson);
    }

    const deselectLesson = () => {
        setSelectedLesson(null);
    }

    return {
        selectedLesson,
        selectLesson,
        deselectLesson
    }
}

export default useSelectLesson;