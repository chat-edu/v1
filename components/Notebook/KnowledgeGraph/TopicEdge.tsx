import {BaseEdge, EdgeLabelRenderer, EdgeProps, getSimpleBezierPath, Position, useReactFlow,} from 'reactflow';
import {ComponentType} from "react";
import {IconButton, Tooltip} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

const TopicEdge: ComponentType<EdgeProps> = ({ id, sourceX, sourceY, targetX, targetY, ...props }) => {

    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getSimpleBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        targetPosition: Position.Right,
        sourcePosition: Position.Right,
    });

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                {...props}
            />
            <EdgeLabelRenderer>
                <Tooltip
                    label={'Delete Edge'}
                    aria-label={'Delete Edge'}
                    placement={'bottom'}
                >
                    <IconButton
                        pos={'absolute'}
                        transform={`translate(-50%, -50%) translate(${labelX}px,${labelY}px)`}
                        pointerEvents={'all'}
                        className="nodrag nopan"
                        onClick={() => {
                            setEdges((es) => es.filter((e) => e.id !== id));
                        }}
                        colorScheme={'brand'}
                        icon={<DeleteIcon />}
                        aria-label={'Delete Edge'}
                        opacity={0}
                        transition={'opacity 0.2s'}
                        _hover={{
                            opacity: 1
                        }}
                    />
                </Tooltip>
            </EdgeLabelRenderer>
        </>
    );
}

export default TopicEdge;