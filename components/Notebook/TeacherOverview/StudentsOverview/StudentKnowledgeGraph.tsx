import React from 'react';
import ReactFlow, {Background, BackgroundVariant, Controls} from "reactflow";
import useStudentKnowledgeGraph from "@/hooks/knowledgeGraph/useStudentKnowledgeGraph";
import {Notebook} from "@/types/Notebook";
import {User} from "@/types/User";
import {edgeTypes, nodeTypes} from "@/components/Notebook/KnowledgeGraph";
import {Box} from "@chakra-ui/react";

interface Props {
    notebookId: Notebook['id'];
    userId: User['id'];
}

const StudentKnowledgeGraph: React.FC<Props> = ({ notebookId, userId }) => {

    const {
        nodes,
        edges,
    } = useStudentKnowledgeGraph(notebookId, userId);

    return (
        <Box
            w={'100%'}
            h={'200px'}
            position={'relative'}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                edgesUpdatable={false}
                nodesConnectable={false}
                nodesDraggable={false}
            >
                <Controls
                    showInteractive={false}
                    showZoom={false}
                />
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={12}
                    size={1}
                />
            </ReactFlow>
        </Box>
    );
};

export default StudentKnowledgeGraph;
