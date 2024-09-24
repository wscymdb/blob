import { Handle, NodeProps, Position } from '@xyflow/react';
import { memo } from 'react';
import './index.less';

const handleStyle = { left: 10 };

export default memo((props: NodeProps) => {
  console.log(props);
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input type="text" id="text" className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: 0 }}
      />
    </div>
  );
});
