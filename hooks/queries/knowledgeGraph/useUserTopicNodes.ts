import useContainerData from "@/hooks/queries/utilities/useContainerData";
import {transformUserTopicNode} from "@/hooks/queries/knowledgeGraph/transformTopicNode";

import {User} from "@/types/User";
import {Notebook} from "@/types/Notebook";

const useUserTopicNodes = (notebookId: Notebook['id'], userId: User["id"]) => {
    const [topicNodes, isLoading, error, fetchData] = useContainerData(`/api/topicNodes/${notebookId}/user/${userId}`, transformUserTopicNode);

    return {
        topicNodes,
        isLoading,
        error,
        fetchData
    };
}

export default useUserTopicNodes;