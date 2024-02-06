import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";
import {FaEdit} from "react-icons/fa";

import EditNoteModal from "@/components/EditModal/EditNoteName/EditNoteModal";


import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";

interface Props {
    notebookId: Notebook['id'];
    noteId: Note["id"];
    noteName: Note['name'];
}

const UpdateNoteButton: React.FC<Props> = ({ notebookId, noteId, noteName}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditNoteModal
                isOpen={isOpen}
                onClose={onClose}
                notebookId={notebookId}
                noteId={noteId}
                noteName={noteName}
            />
            <Button
                onClick={(e) => {
                    onOpen();
                    e.stopPropagation();
                }}
                leftIcon={<FaEdit />}
                justifyContent={'flex-start'}
                variant={'ghost'}
                w={'100%'}
            >
                Edit Lesson
            </Button>
        </>

    );
};

export default UpdateNoteButton;
