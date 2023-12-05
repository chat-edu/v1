import React from 'react';

import {
    Box,
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useClipboard,
    useToast,
} from "@chakra-ui/react";

import {CopyIcon} from "@chakra-ui/icons";
import Markdown from "@/components/Utilities/Markdown";

import {Message} from "ai";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    messages: Message[];
    regenerate: () => Promise<void>;
    isLoading: boolean;
}

const StudyGuideModal: React.FC<Props> = ({ isOpen, onClose, messages, regenerate, isLoading }) => {

    const studyGuide = messages.filter(message => message.role === 'assistant')[0]?.content || '';

    const { onCopy } = useClipboard(studyGuide);
    const toast = useToast();

    const copy = () => {
        onCopy();
        toast({
            title: "Copied",
            description: "The study guide has been copied to your clipboard.",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            scrollBehavior={'inside'}
            isCentered={true}
            autoFocus={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    position={'relative'}
                >
                    {
                        studyGuide.length > 0 && (
                            <IconButton
                                aria-label={"Copy"}
                                onClick={copy}
                                icon={<CopyIcon />}
                                position={'absolute'}
                                top={2}
                                right={12}
                                size={'sm'}
                                variant={'ghost'}
                            />
                        )
                    }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box
                        position={'relative'}
                    >
                        <Markdown>
                            {studyGuide}
                        </Markdown>
                    </Box>
                </ModalBody>
                <ModalFooter
                    gap={2}
                >
                    <Button
                        onClick={regenerate}
                        variant={'outline'}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Regenerate
                    </Button>
                    <Button
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default StudyGuideModal;
