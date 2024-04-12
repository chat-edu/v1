import React, {ComponentType} from 'react';

import {Box} from "@chakra-ui/react";
import {transparentize} from "@chakra-ui/theme-tools";

import {Handle, NodeProps, Position} from "reactflow";

import theme from "@/theme";
import {TopicNode} from "@/types/Topic";

const handleStyle = {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
};

const TopicNode: ComponentType<NodeProps<TopicNode>> = ({ data }) => {

    const backgroundColor = transparentize('brand.500', Math.max(data.completionPercentage, 0.1))(theme)

    return (
        <>
            <Box
                px={4}
                py={2}
                rounded={'full'}
                bg={backgroundColor}
                borderWidth={2}
                borderColor={'brand.500'}
                fontWeight={'bold'}
                color={data.completionPercentage > 0.5 ? 'white' : 'brand.500'}
            >
                {data.name} ({Math.round(data.completionPercentage * 10000) / 100}%)
            </Box>
            <Handle
                type="target"
                position={Position.Left}
                style={handleStyle}
            />
            <Handle
                type="source"
                position={Position.Right}
                style={handleStyle}
            />
        </>
    );
};

export default TopicNode;
