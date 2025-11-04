# node

主要的内容是和前端工程化相关的

# 1.定义

**官方定义**

- Node.js 是一个基于`V8 JavaScript引擎`的`JavaScript`运行时环境

**自己理解**

- Node.js 基于 V8 引擎来执行 JavaScript 的代码，但是不仅仅只有 V8 引擎
  - V8 可以`嵌入任何C++应用程序中`，无论是`chrome`还是`node`，事实上都是嵌入了 V8 引擎来执行 JavaScript 代码
  - 但是只是嵌入，比如 chrome 中还有`别的程序来执行解析、渲染、浏览器的API`等
  - 那么 node 中也有别的程序来执行`别的操作，比如文件系统的读写、网络的IO`等

# 2.特殊的全局对象

- 这些全局对象实际上是模块中得变量，只是`每个模块都有`，`看起来像是全局变量`
- 在命令行交互中是不可以使用的
- 包括
  - `__dirname、__filename、eports、module、require()`

# 3.模块化开发

## 3.1.定义

-

## 3.2.模块化历史

- ES6 之前 JavaScript 是没有模块化得概念的
- `直到ES6(2015)`才推出了自己的`模块化方案(ESModule)`
- 在此之前，为了让 JavaScript 支持模块化，涌出很多不同的模块化规范:`AMD、CMD、CommonJS`

## 3.3.CommonJS

- `CommonJS是一个规范`，最初提出来是在浏览器以外的地方使用，并且当时名命为`ServerJS`，后来为了体现他的广泛性，修改为`CommonJS`，平时也会简称`CJS`
  - `Node是`CommonJS 在`服务器端`一个具有代表性的实现
  - `webpack打包工具`具备对 CommonJS 的`支持和转换`
- Node 中`对CommonJS进行了支持和实现`，让我们在开发 node 的过程中可以方便的进行模块化开发
  - 在 Node 中每一个 js 文件都是一个单独的模块
  - 这个模块中包含 CommonJS 规范的核心变量，`exports、module.exports、require`
- 模块化的核心是`导出和导入`，Node 中对其进行了实现
  - `exports`和`module.exports`可以负责对模块中的内容进行`导出`
  - `require`函数可以`导入`其他模块中的内容

### 3.3.1.exports 导出

- exports 是一个对象，可以在对象中添加属性，添加的属性会被导出

- **导出导入的原理**

  - require(url)对象的时候，其实是通过 url 找到文件
  - 然后拿到文件的 exports 对象，将其赋值给接收的变量
  - 那么其实导出和导入的文件里面的 exports`对象都是同一个`
  - 简单来说，导出和导入的对象其实就是`赋值引用`的关系

  ```javascript
  // a.js
  const a = {
    name: 'jack',
  };
  setTimeout(() => {
    exports.a.name = 'sdfsd';
  }, 2000);
  ```

  ```javascript
  //b.js
  const res = require('./a');
  console.log(res);
  setTimeout(() => {
    console.log(res);
  }, 3000);

  // 运行b.js文件
  // 可以看到在定时器结束后名字也变了
  // { name: 'jack' }
  // { name: 'sdfsd' }
  ```

### 3.3.2.module.exports 导出

- CommonJS 中是没有`module.exports`的概念的
  - 为了符合 CommonJS 的规范，所以设计了一个 exports 对象
  - 默认情况下 module.exports 指向 exports 对象(exports = module.exports)
- 但是为了实现模块的导出，Node 中`使用的是Module的类`，每一个模块都是 Module 的一个实例，也就是 module
- 所以在 Node 中真正`用于导出`的其实根本不是 exports，而`是module.exports`
  - 所以 module.exports 的`优先级高于`exports
- 因为 module 才是导出的正真实现者

### 3.3.3.require

- require 是一个函数，可以引入一个文件(模块)中的导出对象

**require 的查找规则**

导入格式如下：

​ **require(X)**

- **情况一**：X 是一个 Node 的`核心模块`，如 http、path

  - `直接返回`核心模块，并`停止查找`

