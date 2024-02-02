import React from 'react';

import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    name: string;
}

const ConfirmDeleteModal: React.FC<Props> = ({ isOpen, onConfirm, onClose, name}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete {name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this {name.toLowerCase()}?
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="red"
                        mr={3}
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmDeleteModal;
