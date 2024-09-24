import { Background, Panel, ReactFlow } from '@xyflow/react';
import { List } from 'antd';
import { memo } from 'react';
import { useShallow } from 'zustand/shallow';
import ColorChooserNode from './ColorChooserNode';
import useStore from './store';

const selector = (state: any) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const nodeTypes = { colorChooser: ColorChooserNode };

export default memo(() => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(selector),
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Background />
      <Panel position="top-right">
        <List
          header={<div>Colors</div>}
          dataSource={nodes}
          renderItem={(item: any) => <List.Item>{item?.data?.color}</List.Item>}
        ></List>
      </Panel>
    </ReactFlow>
  );
});
