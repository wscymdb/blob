import JsonView, { IData } from '@/components/JsonView';
import { Background, Panel, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import { Button } from 'antd';
import { memo, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import './index.less';
import Amp from './nodes/Amp';
import Osc from './nodes/Osc';
import Out from './nodes/Out';
import { useStore } from './store';
import { AppState } from './types';

const selector = (store: AppState) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  onNodesDelete: store.removeNodes,
  onEdgesDelete: store.removeEdges,
  createNode: store.createNode,
});

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

const WebAudio = memo(() => {
  const [showData, setShowData] = useState(false);
  const store = useStore(useShallow(selector));
  const {
    nodes,
    edges,
    onEdgesChange,
    onNodesChange,
    addEdge,
    onNodesDelete,
    onEdgesDelete,
    createNode,
  } = store;

  const jsonData: IData[] = [
    {
      label: 'nodes',
      value: nodes,
    },
    {
      label: 'edges',
      value: edges,
    },
  ];

  return (
    <div className="web-audio">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={addEdge}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
      >
        <Background />

        <Panel position="top-left">
          <Button onClick={() => setShowData(!showData)}>
            {showData ? '隐藏' : '显示'}数据面板
          </Button>
        </Panel>

        {showData && (
          <Panel position="top-left" style={{ top: 40 }}>
            <JsonView data={jsonData} />
          </Panel>
        )}

        <Panel position="top-right">
          <Button type="primary" onClick={() => createNode('osc')}>
            osc
          </Button>
          <Button onClick={() => createNode('amp')}>amp</Button>
        </Panel>
      </ReactFlow>
    </div>
  );
});

export default () => {
  return (
    <ReactFlowProvider>
      <WebAudio />
    </ReactFlowProvider>
  );
};
