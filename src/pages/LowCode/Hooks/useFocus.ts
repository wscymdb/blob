import { MouseEvent, useEffect, useRef, useState } from 'react';
import { IBlock, IData } from '../type';

export default (data: IData, setData: any, callback: any) => {
  const [focusData, setFocusData] = useState<any>({
    focused: [],
    unfocused: [],
  });

  const currentDownBlockEventRef = useRef<any>(null);

  useEffect(() => {
    if (!currentDownBlockEventRef.current) {
      return;
    }

    callback(currentDownBlockEventRef.current);
  }, [focusData]);

  useEffect(() => {
    const focused: IBlock[] = [];
    const unfocused: IBlock[] = [];

    data.blocks.forEach((item) => {
      (item.isFocus ? focused : unfocused).push(item);
    });

    setFocusData({
      focused,
      unfocused,
    });
  }, [data]);

  const clearBlocksFoucus = () => {
    setData({
      ...data,
      blocks: data.blocks.map((item) => {
        item.isFocus = false;
        return item;
      }),
    });
  };

  const onBlockMouseDown = (e: MouseEvent<HTMLDivElement>, block: IBlock) => {
    e.stopPropagation();
    e.preventDefault();

    // 清除其他的focus
    if (!block.isFocus && !e.shiftKey) {
      clearBlocksFoucus();
    }

    setData({
      ...data,
      blocks: data.blocks.map((item) => {
        if (item.id === block.id) {
          return {
            ...item,
            isFocus: block.isFocus ? false : true,
          };
        }
        return item;
      }),
    });

    currentDownBlockEventRef.current = e;
  };

  // 点击空白区域失去焦点
  const onContentMouseDown = () => {
    clearBlocksFoucus();
  };

  return {
    onBlockMouseDown,
    onContentMouseDown,
    focusData,
  };
};
