import React from 'react';

import Sidebar from "@/components/Notebook/NotebookMenu/Sidebar";
import MobileHeader from "@/components/Notebook/NotebookMenu/MobileHeader";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook
    selectLesson: (note: Note) => void;
    deselectLesson: () => void;
    selectedLesson: Note | null;
}

const NotesMenu: React.FC<Props> = ({ notebook, selectLesson, deselectLesson, selectedLesson }) => {

    return (
        <>
            <MobileHeader
                notebook={notebook}
                selectedLesson={selectedLesson}
                selectLesson={selectLesson}
                deselectLesson={deselectLesson}
            />
            <Sidebar
                notebook={notebook}
                selectedLesson={selectedLesson}
                selectLesson={selectLesson}
                deselectLesson={deselectLesson}
            />
        </>
    );
};

export default NotesMenu;
