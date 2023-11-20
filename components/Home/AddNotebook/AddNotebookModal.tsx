import React from 'react';
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import useAddNotebook from "@/hooks/mutators/useAddNotebook";
import TextInput from "@/components/Utilities/TextInput";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddNotebookModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const { setFieldTouched, setFieldValue, values, touched, errors, disabled, submitForm } = useAddNotebook();

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
                <ModalHeader>Add Notebook</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextInput
                        label={'Notebook Name'}
                        placeholder={'Ex: CS 2201'}
                        helperText={'Enter the name of the notebook'}
                        value={values.name}
                        onChange={(name) => setFieldValue('name', name)}
                        onBlur={() => setFieldTouched('name')}
                        error={touched.name && errors.name || undefined}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="brand"
                        onClick={onSubmit}
                        isDisabled={disabled}
                    >
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddNotebookModal;
