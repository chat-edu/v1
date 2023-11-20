import React from 'react';

import {
    IconButton,
    useDisclosure
} from "@chakra-ui/react";

import {AddIcon} from "@chakra-ui/icons";

import AddNotebookModal from "@/components/Home/AddNotebook/AddNotebookModal";

const AddNotebook = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label={'Add Notebook'}
                icon={<AddIcon />}
                onClick={onOpen}
                variant={'ghost'}
                colorScheme={'brand'}
            />
            <AddNotebookModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default AddNotebook;
