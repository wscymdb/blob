import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '葡挞的资料库',
  description: '葡挞的资料库',
  base: '/flow/docs/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/javascript' },
    ],
    sidebar: [
      {
        text: '环境区别',
        items: [{ text: '环境区别', link: '/tt' }],
      },
      {
        text: 'Javascript',
        items: [{ text: 'js高级', link: '/javascript' }],
      },
      {
        text: 'React',
        items: [
          { text: 'react基础', link: '/react' },
          { text: 'react高级', link: '/react/react-high' },
          { text: 'reactHooks', link: '/react/react-hooks' },
          { text: 'reactRouter', link: '/react/react-router' },
          { text: 'redux', link: '/react/redux' },
        ],
      },
      {
        text: 'Typescript',
        items: [{ text: 'typescript', link: '/typescript' }],
      },
      {
        text: '工程化',
        items: [
          { text: 'node基础', link: '/engineering/node-basic' },
          { text: 'node高级', link: '/engineering/node-high' },
          { text: 'webpack', link: '/engineering/webpack' },
          { text: 'mysql', link: '/engineering/mysql' },
          { text: '前端工具', link: '/engineering/tool' },
        ],
      },

      {
        text: 'Linux',
        items: [
          { text: 'Linux基础', link: '/linux' },
          { text: 'Shell', link: '/linux/shell' },
          { text: '软件包管理', link: '/linux/software-package' },
        ],
      },
      {
        text: 'Nginx',
        items: [{ text: 'Nginx', link: '/nginx' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
