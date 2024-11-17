import {
  ICreateEditorConfig,
  IMaterialComponent,
  MaterialComponentType,
} from '@/pages/LowCode/type';
import { Button, Input, Pagination, Radio, Tag } from 'antd';

const createEditorConfig = (): ICreateEditorConfig => {
  // 列表取显示可显示所有物料
  // key对应组件映射关系
  const componentList: IMaterialComponent[] = [];

  const componentMap = {} as Record<MaterialComponentType, IMaterialComponent>;

  return {
    componentList,
    componentMap,
    registry(component: IMaterialComponent) {
      componentList.push(component);
      componentMap[component.type] = component;
    },
  };
};

export const registryConfig = createEditorConfig();

registryConfig.registry({
  label: '文本',
  preview: () => '预设文本',
  render: () => '渲染 文本',
  type: 'text',
});

registryConfig.registry({
  label: '按钮',
  preview: () => <Button>预设按钮</Button>,
  render: () => <Button>渲染文本</Button>,
  type: 'button',
});

registryConfig.registry({
  label: '输入框',
  preview: () => <Input placeholder="预设输入框"></Input>,
  render: () => <Input placeholder="渲染输入框"></Input>,
  type: 'input',
});

registryConfig.registry({
  label: '标签',
  preview: () => <Tag>预设标签</Tag>,
  render: () => <Tag>渲染标签</Tag>,
  type: 'tag',
});

registryConfig.registry({
  label: '分页',
  preview: () => <Pagination total={50} size="small" />,
  render: () => <Pagination total={50} size="small" />,
  type: 'pagination',
});

registryConfig.registry({
  label: '单选框',
  preview: () => <Radio>Radio</Radio>,
  render: () => <Radio>Radio</Radio>,
  type: 'radio',
});
