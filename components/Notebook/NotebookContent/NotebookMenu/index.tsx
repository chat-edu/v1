import React from 'react';

import Sidebar from "@/components/Notebook/NotebookContent/NotebookMenu/Sidebar";
import MobileHeader from "@/components/Notebook/NotebookContent/NotebookMenu/MobileHeader";

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
    setOverviewMode?: () => void;
}

const NotesMenu: React.FC<Props> = ({ notebook, selectLesson, deselectLesson, selectedNotes, selectedLesson, selectNotes, selectedAssignment, selectAssignment, setOverviewMode }) => {

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
                setOverviewMode={setOverviewMode}
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
                setOverviewMode={setOverviewMode}
            />
        </>
    );
};

export default NotesMenu;
