import React from 'react';

import { Button } from "@chakra-ui/react";

import NoteInputModal from "@/components/NotebookUtilities/NoteInputModal";

import useDeleteNote from "@/hooks/mutators/delete/useDeleteNote";

import {Note} from "@/types/Note";

interface Props {
    note: Note;
    isOpen: boolean;
    onClose: () => void;
}

const NoteModal: React.FC<Props> = ({ note, isOpen, onClose }) => {

    const { deleteNote } = useDeleteNote(note);

    const onDelete = async () => {
        await deleteNote();
        onClose();
    }

    return (
        <NoteInputModal
            note={note}
            isOpen={isOpen}
            onClose={onClose}
            footer={
                <Button
                    variant='ghost'
                    colorScheme='red'
                    onClick={onDelete}
                >
                    Delete
                </Button>
            }
        />
    );
};

export default NoteModal;
