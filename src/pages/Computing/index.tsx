import {
  addEdge,
  Background,
  Edge,
  Node,
  OnConnect,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { Alert } from 'antd';
import { memo, useCallback } from 'react';
import ColorPreview from './ColorPreview';
import './index.less';
import InputNumber from './InputNumber';
import Lightness from './Lightness';
import Log from './Log';

const initNodes: Node[] = [
  {
    id: 'r',
    type: 'InputNumber',
    position: { x: 150, y: 100 },
    data: { label: 'Red', value: 12 },
  },
  {
    id: 'g',
    type: 'InputNumber',
    position: { x: 150, y: 200 },
    data: { label: 'Green', value: 112 },
  },
  {
    id: 'b',
    type: 'InputNumber',
    position: { x: 150, y: 300 },
    data: { label: 'Blue', value: 122 },
  },
  {
    id: 'colorPreview',
    type: 'ColorPreview',
    position: { x: 350, y: 160 },
    data: {},
  },
  {
    id: 'lightness',
    type: 'Lightness',
    position: { x: 550, y: 175 },
    data: {},
  },
  {
    id: 'log-1',
    type: 'Log',
    position: { x: 700, y: 100 },
    data: { label: 'Use white font', fontColor: 'white' },
  },
  {
    id: 'log-2',
    type: 'Log',
    position: { x: 700, y: 245 },
    data: { label: 'Use black font', fontColor: 'black' },
  },
];

const initEdges: Edge[] = [
  { id: '1', source: 'r', target: 'colorPreview', targetHandle: 'red' },
  { id: '2', source: 'g', target: 'colorPreview', targetHandle: 'green' },
  { id: '3', source: 'b', target: 'colorPreview', targetHandle: 'blue' },
  { id: '4', source: 'colorPreview', target: 'lightness' },
  { id: '5', source: 'lightness', target: 'log-1', sourceHandle: 'light' },
  { id: '6', source: 'lightness', target: 'log-2', sourceHandle: 'dark' },
];

const nodeTypes = {
  InputNumber: InputNumber,
  ColorPreview: ColorPreview,
  Lightness: Lightness,
  Log: Log,
};

export default memo(() => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <div className="computing-again">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Panel>
          <Alert
            closable
            description={
              <>
                <div>使用相对亮度公式 根据背景颜色 决定要使用文字的颜色</div>
                <div>
                  相对亮度（Relative
                  Luminance）是一个用于衡量颜色亮度的标准化指标，通常用于计算机图形学、图像处理和网页设计中。它根据人眼对不同颜色的敏感度来计算颜色的亮度。
                </div>
              </>
            }
          />
        </Panel>
      </ReactFlow>
    </div>
  );
});
