import { defineConfig } from 'vitepress';
import llmstxt from 'vitepress-plugin-llms';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '葡挞的资料库',
  description: '葡挞的资料库',
  base: '/flow/docs/',
  lastUpdated: true,
  // 关闭死链 VitePress 对文档质量的一种校验，目的是确保文档中所有引用的资源路径都是有效的
  ignoreDeadLinks: true,
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
      { text: '笔记 📖', link: '/articles/1' },
      { text: '拔高 ✍️', link: '/promote/01五层网络模型/' },
      { text: '网站导航 🧭', link: 'http://nav.puta99.fun' },
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
        {
          text: 'CSS预编译工具',
          items: [{ text: 'less', link: '/web/CSSPreprocessor/less' }],
        },
        { text: '移动端适配', link: '/web/flexable' },
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
      '/articles/': [
        {
          text: '',
          items: [
            { text: 'shell文件执行的坑', link: '/articles/1' },
            { text: 'CSS包含块', link: '/articles/2' },
          ],
        },
      ],
      '/promote/': [
        {
          text: '网络',
          items: [
            { text: '01五层网络模型', link: '/promote/01五层网络模型/' },
            { text: '02常见请求方法', link: '/promote/02常见请求方法/' },
            { text: '03cookie', link: '/promote/03cookie/' },
            { text: '04cookie和storage', link: '/promote/04cookie和storage/' },
            { text: '05加密', link: '/promote/05加密/' },
            { text: '06jwt', link: '/promote/06jwt/' },
            { text: '07同源策略', link: '/promote/07同源策略/' },
            { text: '08跨域-代理', link: '/promote/08跨域-代理/' },
            { text: '09跨域-CORS', link: '/promote/09跨域-CORS/' },
            { text: '10跨域-JSONP', link: '/promote/10跨域-JSONP/' },
            { text: '12输入url地址后', link: '/promote/12输入url地址后/' },
            { text: '14session', link: '/promote/14session/' },
            { text: '15HTTP缓存协议', link: '/promote/15HTTP缓存协议/' },
            { text: '16TCP协议', link: '/promote/16TCP协议/' },
            { text: '17CSRF攻击', link: '/promote/17CSRF攻击/' },
            { text: '18XSS攻击', link: '/promote/18XSS攻击/' },
            { text: '19网络性能优化', link: '/promote/19网络性能优化/' },
            { text: '20断点续传', link: '/promote/20断点续传/' },
            { text: '21域名和DNS', link: '/promote/21域名和DNS/' },
            { text: '22SSL、TLS、HTTPS', link: '/promote/22SSL、TLS、HTTPS/' },
            { text: '23HTTP各版本差异', link: '/promote/23HTTP各版本差异/' },
            { text: '24WebSocket', link: '/promote/24WebSocket/' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/wscymdb/blob' }],
  },
  vite: {
    plugins: [llmstxt()],
  },
});
