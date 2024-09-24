import { Handle, Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { memo } from 'react';
import CoustomHandle from '../CoustomHandle';
import './index.less';

type ValueNodes = Node<{ value: Record<string, any> }, 'value'>;

export default memo((props: NodeProps<ValueNodes>) => {
  const { id, data } = props;
  const { updateNodeData } = useReactFlow();

  const bgColor = data?.value
    ? `rgb(${data?.value?.r}, ${data?.value?.g}, ${data?.value?.b})`
    : 'rgb(0,0,0)';

  const onChange = (key: string, value: number) => {
    updateNodeData(id, (node) => {
      const originValue = node?.data?.value ?? {};
      return { value: { ...originValue, [key]: value } };
    });
  };

  return (
    <div className="color-preview-node" style={{ background: bgColor }}>
      <CoustomHandle id="red" label="R" onChange={(v) => onChange('r', v)} />
      <CoustomHandle id="green" label="G" onChange={(v) => onChange('g', v)} />
      <CoustomHandle id="blue" label="B" onChange={(v) => onChange('b', v)} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
});
