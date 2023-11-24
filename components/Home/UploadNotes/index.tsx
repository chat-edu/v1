import React from 'react';

import {HStack, IconButton} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";

import FileInput from "@/components/Utilities/FIleInput";

import useUploadNote from "@/hooks/mutators/useUploadNote";

import {Notebook} from "@/types/Notebook";

interface Props {
    notebookId: Notebook["id"]
}

const UploadNotes: React.FC<Props> = ({ notebookId }) => {

    const { file, loading, updateFile, uploadNote } = useUploadNote(notebookId);

    return (
        <HStack
            w={'100%'}
        >
            <FileInput
                setFile={updateFile}
                text={file ? file.name : 'Upload Notes'}
                accept={'application/pdf'}
            />
            {
                file && (
                    <IconButton
                        aria-label={'Upload Notes'}
                        icon={<CheckIcon />}
                        onClick={uploadNote}
                        flexShrink={0}
                        isLoading={loading}
                    />
                )
            }
        </HStack>
    );
};

export default UploadNotes;
