import React, { useState } from 'react';
import ReactFlow, { Background } from 'react-flow-renderer';
 
import 'react-flow-renderer/dist/style.css';
 
const nodeStyle = { border: '1px solid #000000', color: '#FFFFFF' };

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Function' }, style: { backgroundColor: '#006400',  border: '1px solid #000000' }},
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'Range' } },
  { id: '3', position: { x: 200, y: 0 }, data: { label: 'Linear function' } },
  { id: '4', position: { x: 400, y: 0 }, data: { label: 'Quadratic function' } },
  { id: '5', position: { x: 400, y: 100 }, data: { label: 'Equation' } },
  { id: '6', position: { x: 600, y: 0 }, data: { label: 'Quadratic equation' } },
  { id: '7', position: { x: 400, y: 200 }, data: { label: 'Zero of a function' } },
  { id: '8', position: { x: 600, y: 200 }, data: { label: 'Solution set' } },
  { id: '9', position: { x: 800, y: 100 }, data: { label: 'Total mastery' } },
].map(node => ({ ...node, style: { ...node.style, backgroundColor: '#FFFFFF' }}));
const initialEdges = [
  { id: 'edge1', source: '1', target: '2', markerEnd: { type: 'arrow' } },
  { id: 'edge2', source: '1', target: '3', markerEnd: { type: 'arrow' } },
  { id: 'edge3', source: '3', target: '4', markerEnd: { type: 'arrow' } },
  { id: 'edge4', source: '1', target: '7', markerEnd: { type: 'arrow' } },
  { id: 'edge5', source: '4', target: '6', markerEnd: { type: 'arrow' } },
  { id: 'edge6', source: '5', target: '6', markerEnd: { type: 'arrow' } },
  { id: 'edge7', source: '5', target: '8', markerEnd: { type: 'arrow' } },
  { id: 'edge8', source: '7', target: '8', markerEnd: { type: 'arrow' } },
  { id: 'edge9', source: '6', target: '9', markerEnd: { type: 'arrow' } },
  { id: 'edge10', source: '8', target: '9', markerEnd: { type: 'arrow' } }
];
 
export default function Graph() {
// State to track all nodes
const [nodes, setNodes] = useState(initialNodes);

// Handler for node click events
const handleNodeClick = (nodeId) => {
  setNodes(nodes.map(node => {
    if (node.id === nodeId) {
      const nextColor = node.style.backgroundColor === '#FFFFFF' ? '#006400' : '#FFFFFF';
      return { ...node, style: { ...node.style, backgroundColor: nextColor } };
    }
    return node;
  }));
};

return (
  <div style={{ width: '100vw', height: '100vh' }}>
    <ReactFlow
      nodes={nodes}
      edges={initialEdges}
      onNodeClick={(_, node) => handleNodeClick(node.id)}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      paneMoveable={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
    >
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  </div>
);
}