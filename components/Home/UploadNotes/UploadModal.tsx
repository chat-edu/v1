import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Flex,
} from '@chakra-ui/react'

import useAddNote from "@/hooks/mutators/useAddNote";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const UploadModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const { values, setFieldValue, touched, setFieldTouched, submitForm, errors } = useAddNote();

    const onSubmit = async () => {
        await submitForm();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Upload Notes</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        direction={'column'}
                        gap={4}
                    >
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme={'brand'}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UploadModal;
