import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {updateTopic} from "@/services/topics";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

const useUpdateTopicName = (
    notebookId: Notebook["id"],
    topicId: Topic["id"],
    currentTopicName: Topic["name"]
) => {

    const toast = useToast();

    const [name, setName] = useState<string>(currentTopicName)
    const [nameTouched, setNameTouched] = useState<boolean>(false)

    const reset = () => {
        setName('')
        setNameTouched(false)
    }

    const submit = async () => {
        const topic = await updateTopic(topicId, notebookId, {
            name,
        })
        if(topic) {
            toast({
                title: `Topic Added`,
                description: `Successfully update topic name`,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            reset();
            return true;
        } else {
            toast({
                title: `Topic Not Added`,
                description: `Failed to update topic name`,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return false;
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

export default useUpdateTopicName;