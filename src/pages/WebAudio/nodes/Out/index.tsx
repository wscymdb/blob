import { Handle, Position } from '@xyflow/react';
import { Button } from 'antd';
import { memo } from 'react';
import { useShallow } from 'zustand/shallow';
import { useStore } from '../../store';
import { AppState } from '../../types';
import './index.less';

const select = (store: AppState) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default memo(() => {
  const { isRunning, toggleAudio } = useStore(useShallow(select));

  return (
    <div className="node-out">
      <Handle type="target" position={Position.Top} style={{ zIndex: 99 }} />
      <Button onClick={toggleAudio}>{isRunning ? '🔈' : '🔇'}</Button>
    </div>
  );
});
