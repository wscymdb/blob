import { Tag } from 'antd';
import { memo, useContext } from 'react';
import { LowCodeContext } from '../Context/lowCodeContext';
import useMenuDragger from '../Hooks/useMenuDragger';
import './index.less';

/**
 * 物料区域
 */
export default memo(() => {
  const { registryConfig } = useContext(LowCodeContext)!;
  // 实现物料拖拽
  const { onDragStart, onDragEnd } = useMenuDragger();

  return (
    <div className="material">
      {registryConfig?.componentList.map((component, i) => {
        return (
          <div
            key={i}
            className="material-item"
            draggable
            onDragStart={(e) => onDragStart(e, component)}
            onDragEnd={onDragEnd}
          >
            <div className="material-item-mask"></div>
            <Tag color="processing" className="material-item-label">
              {component.label}
            </Tag>

            {component.preview()}
          </div>
        );
      })}
    </div>
  );
});
