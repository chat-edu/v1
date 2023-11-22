import React, { useState, useEffect } from 'react';
import { HStack, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Progress } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import useUploadNote from "@/hooks/mutators/useUploadNote";
import FileInput from "@/components/Utilities/FIleInput";

import './TypeWriterAnimation.css';

interface Props {
    notebookId: string
}

const UploadNotes: React.FC<Props> = ({ notebookId }) => {
    const { file, loading, updateFile, uploadNote } = useUploadNote(notebookId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subtext, setSubtext] = useState('');

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

    const handleUpload = () => {
        setIsModalOpen(true);
        uploadNote().finally(() => setIsModalOpen(false));
    };

    useEffect(() => {
        if (isModalOpen) {
            const randomSubtext = subtexts[Math.floor(Math.random() * subtexts.length)];
            setSubtext(randomSubtext);
        }
    }, [isModalOpen, subtexts]);

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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className="modal-header-custom">Uploading Notes</ModalHeader>
                    <ModalBody className="modal-body-custom">
                        <div className="typewriter">
                            <div className="slide"><i></i></div>
                            <div className="paper"></div>
                            <div className="keyboard"></div>
                        </div>
                        <p className="subtext-custom">{subtext}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </HStack>
    );
};

export default UploadNotes;