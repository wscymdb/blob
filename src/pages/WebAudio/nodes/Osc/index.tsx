import { Handle, Node, NodeProps, NodeToolbar, Position } from '@xyflow/react';
import { Button, Card, Select, Slider } from 'antd';
import { memo } from 'react';
import { useShallow } from 'zustand/shallow';
import { useStore } from '../../store';
import { AppState } from '../../types';
import './index.less';

const options = [
  { label: 'Sine', value: 'sine' },
  { label: 'Square', value: 'square' },
  { label: 'Sawtooth', value: 'sawtooth' },
  { label: 'Triangle', value: 'triangle' },
];

type OscData = {
  frequency: number;
  type: string;
};

type OscNode = Node<OscData, 'data'>;

// const selector1 = (id: string) => (store: AppState) => ({
//   setFrequency: (val: number) => store.updateNode(id, { frequency: val }),
//   setType: (val: string) => store.updateNode(id, { type: val }),
// });

const selector = (store: AppState) => ({
  updateNode: store.updateNode,
});

export default memo((props: NodeProps<OscNode>) => {
  const { id, data, selected } = props;
  const { updateNode } = useStore(useShallow(selector));

  const handleSliderChange = (value: number) => {
    // setFrquency(value);
    updateNode(id, { frequency: value });
  };

  const handleSelectChange = (value: string) => {
    // setType(value);
    updateNode(id, { type: value });
  };

  return (
    <div className="osc-node">
      <Card title="Osc" style={{ width: 200 }}>
        <div className="frequency">
          <div className="title">Frequency(音频)</div>
          <Slider
            min={10}
            max={1000}
            className="nodrag"
            onChange={handleSliderChange}
            value={data?.frequency || 10}
          />
          <div className="hz">{data?.frequency || 10}Hz</div>
        </div>
        <div>
          <div className="title">Waveform(音波)</div>
          <Select
            style={{ width: '100%' }}
            options={options}
            className="nodrag"
            placeholder="Select a waveform"
            onChange={handleSelectChange}
            value={data.type}
          />
        </div>
      </Card>
      <NodeToolbar
        isVisible={selected}
        position={Position.Top}
        style={{ top: 5 }}
      >
        <Button>node可以展示</Button>
      </NodeToolbar>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});
