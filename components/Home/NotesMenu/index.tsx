import React from 'react';

import MobileHeader from "@/components/Home/NotesMenu/MobileHeader";
import Sidebar from "@/components/Home/NotesMenu/Sidebar";

import {Note} from "@/types/Note";

interface Props {
    addNote: (note: Note) => void;
    removeNote: (id: string) => void;
    notes: Note[];
}

const NotesMenu: React.FC<Props> = ({ addNote, removeNote, notes }) => {

    return (
        <>
            <MobileHeader
                notes={notes}
                addNote={addNote}
                removeNote={removeNote}
            />
            <Sidebar
                selectedNotes={notes}
                addNote={addNote}
                removeNote={removeNote}
            />
        </>
    );
};

export default NotesMenu;
