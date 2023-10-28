import React from 'react';

import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";

import {AddIcon} from "@chakra-ui/icons";

import useAddSubject from "@/hooks/mutators/useAddSubject";

const AddSubject = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { setFieldTouched, setFieldValue, values, touched, errors, submitForm } = useAddSubject();

    const onSubmit = async () => {
        await submitForm();
        onClose();
    }

    return (
        <>
            <IconButton
                aria-label={'Add Subject'}
                icon={<AddIcon />}
                onClick={onOpen}
                variant={'ghost'}
                colorScheme={'brand'}
            />
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Subject</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="brand"
                            onClick={onSubmit}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddSubject;
