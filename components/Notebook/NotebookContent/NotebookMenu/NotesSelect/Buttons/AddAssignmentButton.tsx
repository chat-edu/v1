import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";

import {MdAssignmentAdd} from "react-icons/md";

import AddAssignmentModal from "@/components/AddModals/AddAssignment";

import {Topic} from "@/types/Topic";

interface Props {
    topicId: Topic['id'],
}

const AddNoteButton: React.FC<Props> = ({topicId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <AddAssignmentModal
                isOpen={isOpen}
                onClose={onClose}
                topicId={topicId}
            />
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                }}
                leftIcon={<MdAssignmentAdd />}
                justifyContent={'flex-start'}
                variant={'ghost'}
                w={'100%'}
            >
                Add Assignment
            </Button>
        </>
    );
};

export default AddNoteButton;
