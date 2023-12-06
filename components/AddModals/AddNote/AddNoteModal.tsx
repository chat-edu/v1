import React from 'react';

import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

import AddNoteForm from "@/components/AddModals/AddNote/AddNoteForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    notebookId: number;
}

const AddNoteModal: React.FC<Props> = ({ isOpen, onClose , notebookId}) => {

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
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    <AddNoteForm
                        onDone={onClose}
                        notebookId={notebookId}
                    />
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default AddNoteModal;
