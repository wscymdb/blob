import {
  Handle,
  Node,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';
import { memo, useEffect } from 'react';
import './index.less';

interface IProps {
  id: string;
  label: string;
  onChange?: (value: number) => void;
}
export default memo((props: IProps) => {
  const { id, label, onChange } = props;
  const connection = useHandleConnections({ type: 'target', id });
  const nodeData = useNodesData<Node<{ value: number }, 'value'>>(
    connection?.[0]?.source,
  );

  useEffect(() => {
    const value = nodeData?.data?.value || 0;
    onChange && onChange(value);
  }, [nodeData]);

  return (
    <div className="custom-handle">
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className="handle"
      />
      <label htmlFor={id} className="label">
        {label}
      </label>
    </div>
  );
});
