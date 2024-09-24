import {
  Background,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';
import { stratify, tree } from 'd3-hierarchy';
import { memo, useCallback } from 'react';
import { initialEdges, initialNodes } from './NodeEdges';

const g = tree();
const getLayoutedElements = (nodes: any[], edges: any[], options: any = {}) => {
  if (nodes.length === 0) return { nodes, edges };

  const { width, height }: any = document
    .querySelector(`[data-id="${nodes[0].id}"]`)
    ?.getBoundingClientRect();

  const hierarchy = stratify()
    .id((node: any) => node.id)
    .parentId(
      (node: any) => edges.find((edge) => edge.target === node.id)?.source,
    );
  const root = hierarchy(nodes);
  const layout = g.nodeSize([width * 2, height * 2])(root);

  return {
    nodes: layout.descendants().map((node: any) => ({
      ...node.data,
      position: { x: node.x, y: node.y },
    })),
    edges,
  };
};

const LayoutFlow = memo(() => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, {
          direction,
        });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
  );

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
    >
      <Background />
      <Panel position="top-right">
        <button onClick={onLayout}>layout</button>
      </Panel>
    </ReactFlow>
  );
});

export default function () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
