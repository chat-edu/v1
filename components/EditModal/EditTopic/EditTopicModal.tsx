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

import useUpdateTopicName from "@/hooks/mutators/update/useUpdateTopicName";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    notebookId: Notebook['id']
    topicId: Topic['id'],
    topicName: Topic['name']
}

const EditTopicModal: React.FC<Props> = ({ isOpen, onClose, notebookId, topicId, topicName }) => {

    const {
        name,
        setName,
        nameTouched,
        setNameTouched,
        submit
    } = useUpdateTopicName(notebookId, topicId, topicName);

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
                <ModalHeader>Update Topic</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextInput
                        label={"Topic"}
                        placeholder={"Topic Name"}
                        value={name}
                        onChange={setName}
                        onBlur={() => setNameTouched(true)}
                        error={(nameTouched && !name) ? "Topic name is required" : undefined}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onSubmit}
                        isDisabled={!name}
                        colorScheme={'brand'}
                        w={'100%'}
                    >
                        Update Topic
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditTopicModal;
