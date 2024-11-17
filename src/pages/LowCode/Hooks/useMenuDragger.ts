import { DragEvent, useContext } from 'react';
import { v4 } from 'uuid';
import { LowCodeContext } from '../Context/lowCodeContext';
import { IMaterialComponent } from '../type';

export default () => {
  const { updateData, data, contentRef } = useContext(LowCodeContext)!;
  let currentComponent: IMaterialComponent | null = null;

  // 1. dragenter 进入目标元素， 给拖拽的的元素添加一个移动标识
  const targetDragenter = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'move';
  };

  // 2. dragover 在目标元素经过 必须要阻止默认行为 否则无法触发 drop事件
  const targetDragover = (e: DragEvent) => {
    e.preventDefault();
  };

  // 3. dragleave 离开目标元素， 添加一个禁用标识
  const targetDragleave = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'none';
  };

  // 4. drop 松手触发 根据拖拽的组件 添加一个组件到目标区域
  const targetDrop = (e: any) => {
    // e.preventDefault();

    if (!currentComponent) return;
    console.log('targetDrop', currentComponent, e);
    const newData = {
      ...data,
      blocks: [
        ...data.blocks,
        {
          id: v4(),
          type: currentComponent.type,
          label: currentComponent.label,
          zIndex: 1,
          top: e.offsetY,
          left: e.offsetX,
          alignCenter: true,
        },
      ],
    };
    // console.log(newData);

    updateData(newData);

    currentComponent = null;
  };

  // 拖拽开始  绑定事件监听
  const onDragStart = (
    e: DragEvent<HTMLDivElement>,
    component: IMaterialComponent,
  ) => {
    currentComponent = component;
    contentRef.current?.addEventListener('dragenter', targetDragenter);
    contentRef.current?.addEventListener('dragover', targetDragover);
    contentRef.current?.addEventListener('dragleave', targetDragleave);
    contentRef.current?.addEventListener('drop', targetDrop);
  };

  // 拖拽结束  移除事件监听
  const onDragEnd = () => {
    contentRef.current?.removeEventListener('dragenter', targetDragenter);
    contentRef.current?.removeEventListener('dragover', targetDragover);
    contentRef.current?.removeEventListener('dragleave', targetDragleave);
    contentRef.current?.removeEventListener('drop', targetDrop);
  };

  return {
    onDragStart,
    onDragEnd,
  };
};
