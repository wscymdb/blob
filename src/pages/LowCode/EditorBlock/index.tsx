import classNames from 'classnames';
import deepcopy from 'deepcopy';
import { memo, MouseEvent, useContext, useEffect, useRef } from 'react';
import { LowCodeContext } from '../Context/lowCodeContext';
import { IBlock } from '../type';
import './index.less';

interface IProps {
  block: IBlock;
  onMouseDown?: (e: MouseEvent<HTMLDivElement>) => void;
}

export default memo((props: IProps) => {
  const { block, onMouseDown } = props;
  const { registryConfig, updateData, data } = useContext(LowCodeContext)!;
  const blockRef = useRef<HTMLDivElement>(null);

  const styles = {
    top: block.top,
    left: block.left,
    zIndex: block.zIndex,
  };

  const renderComponent = registryConfig?.componentMap[block.type];

  useEffect(() => {
    if (!blockRef.current) return;

    const { offsetWidth, offsetHeight } = blockRef.current;

    // 表示是拖动渲染的元素 ，需要位置在鼠标的正中心
    if (block.alignCenter) {
      const newBlock = deepcopy(block);
      newBlock.left = block.left - offsetWidth / 2;
      newBlock.top = block.top - offsetHeight / 2;

      updateData({
        ...data,
        blocks: data.blocks.map((item) => {
          if (item.id === block.id) {
            return newBlock;
          }
          return item;
        }),
      });
    }
  }, []);

  return (
    <div
      className={classNames('editor-block', {
        'editor-block-focus': block.isFocus,
      })}
      style={styles}
      ref={blockRef}
      onMouseDown={onMouseDown}
    >
      <div className="editor-block-mask"></div>
      {renderComponent?.render()}
    </div>
  );
});
