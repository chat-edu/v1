import React from 'react';

import { Button } from "@chakra-ui/react";

import NoteInputModal from "@/components/NotebookUtilities/NoteInputModal";

import useDeleteNote from "@/hooks/mutators/useDeleteNote";

import {Note} from "@/types/Note";

interface Props {
    note: Note;
    authorId: string;
    isOpen: boolean;
    onClose: () => void;
}

const NoteModal: React.FC<Props> = ({ note, authorId, isOpen, onClose }) => {

    const { deleteNote, isAllowed } = useDeleteNote(note, authorId);

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
                isAllowed ? (
                    <Button
                        variant='ghost'
                        colorScheme='red'
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                ) : undefined
            }
        />
    );
};

export default NoteModal;
