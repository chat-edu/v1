import {useEffect, useState} from "react";

import {useDisclosure, useToast} from "@chakra-ui/react";

import {addNote} from "@/services/notes";
import {extractTextFromFile} from "@/documentIntelligence/extractText";

import {Notebook} from "@/types/Notebook";
import useSummary from "@/hooks/utilities/useSummary";
import {TabIndex} from "@/components/AddModals/UploadNotes/UploadNotesModal/ModalTabs";

const useUploadNote = (notebookId: Notebook["id"]) => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [file, setFile] = useState<File | null>(null);

    const [isFileExtracting, setIsFileExtracting] = useState(false);
    const [extractedText, setExtractedText] = useState('');

    const { isLoading: isSummaryGenerating, summary, summarize } = useSummary(extractedText);

    const [noteName, setNoteName] = useState('');

    const [tabIndex, setTabIndex] = useState<TabIndex>(TabIndex.ExtractedText);

    useEffect(() => {
        if (!file) {
            setExtractedText('');
            setNoteName('');
        } else {
            setNoteName(file.name);
        }
        setTabIndex(TabIndex.ExtractedText)
    }, [file])

    const updateFile = (file: File) => {
        setFile(file);
    }

    const processFile = async () => {
        if (!file) {
            return;
        }
        setIsFileExtracting(true);
        onOpen();
        setExtractedText(await extractTextFromFile(file));
        setIsFileExtracting(false);
    }

    const upload = async (text: string) => {
        if (!file || !text || !noteName) {
            return;
        }

        const success = await addNote({
            name: noteName,
            notebookId,
            content: text,
        })
        if(success) {
            toast({
                title: "Note Uploaded",
                description: `Note ${noteName} was uploaded.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setFile(null);
            onClose();
        } else {
            toast({
                title: "Note Upload Failed",
                description: `Note ${noteName} could not be uploaded.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const uploadRawText = async () => {
        await upload(extractedText);
    }

    const uploadSummary = async () => {
        await upload(summary);
    }

    const generateSummary = async () => {
        if (!extractedText) {
            return;
        }
        await summarize();
        setTabIndex(TabIndex.Summary);
    }

    return {
        file,
        isFileExtracting,
        isSummaryGenerating,
        isOpen,
        extractedText,
        summary,
        noteName,
        tabIndex,
        setTabIndex,
        setNoteName,
        generateSummary,
        onOpen,
        onClose,
        updateFile,
        processFile,
        uploadRawText,
        uploadSummary,
        isDisabled: !file || !extractedText || !noteName,
    }
}

export default useUploadNote;