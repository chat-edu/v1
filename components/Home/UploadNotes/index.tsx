import React from 'react';

import {Button, ButtonProps, useDisclosure} from "@chakra-ui/react";

import UploadModal from "@/components/Home/UploadNotes/UploadModal";

interface Props {
    text: string;
    icon: React.ReactElement;
    buttonProps?: ButtonProps;
}

const UploadNotes: React.FC<Props> = ({ text, icon, buttonProps }) => {

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
            />
        </>
    );
};

export default UploadNotes;
