import {useEffect} from "react";


import {Edge, MarkerType, Node, useEdgesState, useNodesState} from "reactflow";

import useTopicEdges from "@/hooks/queries/knowledgeGraph/useTopicEdges";

import useUserTopicNodes from "@/hooks/queries/knowledgeGraph/useUserTopicNodes";

import {Notebook} from "@/types/Notebook";
import {TopicNode} from "@/types/Topic";
import {User} from "@/types/User";

const useStudentKnowledgeGraph = (notebookId: Notebook['id'], userId: User["id"]) => {

    const { topicNodes, isLoading: nodesIsLoading } = useUserTopicNodes(notebookId, userId);
    const { topicEdges, isLoading: edgesIsLoading } = useTopicEdges(notebookId);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        setNodes(topicNodes.map((topic) => {
            return {
                id: topic.id.toString(),
                position: { x: topic.x, y: topic.y },
                data: { name: topic.name, completionPercentage: topic.completionPercentage },
                type: 'topic',
            } as Node<TopicNode>;
        }));
    }, [setNodes, topicNodes]);

    useEffect(() => {
        setEdges(topicEdges.map((edge) => {
            return {
                id: `${edge.sourceTopicId}-${edge.targetTopicId}`,
                source: edge.sourceTopicId.toString(),
                target: edge.targetTopicId.toString(),
                animated: true,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    height: 10,
                    width: 10,
                    color: '#4caf50',
                },
                style: {
                    stroke: '#4caf50',
                    strokeWidth: 4,
                },
            } as Edge;
        }));
    }, [setEdges, topicEdges]);

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        isLoading: nodesIsLoading || edgesIsLoading,
    }
}

export default useStudentKnowledgeGraph;