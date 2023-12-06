import React from 'react';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

import Markdown from "@/components/Utilities/Markdown";

import {NoteInput} from "@/types/Note";

interface Props {
    note: NoteInput;
    isOpen: boolean;
    onClose: () => void;
    footer?: React.ReactNode;
}

const NoteInputModal: React.FC<Props> = ({ note, isOpen, onClose, footer }) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            scrollBehavior={'inside'}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{note.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Markdown>
                        {note.content}
                    </Markdown>
                </ModalBody>
                <ModalFooter>
                    {footer}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NoteInputModal;
