import { defineConfig } from '@umijs/max';
import path from 'path';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  esbuildMinifyIIFE: true, // 启用 IIFE 包装，解决 esbuild 辅助函数在多 chunk 中的命名冲突
  outputPath: path.resolve(__dirname, 'flow'),
  history: { type: 'hash' },
  publicPath: process.env.NODE_ENV === 'production' ? './' : `/`,
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      layout: false,
      routes: [
        {
          path: '/',
          redirect: '/flow',
        },
        {
          name: '流程',
          path: '/flow',
          component: './Flow',
          icon: 'SettingOutlined',
        },
        {
          name: '自定义边和节点',
          path: '/custom-flow',
          component: './CustomFlow',
        },
        {
          name: '布局库',
          path: '/layout',
          routes: [
            { path: '/layout', redirect: '/layout/dagre' },
            { name: 'Dagre', path: '/layout/dagre', component: './Dagre' },
            { name: 'D3', path: '/layout/d3', component: './D3' },
          ],
        },
        {
          name: '子流程',
          path: '/child-flow',
          component: './ChildFlow',
        },
        {
          name: '使用Store',
          path: '/store',
          component: './StateManagementLibrary',
        },
        {
          name: '数据传递',
          path: '/computing',
          component: './Computing',
        },
        {
          name: '幻灯片',
          path: '/ppt',
          component: './PPT',
        },
        {
          name: 'web Audio',
          path: '/audio',
          component: './WebAudio',
        },
      ],
    },
    {
      path: '/nav',
      component: './Nav',
      layout: false,
    },
  ],
  npmClient: 'pnpm',
});
