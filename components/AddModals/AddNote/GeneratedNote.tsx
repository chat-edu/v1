import React from 'react';

import {HStack, IconButton, Text, Tooltip, useDisclosure} from "@chakra-ui/react";

import {VscDebugRestart} from "react-icons/vsc";
import {AiFillEye} from "react-icons/ai";
import {CheckIcon, DeleteIcon} from "@chakra-ui/icons";

import NoteInputModal from "@/components/NotebookUtilities/NoteInputModal";

import {NoteInput} from "@/types/Note";

interface Props {
    generatedNote: NoteInput,
    onConfirm: () => Promise<void>,
    onRegenerate: () => Promise<void>,
    onDelete: () => void
}

const GeneratedNote: React.FC<Props> = ({ generatedNote, onConfirm, onRegenerate, onDelete }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [regenerateLoading, setRegenerateLoading] = React.useState(false);

    const handleConfirm = async () => {
        setConfirmLoading(true);
        await onConfirm();
        setConfirmLoading(false);
    }

    const handleRegenerate = async () => {
        setRegenerateLoading(true);
        await onRegenerate();
        setRegenerateLoading(false);
    }

    return (
        <>
            <NoteInputModal
                note={generatedNote}
                isOpen={isOpen}
                onClose={onClose}
            />
            <HStack
                p={2}
                borderWidth={1}
                rounded={'md'}
                justifyContent={'space-between'}
            >
                <Text>
                    {generatedNote.name}
                </Text>
                <HStack>
                    <Tooltip
                        label={'Confirm'}
                    >
                        <IconButton
                            icon={<CheckIcon />}
                            aria-label={'Confirm'}
                            onClick={handleConfirm}
                            size={'sm'}
                            isLoading={confirmLoading}
                            isDisabled={regenerateLoading || confirmLoading}
                        />
                    </Tooltip>
                    <Tooltip
                        label={'View'}
                    >
                        <IconButton
                            aria-label={'View'}
                            icon={<AiFillEye />}
                            onClick={onOpen}
                            size={'sm'}
                            isDisabled={regenerateLoading || confirmLoading}
                        />
                    </Tooltip>
                    <Tooltip
                        label={'Regenerate'}
                    >
                        <IconButton
                            icon={<VscDebugRestart />}
                            aria-label={'Regenerate'}
                            onClick={handleRegenerate}
                            size={'sm'}
                            isLoading={regenerateLoading}
                            isDisabled={regenerateLoading || confirmLoading}
                        />
                    </Tooltip>
                    <Tooltip
                        label={'Delete'}
                    >
                        <IconButton
                            icon={<DeleteIcon />}
                            aria-label={'Delete'}
                            onClick={onDelete}
                            size={'sm'}
                            isDisabled={regenerateLoading || confirmLoading}
                        />
                    </Tooltip>
                </HStack>
            </HStack>
        </>
    );
};

export default GeneratedNote;
