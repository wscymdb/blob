# 为什么要用

mono repo 方案，为了在一个 git 仓库中管理多个项目，且更友好的控制依赖版本

# monorepo 的实现方案

| 方案 | 特点 |
| --- | --- |
| **pnpm workspace** | 1. 节省磁盘空间 <br>2. 严格的 node_modules <br>3. 高性能 |
| **yarn workspace** | 经典方案 逐渐被 pnpm 取代 |
| **npm workspace** | npm 7+ 支持 <br> 功能相对简单 |

# 初始化项目

```bash
npm init -y

# 初始化仓库
git init
```

# monorepo 配置

这里使用的是`pnpm workspace`来实现 monorepo

## 配置 workspace

- 项目中只要有`pnpm-workspace.yaml`这个文件那么这个项目其实就是一个 monorepo 的项目

`pnpm-workspace.yaml`

```yaml
# packages/*和app/*都是我们项目中的子包
packages:
	- 'packages/*'
	- 'app/*'
```

## 根目录 tsconfig.json

- 项目采用 ts 来开发 定义 ts 类型文件
- 这里配置的是**根目录**的`tsconfig.json`是整个工程的通用配置
- 子包的`tsconfig.json`继承即可不用写重复的配置

```json
{
  "compilerOptions": {
    /* --- 编译目标与环境 --- */
    // 编译成最新的 JS 版本 (ESNext)，保留最新的语法特性
    "target": "esnext",
    // 包含的类型定义库：
    // DOM: 浏览器环境 (window, document 等)
    // ESNext: 最新 JS 语法的类型定义 (如 Promise.allSettled 等)
    "lib": ["DOM", "ESNext"],
    // 允许在项目中导入和编译 .js 文件 (不仅仅是 .ts)
    "allowJs": true,

    /* --- 模块化设置 --- */
    // 模块生成格式：CommonJS (Node.js 默认格式)。
    // 注意：子包可能会覆盖此配置为 "esnext" 以支持 Tree Shaking。
    "module": "commonjs",
    // 模块解析策略：使用 Node.js 的查找规则 (查找 node_modules)
    "moduleResolution": "node",
    // 允许导入 JSON 文件 (import x from './data.json')
    "resolveJsonModule": true,
    // ✅ 开启 ESM 与 CommonJS 的互操作性
    // 允许你用 `import React from 'react'` 而不是 `import * as React from 'react'`
    "esModuleInterop": true,

    /* --- React 支持 --- */
    // 使用 React 17+ 的新 JSX 转换 (自动引入 _jsx，不再需要 import React)
    "jsx": "react-jsx",

    /* --- 类型检查严格度 (最重要) --- */
    // ✅ 开启所有严格类型检查选项 (包含 noImplicitAny, strictNullChecks 等)
    // 强烈建议在 Monorepo 中保持开启，保证代码质量
    "strict": true,
    // 忽略 node_modules 库里的类型检查错误
    // 作用：显著加快编译速度，防止第三方库的类型错误导致你编译失败
    "skipLibCheck": true,

    /* --- 代码特性支持 --- */
    // 开启装饰器支持 (如果你用 MobX, NestJS 或老式 Class 组件会用到)
    "experimentalDecorators": true,
    // 强制文件名大小写一致 (防止 Windows/Mac 大小写不敏感导致 Linux 构建失败)
    "forceConsistentCasingInFileNames": true,

    /* --- 输出设置 --- */
    // 生成 .d.ts 类型声明文件 (供其他包引用时有类型提示)
    "declaration": true,
    // 🚫 根目录不生成输出文件
    // 核心配置：因为这是“基座”配置，根目录通常只做类型检查，不产生 .js 文件
    // 具体的构建输出由各子包 (packages/*) 自己的 tsconfig 处理
    "noEmit": true
  },

  /* --- 辅助配置 --- */
  // 给编辑器用的 JSON Schema，提供配置项的代码提示
  "$schema": "https://json.schemastore.org/tsconfig",
  // 在 IDE (如 VSCode) 中显示的配置名称，方便区分是哪个配置文件
  "display": "Base"
}
```

## 设计子包

## 调试

在开发的时候我们需要用一个项目来用于调试，不然无法看到开发的效果，总不能实时都用测试进行吧，所以还是要有 ui 进行实时预览

**方式**

调试的包本质上就是为了使用 ui 预览

