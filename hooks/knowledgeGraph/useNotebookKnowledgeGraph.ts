import {useCallback, useEffect, useMemo} from "react";

import {useToast} from "@chakra-ui/react";

import {addEdge, Connection, Edge, MarkerType, Node, useEdgesState, useNodesState} from "reactflow";

import useTopicNodes from "@/hooks/queries/knowledgeGraph/useTopicNodes";
import useTopicEdges from "@/hooks/queries/knowledgeGraph/useTopicEdges";

import {addTopicEdge, deleteTopicEdge, updateTopicNode} from "@/services/knowledgeGraph";

import {Notebook} from "@/types/Notebook";
import {TopicNode} from "@/types/Topic";

const useNotebookKnowledgeGraph = (notebookId: Notebook['id']) => {

    const toast = useToast();

    const { topicNodes, isLoading: nodesIsLoading, fetchData: fetchNodes } = useTopicNodes(notebookId);
    const { topicEdges, isLoading: edgesIsLoading, fetchData: fetchEdges } = useTopicEdges(notebookId);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const isEveryNodeSamePosition = useMemo(() => {
        return nodes.every((node) => {
            const topicNode = topicNodes.find((topic) => topic.id.toString() === node.id);
            return topicNode && topicNode.x === node.position.x && topicNode.y === node.position.y;
        });
    }, [nodes, topicNodes]);

    const isEveryEdgeSame = useMemo(() => {
        return (edges.every((edge) => {
            const sourceTopicId = parseInt(edge.source);
            const targetTopicId = parseInt(edge.target);
            return topicEdges.find((topicEdge) => topicEdge.sourceTopicId === sourceTopicId && topicEdge.targetTopicId === targetTopicId);
        })) && (topicEdges.every((topicEdge) => {
            return edges.find((edge) => edge.source === topicEdge.sourceTopicId.toString() && edge.target === topicEdge.targetTopicId.toString());
        }));
    }, [edges, topicEdges]);

    const isDisabled = useMemo(() => {
        return nodesIsLoading || edgesIsLoading || (isEveryNodeSamePosition && isEveryEdgeSame);
    }, [nodesIsLoading, edgesIsLoading, isEveryNodeSamePosition, isEveryEdgeSame])

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
                type: 'topic'
            } as Edge;
        }));
    }, [setEdges, topicEdges]);

    const onConnect = useCallback((params: Edge | Connection) => {
        setEdges((eds) => addEdge({
            ...params,
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
            type: 'topic'
        }, eds));
    }, [setEdges])


    const onSave = useCallback(async () => {
        await Promise.all([
            Promise.all(nodes.map(async (node) => {
                const topicNode = topicNodes.find((topic) => topic.id.toString() === node.id);
                if (!topicNode) { return Promise.resolve(); }
                if(topicNode.x !== node.position.x || topicNode.y !== node.position.y) {
                    return updateTopicNode(topicNode.id, node.position.x, node.position.y)
                }
                return Promise.resolve();
            })),
            Promise.all(edges.map(async (edge) => {
                const sourceTopicId = parseInt(edge.source);
                const targetTopicId = parseInt(edge.target);
                if (!topicEdges.find((topicEdge) => topicEdge.sourceTopicId === sourceTopicId && topicEdge.targetTopicId === targetTopicId)) {
                    return addTopicEdge(sourceTopicId, targetTopicId);
                }
                return Promise.resolve();
            })),
            Promise.all(topicEdges.map(async (topicEdge) => {
                if (!edges.find((edge) => edge.source === topicEdge.sourceTopicId.toString() && edge.target === topicEdge.targetTopicId.toString())) {
                    return deleteTopicEdge(topicEdge.sourceTopicId, topicEdge.targetTopicId);
                }
                return Promise.resolve();
            }),
            ),
        ])
        await fetchNodes();
        await fetchEdges();
        toast({
            title: "Knowledge Graph Updated!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    }, [nodes, edges, topicEdges, fetchNodes, fetchEdges, toast, topicNodes]);

    return {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onSave,
        isLoading: nodesIsLoading || edgesIsLoading,
        isDisabled,
    }
}

export default useNotebookKnowledgeGraph;