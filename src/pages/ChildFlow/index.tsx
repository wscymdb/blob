import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { memo, useCallback } from 'react';
import { initialEdges, initialNodes } from './constant';
import './index.less';

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

  return (
    <div className="flow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{
          backgroundColor: 'skyblue',
        }}
        panOnScroll={true}
        selectionMode={SelectionMode.Partial}
      >
        <Controls />
        <MiniMap nodeColor={'skyblue'} zoomable pannable />

        <Background gap={13} size={1} />
      </ReactFlow>
    </div>
  );
});
