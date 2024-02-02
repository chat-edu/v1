import React from 'react';

import Sidebar from "@/components/Notebook/NotebookMenu/Sidebar";
import MobileHeader from "@/components/Notebook/NotebookMenu/MobileHeader";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";
import {Assignment} from "@/types/assignment/Assignment";

interface Props {
    notebook: Notebook
    selectLesson: (note: Note) => void;
    deselectLesson: () => void;
    selectedLesson: Note | null;
    selectedNotes: Note[];
    selectNotes: (notes: Note[]) => void;
    selectedAssignment: Assignment | null;
    selectAssignment: (assignment: Assignment) => void;
}

const NotesMenu: React.FC<Props> = ({ notebook, selectLesson, deselectLesson, selectedNotes, selectedLesson, selectNotes, selectedAssignment, selectAssignment }) => {

    return (
        <>
            <MobileHeader
                notebook={notebook}
                selectedLesson={selectedLesson}
                selectLesson={selectLesson}
                deselectLesson={deselectLesson}
                selectedNotes={selectedNotes}
                selectNotes={selectNotes}
                selectedAssignment={selectedAssignment}
                selectAssignment={selectAssignment}
            />
            <Sidebar
                notebook={notebook}
                selectedLesson={selectedLesson}
                selectLesson={selectLesson}
                deselectLesson={deselectLesson}
                selectedNotes={selectedNotes}
                selectNotes={selectNotes}
                selectedAssignment={selectedAssignment}
                selectAssignment={selectAssignment}
            />
        </>
    );
};

export default NotesMenu;
