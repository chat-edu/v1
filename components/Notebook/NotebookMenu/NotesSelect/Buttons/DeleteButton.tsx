import React from 'react';

import {useDisclosure} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

import ConfirmDeleteModal from "@/components/Utilities/ConfirmDeleteModal";
import TooltipIconButton from "@/components/Utilities/TooltipIconButton";

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
            <TooltipIconButton
                aria-label={'Delete'}
                icon={<DeleteIcon />}
                size={'xs'}
                onClick={onOpen}
            />
        </>
    );
};

export default DeleteButton;
