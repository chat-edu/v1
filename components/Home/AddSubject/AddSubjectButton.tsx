import React from 'react';

import {Button, ButtonProps, useDisclosure} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";

import AddSubjectModal from "@/components/Home/AddSubject/AddSubjectModal";

const AddSubjectButton: React.FC<ButtonProps> = (buttonProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                colorScheme={'brand'}
                onClick={onOpen}
                leftIcon={<SmallAddIcon />}
                {...buttonProps}
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
