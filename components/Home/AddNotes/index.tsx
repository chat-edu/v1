import React from 'react';

import {Button, ButtonProps, useDisclosure} from "@chakra-ui/react";

import AddModal from "@/components/Home/AddNotes/AddModal";

import { Notebook } from "@/types/Notebook";

interface Props {
    text: string;
    icon: React.ReactElement;
    buttonProps?: ButtonProps;
    notebook?: Notebook
}

const AddNotes: React.FC<Props> = ({ text, icon, buttonProps, notebook }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                colorScheme={'brand'}
                leftIcon={icon}
                onClick={onOpen}
                {...buttonProps}
            >
                {text}
            </Button>
            <AddModal
                isOpen={isOpen}
                onClose={onClose}
                initNotebook={notebook}
            />
        </>
    );
};

export default AddNotes;
