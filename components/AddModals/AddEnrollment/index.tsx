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

import useAddEnrollment from "@/hooks/mutators/add/useAddEnrollment";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddEnrollmentModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const {
        accessCode,
        accessCodeTouched,
        updateAccessCode,
        updateAccessCodeTouched,
        enroll
    } = useAddEnrollment();

    const onSubmit = async () => {
        await enroll();
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
                <ModalHeader>Enroll in a Class</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TextInput
                        label={"Access Code"}
                        placeholder={"Type the access code given to you by your teacher here..."}
                        value={accessCode}
                        onChange={updateAccessCode}
                        onBlur={() => updateAccessCodeTouched()}
                        error={(accessCodeTouched && accessCode.length !== 6) ? "Access code must be 6 characters" : undefined}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onSubmit}
                        isDisabled={accessCode.length !== 6}
                        colorScheme={'brand'}
                        w={'100%'}
                    >
                        Enroll
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddEnrollmentModal;
