import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeToolbar,
  Panel,
  Position,
  ReactFlow,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { Button } from 'antd';
import { memo, useCallback, useState } from 'react';
import './index.less';

const initialNodes = [
  {
    id: '1',
    // type: 'input',
    data: { label: 'Input Node1' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node2</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    // type: 'output',
    data: { label: 'Output Node3' },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: '你好', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];

export default memo(() => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [variant, setVariant] = useState<BackgroundVariant>(
    BackgroundVariant.Dots,
  );

  const onConnect = useCallback(
    (params: any) => {
      console.log(params, 'onConnect');
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [setEdges],
  );

  // const onNodesChange = useCallback(
  //   (changes) => {
  //     // console.log(changes, 'onNodesChange');
  //     setNodes((nds) => {
  //       console.log(nds, 'nds');
  //       const newnds = applyNodeChanges(changes, nds);
  //       console.log(newnds, 'newnds');
  //       return newnds;
  //     });
  //   },
  //   [setNodes],
  // );

  // const onEdgesChange = useCallback(
  //   (changes) => {
  //     console.log(changes, 'onEdgesChange');
  //     setEdges((eds) => {
  //       console.log(eds, 'eds');
  //       return applyEdgeChanges(changes, eds);
  //     });
  //   },
  //   [setEdges],
  // );

  return (
    <div className="flow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        panOnScroll={true}
        // selectionOnDrag={true}
        selectionMode={SelectionMode.Partial}
      >
        <Controls />
        <MiniMap nodeColor={'skyblue'} zoomable pannable />

        <Background gap={13} size={1} variant={variant} />
        <Panel position="top-right">
          <div>背景:</div>
          <Button.Group>
            <Button onClick={() => setVariant(BackgroundVariant.Dots)}>
              dots
            </Button>
            <Button onClick={() => setVariant(BackgroundVariant.Lines)}>
              lines
            </Button>
            <Button onClick={() => setVariant(BackgroundVariant.Cross)}>
              cross
            </Button>
          </Button.Group>
        </Panel>

        <NodeToolbar isVisible position={Position.Right}>
          <Button>123</Button>
        </NodeToolbar>
      </ReactFlow>
    </div>
  );
});
