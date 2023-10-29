import React from 'react';

import {Button, ButtonProps, useDisclosure} from "@chakra-ui/react";

import UploadModal from "@/components/Home/UploadNotes/UploadModal";

import {Subject} from "@/types/Subject";

interface Props {
    text: string;
    icon: React.ReactElement;
    buttonProps?: ButtonProps;
    subject?: Subject
}

const UploadNotes: React.FC<Props> = ({ text, icon, buttonProps, subject }) => {

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
            <UploadModal
                isOpen={isOpen}
                onClose={onClose}
                initSubject={subject}
            />
        </>
    );
};

export default UploadNotes;
