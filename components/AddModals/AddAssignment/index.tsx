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

import useCreateAssignment from "@/hooks/mutators/useCreateAssignment";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    topicId: Topic['id']
}

const AddAssignmentModal: React.FC<Props> = ({ isOpen, onClose, topicId }) => {

    const {
        assignmentName,
        updateAssignmentName,
        assignmentNameTouched,
        updateAssignmentNameTouched,
        createAssignment
    } = useCreateAssignment(topicId)

    const onSubmit = async () => {
        await createAssignment();
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
                <ModalHeader>Add Assignment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextInput
                        label={"Lesson"}
                        placeholder={"Lesson Name"}
                        value={assignmentName}
                        onChange={updateAssignmentName}
                        onBlur={() => updateAssignmentNameTouched(true)}
                        error={(assignmentNameTouched && !assignmentName) ? "Lesson name is required" : undefined}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onSubmit}
                        isDisabled={!assignmentName}
                        colorScheme={'brand'}
                        w={'100%'}
                    >
                        Add Assignment
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddAssignmentModal;
