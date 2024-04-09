import useContainerData from "@/hooks/queries/utilities/useContainerData";

import {transformTopicEdge} from "@/hooks/queries/knowledgeGraph/transformTopicEdge";

import {Notebook} from "@/types/Notebook";

const useTopicEdges = (notebookId: Notebook["id"]) => {
    const [topicEdges, isLoading, error, fetchData] = useContainerData(`/api/topicEdges/${notebookId}`, transformTopicEdge);

    return {
        topicEdges,
        isLoading,
        error,
        fetchData
    };
}

export default useTopicEdges;