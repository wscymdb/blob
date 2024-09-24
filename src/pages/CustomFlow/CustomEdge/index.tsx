import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
  useReactFlow,
} from '@xyflow/react';
import { memo } from 'react';

export default memo((props: EdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY } = props;
  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
          onClick={() => setEdges((edges) => edges.filter((e) => e.id !== id))}
        >
          delete
        </button>
      </EdgeLabelRenderer>
    </>
  );
});
