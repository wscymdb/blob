import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnEdgesDelete,
  OnNodesChange,
  OnNodesDelete,
} from '@xyflow/react';

export interface AppState {
  nodes: Node[];
  edges: Edge[];
  isRunning: boolean;
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange;
  addEdge: OnConnect;
  updateNode: (id: string, data: Record<string, any>) => void;
  toggleAudio: () => viod;
  removeNodes: OnNodesDelete;
  removeEdges: OnEdgesDelete;
  createNode: (type: 'osc' | 'amp') => void;
}
