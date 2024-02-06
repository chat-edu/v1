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

import useUpdateNoteName from "@/hooks/mutators/update/useUpdateNoteName";

import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    notebookId: Notebook['id']
    noteId: Note['id']
    noteName: Note['name']
}

const EditNoteModal: React.FC<Props> = ({ isOpen, onClose, notebookId, noteId, noteName }) => {

    const {
        name,
        setName,
        nameTouched,
        setNameTouched,
        submit
    } = useUpdateNoteName(noteId, notebookId, noteName);

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
                <ModalHeader>Edit Lesson</ModalHeader>
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
                        Update Lesson
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditNoteModal;
