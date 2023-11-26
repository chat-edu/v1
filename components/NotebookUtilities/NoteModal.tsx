import React from 'react';

import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";

import useDeleteNote from "@/hooks/mutators/useDeleteNote";

import {Note} from "@/types/Note";
import {Notebook} from "@/types/Notebook";

interface Props {
    notebook: Notebook;
    note: Note;
    isOpen: boolean;
    onClose: () => void;
}

const NoteModal: React.FC<Props> = ({ note, notebook, isOpen, onClose }) => {

    const { deleteNote, isAllowed } = useDeleteNote(note, notebook);

    const onDelete = async () => {
        await deleteNote();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            scrollBehavior={'inside'}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{note.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Markdown>
                        {note.content}
                    </Markdown>
                </ModalBody>
                <ModalFooter>
                    {
                        isAllowed && (
                            <Button
                                variant='ghost'
                                colorScheme='red'
                                onClick={onDelete}
                            >
                                Delete
                            </Button>
                        )
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NoteModal;
