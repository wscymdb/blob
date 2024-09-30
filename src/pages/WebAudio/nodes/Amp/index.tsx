import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { Card, Slider } from 'antd';
import { memo } from 'react';
import { useShallow } from 'zustand/shallow';
import { useStore } from '../../store';
import { AppState } from '../../types';
import './index.less';

type OscData = {
  gain: number;
};

type OscNode = Node<OscData, 'data'>;

const selector = (store: AppState) => ({
  updateNode: store.updateNode,
});

export default memo((props: NodeProps<OscNode>) => {
  const { id, data } = props;
  const { updateNode } = useStore(useShallow(selector));

  const handleSliderChange = (value: number) => {
    updateNode(id, { gain: value });
  };

  return (
    <div className="amp-node">
      <Handle type="target" position={Position.Top} style={{ zIndex: 99 }} />
      <Card title="Amp" style={{ width: 200 }}>
        <div className="frequency">
          <div className="title">音量</div>
          <Slider
            min={0}
            max={1}
            step={0.01}
            className="nodrag"
            onChange={handleSliderChange}
            value={data?.gain || 0.0}
          />
          <div className="hz">{data?.gain || 0.0}</div>
        </div>
      </Card>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});
