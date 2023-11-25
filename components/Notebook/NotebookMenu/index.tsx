import React from 'react';

import Sidebar from "@/components/Notebook/NotebookMenu/Sidebar";
import MobileHeader from "@/components/Notebook/NotebookMenu/MobileHeader";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook
    addNote: (note: Note) => void;
    removeNote: (id: Note["id"]) => void;
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
