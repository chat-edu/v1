import React from 'react';

import {Button, Flex, HStack, IconButton, Text, Tooltip, VStack} from "@chakra-ui/react";

import {CloseIcon} from "@chakra-ui/icons";

import {FaMagic} from "react-icons/fa";

import TypewriterAnimation from "@/components/Utilities/TypewriterAnimation";
import TextareaInput from "@/components/Utilities/FormUtilities/TextareaInput";
import FileInput from "@/components/Utilities/FormUtilities/FIleInput";
import MultipleTagInput from "@/components/Utilities/FormUtilities/MultipleTagInput";
import GeneratedNotes from "@/components/AddModals/AddNote/GeneratedNotes";

import useAddNote, {AddNoteStep} from "@/hooks/mutators/useAddNote";

interface Props {
    onDone: () => void;
    notebookId: number;
}

const AddNoteForm: React.FC<Props> = ({ onDone, notebookId }) => {

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

    const onComplete = () => {
        onDone();
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
        <VStack
            w={'100%'}
            spacing={4}
        >
            <Text
                fontSize={'xl'}
                fontWeight={'bold'}
            >
                {
                    step === AddNoteStep.CONTENT ? (
                        "1) Upload Course Material"
                    ) : (
                        step === AddNoteStep.TOPICS ? (
                            "2) Select Topics"
                        ) : (
                            "3) Confirm Topics"
                        )
                    )
                }
            </Text>
            {
                generatedTopicsLoading || generateNotesLoading ? (
                    <TypewriterAnimation />
                ) : (
                    <Flex
                        direction={'column'}
                        gap={4}
                        w={'100%'}
                    >
                        {
                            step === AddNoteStep.CONTENT ? (
                                <VStack
                                    w={'100%'}
                                >
                                    <TextareaInput
                                        label={"Content"}
                                        placeholder={"Copy and paste course material here…"}
                                        value={content}
                                        onChange={(val) => setContent(val)}
                                        onBlur={() => setContentTouched(true)}
                                        error={contentTouched && content.length === 0 ? "Content is required." : undefined}
                                        helperText={"Ex: Class notes, lecture slides, practice exams, etc."}
                                    />
                                    <Text>
                                        or
                                    </Text>
                                    <HStack
                                        w={'100%'}
                                    >
                                        <FileInput
                                            setFile={updateFile}
                                            text={file ? file.name : 'Upload or Drag & Drop PDF'}
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
                                                        isDisabled={isFileExtracting}
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
                                        onClose={onComplete}
                                    />
                                )
                            )
                        }
                        {
                            (step !== AddNoteStep.GENERATE_NOTES || generatedNotes.length > 0) && (
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
                                                "Add Topics"
                                            )
                                        )
                                    }
                                </Button>
                            )
                        }
                    </Flex>
                )
            }
        </VStack>
    );
};

export default AddNoteForm;
