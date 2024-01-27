import {useState} from "react";

import {useToast} from "@chakra-ui/react";

import {addTopic} from "@/services/topics";

import {Notebook} from "@/types/Notebook";
import {Topic} from "@/types/Topic";

const useAddTopic = (
    notebookId: Notebook["id"],
    parentTopicId: Topic["parentTopicId"],
    orderPosition: Topic["orderPosition"]
) => {

    const toast = useToast();

    const [name, setName] = useState<string>('')
    const [nameTouched, setNameTouched] = useState<boolean>(false)

    const reset = () => {
        setName('')
        setNameTouched(false)
    }

    const submit = async () => {
        const topic = await addTopic({
            name,
            notebookId,
            parentTopicId,
            orderPosition
        })
        if(topic) {
            toast({
                title: `Topic Added`,
                description: `Successfully added topic ${topic.name}`,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            reset();
            return true;
        } else {
            toast({
                title: `Topic Not Added`,
                description: `Failed to add topic ${name}`,
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

export default useAddTopic;