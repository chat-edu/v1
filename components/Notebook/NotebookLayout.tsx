import React from 'react';

import {Stack} from "@chakra-ui/react";

import NotebookMenu from "@/components/Notebook/NotebookMenu";
import Chat from "@/components/Chat";

import useSelectNotes from "@/hooks/useSelectNotes";

import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";

interface Props {
    notebook: Notebook,
    initialNoteId?: Note["id"]
}

const NotebookLayout: React.FC<Props> = ({ notebook, initialNoteId }) => {

    const { selectedNotes, addNote, removeNote } = useSelectNotes(initialNoteId);

    return (
        <Stack
            w={'100%'}
            flex={1}
            gap={0}
            direction={{base: 'column', md: 'row'}}
        >
            <NotebookMenu
                notebook={notebook}
                addNote={addNote}
                removeNote={removeNote}
                selectedNotes={selectedNotes}
            />
            <Chat
                notebookId={notebook.id}
                notes={selectedNotes}
            />
        </Stack>
    );
};

export default NotebookLayout;
