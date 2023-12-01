import React from 'react';

import {
    Button,
    Flex, HStack, IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, Tooltip,
    VStack
} from '@chakra-ui/react'
import {CloseIcon} from "@chakra-ui/icons";

import {FaMagic} from "react-icons/fa";

import TextareaInput from "@/components/Utilities/FormUtilities/TextareaInput";
import MultipleTagInput from "@/components/Utilities/FormUtilities/MultipleTagInput";
import TypewriterAnimation from "@/components/Utilities/TypewriterAnimation";
import GeneratedNotes from "@/components/AddModals/AddNote/GeneratedNotes";
import FileInput from "@/components/Utilities/FormUtilities/FIleInput";

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
        contentTouched,
        generatedTopics,
        generatedTopicsLoading,
        generateNotesLoading,
        generatedNotes,
        selectedTopics,
        confirmNotesLoading,
        file,
        isFileExtracting,
        setContent,
        setContentTouched,
        onGenerateTopics,
        onGenerateNotes,
        selectTopic,
        unselectTopic,
        confirmNotes,
        removeNote,
        regenerateNote,
        confirmNote,
        reset,
        updateFile,
        processFile,
        resetFile
    } = useAddNote(notebookId);

    const onDone = () => {
        onClose();
        reset();
    }

    const onSubmit = async () => {
        if (step === AddNoteStep.CONTENT) {
            await onGenerateTopics();
        } else if (step === AddNoteStep.TOPICS) {
            await onGenerateNotes();
        } else {
            const success = await confirmNotes();
            if (success) {
                onDone();
            }
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onDone}
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
                                "Confirm Notes"
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
                                        <VStack
                                            w={'100%'}
                                        >
                                            <TextareaInput
                                                label={"Content"}
                                                placeholder={"Enter the contents of the note here..."}
                                                value={content}
                                                onChange={(val) => setContent(val)}
                                                onBlur={() => setContentTouched(true)}
                                                error={contentTouched && content.length === 0 ? "Content is required." : undefined}
                                                helperText={"Ex: A loop is a sequence of instructions that is continually repeated until a certain condition is reached."}
                                            />
                                            <Text>
                                                or
                                            </Text>
                                            <HStack>
                                                <FileInput
                                                    setFile={updateFile}
                                                    text={file ? file.name : 'Upload Notes'}
                                                    accept={'application/pdf'}
                                                />
                                                {file && (
                                                    <HStack>
                                                        <Tooltip
                                                            label={'Process File'}
                                                        >
                                                            <IconButton
                                                                aria-label={'Upload Notes'}
                                                                icon={<FaMagic />}
                                                                onClick={processFile}
                                                                flexShrink={0}
                                                                isLoading={isFileExtracting}
                                                            />
                                                        </Tooltip>
                                                        <Tooltip
                                                            label={'Reset File'}
                                                        >
                                                            <IconButton
                                                                aria-label={'Remove PDF'}
                                                                icon={<CloseIcon />}
                                                                onClick={resetFile}
                                                                flexShrink={0}
                                                            />
                                                        </Tooltip>
                                                    </HStack>
                                                )}
                                            </HStack>
                                        </VStack>
                                    ) : (
                                        step === AddNoteStep.TOPICS ? (
                                            <MultipleTagInput
                                                label={"Topics"}
                                                tagOptions={generatedTopics}
                                                selectedTags={selectedTopics}
                                                selectTag={selectTopic}
                                                unselectTag={unselectTopic}
                                            />
                                        ) : (
                                            <GeneratedNotes
                                                generatedNotes={generatedNotes}
                                                onDelete={removeNote}
                                                onRegenerate={regenerateNote}
                                                onConfirm={confirmNote}
                                                onClose={onDone}
                                            />
                                        )
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
                            generatedTopicsLoading || generateNotesLoading || confirmNotesLoading
                                || (step === AddNoteStep.CONTENT && content.length === 0)
                                || (step === AddNoteStep.TOPICS && selectedTopics.length === 0)
                        }
                        isLoading={generatedTopicsLoading || generateNotesLoading || confirmNotesLoading}
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
