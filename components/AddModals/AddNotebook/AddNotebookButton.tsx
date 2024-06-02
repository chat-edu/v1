import React from 'react';

import {Button, ButtonProps, useDisclosure} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

import AddNotebookModal from "@/components/AddModals/AddNotebook/AddNotebookModal";

const AddNotebookButton: React.FC<ButtonProps> = (buttonProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                colorScheme={'brand'}
                onClick={onOpen}
                leftIcon={<SmallAddIcon />}
                {...buttonProps}
            >
                Add Course
            </Button>
            <AddNotebookModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default AddNotebookButton;
