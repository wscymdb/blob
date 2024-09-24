import { Handle, Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import { InputNumber } from 'antd';
import { memo } from 'react';
import './index.less';

type DataNode = Node<{ label: string; value: number }, 'data'>;

export default memo((props: NodeProps<DataNode>) => {
  const { id, data } = props;

  const { updateNodeData } = useReactFlow();

  const onChange = (value: number | null) => {
    updateNodeData(id, { value });
  };

  return (
    <div className="input-number-node">
      <Handle type="source" position={Position.Right} />
      <div className="label">{data.label}</div>
      <InputNumber
        className="nodrag"
        onChange={onChange}
        max={255}
        min={0}
        defaultValue={data?.value || 0}
      />
    </div>
  );
});
