import { applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import {
  connectAudioNodes,
  createAudioNode,
  disconnectAudioNodes,
  isRunning,
  removeAudioNode,
  toggleAudio,
  updateAudioNode,
} from './audio';
import { AppState } from './types';

export const useStore = create<AppState>((set, get) => ({
  nodes: [
    // {
    //   id: 'a',
    //   type: 'osc',
    //   data: { frequency: 220, type: 'sine' },
    //   position: { x: 0, y: 0 },
    // },
    // {
    //   id: 'b',
    //   type: 'amp',
    //   data: { gain: 0.5 },
    //   position: { x: 150, y: 250 },
    // },
    {
      id: 'c',
      type: 'out',
      data: { label: 'output' },
      position: { x: 100, y: 100 },
    },
  ],
  edges: [],
  isRunning: isRunning(),

  onNodesChange(changes) {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange(changes) {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  addEdge(data) {
    const id = nanoid(6);
    const edge = { id, ...data };

    connectAudioNodes(data.source, data.target);

    set({
      edges: [edge, ...get().edges],
    });
  },

  updateNode(id, data) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: { ...node.data, ...data },
            }
          : node,
      ),
    });
  },

  toggleAudio() {
    toggleAudio().then(() => {
      set({
        isRunning: isRunning(),
      });
    });
  },

  removeNodes(nodes) {
    for (const { id } of nodes) {
      removeAudioNode(id);
    }
  },

  removeEdges(edges) {
    for (const { source, target } of edges) {
      disconnectAudioNodes(source, target);
    }
  },

  createNode(type) {
    const id = nanoid(8);

    switch (type) {
      case 'osc': {
        const data = { frequency: 220, type: 'sine' };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);

        set({
          nodes: [...get().nodes, { id, type, data, position }],
        });

        break;
      }

      case 'amp': {
        const data = { gain: 0.5 };
        const position = { x: 0, y: 0 };

        createAudioNode(id, type, data);

        set({
          nodes: [...get().nodes, { id, type, data, position }],
        });

        break;
      }
    }
  },
}));
