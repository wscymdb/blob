【monorepo-basic】中已经把基础的架子搭建完成了

本章节我们要介绍的是如何配置子包，以及调试包，会用搭建一个自己的 ui 库来举例，辅助理解

# 构建子包

这里我们构建一个 ui 的子包来举例，其他的子包形式都一样

注意每个子包都要有自己的`tsconfig.json`和`package.json`

- 子包`tsconfig.json`，继承根目录的`tsconfig.json`，在此基础上拥有自己独立的配置项

# ui 包

```
packages
└─ ui
   ├─ package.json  // 每个包都要有
   ├─ src
   │  ├─ components
   │  │  ├─ Button
   │  │  │  ├─ Button.tsx
   │  │  │  └─ index.tsx
   │  │  └─ index.ts
   │  └─ index.ts
   ├─ tsconfig.json  // 每个包都要有
   └─ tsup.config.ts   // 构建配置文件
```

**package.json**

```json
{
  "name": "@ym/ui", // name命名最好是 @组织/名称 这种形式方便管理
  "version": "0.0.1",
  "description": "react ui 组件库",
  "type": "module",
  "module": "es/index.js",
  "types": "es/index.d.ts",
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup"
  },
  "keywords": [],
  "author": "puta",
  "license": "ISC",
  "devDependencies": {
    "@types/react": "18.3.27",
    "tsup": "^8.5.1"
  },
  "peerDependencies": {
    "react": ">=18"
  }
}
```

# 调试包

这里选择的是 dumi 的静态站点作为调试

安装使用参考[初始化](https://d.umijs.org/guide/initialize)

需要注意的是，dumi 初始化的时候会有些东西和根目录的配置重复了记得删除，

比如`prettier`、`eslint`等等这些要记得删除，不过要是这里面的配置文件和根目录的不同记得添加进根目录

还有就是`tsconfig.json`要记得继承一下根目录的`tsconfig.json`

## 目录结构

```
apps
└─ docs
   ├─ .dumirc.ts
   ├─ docs
   │  ├─ guide.md
   │  ├─ guide.tsx
   │  └─ index.md
   ├─ package.json
   └─ tsconfig.json
```

# turbo

## 干嘛的

- 核心功能之一：
  - “聪明的”并行所有子包的命令
  - 比如我们有 2 个包每次启动都要分别运行这两个包的"dev"命令
  - 现在我们只需要写好配置文件，然后运行根目录"pnpm dev" 就可以在一个终端“聪明的”运行所有的命令了

## 安装

```sh
pnpm add -Dw turbo
```

## 添加脚本

```json
 "scripts": {
		...,
        "dev": "turbo dev",
    },
```

## 配置文件

**turbo.json**

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## 使用

这时候就会运行所有子包的 dev 命令了

```sh
pnpm dev
```
