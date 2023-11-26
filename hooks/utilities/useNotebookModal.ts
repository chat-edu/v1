import {useState} from "react";

import {useDisclosure} from "@chakra-ui/react";

import {Notebook} from "@/types/Notebook";

const useNotebookModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [notebook, setNotebook] = useState<Notebook | null>(null);

    const selectNotebook = (notebook: Notebook) => {
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