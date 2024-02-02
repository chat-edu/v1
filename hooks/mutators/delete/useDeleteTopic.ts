import {useToast} from "@chakra-ui/react";

import {deleteTopic as deleteTopicService} from "@/services/topics";

import {Topic} from "@/types/Topic";

const useDeleteTopic = (topic: Topic) => {
    const toast = useToast();

    const deleteTopic = async () => {
        const success = await deleteTopicService(topic.id, topic.notebookId);
        if(success) {
            toast({
                title: "Topic Deleted",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Topic Deletion Failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
        return success;
    }

    return {
        deleteTopic
    }
}

export default useDeleteTopic;