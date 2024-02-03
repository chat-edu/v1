import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

import ConfirmDeleteModal from "@/components/Utilities/ConfirmDeleteModal";

interface Props {
    onDelete: () => void;
    name: string
}

const DeleteButton: React.FC<Props> = ({ onDelete, name }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <ConfirmDeleteModal
                isOpen={isOpen}
                onClose={onClose}
                onConfirm={onDelete}
                name={name}
            />
            <Button
                onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                }}
                leftIcon={<DeleteIcon />}
                justifyContent={'flex-start'}
                variant={'ghost'}
                w={'100%'}
            >
                Delete
            </Button>
        </>
    );
};

export default DeleteButton;
