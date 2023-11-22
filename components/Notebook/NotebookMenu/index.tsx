import React from 'react';

import Sidebar from "@/components/Notebook/NotebookMenu/Sidebar";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";
import MobileHeader from "@/components/Notebook/NotebookMenu/MobileHeader";

interface Props {
    notebook: Notebook
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    selectedNotes: Note[];
}

const NotesMenu: React.FC<Props> = ({ notebook, addNote, removeNote, selectedNotes }) => {

    return (
        <>
            <MobileHeader
                notebook={notebook}
                selectedNotes={selectedNotes}
                addNote={addNote}
                removeNote={removeNote}
            />
            <Sidebar
                notebook={notebook}
                selectedNotes={selectedNotes}
                addNote={addNote}
                removeNote={removeNote}
            />
        </>
    );
};

export default NotesMenu;
