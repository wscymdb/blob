import { CSSProperties, ReactNode } from 'react';

export interface IContainerStyles {
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

export interface IBlock {
  id: string;
  top: number;
  left: number;
  zIndex: number;
  type: MaterialComponentType;
  alignCenter?: boolean;
  isFocus?: boolean;
}

// 物料显示的组件
export interface IMaterialComponent {
  label: string;
  type: MaterialComponentType;
  preview: () => ReactNode;
  render: () => ReactNode;
}

// 物料类型
export type MaterialComponentType =
  | 'text'
  | 'button'
  | 'input'
  | 'tag'
  | 'pagination'
  | 'radio';

export interface ICreateEditorConfig {
  componentList: IMaterialComponent[];
  componentMap: {
    [key in MaterialComponentType]: IMaterialComponent;
  };
  registry: (comp: IMaterialComponent) => void;
}

export interface IContainer {
  width: number;
  height: number;
}

export interface IData {
  container: IContainer;
  blocks: IBlock[];
}
