import React from 'react';

import {Box, Button} from "@chakra-ui/react";

import ReactFlow, {Background, BackgroundVariant, Controls,} from 'reactflow';

import useNotebookKnowledgeGraph from "@/hooks/knowledgeGraph/useNotebookKnowledgeGraph";

import {Notebook} from "@/types/Notebook";

import 'reactflow/dist/style.css';
import {edgeTypes, nodeTypes} from "@/components/Notebook/KnowledgeGraph";


interface Props {
    notebookId: Notebook["id"];
}

const NotebookKnowledgeGraph: React.FC<Props> = ({ notebookId }) => {

    const {
        nodes,
        edges,
        onConnect,
        onNodesChange,
        onEdgesChange,
        onSave,
        isDisabled
    } = useNotebookKnowledgeGraph(notebookId);

    return (
        <Box
            w={'100%'}
            h={'300px'}
            position={'relative'}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
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
            {
                !isDisabled && (
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSave();
                        }}
                        position={'absolute'}
                        bottom={0}
                        right={0}
                        colorScheme={'brand'}
                        size={'sm'}
                    >
                        Save
                    </Button>
                )
            }
        </Box>
    );
}

export default NotebookKnowledgeGraph;