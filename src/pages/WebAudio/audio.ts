const context = new AudioContext();
const nodes = new Map();

context.suspend();
nodes.set('c', context.destination);

export const updateAudioNode = (id: string, data: Record<string, any>) => {
  const node = nodes.get(id);

  for (const [key, value] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = value;
    } else {
      node[key] = value;
    }
  }
};

export const removeAudioNode = (id: string) => {
  const node = nodes.get(id);
  node.disconnect();
  node.stop?.();

  nodes.delete(id);
};

export const connectAudioNodes = (sourceId: string, targetId: string) => {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  source.connect(target);
};

export const disconnectAudioNodes = (sourceId: string, targetId: string) => {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  source.disconnect(target);
};

export const isRunning = () => {
  return context.state === 'running';
};

export const toggleAudio = () => {
  return isRunning() ? context.suspend() : context.resume();
};

export const createAudioNode = (
  id: string,
  type: string,
  data: Record<string, any>,
) => {
  switch (type) {
    case 'osc': {
      const node = context.createOscillator();
      node.frequency.value = data.frequency;
      node.type = data.type;
      node.start();

      nodes.set(id, node);
      break;
    }

    case 'amp': {
      const node = context.createGain();
      node.gain.value = data.gain;

      nodes.set(id, node);
      break;
    }
  }
};
