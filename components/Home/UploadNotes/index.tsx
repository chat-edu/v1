import React from 'react';

import {useDisclosure} from "@chakra-ui/react";

import UploadButton from "@/components/Home/UploadNotes/UploadButton";
import UploadModal from "@/components/Home/UploadNotes/UploadModal";

const UploadNotes = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <UploadButton
                onClick={onOpen}
            />
            <UploadModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>
    );
};

export default UploadNotes;
