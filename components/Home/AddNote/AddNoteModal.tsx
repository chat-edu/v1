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

import TextareaInput from "@/components/Utilities/TextareaInput";
import TextInput from "@/components/Utilities/TextInput";

import useAddNote from "@/hooks/mutators/useAddNote";

import { Notebook } from "@/types/Notebook";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    notebook: Notebook
}

const AddNoteModal: React.FC<Props> = ({ isOpen, onClose , notebook}) => {

    const { values, setFieldValue, touched, setFieldTouched, disabled, submitForm, errors } = useAddNote(notebook);

    const onSubmit = async () => {
        await submitForm();
        onClose();
    }

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
                <ModalHeader>Add Notes</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        direction={'column'}
                        gap={4}
                    >
                        <TextInput
                            label={"Name"}
                            placeholder={"Enter the name of this note here..."}
                            value={values.name}
                            onChange={(title) => setFieldValue('name', title)}
                            onBlur={() => setFieldTouched('name', true)}
                            error={touched.name && errors.name || undefined}
                            helperText={"Ex: Loops"}
                        />
                        <TextareaInput
                            label={"Content"}
                            placeholder={"Enter the contents of the note here..."}
                            value={values.content}
                            onChange={(content) => setFieldValue('content', content)}
                            onBlur={() => setFieldTouched('content', true)}
                            error={touched.content && errors.content || undefined}
                            helperText={"Ex: A loop is a sequence of instructions that is continually repeated until a certain condition is reached."}
                        />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme={'brand'}
                        onClick={onSubmit}
                        isDisabled={disabled}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddNoteModal;