- **情况二**：X 是以`./`或`../`或`/`(根目录)开头的

  - `第一步`：将 X 当作一个文件在对应的目录下查找
    - 如果`有后缀名`，按照后缀名的格式查找文件
    - 如果`没有后缀名`，会按照如下顺序
      1. 直接查找文件 X
      2. 查找 X.js 文件
      3. 查找 X.json 文件
      4. 查找 X.node 文件
  - `第二步`：没有找到对应的文件，将 X 作为一个目录
    - 查找目录下的 index 文件，按照如下顺序
      1. 查找 X/index.js 文件
      2. 查找 X/index.json 文件
      3. 查找 X/index.node 文件
  - 如果`都没有找到，报错`

- **情况三**：直接是 X，并且 X 不是核心模块

  - 会在当前文件夹的`node_modules文件夹`下查找 X 文件

    - 查找的顺序和上面一样

    如果当前文件夹没有 node_modules，会`一级一级的往上级查找`这个 node_modules 文件夹，直到查找`到根目录`，没有就报错

### 3.3.4.Node 模块加载解析过程

- **结论一：模块在被第一次引入时，模块中的 js 代码`会被运行一次`**
- **结论二：模块在被多次引入时，`会缓存`，最终`只加载(运行)一次`**
  - 因为每个模块对象 module 都有一个属性，`loaded`
  - 为 false 表示还没加载，为 true 表示已经加载
- **结论三：如果有循环引用，加载顺序时`按照深度优先算法`来执行的**
  - 有以下的文件引用关系
  - main 引入 a.js 和 b.js
  - a.js 引入 c.js c.js 引入 d.js. d.js 引入 e.js
  - b.js 引入 c.js 和 e.js
  - 这种引用关系是一种数据结构：`图结构`
    - 图结构在遍历过程中有`深度优先`搜索和`广度优先`搜索
  - 执行顺序是：main.js - a.js - c.js - d.js - e.js - b.js
    - 因为 c.js 已经被加载过一次，所以 b 引用的时候就不会被加载了

### 3.3.5.CommonJS 的缺点

- CommonJS 加载模块都`是同步的`

  - 同步意味着`只有等待对应的模块加载完毕，当前模块中的内容才能被运行`
  - 这个在服务器不会有什么问题，因为`服务器加载js文件都是本地文件`，加载`速度非常快`

- 浏览器中，通常是不使用 CommonJS 规范
  - 浏览器加载 js 文件需要先从服务器将文件下载下来，之后在加载运行
  - 那么采用同步的就意味着后续的 js 代码都无法正常运行，即使是一些简单的 DOM 操作

## 3.4.ES Module

- 是 EcmaScript 推出的模块化规范
- 使用`import`（导入）和`export`（导出）关键字
- 它采用编译期的静态分析，并且加入了动态引入的方式
- 采用 ES Module 将`自动采用严格模式`：use strict

### 3.4.1.导出导入的使用语法

- export {`标识符` 1，标识符 2，... }
  - {} `不是对象` 是 export 的特殊语法，所以里面的值也不是对象的增强写法
- import {标识符 1，标识符 2，... } from xxx.xxx
  - {} `不是对象`，是 import 的特殊语法，用来设置接收的导出对象的
  - from 后面的路径`必须加后缀名`

**注意**

- 当打开对应的 html 文件时，如果 html 中有使用模块化的代码，那么必须开启一个服务来打开

```javascript
// foo.js
const name = 'zs';
const age = 18;

function sayHello() {
  console.log('hello');
}

export { name, age, sayHello };
```

```javascript
// main.js
import { name, age, sayHello } from './foo.js';
console.log(name);
console.log(age);
sayHello();
```

### 3.4.2.export 关键字

- 导出的三种方式（常见）

- ```javascript
  // 方式一
  const name = 'zs';
  export { name };

  // 方式二 导出时给标识符起一个别名
  const name = 'zs';
  export { name as fname };

  // 方式三 定义时直接导出，这中方式不可以起别名
  export const name = 'zs';
  export class Foo {}
  ```

### 3.4.3.import 关键字

- 导入的三种方式（常见）

- ```javascript
  // 方式一：
  import { name } from './a.js';

  //方式二：起别名
  import { name as fname } from './a.js';

  // 方式三：导入时给整个模块起别名
  import * as fname from './a.js';
  console.log(fname.name);
  ```

### 3.4.4.import 和 export 结合使用

有 index.js 文件,是其他文件的入口文件

- 默认情况

