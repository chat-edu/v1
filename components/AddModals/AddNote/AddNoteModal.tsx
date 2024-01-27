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

import TextInput from "@/components/Utilities/FormUtilities/TextInput";

import useAddNote from "@/hooks/mutators/useAddNote";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    notebookId: Notebook['id']
    orderPosition: Topic['orderPosition']
    parentTopicId?: Topic['id']
}

const AddNoteModal: React.FC<Props> = ({ isOpen, onClose, notebookId, parentTopicId, orderPosition }) => {

    const {
        name,
        setName,
        nameTouched,
        setNameTouched,
        submit
    } = useAddNote(notebookId, orderPosition, parentTopicId);

    const onSubmit = async () => {
        await submit();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            isCentered={true}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Lesson</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextInput
                        label={"Lesson"}
                        placeholder={"Lesson Name"}
                        value={name}
                        onChange={setName}
                        onBlur={() => setNameTouched(true)}
                        error={(nameTouched && !name) ? "Lesson name is required" : undefined}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onSubmit}
                        isDisabled={!name}
                        colorScheme={'brand'}
                        w={'100%'}
                    >
                        Add Lesson
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddNoteModal;
