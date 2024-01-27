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

import useAddTopic from "@/hooks/mutators/useAddTopic";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    notebookId: Notebook['id']
    orderPosition: Topic['orderPosition']
    parentTopicId?: Topic['id']
}

const AddTopicModal: React.FC<Props> = ({ isOpen, onClose, notebookId, parentTopicId, orderPosition }) => {

    const {
        name,
        setName,
        nameTouched,
        setNameTouched,
        submit
    } = useAddTopic(notebookId, parentTopicId, orderPosition);

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
                <ModalHeader>Add Topic</ModalHeader>
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
                        Add Topic
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddTopicModal;