```javascript
import { formatCount } from './formatCount.js';
import { formatDate } from './formatDate.js';

export { formatCount, formatDate };
```

- 情况一

```javascript
export { formatCount } from './formatCount.js';
export { formatDate } from './formatDate.js';

//等价于
import { formatCount } from './formatCount.js';
import { formatDate } from './formatDate.js';

export { formatCount, formatDate };
```

- 情况二

```javascript
// 这种方式时将文件内的内容全部引入，然后再导出
export * from './formatCount.js';
export * from './formatDate.js';
```

### 3.4.5.default(默认导出)

- 默认`导出`可以`不需要指定名字`
- 在导入时`不需要使用{}`,并且可以`自己指定名字`
- **注意**：在一个模块中，`只能有一个`默认导出

```javascript
// a.js(导出文件)
const name = 'zs';
export default name;

// b.js(导入文件)
import hh from './a.js';
```

### 3.4.6.import 函数

- 通过 import 加载一个模块，是不可以将其放到逻辑代码中的

  ```javascript
  if (true) {
    import a from './a.js';
  }
  // 代码报错
  ```

  - 因为`ES Module再被JS引擎解析`时，就`必须知道他的依赖关系`
  - 由于`这时候js代码没有任何的运行`
  - 甚至`拼接路径的写法也是错误`的，因为必须到运行时才能确定 path 的值

- 但是再某种情况下，`希望动态的加载某一个模块`

- 这时候可以使用`import函数`来动态加载

  - import 函数`返回一个promise`，可以通过 then 方法获取结果

- ```javascript
  import('./a.js').then((res) => {
    console.log(res);
  });
  ```

**import.meta**

- import.meta 是一个给 JavaScript 模块暴露特定上下文的元数据属性的对象
  - 它包含了这个模块的信息，比如模块的 URL
  - ES11 中新增的特性

### 3.4.7.ES Module 的解析流程

- 分为三个阶段
- 阶段一：构建(Construction)，根据地址查找 js 文件，并且下载，将其解析成模块记录(Module Record)
- 阶段二：实例化(Instantiation)，对模块记录进行实例化，并且分配内存空间，解析模块的导入和导出语句，把模块指向对应的内存地址
- 阶段三：运行(Evaluation)，运行代码，计算值，并且将值填充到内存地址中

# 4.包管理工具

## 4.1.npm 的配置文件

- **package.json 文件**

**常见的创建方式**

- **方式一**：`手动添加`
  - npm init
    - 需要手动填写信息
  - nmp init -y
    - 使用默认的信息
- **方式二**：`通过脚手架创建项目`
  - 脚手架会自动生成 package.json，并且配置相关的信息

### 4.1.1package.json 常见的属性

**基本属性**

- `name`：项目的名称，（必填）
- `version`：当前项目的版本号，（必填）
- `description`：描述信息，大多时候作为项目的基本描述
- `author`：作者相关信息(发布时用到)
- `license`：开源协议(发布时用到)

**private 属性**

- `private`属性记录当前的项目`是否是私有`的
  - 当值为`true`，npm 是`不能发布他的`，为了防止私有项目或模块发布出去的方式

**main 属性**

- `main`：设置`程序的入口`
  - 当引入模块的时候，只写文件夹，默认情况下会去这个文件夹下找 index 相关的文件
  - 使用`main属性来配置入口`，那么就会找 main 配置的相关文件

**scripts 属性**

- `scripts`：用于配置一些脚本命令，以键值对的形式存在

- 配置后可以通过`npm run 命令的key`来执行这个命令

- `npm start` 和 `npm run start`的区别

  - 他们是等价的
  - 对于常用的 start、test、stop、restart 可以`省略掉run`，直接通过 npm start 等方式运行

- ```json
  {
    "scripts": {
      "start": "node ./main.js",
      "build": "webpack ..."
    }
  }
  ```

**dependencies 属性**

- `dependencies`：指定无论开发环境还是生产环境都需要依赖的包

**devDenpendencies 属性**

- `devDenpendencies`: 开发环境需要的依赖包
- npm install --save-dev

**peerDependencies**

