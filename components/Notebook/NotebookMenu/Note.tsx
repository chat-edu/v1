import React from 'react';

import {
    Checkbox,
    HStack,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Button
} from "@chakra-ui/react";

import {AiFillEye} from "react-icons/ai";

import Markdown from "@/components/Utilities/Markdown";

import useDeleteNote from "@/hooks/mutators/useDeleteNote";

import {Note as NoteType} from "@/types/Note";


interface Props {
    note: NoteType,
    addNote: (note: NoteType) => void
    removeNote: (id: string) => void
}

const Note: React.FC<Props> = ({ note, addNote, removeNote }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { deleteNote } = useDeleteNote(note);

    const onDelete = async () => {
        await deleteNote();
        onClose();
    }

    return (
        <>
            <HStack
                key={note.id}
                w={'100%'}
                justifyContent={'space-between'}
            >
                <Checkbox
                    key={note.id}
                    value={note.id}
                    onChange={(e) => {
                        if(e.target.checked) {
                            addNote(note);
                        } else {
                            removeNote(note.id);
                        }
                    }}
                >
                    {note.title}
                </Checkbox>
                <HStack>
                    <IconButton
                        aria-label={"View Note"}
                        icon={<AiFillEye />}
                        onClick={onOpen}
                        size={'sm'}
                    />
                </HStack>
            </HStack>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={'3xl'}
                scrollBehavior={'inside'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{note.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Markdown>
                            {note.content}
                        </Markdown>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant='ghost'
                            colorScheme='red'
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Note;
