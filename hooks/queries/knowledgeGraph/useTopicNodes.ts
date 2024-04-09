import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformTopicNode} from "@/hooks/queries/knowledgeGraph/transformTopicNode";

import {Notebook} from "@/types/Notebook";

const useTopicNodes = (notebookId: Notebook["id"]) => {
    const [topicNodes, isLoading, error, fetchData] = useContainerData(`/api/topicNodes/${notebookId}`, transformTopicNode);

    return {
        topicNodes,
        isLoading,
        error,
        fetchData
    };
}

export default useTopicNodes;