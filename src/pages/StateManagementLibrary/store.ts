import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { create } from 'zustand';
import initialEdges from './edges';
import initialNodes from './nodes';
import { AppState } from './types';

const useStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setNodes: (nodes) => {
    set({ nodes });
  },

  setEdges: (edges) => {
    set({ edges });
  },

  updateNodeColor(nodeId: string, color: string) {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, color } };
        }

        return node;
      }),
    });
  },
}));

export default useStore;
