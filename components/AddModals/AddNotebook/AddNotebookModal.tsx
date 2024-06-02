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

import AddNotebookForm from "@/components/AddModals/AddNotebook/AddNotebookForm";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddNotebookModal: React.FC<Props> = ({ isOpen, onClose }) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Course</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <AddNotebookForm
                        onSuccess={onClose}
                    />
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default AddNotebookModal;
