import { createContext, RefObject } from 'react';
import { ICreateEditorConfig, IData } from '../type';

interface IContext {
  registryConfig: ICreateEditorConfig;
  updateData: (data: IData) => void;
  data: IData;
  contentRef: RefObject<any>; // 内容区域的 ref
}
export const LowCodeContext = createContext<IContext | null>(null);