- `peerDependencies`：表示`对等依赖`，也就是`一个依赖包，它必须是以另一个宿主包为前提的`
  - 比如 element-plus 依赖 vue3 的，那么 element-plus 的 packages.json 中就有`peerDependencies：vue3`,这样的字段，当使用 element-plus 的时候，如果当前项目没有 vue 就会提示用户这个包是依赖 vue 的

**engines 属性**

- `engines`：用于`指定Node和NPM的版本号`
- 在安装的过程中，会先检查对应的引擎版本，如果`不符合就会报错`
- 事实上也可以指定所在的操作系统“os”:['linux'],只是很少用到

**browserslist 属性**

- 用于配置打包后的 JavaScript 浏览器的兼容情况
- 也可以单独在一个.browserslistrc 文件中进行配置

### 4.1.2.依赖的版本管理

- 安装依赖的时候会出现:`^2.0.3`或`~2.0.3`
- npm 的包通常会遵从`semver`版本规范
- semver 版本规范是 X.Y.Z
  - **X：主版本号(major)**
    - 当你做了不兼容的 API 修改(可能不兼容之前的版本，比如 vue3 不兼容 vue2 的 eventbus)
  - **Y：次版本号(minor)**
    - 当你做了向下兼容的功能性新增(新功能增加，但是兼容之前的版本)
  - **Z：修订号(patch)**
    - 当你做了向下兼容的问题修正(没有新功能，修复了之前版本的 bug)
- `^`和`~`的区别
  - `x.y.z`：表示一个明确的版本号
  - `^x.y.z`：表示 x 保持不变，y 和 z 永远安装最新的版本
    - 下次`nmp install`的时候如果有更新，就会使用新的版本
  - `~x.y.z`：表示 x 和 y 保持不变的，z 永远安装最新的版本
    - 下次`nmp install`的时候如果有更新，就会使用新的版本

### 4.1.3.npm install 原理

