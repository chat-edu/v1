import React from 'react';

import { HStack, IconButton } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

import FileInput from "@/components/Utilities/FIleInput";
import UploadNotesModal from "@/components/Home/UploadNotes/UploadNotesModal";

import useUploadNote from "@/hooks/mutators/useUploadNote";

import {Notebook} from "@/types/Notebook";


interface Props {
    notebookId: Notebook["id"]
}

const UploadNotes: React.FC<Props> = ({ notebookId }) => {
    const {
        file,
        isFileExtracting,
        isSummaryGenerating,
        noteName,
        setNoteName,
        isDisabled,
        updateFile,
        onClose,
        isOpen,
        extractedText,
        summary,
        generateSummary,
        uploadSummary,
        uploadRawText,
        processFile,
        tabIndex,
        setTabIndex
    } = useUploadNote(notebookId);

    return (
        <HStack w={'100%'}>
            <FileInput
                setFile={updateFile}
                text={file ? file.name : 'Upload Notes'}
                accept={'application/pdf'}
            />
            {file && (
                <IconButton
                    aria-label={'Upload Notes'}
                    icon={<CheckIcon />}
                    onClick={processFile}
                    flexShrink={0}
                    isLoading={isFileExtracting || isSummaryGenerating}
                />
            )}
            <UploadNotesModal
                isOpen={isOpen}
                onClose={onClose}
                isFileExtracting={isFileExtracting}
                isSummaryGenerating={isSummaryGenerating}
                extractedText={extractedText}
                summary={summary}
                summarizeText={generateSummary}
                tabIndex={tabIndex}
                setTabIndex={setTabIndex}
                uploadExtractedText={uploadRawText}
                uploadSummary={uploadSummary}
                noteName={noteName}
                setNoteName={setNoteName}
                isDisabled={isDisabled}
            />
        </HStack>
    );
};

export default UploadNotes;