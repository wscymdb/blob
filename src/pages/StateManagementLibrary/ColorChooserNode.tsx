import { Handle, NodeProps, Position } from '@xyflow/react';
import { ColorPicker } from 'antd';
import { memo } from 'react';
import useStore from './store';
import { ColorNode } from './types';

export default memo((props: NodeProps<ColorNode>) => {
  console.log(props);
  const updateNodeColor = useStore((state) => state.updateNodeColor);

  return (
    <div className="color-chooser-node">
      <Handle type="target" position={Position.Top} />
      <div style={{ padding: 20, background: '#fff', borderRadius: 8 }}>
        <ColorPicker
          value={props.data.color}
          className="nodrag"
          onChange={(_, color) => {
            updateNodeColor(props.id, color);
          }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});
