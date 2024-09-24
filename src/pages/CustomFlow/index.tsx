import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { memo, useCallback, useMemo } from 'react';
import CustomEdge from './CustomEdge';
import './index.less';
import TextUpdaterNode from './TextUpdaterNode';

const initialNodes: Node[] = [
  {
    id: 'node-1',
    type: 'textUpdater',
    data: { label: 'node1' },
    position: { x: 300, y: 100 },
  },
  {
    id: 'node-2',
    type: 'output',
    data: { label: 'node2' },
    targetPosition: Position.Left,
    position: { x: 250, y: 200 },
  },
  {
    id: 'node-3',
    type: 'output',
    data: { label: 'node3' },
    position: { x: 450, y: 200 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: 'node-1',
    target: 'node-2',
    type: 'custom-edge',
    sourceHandle: 'a',
  },
  {
    id: 'e1-3',
    source: 'node-1',
    target: 'node-3',
    sourceHandle: 'b',
  },
];

export default memo(() => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => {
      console.log(params, 'onConnect');
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges],
  );

  const nodeTypes = useMemo(() => {
    return {
      textUpdater: TextUpdaterNode,
    };
  }, []);

  const edgeTypes = {
    'custom-edge': CustomEdge,
  };

  return (
    <div className="custom-flow">
      <ReactFlow
        // colorMode="dark"
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        panOnScroll={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <MiniMap nodeColor={'skyblue'} zoomable pannable />
        <Background gap={13} size={1} />
      </ReactFlow>
    </div>
  );
});