- 自己搭建站点（react 项目、vue 项目等等只要能显示 ui 即可）
- 文档站点(dumi、storybook 等)

**位置** 一般来说调试的包都会放在`app`目录下

# 规范设计

团队开发中，规范的代码会让我们开发起来更加顺利，口头约定是无用的，所以需要规则来进行约束

**下面的所有规范都是作用在根目录的**

## vscode 插件

**可以借助 vscode 插件在编写的时候做到错误的提示**

- `Prettier` 代码格式化工具
- `Error Lens` 更明显的提示错误
- `ESLint` js 检查
- `Stylelint` 样式的检查

  - 默认只开启对`css`和`postcss`的检查
  - 如果需要开启别的样式
  - `command`+`shift` 然后输入`@ext:stylelint.vscode-stylelint`
  - 往下滑动找到`Stylelint:Validate`添加需要检查的样式即可

- `Code Spell Checker` 拼写的检查

## 规范速览

**js(eslint9、prettier)**

- [eslint](https://eslint.org/docs/latest/use/getting-started)
- [prettier](https://prettier.io/docs/install) 代码格式化

**style(stylelint)**

- [stylelint](https://stylelint.io/user-guide/get-started)

**拼写检查(cspell)**

- [cspell](https://cspell.org/docs/getting-started)

**提交规范(commitlint、husky)**

- [commitlint](https://commitlint.js.org/guides/getting-started.html)
  - 对 commit 进行检查需要配合 husky
  - 否则就需要自己手动调用 commitlint 进行合规性检查
- [husky](https://typicode.github.io/husky/get-started.html)
  - 管理 Git 生命周期中的各种事件（hook）
  - 在 Git 操作关键节点自动执行脚本
- [commitizen](https://www.npmjs.com/package/commitizen)
  - 通过交互式命令行引导用户填写规范的提交信息
- [cz-git](https://cz-git.qbb.sh/zh/guide/)
  - 需要安装 commitizen
  - 增强型 Commitizen 适配器
  - 提供更丰富、可定制的中文友好交互界面

## Prettier

- 用于格式化代码的工具

### **安装**

```bash
pnpm add prettier -wD
```

### 配置文件

**.prettierrc.mjs**

```js
export default {
  arrowParens: 'avoid',
  endOfLine: 'lf',
  printWidth: 120,
  semi: false,
  tabWidth: 4,
  trailingComma: 'none',
};
```

**.prettierignore**

```
.dumi/tmp
.dumi/tmp-production
*.yaml
```

### 结合 vscode 实现保存自动格式化

配置 vscode 离开页面自动保存和保存自动格式化功能

1.  `command`+`,` 进入设置
2.  输入`Format On Save`搜索,勾选`Format On Save`
3.  输入`Auto Save`,找到`Auto Save` 选择`onWindowChange`

配置 vscode 项目的设置在根目录下创建`.vscode/settings.json`

```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit", // 自动删除没有使用的引入
    "source.fixAll.eslint": "explicit"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认格式化工具
  "prettier.prettierPath": "node_modules/prettier/index.cjs" // 配置prettier使用内置的不使用全局的
}
```

### 实现对 import 的排序

上面配置了保存自动格式化，这里需要配置格式化的时候对 import 进行排序

需要用到`@trivago/prettier-plugin-sort-imports`插件

```bash
pnpm add -wD @trivago/prettier-plugin-sort-imports
```

修改`.prettierrc.mjs`

```js
export default {
...之前的配置
plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    // 1. react 相关
    '^react$',
    '^react-',
    '^react/',
    // 2. umi相关
    '^umi$',
    '^umi/',
    // 3. antd 相关
    '^antd$',
    '^antd/',
    '^@ant-design/',
    // 4. 其他三方包 (node_modules 中的包)
    '^[^@./]', // 非 @ 开头、非相对路径的包
    // 5. @ 开头的别名引入
    '^@/',
    // 6. 本地其他组件引入 (相对路径)
    '^[./](?!.*\\.(less|css)$)', // 相对路径，排除样式文件
    // 7. 样式文件引入 (放在最后)
    '^[./].*\\.(less|css)$',
  ],
  importOrderSeparation: false, // 自动在分组之间添加空行
  importOrderSortSpecifiers: true, // 对同一个 import 语句中的多个导入成员进行排序
}
```

## Eslint

- 这里使用的版本是`9.x.x`相对于`8.x.x`是破坏性的升级
- eslint 的所有配置和安装都是在`根目录`下完成的

### **安装**

- 注意这里加上`-w` 如果你是在根目录可以不加 如果报错了在加也行

```bash
pnpm add eslint -wD
```

**添加脚本命令**

- 在`package.json`添加一个脚本命令方便后续使用
- `--fix`表示启用自动修复功能
- `eslint --fix` 是一个强大的自动化工具，能处理约 70-80% 的代码规范问题，大大提升开发效率！

```json
{
	...
	"script":{
		"lint:es":"eslint",
		"lint:fix": "eslint --fix"
	}
}
```

### **Eslint 配置文件**

- 如果你的配置文件想以`.ts`为后缀的话你需要安装

```shell
# jiti 可以 让 Node 可以 “直接运行” TS / ESM / JSX，而不用先编译。
# 如果不想要安装的话就使用.js结尾就行
  pnpm add -wD  jiti

# 安装一下node的类型文件 否则使用node的时候ts会报错
 pnpm add -wD   @types/node
```

**安装一些现有的规则**

- **@eslint/js ESLint**
  - 官方提供的基础 JavaScript 规则集
- **typescript-eslint**
  - **连接 ESLint 和 TypeScript 的桥梁**，它既包含了解析器（让 ESLint 能读懂 TS 语法），也包含了 TS 专属的检查规则（比如类型使用规范）。
- **eslint-plugin-react**
  - **React 通用规则插件**，专门用来检查 JSX 语法正确性以及 React 组件的编写规范（比如组件命名、属性使用等）。
- **eslint-plugin-react-hooks**
  - 专门强制检查 Hooks 的两条核心军规（不要在循环/条件中使用 Hooks、useEffect 依赖项必须正确），非常重要，能防止严重的逻辑 Bug。

```bash
pnpm add eslint -wD @eslint/js  globals typescript-eslint eslint-plugin-react eslint-plugin-react-hooks
```

**eslint.config.ts**

```ts
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';

// eslint9xx中采用的是flat模式 每个item都是一个规则
// 下面的item如果相同规则可以被覆盖
export default defineConfig([
  // 全局过滤
  globalIgnores([
    'dist',
    '**/.dumi/tmp/**',
    '**/.dumi/tmp-production/**',
    'es/**',
  ]),

  // 定义一个规则(每个item都是一个规则，如果有多个item 那么下面的相同的规则会覆盖上面的)
  {
    /**
     * 这个规则要匹配的文件
     */
    files: ['**/*.{ts,tsx,js,jsx}'],

    // 继承规则
    extends: [
      js.configs.recommended, // 基础 JS 规则
      tseslint.configs.recommended, // tseslint内置规则
      reactHooks.configs.flat.recommended, // 专门针对 React Hooks
      pluginReact.configs.flat.recommended, // 通用 React 规则
    ],

    // 语言环境设置 定义了 ESLint 如何解析和理解你的 JavaScript/TypeScript 代码
    languageOptions: {
      /**
       * ECMAScript版本
       * 告诉解析器运行使用哪一版本的js语法特性
       */
      ecmaVersion: 2020,

      /**
       * 声明代码运行在浏览器环境中
       * globals.browser 包含了所有浏览器全局变量
       * 如: window, document, localStorage 等
       *
       * ESLint 默认是禁止使用未定义变量的 (no-undef)。如果你不加这一行，当你在代码里写 window.location 时，ESLint 会报错：'window' is not defined
       */
      globals: globals.browser,

      /**
       * 专门为了 TypeScript 服务的。
       */
      parserOptions: {
        /**
         * 作用：这告诉 ESLint：“去读这些 tsconfig.json 文件，理解我的项目结构和类型定义”。
         *
         * 为啥需要：
         * 普通的 ESLint 只是把代码当文本看。但有了这个配置，ESLint 就能利用 TypeScript 的编译器（TSC）来分析代码。
         * 没有它：ESLint 只能检查格式，比如“变量有没有定义”、“是否用了 let”。
         * 有了它：ESLint 可以检查逻辑和类型。比如@typescript-eslint/await-thenable：会检查你 await 的东西到底是不是一个 Promise。如果不是 Promise 你还 await，它会报错。
         *
         *
         * 虽然 extends 中继承了 tseslint 的推荐规则，
         * 但必须配置 project 才能让 ESLint 读取 tsconfig.json 里的【类型信息】，
         * 从而启用那些需要“类型感知”的高级规则。
         */
        project: [
          'packages/*/tsconfig.json', // 匹配 packages 下的包
          'apps/*/tsconfig.json', // 匹配 apps 下的应用
          './tsconfig.json', // 根目录的 tsconfig
        ].filter(Boolean),

        /**
         * 作用： 适配 Monorepo 指向 monorepo 根目录
         *
         * 为啥需要：
         * 你的项目是 Monorepo（多包架构）。ESLint 需要一个“基准目录”来找到project中配置的tsconfig.json。如果没有这行，ESLint 可能会在子目录里迷路，找不到 tsconfig 文件，从而导致解析失败。
         */
        tsconfigRootDir: path.resolve(process.cwd()),
      },
    },

    // 自定义规则
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true, // 允许短路求值：a && b()
          allowTernary: true, // 允许三元表达式：a ? b() : c()
          allowTaggedTemplates: true, // 允许标记模板字符串
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // 忽略以下划线开头的参数
          varsIgnorePattern: '^_', // 以下划线开头的变量不视为未使用
          caughtErrorsIgnorePattern: '^_', // 以下划线开头的 catch 错误参数不视为未使用
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
```

### 为什么 ESLint 不报错但 IDE 报错？

如果你发现 TS/JS 文件在 IDE 中爆红（报错），但是运行 `npx eslint` 时 ESLint 却显示通过，原因如下：

#### 核心原因：职责分工（去重）

**TypeScript 编译器 (TSC)** 主要负责**类型安全**和**逻辑检查**，而 **ESLint** 主要负责**代码风格**和**最佳实践**。

`typescript-eslint` 团队的设计哲学认为：既然 TSC 本身就能 100% 准确地捕获“变量未定义”或“定义前使用”这类严重的逻辑错误，那么 ESLint 再检查一遍就是**浪费计算资源**且容易产生误报。因此，`typescript-eslint` 默认**关闭了**这些与 TSC 功能重复的规则。

#### 示例场景

```ts
// a.ts
// IDE 此时会飘红，这是 TSC 捕获到的错误：
// Block-scoped variable 'a' used before its declaration. (ts2448)

console.log(a); // 这里使用了未初始化的变量

const a = 1;
```

此时运行 `npx eslint ./a.ts` **不会报错**，因为 ESLint 认为这事归 TSC 管。

#### 解决方案

虽然可以在 ESLint 中强制开启对应的规则，但这会带来显著的性能损耗。**最佳实践**是将类型检查和 Lint 检查分开运行。

我们需要添加一个脚本命令，使用 `tsc` 专门进行类型/逻辑检测。

**在 `package.json` 中添加：**

```json
{
  "scripts": {
    "lint:es": "eslint .",
    "lint:fix": "eslint . --fix",

    // ✅ 新增这一行！
    // tsc 是 TypeScript 编译器
    // --noEmit 表示“只检查错误，不要输出 .js 文件”
    "type-check": "tsc --noEmit"
  }
}
```

> **后续计划**：我们会在配置 **Husky + lint-staged** 时用到这个命令，确保在提交代码（git commit）前，同时通过 `eslint` 和 `type-check` 两道检测，防止 Bug 上线。

## Stylelint

负责管  **CSS/SCSS/Less**  的样式代码质量。

**能做什么**

1. **低级错误**：比如写了无效的颜色值  #zzffff，或者重复的属性。
2. **风格统一**：强制要求属性的顺序、缩进是 2 格还是 4 格、大括号前要不要空格。
3. **最佳实践**：比如禁止使用太低效的选择器，或者防止样式冲突。

### 依赖安装

- stylelint-config-standard ：官网推荐的标准配置

```bash
pnpm add -wD stylelint stylelint-config-standard
```

### 运行脚本

- 这里要注意 stylelint 运行的时候需要添加检查哪些文件 只能在 cli 中添加 没有配置文件中暂时没法添加
- `--fix`:自动修复格式问题

```json
"scripts": {
    "lint:style": "stylelint \"{packages,apps}/**/*.{css,less}\" ",
    "lint:style:fix": "stylelint \"{packages,apps}/**/*.{css,less}\"  --fix"
  },
```

### stylelint.config.mjs

```js
import { defineConfig } from 'cspell';
/**
 * @type {import("stylelint").Config} 的作用
 * JSDoc 类型注释
 * 作用：让你的编辑器（如 VSCode）知道这是一个 Stylelint 配置对象
 * 从而提供代码补全和语法提示
 */

/** @type {import("stylelint").Config} */
export default {
  /**
   * 继承规则集
   *
   * "stylelint-config-standard" 是官方推荐的标准配置
   * 它是 CSS 界的 "Airbnb 规范"，非常流行。
   *
   * 它包含了一大堆默认规则，比如：
   * - 禁止空的样式块 block-no-empty
   * - 颜色值要用小写 color-hex-case
   * - 禁止重复的选择器
   * - 强制标准的 CSS 格式（空格、换行等）
   */
  extends: ['stylelint-config-standard'],

  /**
   * 覆盖配置 (Overrides)
   *
   * 作用：针对特定路径的文件，应用不同的规则。
   * 在 Monorepo 中很常见，因为你可能想对 packages 下的组件库样式
   * 和 apps 下的业务代码样式使用不同的严格程度。
   *
   *
   * 根据自己的需要进行配置 如果默认的就够只有了那么就删除overrides
   */
  overrides: [
    {
      // 匹配 packages 目录下所有的 .css 文件
      files: ['packages/**/*.css'],

      // 这里目前是空的，通常你会在这里写针对 packages 的特殊规则
      // 比如：
      rules: {
        'selector-class-pattern': null, // 允许 BEM 命名或其他特殊命名
      },
    },
  ],
};
```

## Spell Checking

对拼写进行检查的

### 依赖安装

```bash
pnpm add -wD cspell
```

### 脚本配置

**参数描述**

- `--color`：彩色输出
- `--show-suggestions`：显示拼写建议
- `--no-summary`：不显示总结信息
- `--words-only`：只输出错误的单词
- `--quiet`：只显示错误，不显示成功信息
- `--cache`： 使用缓存 加快下一次检查速度
- `--dot`：包含以点号（.）开头的文件和目录。 默认情况下会忽略以 . 开头的文件和目录
- `--gitignore` 参数用于让 CSpell 尊重并应用 .gitignore 文件中的规则。 默认情况下，CSpell 会检查所有匹配的文件，包括那些在 .gitignore 中被忽略的文件
- `--config <文件名>`: 指定配置文件

```json
 "scripts": {
    "spellcheck": "cspell --gitignore --dot --cache  --show-suggestions  --config cspell.config.mjs"
  },
```

### cspell.config.mjs

**注意**

- 我们指定了 dictionaryDefinitions 且开启了所以需要**手动创建文件** 要与 path 对应

```js
/**
 * CSpell 配置文件
 * 用于检查项目中的单词拼写错误
 */
export default defineConfig({
  // 配置文件的版本号 (目前主流是 0.2)
  version: '0.2',

  // 拼写检查是否区分大小写
  // false: 不区分。例如 'cat', 'Cat', 'CAT' 都会被认为是同一个单词
  // true: 区分。通常代码里驼峰命名较多，建议设为 false 以避免误报
  caseSensitive: false,

  // 扫描范围：告诉 CSpell 需要检查哪些文件
  // 这里配置了 Monorepo 结构，检查 packages 和 apps 下的源码文件
  // 如果指定了files 里面的没有东西会报错
  // 假设我们下面packages和apps都没有内容就会报错 只要一个有命中的就不会报错
  files: ['packages/**/*.{js,ts,jsx,tsx}', 'apps/**/*.{js,ts,jsx,tsx}'],

  /**
   * 自定义词典定义 (这里只是定义，还没启用)
   * 作用：告诉 CSpell 某个词典文件的具体位置和属性
   */
  dictionaryDefinitions: [
    {
      name: 'custom-words', // 给这个词典起个名字 (ID)
      path: './.cspell/custom-words.txt', // 词典文件的实际路径 (需手动创建此文件)

      // 关键配置：允许添加单词
      // 设置为 true 后，你在 VS Code 右键点击"Add to dictionary"时，
      // 单词会自动写入到上面的 custom-words.txt 文件中
      addWords: true,
    },
  ],

  // 启用词典列表
  // 注意：上面只是定义了词典，必须在这里列出名字，CSpell 才会真正加载它
  dictionaries: ['custom-words'],

  // 忽略文件列表
  // 那些不仅不需要检查，甚至不需要去读取的文件
  ignorePaths: [
    '**/node_modules/**', // 忽略依赖包 (量大且非自己代码)
    '**/dist/**', // 忽略打包产物
    '**/lib/**', // 忽略编译后的库文件
    '**/docs/**', // 忽略文档 (如果有特殊需求可保留)
    '**/stats.html', // 忽略打包分析报告
    '**/language/**', // 忽略多语言配置 (通常包含拼音或非英语)
    '**/language.ts',
    '**/package.json', // 忽略包配置 (里面有很多包名不是标准单词)
    'eslint.config.js', // 忽略配置文件本身
    'pnpm-lock.yaml', // 忽略锁文件 (包含大量哈希值，会被误判为错词)
    '*.png', // 忽略图片
    '*.jpg',
  ],
});
```

## 提交规范

### 初始化仓库

如果已经初始化过了忽略这一步

```bash
git init
```

**.gitignore**

```
node_modules
.DS_Store
**/build
**/dist
**/es

# dumi
**/.dumi
**/tmp
**/docs-dist

.turbo

.cspellcache

pnpm-lock.yaml
yarn.lock

node_modules/

.npmrc

.obsidian

```

### Husky 和 Commitlint

#### 介绍

- **Husky**:管理 Git 生命周期中的各种事件（hook）,在 Git 操作关键节点自动执行脚本
- **Commitlint**:主要是对  git commit  的注释内容进行检查，需要借助  Husky  的  commit-msg  钩子来调用 git hooks,从而触发校验

#### 安装

```sh
pnpm add -wD husky @commitlint/cli @commitlint/config-conventional
```

#### 配置

**初始化 husky**

- `init`  命令简化了在项目中配置 Husky 的过程。它会在  `.husky/`  下创建一个  `pre-commit`  脚本，并更新  `package.json`  中的  `prepare`  脚本。

```shell
# 这里使用的是v9 其余版本自行查阅
npx husky init
```

**commitlint.config.mjs**

```js
export default {
  /**
   * 继承标准规范
   * 提交信息必须符合: type(scope?): subject
   * 例如: feat: 新增登录功能
   */
  extends: ['@commitlint/config-conventional'],
};
```

#### 使用

- 我们需要在`.husky`目录下手动创建`commit-msg`文件，不要后缀，写入一下内容
- 或者终端输入 `echo "要插入的命令" > .husky/pre-commit`完成创建

```shell
#!/bin/bash

# npx --no: 表示强制使用本地项目安装的包。如果不加 --no，当本地没找到 commitlint 时，npx 会尝试去网上下载临时版本，这会导致版本不一致且速度变慢。加上后，如果本地没装依赖会直接报错，更安全。

#  --: 这是一个分隔符。它告诉 npx：“我的参数配置到这里就结束了，后面所有的参数（比如 --edit）都是传给命令内部（commitlint）的，你别拦截”。

# $1: 这是 Git 传进来的参数，代表当前提交信息的临时文件路径（通常是 .git/COMMIT_EDITMSG）。Commitlint 需要读取这个文件里的内容来检查你写的 commit message 是否符合规范。

# 在这个hook中使用commitlint进行校验
npx --no -- commitlint --edit $1
```

#### 验证

```bash
git add .

git commit -m '123' ❌ 报错 不符合规范

git commit -m 'feat: 123' ✅ 符合规范
```

#### Husky 目录文件说明

在  `.husky/`  目录下，不同的文件代表了 Git 操作的不同阶段

| 文件名 | 触发时机 | 作用 | 文件中常见命令 |
| --- | --- | --- | --- |
| pre-commit | 执行 git commit 之前 | 检查代码本身，防止“垃圾代码”混入暂存区 | npx run type-check 或 npx lint-staged |
| commit-msg | 编辑完提交信息   之后，但在提交完成   之前 | 检查提交的 commit，防止格式不规范 | npx commitlint |
| pre-push | 执行 git push 之前 | 通常用来运行单元测试 | - |
| -(目录) | 内部使用 |  | - |

#### 踩坑

在使用`npx husky init`请务必确保你的 git 仓库已经 init，否则无法触发 husky 的 hook 文件

当你要删除`.git`的时候，一定要重新的`npx husky init`，否则也会无法触发 husky 的 hook

原因是**husky 依赖 Git 配置**

### commitizen 和 cz-git

我们使用  commitizen  配合  cz-git  来实现交互式的 git 提交体验。

#### 1. 介绍

- **Commitizen**: 一个命令行工具（CLI），用于启动交互式提交界面。它本身不知道该问什么问题，需要配合适配器使用。
- **cz-git**: 一款**增强型的适配器**。它能直接读取  commitlint  的配置，提供对中文友好的交互界面。

#### 2. 安装

```bash
# -w 表示安装到根目录
pnpm add -wD commitizen cz-git
```

#### 3.修改 package.json

```json
{
  // 添加脚本
  "scripts": {
    "commit": "git-cz"
  },
  // 添加cz-git需要的配置
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}
```

#### 4 配置文件

这里官方推荐和`commitlint`共用一个配置文件

`commitlint.config.mjs`

```js
/** @type {import('cz-git').UserConfig} */
export default {
  // 原来的配置
  extends: ['@commitlint/config-conventional'],

  // 使用模版官方给的 可以自行更换
  // https://cz-git.qbb.sh/zh/config
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      {
        value: 'feat',
        name: 'feat:     ✨  新增功能 | A new feature',
        emoji: '✨',
      },
      { value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix', emoji: '🐛' },
      {
        value: 'docs',
        name: 'docs:     📝  文档更新 | Documentation only changes',
        emoji: '📝',
      },
      {
        value: 'style',
        name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code',
        emoji: '💄',
      },
      {
        value: 'refactor',
        name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️',
      },
      {
        value: 'perf',
        name: 'perf:     ⚡️  性能提升 | A code change that improves performance',
        emoji: '⚡️',
      },
      {
        value: 'test',
        name: 'test:     ✅  测试相关 | Adding missing tests or correcting existing tests',
        emoji: '✅',
      },
      {
        value: 'build',
        name: 'build:    📦️  构建相关 | Changes that affect the build system or external dependencies',
        emoji: '📦️',
      },
      {
        value: 'ci',
        name: 'ci:        🎡  持续集成 | Changes to our CI configuration files and scripts',
        emoji: '🎡',
      },
      {
        value: 'revert',
        name: 'revert:   ⏪️  回退代码 | Revert to a commit',
        emoji: '⏪️',
      },
      {
        value: 'chore',
        name: 'chore:    🔨  其他修改 | Other changes that do not modify src or test files',
        emoji: '🔨',
      },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    useAI: false,
    aiNumber: 1,
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: null,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixes: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
    ],
    customIssuePrefixAlign: 'top',
    emptyIssuePrefixAlias: 'skip',
    customIssuePrefixAlias: 'custom',
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
```

#### 5.使用

使用`pnpm commit`命令来代替`git commit -m '' ` 命令即可

### lint-staged 优化 commit 检查

[官网](https://github.com/lint-staged/lint-staged)

- 当工程量上去以后每次 commit 都会触发所有文件的检查那么开销是非常大的，
- 借助 lint-staged 只用对 staged(暂存区)中的文件进行检查(git add .之后文件会进入暂存区)
- 减少性能开销

**安装**

```bash
pnpm add -wD lint-staged
```

**配置文件**

lint-staged.config.mjs

```js
/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  // 数组中表示执行的命令
  '*.{js,jsx,ts,tsx}': ['pnpm lint:es', 'pnpm spellcheck'],
  '*.{css,less,scss}': ['pnpm lint:style', 'pnpm spellcheck'],
};
```

**使用**

- 只需执行以下命令，就会执行配置文件中的命令
- 一般需要结合 git hooks ，每次 commit 就会自动执行，无需手动执行

```bash
npx lint-staged
```

### 结合 git hooks

- 上面的提交规范其实都需要我们手动去执行命令才会运行对应的检查
- 实际开发中一般是在 commit 的时候自动触发，所以需要借助 git hooks 自动执行

**pre-commit**

我们需要在`.husky/pre-commit`中添加

```bash
# 执行lint-staged检查
npx lint-staged
```

**commit-msg**

我们需要在`.husky/commit-msg`中添加

```bash
# 使用 commitlint 校验 Git 提交信息的格式规范。
npx commitlint --edit $1
```
