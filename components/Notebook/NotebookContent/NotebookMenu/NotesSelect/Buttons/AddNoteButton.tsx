import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";

import {MdNoteAdd} from "react-icons/md";

import AddNoteModal from "@/components/AddModals/AddNote/AddNoteModal";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

interface Props {
    notebookId: Notebook['id']
    parentTopicId?: Topic['id'],
    orderPosition: Topic['orderPosition']
}

const AddNoteButton: React.FC<Props> = ({ notebookId, parentTopicId, orderPosition }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddNoteModal
                isOpen={isOpen}
                onClose={onClose}
                notebookId={notebookId}
                orderPosition={orderPosition}
                parentTopicId={parentTopicId}
            />
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                }}
                leftIcon={<MdNoteAdd />}
                justifyContent={'flex-start'}
                variant={'ghost'}
                w={'100%'}
            >
                Add Lesson
            </Button>
        </>
    );
};

export default AddNoteButton;
