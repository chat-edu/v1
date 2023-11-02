import React from 'react';

import {
    IconButton,
    useDisclosure
} from "@chakra-ui/react";

import {AddIcon} from "@chakra-ui/icons";

import AddSubjectModal from "@/components/Home/AddSubject/AddSubjectModal";

const AddSubject = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label={'Add Subject'}
                icon={<AddIcon />}
                onClick={onOpen}
                variant={'ghost'}
                colorScheme={'brand'}
            />
            <AddSubjectModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default AddSubject;
