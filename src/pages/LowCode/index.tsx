import { registryConfig } from '@/utils/editor-config';
import { memo, useRef, useState } from 'react';
import { LowCodeContext } from './Context/lowCodeContext';
import originData from './data.json';
import EditorBlock from './EditorBlock';
import useFocus from './Hooks/useFocus';
import './index.less';
import Material from './Material';
import { IBlock, IContainerStyles, IData } from './type';

export default memo(() => {
  const [data, setData] = useState<IData>(originData as IData);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerStyles: IContainerStyles = {
    width: data.container.width,
    height: data.container.height,
  };

  // 获取焦点
  const { onBlockMouseDown, onContentMouseDown, focusData } = useFocus(
    data,
    setData,
    (e: any) => {
      mousedown(e);
    },
  );

  let dragState: any = {
    startX: 0,
    startY: 0,
  };

  const mousedown = (e) => {
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: focusData.focused,
    };

    console.log(dragState, 'mousedown');

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  };

  const mousemove = (e) => {
    let { clientX: moveX, clientY: moveY } = e;
    let durX = moveX - dragState.startX;
    let durY = moveY - dragState.startY;

    const newData = focusData.focused.map((block, idx) => {
      return {
        ...block,
        top: dragState.startPos[idx].top + durY,
        left: dragState.startPos[idx].left + durX,
      };
    });

    setData({
      ...data,
      blocks: newData,
    });
    console.log(newData, 'mousemove');
  };

  const mouseup = (e) => {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
  };

  return (
    <LowCodeContext.Provider
      value={{ registryConfig, updateData: setData, data, contentRef }}
    >
      <div className="low-code">
        <div className="low-code-left">
          <Material />
        </div>
        <div className="low-code-top">菜单区域</div>
        <div className="low-code-right">属性控制栏目</div>
        <div className="low-code-container">
          {/* 负责产生滚动条 */}
          <div className="low-code-container-canvas">
            {/* 产生内容区域 */}
            <div
              ref={contentRef}
              style={containerStyles}
              className="low-code-container-canvas__content"
              onMouseDown={onContentMouseDown}
            >
              {data.blocks.map((item, i) => (
                <EditorBlock
                  onMouseDown={(e) => onBlockMouseDown(e, item)}
                  block={item as IBlock}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LowCodeContext.Provider>
  );
});
