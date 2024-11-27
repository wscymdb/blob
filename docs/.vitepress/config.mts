import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '葡挞的资料库',
  description: '葡挞的资料库',
  base: '/flow/docs/',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/flow/docs/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      level: [1, 6], // https://vitepress.dev/zh/reference/default-theme-config#outline
    },
    search: {
      provider: 'local',
    },
    docFooter: {
      prev: '上一夜',
      next: '下一夜',
    },
    logo: '/logo.jpg',
    nav: [
      { text: '首页 🏠', link: '/' },
      { text: '前端 💻', link: '/web/javascript' },
      { text: '前端运维 🛠️', link: '/web-ops/linux' },
      { text: '测试 🦄', link: '/test/' },
      { text: '术语 🧑‍🏫', link: '/term/' },
      { text: '其他 📋', link: '/other/' },
    ],
    sidebar: {
      '/other/': [
        {
          text: '',
          items: [
            { text: '环境区别', link: '/other/' },
            { text: '无感刷新token', link: '/other/two-tokens' },
            { text: '网址收集', link: '/other/urls' },
          ],
        },
      ],
      '/web/': [
        {
          text: 'Javascript',
          items: [{ text: 'js高级', link: '/web/javascript' }],
        },
        {
          text: 'React',
          items: [
            { text: 'react基础', link: '/web/react' },
            { text: 'react高级', link: '/web/react/react-high' },
            { text: 'reactHooks', link: '/web/react/react-hooks' },
            { text: 'reactRouter', link: '/web/react/react-router' },
            { text: 'redux', link: '/web/react/redux' },
          ],
        },
        {
          text: 'Typescript',
          items: [{ text: 'typescript', link: '/web/typescript' }],
        },
        {
          text: 'Git',
          items: [
            { text: 'Git查漏补缺', link: '/web/git' },
            { text: 'Git提交规范', link: '/web/git/git-commit' },
          ],
        },
        {
          text: '工程化',
          items: [
            { text: 'node基础', link: '/web/engineering/node-basic' },
            { text: 'node高级', link: '/web/engineering/node-high' },
            { text: 'webpack', link: '/web/engineering/webpack' },
            { text: 'mysql', link: '/web/engineering/mysql' },
            { text: '前端工具', link: '/web/engineering/tool' },
          ],
        },
      ],
      '/web-ops/': [
        {
          text: 'Linux',
          items: [
            { text: 'Linux基础', link: '/web-ops/linux' },
            { text: 'Shell', link: '/web-ops/linux/shell' },
            { text: '软件包管理', link: '/web-ops/linux/software-package' },
          ],
        },
        {
          text: 'Nginx',
          items: [{ text: 'Nginx', link: '/web-ops/nginx' }],
        },
        {
          text: 'Jenkins',
          items: [{ text: 'Jenkins', link: '/web-ops/jenkins' }],
        },
      ],
      '/test/': [
        {
          text: '',
          items: [
            { text: '自动化测试', link: '/test/auto' },
            { text: '测试面试题', link: '/test/' },
          ],
        },
      ],
      '/term/': [
        {
          text: '',
          items: [
            { text: '技术领域', link: '/term/' },
            { text: '职场领域', link: '/term/business/' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/wscymdb/blob' }],
  },
});
