import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

import AddSubjectModal from "@/components/Home/AddSubject/AddSubjectModal";

const AddSubjectButton = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                colorScheme={'brand'}
                onClick={onOpen}
                leftIcon={<SmallAddIcon />}
            >
                Add Subject
            </Button>
            <AddSubjectModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default AddSubjectButton;
