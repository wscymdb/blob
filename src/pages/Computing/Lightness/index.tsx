import {
  Handle,
  Node,
  NodeProps,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from '@xyflow/react';
import { memo, useEffect, useState } from 'react';
import './index.less';

export default memo((props: NodeProps) => {
  const { id } = props;
  const [lightness, setLightness] = useState('dark');
  const { updateNodeData } = useReactFlow();
  const connection = useHandleConnections({ type: 'target' });
  const nodeData = useNodesData<Node<{ value: Record<string, any> }>>(
    connection?.[0]?.source,
  );

  useEffect(() => {
    if (!nodeData) {
      updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
      setLightness('dark');
      return;
    }
    const color = nodeData.data.value ?? {};
    // 相对亮度公式
    const luminance = 0.2126 * color?.r + 0.7152 * color?.g + 0.0722 * color?.b;

    const isLight = luminance >= 128;
    setLightness(isLight ? 'light' : 'dark');

    const newNodeData = isLight
      ? { light: { r: color.r, g: color.g, b: color.b }, dark: null }
      : { light: null, dark: { r: color.r, g: color.g, b: color.b } };

    updateNodeData(id, newNodeData);
  }, [nodeData, updateNodeData]);

  return (
    <div
      className="lightness"
      style={{
        background: lightness === 'light' ? '#fff' : '#000',
        color: lightness === 'light' ? '#000' : '#fff',
      }}
    >
      <Handle type="target" position={Position.Left} />
      <div>
        this color is
        <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{lightness}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="light"
        style={{ top: 25 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="dark"
        style={{ top: 75 }}
      />
    </div>
  );
});
