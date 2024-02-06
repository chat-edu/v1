import {useState} from 'react';

import {addNote} from "@/services/notes";

import {Topic} from "@/types/Topic";
import {Notebook} from "@/types/Notebook";

const useAddNote = (notebookId: Notebook["id"], orderPosition: Topic["orderPosition"], topicId?: Topic["id"]) => {

    const [name, setName] = useState<string>('');
    const [nameTouched, setNameTouched] = useState<boolean>(false);

    const submit = async () => {
        await addNote({
            notebookId,
            content: "",
            topicId: topicId || null,
            name,
            orderPosition
        })
    }

    return {
        notebookId,
        name,
        nameTouched,
        setName,
        setNameTouched,
        submit,
    }
}

export default useAddNote;