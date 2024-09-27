import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import { KeyboardEventHandler, memo, useCallback, useState } from 'react';
import './index.less';
import Slide, { SlideData } from './Slide';
import { getNodesEdges } from './slides';

const nodeTypes = {
  slide: Slide,
};

const slides: Record<string, SlideData> = {
  '0': { source: '# Hello, React Flow!', right: '1' },
  '1': { source: '# 你好 老表', left: '0', right: '3', up: '2' },
  '2': { source: '# 桂林山水甲天下', down: '1' },
  '3': { source: '# 上有天堂，下有苏杭', left: '1' },
};

const initialSlide = '0';
const { nodes } = getNodesEdges(initialSlide, slides);

console.log(nodes, 'nodes');
const PPT = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const { fitView } = useReactFlow();

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      console.log(_, node);
      fitView({ nodes: [node], duration: 150 });
      setCurrentSlide(node.id);
    },
    [fitView],
  );

  const onKeyDown = useCallback<KeyboardEventHandler>(
    (event) => {
      const slide = slides[currentSlide];
      event.preventDefault();
      const direction = event.key.slice(5).toLowerCase() as keyof SlideData;
      const target = slide[direction];

      if (!target) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          setCurrentSlide(target);
          fitView({ nodes: [{ id: target }], duration: 1500 });
          break;
        case 'ArrowUp':
          setCurrentSlide(target);
          fitView({ nodes: [{ id: target }], duration: 150 });
          break;
        case 'ArrowDown':
          setCurrentSlide(target);
          fitView({ nodes: [{ id: target }], duration: 150 });
          break;
        case 'ArrowRight':
          setCurrentSlide(target);
          fitView({ nodes: [{ id: target }], duration: 150 });
      }
    },
    [currentSlide, fitView],
  );

  return (
    <div className="ppt">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        // edges={edges}
        fitView
        minZoom={0.1}
        fitViewOptions={{ nodes: [{ id: initialSlide }] }}
        onNodeClick={onNodeClick}
        onKeyDown={onKeyDown}
      >
        <Background />
      </ReactFlow>
    </div>
  );
});

export default () => {
  return (
    <ReactFlowProvider>
      <PPT />
    </ReactFlowProvider>
  );
};
