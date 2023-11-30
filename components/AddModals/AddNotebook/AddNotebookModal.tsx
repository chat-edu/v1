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

import TextInput from "@/components/Utilities/FormUtilities/TextInput";

import useAddNotebook from "@/hooks/mutators/useAddNotebook";
import {TopicTagTypes, SchoolTagTypes} from "@/types/Tags";
import MenuInput from "@/components/Utilities/FormUtilities/MenuInput";
import {capitalize} from "@/lib/capitalize";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const AddNotebookModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const {
        setFieldTouched,
        setFieldValue,
        values,
        touched,
        errors,
        disabled,
        topicTag,
        schoolName,
        schoolTag,
        setSchoolTag,
        setSchoolName,
        setTopicTag,
        submitForm
    } = useAddNotebook();

    const onSubmit = async () => {
        await submitForm();
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
                <ModalHeader>Add Notebook</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display={'flex'}
                    flexDirection={'column'}
                    gap={4}
                >
                    <TextInput
                        label={'Notebook Name'}
                        placeholder={'Ex: CS 2201'}
                        helperText={'Enter the name of the notebook'}
                        value={values.name}
                        onChange={(name) => setFieldValue('name', name)}
                        onBlur={() => setFieldTouched('name')}
                        error={touched.name && errors.name || undefined}
                    />
                    <MenuInput
                        label={"School Type"}
                        valueDisplay={schoolTag ? capitalize(schoolTag) : "Select a Type"}
                        optionLabels={Object.values(SchoolTagTypes).map(capitalize)}
                        options={Object.values(SchoolTagTypes) as SchoolTagTypes[]}
                        onSelect={setSchoolTag}
                        helperText={'What type of school is this notebook for?'}
                    />
                    {
                        schoolTag && (
                            <TextInput
                                label={"School Name"}
                                placeholder={"Ex: Vanderbilt University"}
                                value={schoolName}
                                onChange={setSchoolName}
                                helperText={'What is the name of the school?'}
                            />
                        )
                    }
                    <MenuInput
                        label={"Topic"}
                        valueDisplay={topicTag ? capitalize(topicTag) : "Select a Type"}
                        optionLabels={Object.values(TopicTagTypes).map(capitalize)}
                        options={Object.values(TopicTagTypes) as TopicTagTypes[]}
                        onSelect={setTopicTag}
                        helperText={'What are your notes about?'}
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
