import React, { useState, useEffect } from 'react';

import {
    HStack,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody, Text, ModalFooter,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import FileInput from "@/components/Utilities/FIleInput";

import useUploadNote from "@/hooks/mutators/useUploadNote";

import {Notebook} from "@/types/Notebook";

import './TypeWriterAnimation.css';

interface Props {
    notebookId: Notebook["id"]
}

const subtexts = [
    "Typing up your masterpieces...",
    "Clacking away at your ideas...",
    "Composing pages of wisdom...",
    "Inking your thoughts into reality...",
    "Your words, our paper...",
    "Setting the stage for your stories...",
    "Crafting your digital manuscript...",
    "From keys to knowledge...",
    "Aligning the margins of your mind...",
    "Carriage returning your insights..."
];

const UploadNotes: React.FC<Props> = ({ notebookId }) => {
    const { file, loading, updateFile, uploadNote } = useUploadNote(notebookId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subtext, setSubtext] = useState('');

    const handleUpload = async () => {
        setIsModalOpen(true);
        await uploadNote().finally(() => setIsModalOpen(false));
    };

    useEffect(() => {
        if (isModalOpen) {
            const randomSubtext = subtexts[Math.floor(Math.random() * subtexts.length)];
            setSubtext(randomSubtext);
        }
    }, [isModalOpen]);

    return (
        <HStack w={'100%'}>
            <FileInput
                setFile={updateFile}
                text={file ? file.name : 'Upload Notes'}
                accept={'application/pdf'}
            />
            {file && (
                <IconButton
                    aria-label={'Upload Notes'}
                    icon={<CheckIcon />}
                    onClick={handleUpload}
                    flexShrink={0}
                    isLoading={loading}
                />
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        textAlign={'center'}
                    >
                        Uploading Notes
                    </ModalHeader>
                    <ModalBody
                        textAlign={'center'}
                        pt={6}
                    >
                        <div className="typewriter">
                            <div className="slide"><i></i></div>
                            <div className="paper"></div>
                            <div className="keyboard"></div>
                        </div>
                        <Text
                            mt={6}
                        >
                            {subtext}
                        </Text>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>
        </HStack>
    );
};

export default UploadNotes;