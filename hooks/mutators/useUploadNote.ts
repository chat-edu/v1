import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {addNote} from "@/services/notes";

import documentAnalysisClient from "@/documentIntelligence/client";


const useUploadNote = (notebookId: string) => {

    const toast = useToast();

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const updateFile = (file: File) => {
        setFile(file);
    }

    const uploadNote = async () => {
        if (!file) {
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        const poller = await documentAnalysisClient.beginClassifyDocument('prebuilt-read', file)

        const { pages } = await poller.pollUntilDone();

        const allText = (pages || []).reduce((acc, page) => {
            const pageText = (page.words || []).reduce((pageAcc, word) => pageAcc + word.content + ' ', '');
            return acc + pageText;
        }, '');

        const success = await addNote({
            title: file.name,
            notebookId,
            content: allText,
        })
        if(success) {
            toast({
                title: "Note Uploaded",
                description: `Note ${file.name} was uploaded.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Note Upload Failed",
                description: `Note ${file.name} could not be uploaded.`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }

        setFile(null);

        setLoading(false);
    }

    return {
        file,
        loading,
        updateFile,
        uploadNote,
    }
}

export default useUploadNote;