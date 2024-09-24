import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from '@xyflow/react';

export type AppNode = Node;

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
};

export type ColorNode = Node<
  {
    color: string;
  },
  'colorChooser'
>;
