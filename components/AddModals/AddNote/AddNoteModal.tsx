import React from 'react';

import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

import TextareaInput from "@/components/Utilities/FormUtilities/TextareaInput";
import MultipleTagInput from "@/components/Utilities/FormUtilities/MultipleTagInput";
import TypewriterAnimation from "@/components/AddModals/UploadNotes/UploadNotesModal/TypewriterAnimation";

import useAddNote, {AddNoteStep} from "@/hooks/mutators/useAddNote";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    notebookId: number;
}

const AddNoteModal: React.FC<Props> = ({ isOpen, onClose , notebookId}) => {

    const {
        step,
        content,
        setContent,
        contentTouched,
        setContentTouched,
        generateTopics,
        generatedTopics,
        generateNotes,
        generatedTopicsLoading,
        generateNotesLoading,
        selectedTopics,
        selectTopic,
        unselectTopic,
    } = useAddNote(notebookId);

    const onSubmit = async () => {
        if (step === AddNoteStep.CONTENT) {
            await generateTopics();
        } else if (step === AddNoteStep.TOPICS) {
            const success = await generateNotes();
            if (success) {
                onClose();
            }
        }
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
                <ModalHeader>
                    {
                        step === AddNoteStep.CONTENT ? (
                            "Add Notes"
                        ) : (
                            step === AddNoteStep.TOPICS ? (
                                "Select Topics"
                            ) : (
                                "Select Notes"
                            )
                        )
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        generatedTopicsLoading || generateNotesLoading ? (
                            <TypewriterAnimation />
                        ) : (
                            <Flex
                                direction={'column'}
                                gap={4}
                            >
                                {
                                    step === AddNoteStep.CONTENT ? (
                                        <TextareaInput
                                            label={"Content"}
                                            placeholder={"Enter the contents of the note here..."}
                                            value={content}
                                            onChange={(val) => setContent(val)}
                                            onBlur={() => setContentTouched(true)}
                                            error={contentTouched && content.length === 0 ? "Content is required." : undefined}
                                            helperText={"Ex: A loop is a sequence of instructions that is continually repeated until a certain condition is reached."}
                                        />
                                    ) : (
                                        <MultipleTagInput
                                            label={"Topics"}
                                            tagOptions={generatedTopics}
                                            selectedTags={selectedTopics}
                                            selectTag={selectTopic}
                                            unselectTag={unselectTopic}
                                        />
                                    )
                                }
                            </Flex>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme={'brand'}
                        onClick={onSubmit}
                        isDisabled={
                            generatedTopicsLoading || generateNotesLoading
                                || (step === AddNoteStep.CONTENT && content.length === 0)
                                || (step === AddNoteStep.TOPICS && selectedTopics.length === 0)
                        }
                        isLoading={generatedTopicsLoading || generateNotesLoading}
                    >
                        {
                            step === AddNoteStep.CONTENT ? (
                                "Generate Topics"
                            ) : (
                                step === AddNoteStep.TOPICS ? (
                                    "Generate Notes"
                                ) : (
                                    "Add Notes"
                                )
                            )
                        }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddNoteModal;