![](https://img-blog.csdnimg.cn/4a2d459ea4f340578d84b6d86bb75adc.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Y2W6I-c55qE5bCP55m9,size_20,color_FFFFFF,t_70,g_se,x_16)

### 4.1.4.npm 其他命令

- 卸载某个依赖包
  - npm uninstall package
  - npm uninstall package --save-dev
  - npm uninstall package -D
- 强制重新 build
  - npm rebuild
- 清除缓存
  - npm cache clean
- 查看缓存的 位置
  - npm config get cache

## 4.2.npx 工具

- npx 是 npm5.2 之后自带的一个命令

  - npx 的作用非常多，但是比较常见的是使`用它来调用某个模块的指令`

- 举例（以 webpack 为例）

  - 在终端输入命令，默认会在当前的目录下查找可执行文件，但是不会去当前目录的子目录中查找
  - 当我们在当前文件夹下输入 webpack 它会先去当前目录下查找，如果没有，再去全局查找，如果没有就会报错
  - 怎么解决呢(`局部查找方式一`)？node_modules 文件夹下有一个.bin 文件夹里面存放的有所有包的可执行文件，我们进入到这个.bin 文件夹下打开终端然后输入 webpack 即可执行局部的 webpack
  - `npx的作用就是优先去当前文件夹的node_modules的.bin文件下查找`
    - 当 输入 npx webpack，会先去当前目录的 node_modules 的.bin 文件夹下查找 webpack 可执行文件

- 如果在 package.json 中的 scripts 中是不用写 npx 的，因为这个里面默认就会去.bin 文件夹下查找（`局部查找方式二`）

  ```json
  {
    "scripts": {
      "build": "webpack"
    }
  }
  ```

## 4.3.pnpm

### 4.3.1.原来包管理工具的痛点

- 像 npm、yarn、cnpm 这些包管理工具都一个最大的缺点
- 如果你电脑有 3 个项目，每个项目都要 axios、vue、webpack 等等这些三方包
- 那么每一个项目都会下载一份的，如果你有 10 个 100 个项目呢，
- 那么`电脑的内存会随着项目的增加而减少`
- `pnpm解决了这一痛点`

### 4.3.2.定义

- pnpm：`performant npm`的缩写
- 速度快、节省磁盘空间的软件包管理器

### 4.3.3.硬链接和软链接

**知识储备**

- 存放在磁盘的数据是`物理数据我们无法去操作`
- 这时候要用到操作系统去操作，操作系统会将磁盘的数据抽象成一个文件的形式让我们去访问操作

**维基百科定义**

- **硬链接(hard link)**
  - 是`电脑文件系统中多个文件平等的共享同一个存储单元`
  - 删除一个文件名字后，还可以用其他名字继续访问该文件
- **符号链接(软链接 soft link)：**
  - 是`一类特殊的文件`
  - 包`含一条以绝对路径或相对路径的形式指向其他文件或者目录的引用`

**举例**

- **硬链接**
  - 有一个 mp4 文件存放在物理磁盘中，操作系统在 F 盘有个 a.mp4,这个 a.mp4 指向物理磁盘的那个 MP4 文件，那么这中指向关系就是`硬链接`
  - 在 C 盘中有一个 b.mp4 也指向物理磁盘的 MP4 文件，这种指向也是`硬链接`
  - 所以即使删除 b.mp4 文件，a.mp4 也依然能够访问磁盘的 MP4 文件
- **软链接**
  - 在桌面创建了 a.mp4 的快捷方式，那么这个快捷方式存放的是 a.mp4 的相对绝对路径
  - 这个快捷方式和 a.mp4 这种指向就是`软链接`
  - `软链接的文件是不可编辑的`
- **演示**(`widnow 的cmd进行操作`)
  - **文件拷贝**：会在硬盘中复制一根新的文件数据
    - copy 原文件 新文件
    - copy a.js a_copy.js
  - **文件的硬链接**
    - `mklink /H 新文件 原文件`
    - mklink /H a_hardlink.js a.js
  - **文件的软链接**
    - `mklink 新文件 原文件`
    - mklink a_soft.js a.js

### 4.3.4.pnpm 原理

- 使用`pnpm安装依赖`，依赖包将被`存放在一个统一的位置`，因此

  - 如果多个项目对`同一个依赖的版本相同`，那么磁盘上`只有一份这个依赖包`
  - 如果多个项目对`同一个依赖是不同版本`，那么版本之间`不同的文件就会被存储起来`
  - `使用pnpm安装的依赖，所有文件都保存在硬盘上的统一位置`
    - 当安装软件包时，其包含的所有文件`都会硬链接到此位置`，为不会占用额外的磁盘空间
    - 这可以让项目之间方便的共享相同版本的依赖包

- **举了栗子**
  - pnpm add axios
  - 在当前文件的 node_modules 可以看到 axios 文件夹和.pnpm 文件夹
  - axios 文件夹是一个软链接，他的地址就是.pnpm 里面的 axios 文件夹(这个文件夹是硬链接，指向磁盘上的数据)

### 4.3.5.pnpm 常见命令

- pnpm install
- pnpm add \<pkg>
- pnpm remove \<pkg>
- pnpm \<cmd>
- **pnpm store path**
  - 查找当前电脑 pnpm 的仓库在哪里
- **pnpm store prune**
  - 从 store 中`删除当前未被引入的包`来释放 store 的空间

# 5.Node 内置模块

## 5.1path 模块

- path 模块用于`对路径和文件进行处理`
- 在 Mac OS、Linux 和 window 上的路径分隔符是不一样的
- path 会根据不同操作系统返回分隔符

### 5.1.1.常见的 PAI

**从路径中获取信息**

- dirname：获取文件夹的父文件夹
- basename：获取文件名
- extname：获取文件拓展名

**路径拼接**

- path.join
- 如果希望将多个路径进行拼接，但是不同 的操作系统可能使用的是不同的分隔符，可以使用 path.join

**拼接绝对路径**

- path.resolve
- 该方法会把一个路径或路径片段的序列(传入的路径参数)解析成一个绝对路径
- 给定的路径序列是从右往左被处理的，后面每个 path 被依次解析，`直到构造完成一个绝对路径`，就停止解析
- 如果在处理完所有给定 path 之后，还没有生产绝对路径，则使用当前工作目录
- 生成的路径被规范化并删除尾部斜杠，零长度的 path 将被忽略
- 如果没有 path 传入(无参数),path.resolve()将返回当前工作目录的绝对路径

```javascript
const path1 = './abc';
const path2 = './cba/nbc';

const res1 = path.join(path2, '../text');
// cba\text

// / 表示根目录
const res2 = path.resolve(path1, '/aaa', path2);
// C:\aaa\cba\nbc
```
