import React from 'react';

import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, VStack,
} from "@chakra-ui/react";

import {FaCloudUploadAlt, FaFileUpload, FaMagic} from "react-icons/fa";

import TypewriterAnimation from "@/components/AddModals/UploadNotes/UploadNotesModal/TypewriterAnimation";
import TextInput from "@/components/Utilities/FormUtilities/TextInput";
import ModalTabs, {TabIndex} from "@/components/AddModals/UploadNotes/UploadNotesModal/ModalTabs";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    noteName: string;
    setNoteName: (name: string) => void;
    isDisabled: boolean;
    uploadExtractedText: () => Promise<void>;
    summarizeText: () => Promise<void>;
    uploadSummary: () => Promise<void>;
    isFileExtracting: boolean;
    isSummaryGenerating: boolean;
    extractedText: string;
    summary: string;
    tabIndex: TabIndex;
    setTabIndex: (index: TabIndex) => void;
}


const UploadNotesModal: React.FC<Props> = ({ isOpen, onClose, isDisabled, noteName, setNoteName, isFileExtracting, isSummaryGenerating, extractedText, summary, uploadExtractedText, uploadSummary, summarizeText, tabIndex, setTabIndex }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'3xl'}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    textAlign={'center'}
                >
                    {
                        isFileExtracting ? (
                            'Extracting Text'
                        ) : (
                            isSummaryGenerating ? (
                                'Generating Summary'
                            ) : (
                                "Note Upload"
                            )
                        )
                    }
                </ModalHeader>
                <ModalBody>
                    {
                        isFileExtracting || isSummaryGenerating ? (
                            <TypewriterAnimation />
                        ) : (
                            <VStack
                                spacing={4}
                                w={'100%'}
                            >
                                <TextInput
                                    value={noteName}
                                    onChange={setNoteName}
                                    placeholder={'Note Name'}
                                    label={'Note Name'}
                                />
                                <ModalTabs
                                    extractedText={extractedText}
                                    summary={summary}
                                    tabIndex={tabIndex}
                                    setTabIndex={setTabIndex}
                                />
                            </VStack>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    {
                        !(isFileExtracting || isSummaryGenerating) && (
                            <HStack
                                justifyContent={'space-between'}
                                w={'100%'}
                            >
                                <Button
                                    onClick={uploadExtractedText}
                                    isDisabled={isDisabled}
                                    leftIcon={<FaFileUpload />}
                                    variant={'ghost'}
                                >
                                    Upload Raw Text
                                </Button>
                                <Button
                                    onClick={summarizeText}
                                    leftIcon={<FaMagic />}
                                    variant={summary ? 'outline' : 'solid'}
                                    colorScheme={'brand'}
                                >
                                    Generate Summary
                                </Button>
                                {
                                    summary && (
                                        <Button
                                            onClick={uploadSummary}
                                            isDisabled={isDisabled}
                                            leftIcon={<FaCloudUploadAlt />}
                                            colorScheme={'brand'}
                                        >
                                            Upload Summary
                                        </Button>
                                    )
                                }
                            </HStack>
                        )
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UploadNotesModal;
