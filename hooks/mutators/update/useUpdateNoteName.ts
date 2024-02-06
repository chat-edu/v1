import {useState} from 'react';

import {updateNote} from "@/services/notes";

import {Notebook} from "@/types/Notebook";
import {Note} from "@/types/Note";
import {useToast} from "@chakra-ui/react";

const useUpdateNoteName = (noteId: Note["id"], notebookId: Notebook["id"], currentNoteName: Note["name"]) => {

    const toast = useToast();

    const [name, setName] = useState<string>(currentNoteName);
    const [nameTouched, setNameTouched] = useState<boolean>(false);

    const submit = async () => {
        const success = await updateNote(noteId, notebookId,{
            name
        })
        if(success) {
            toast({
                title: "Note name updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Note name update failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return {
        name,
        nameTouched,
        setName,
        setNameTouched,
        submit,
    }
}

export default useUpdateNoteName;