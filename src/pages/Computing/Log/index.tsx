import {
  Handle,
  Node,
  NodeProps,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';
import { memo } from 'react';
import './index.less';

type LabelNode = Node<{ label: string; fontColor: 'white' | 'black' }>;

type MixinNode = Node<{
  color: Record<string, any>;
  dark: Record<string, any>;
  light: Record<string, any>;
}>;

type Lightness = 'light' | 'dark';

export default memo((props: NodeProps<LabelNode>) => {
  const { data } = props;

  const connection = useHandleConnections({ type: 'target' });
  const nodeData = useNodesData<MixinNode>(connection?.[0]?.source);

  const sourceHandle = connection?.[0]?.sourceHandle as Lightness | null;
  const color = sourceHandle ? nodeData?.data?.[sourceHandle] : null;

  return (
    <div
      className="log"
      style={{
        background: color ? `rgb(${color.r}, ${color.g}, ${color.b})` : 'white',
        color: color ? data.fontColor : 'black',
      }}
    >
      {color ? data.label : 'Do nothing'}
      <Handle type="target" position={Position.Left} />
    </div>
  );
});
