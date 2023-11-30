import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

import {NotebookScore} from "@/types/score";

const useNotebookModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [notebook, setNotebook] = useState<NotebookScore | null>(null);

    const selectNotebook = (notebook: NotebookScore) => {
        setNotebook(notebook);
        onOpen();
    }

    const closeNotebookModal = () => {
        setNotebook(null);
        onClose();
    }

    return {
        isOpen,
        notebook,
        closeNotebookModal,
        selectNotebook
    }
}

export default useNotebookModal;