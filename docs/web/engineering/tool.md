# 1.自动化工具 Gulp

## 1.1.定义

- **一个工具包，可以帮你自动化和增加你的工作流;**
- 慢慢退出历史舞台，学习一下思想，了解一下，技多不压身

## 1.2.Gulp 和 webpack 的区别

- gulp 的核心理念是**task runner**

  - 可以定义自己的一系列任务，等待任务被执行;
  - 基于文件 Stream 的构建流;
  - 我们可以使用 gulp 的插件体系来完成某些任务;

- webpack 的核心理念是**module bundler**

  - webpack 是一个模块化的打包工具;
  - 可以使用各种各样的 loader 来加载不同的模块;
  - 可以使用各种各样的插件在 webpack 打包的生命周期完成其他的任务;

- **gulp 相对于 webpack 的优缺点:**
  - gulp 相对于 webpack 思想更加的简单、易用，更适合编写一些自动化的任务;
  - 但是目前对于大型项目(Vue、React、Angular)并不会使用 gulp 来构建，比如默认 gulp 是不支持模块化的;

## 1.3.Gulp 的使用

- 安装
  - `npm i gulp `
- 编写一个`gulpfile.js`文件，在其中编写任务
- 执行`npx gulp 任务名` 命令

```javascript
function foo1(cb) {
  console.log('这是我的第一个gulp任务');
  cb();
}

const series1 = series(foo1, foo2);

module.exports = {
  foo1,
};

// 终端中输入 npx gulp foo1
```

## 1.4.创建 Gulp 任务

- 每个 gulp 任务**都是一个异步的 JavaScript 函数:**
  - 每个任务都必须要被结束，否则报错
  - 此函数可以`接受一个callback作为参数`，调用`callback`函数那么任务会结束;
  - 或者是一个`返回stream、promise、event emitter、child process或observable类型的函数`，来结束任务
- 任务可以是 public 或者 private 类型的:
  - **公开任务(Public tasks)** 从 gulpfile 中被导出(export)，可以通过 gulp 命令直接调用
  - **私有任务(Private tasks)** 被设计为在内部使用，通常作为 series() 或 parallel() 组合的组成部分;

```javascript
// 这个任务被导出了 所以是公开任务
function foo1(cb) {
  console.log('这是我的第一个gulp任务');
  cb();
}

// 这个任务没有被导出，是石油任务
function foo2(cb) {
  console.log('这是foo2--gulp任务');
  cb();
}

module.exports = {
  foo1,
};
```

## 1.5.默认任务

- 在终端中执行 npx gulp ，即使后面不跟任务名，也会执行的任务

```javascript
function foo1(cb) {
  console.log('这是我的第一个gulp任务');
  cb();
}

//  默认任务
exports.default = foo1;
```

## 1.6.任务组合

- 通常一个函数中能完成的任务是有限的(放到一个函数中也不方便代码的维护)，所以我们会将任务进行组合
- **gulp**提供了两个强大的组合方法:
  - `series`：串行任务组合
    - 会等待上一个任务执行完毕后，才执行下一个任务
  - `parallel`：并行任务组合
    - 所有任务一起执行

```javascript
const { series, parallel } = require('gulp');

function foo1(cb) {
  setTimeout(() => {
    console.log('这是我的第一个gulp任务');
    cb();
  }, 2000);
}

function foo2(cb) {
  setTimeout(() => {
    console.log('这是foo2--gulp任务');
    cb();
  }, 3000);
}

// 串行任务
const series1 = series(foo1, foo2);

// 并行任务
const parallel1 = parallel(foo1, foo2);
module.exports = {
  series1,
  parallel1,
};
```

## 1.7.读取和写入文件

- **gulp 暴露了 src() 和 dest() 方法用于处理计算机上存放的文件**
  - `src(x)`用于匹配 x 中的文件，然后生成一个`Node流`，然后将这个流返回
  - `dest()接受一个输出目录作为参数`，并且它还会产生一个 Node 流(stream)，通过该流将内容输出到文件中;
- **流(stream)所提供的主要的** **API** **是** **.pipe()** **方法，pipe 方法的原理是什么呢?**
  - pipe 方法是 node 中的一个方法
  - pipe 方法接受一个`转换流(Transform streams)`或`可写流(Writable streams)`;
  - 那么转换流或者可写流，拿到数据之后可以对数据进行处理，再次传递给下一个`转换流或者可写流`;

```javascript
const { src, dest } = require('gulp');

// 复制文件
//  src, dest返回的是一个流 也用于结束当前任务
function copyFile(cb) {
  return src('./src/**/*.js').pipe(dest('./dist'));
}

module.exports = {
  copyFile,
};
```

## 1.8.文件的转化

- 比如我们打包文件，需要将 es6 的代码转换 es5，并且压缩代码
- 那么就需要用到插件
- gulp 插件地址：https://gulpjs.com/plugins/
- pipe 中的各种函数会自动获取到上一个 pipe 处理过的值

```javascript
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');

const jsTask = () => {
  return src('./src/**/*.js')
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('./dist'));
};

module.exports = {
  jsTask,
};
```

## 1.9.Gulp 的文件监听

- 当我们修改过某个文件之后，然后需要手动的执行任务
- 如果修改的过于频繁，那么每次手动操作很麻烦
- 所以可以使用 gulp 提供的`watch方法`
- 当要监听的文件发生变化，自动执行方法

```javascript
const { src, dest, watch } = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');

const jsTask = () => {
  return src('./src/**/*.js').pipe(dest('./dist'));
};

// 监听文件的变化，自动调用任务
// 避免改动某个文件 再手动执行任务
//watch(监听目录, 方法名)
watch('./src/**/*.js', jsTask);

module.exports = {
  jsTask,
};
```

# 2.库打包工具 rollup

## 2.1.认识 rollup

- **定义**
  - rollup 是一个 Javascript 的模块化打包工具，可以帮助我们编译小的代码到一个大的、复杂的代码中，比如一个库或者一个应用程序
- **Rollup 和 webpack 的区别**
  - Rollup`也是一个模块化的打包工具`，但是 Rollup`主要针对ES Module`进行打包的
  - 另外 webpack 通常可以通过各种的 loader 来处理各种各样的文件，以及处理他们的依赖关系
  - rollup`处理文件`都是使用`插件`来完成的
  - rollup 更多的时候是`专注于javascript的处理`（当然也可以处理 css、font、vue 等文件）
  - 另外 rollup 的`配置理念相对于webpack`来说，`更加简洁和容易理解`
  - 早期的时候 webpack 是不具备 tree shaking，但是 rollup 具备
- **目前 webpack 和 rollup 的应用场景**
  - 通常`在实际项目开发过程中`，我们都会`使用webpack`
  - 在`对库文件进行打包时`，通常`使用rollup`，（比如 vue、react、dayjs 源码本身都是基于 rollup，Vite 底层也是使用 Rollup）
    - 一般来说开发一个框架或者库用到的会比较多

## 2.2.基本使用

- **安装**

  - `npm i rollup -D `

- **打包环境**

  - rollup 可以打包运行在不同环境的包，比如运行在浏览器的包，运行在 nodejs 的包等
  - 只需要在执行的时候 `-f 环境名`即可

- **命令行中使用**

  - ```
    # 打包浏览器的库
    npx rollup 输入路径 -f iife -o 输出路径
    eg: npx rollup ./src/main.js -f iife -o dist/bundle.js

    # 打包AMD的库
    npx rollup ./src/main.js -f amd -o dist/bundle.js

    # 打包CommonJS的库
    npx rollup ./src/main.js -f cjs -o dist/bundle.js

    # 打包通用的库(必须跟上name)
    # 其实这个name就是打包在浏览器环境中放在window的对象名 eg:window.mathUtil
    npx rollup ./src/main.js -f umd --name mathUtil -o dist/bundle.js
    ```

  -

## 2.3.rollup 配置文件

```javascript
module.exports = {
  // 入口
  input: './lib/index.js',

  // 出口
  output: {
    format: 'umd', // 打包的环境
    name: 'myUtil', // 使用umd必须要有name 这样打包到浏览器中这个名字就会作为全局的变量
    file: './dist/bundle.js', // 打包文件到哪里
    globals: {
      lodash: '_',
      dayjs: 'dayjs',
    },
  },

  // 出口也可使一个数组  可以打包多个环境的包
  // output: [
  //   {
  //     format: 'cjs',
  //     name: 'myUtil',
  //     file: './dist/bundle.cjs.js',
  //   },
  //   {
  //     format: 'iife',
  //     name: 'myUtil',
  //     file: './dist/bundle.browser.js',
  //   },
  // ],
};
```

## 2.4.解决 commonjs 和三方库的问题

- `默认情况`下 rollup 只处理`es module`，那么如果我们使用的三方库使用的是 commonjs 导出方式，那么就不会打包使用的三方库
- **例子**
  - `案例一`比如引入了 lodash，但是 lodash 使用的是 commonjs 的导出方式，打包的时候就不会打包 lodash，那么使用的时候就会报错
  - `案例二`再或者，我们自己编写了一个文件使用的是 cjs 的方式导出，但是导入的时候使用的是 es 的方式，那么就会报错
- **解决**
  - 如果是`案例二`：那么只需要借助下面的插件即可
    - `npm install @rollup/plugin-commonjs -D `
    - 这个插件可以帮助我们在 cjs 和 es 之间相互转换
  - 如果是`案例一`，那么`还需要`借助下面这个插件
    - `npm install @rollup/plugin-node-resolve -D`
    - 这个插件帮助我们解析引入 node_modules 中的三方库路径的问题
-

```javascript
// 默认情况下rollup只会处理es module  但是引用了lodash lodash使用的是common js 所以要借助插件来解决

const commonjs = require('@rollup/plugin-commonjs');
const noderesolve = require('@rollup/plugin-node-resolve');

module.exports = {
  // 入口
  input: './lib/index.js',

  // 出口
  output: {
    format: 'umd', // 打包的环境
    name: 'myUtil', // 使用umd必须要有name 这样打包到浏览器中这个名字就会作为全局的变量
    file: './dist/bundle.js', // 打包文件到哪里
    // 创建 iife 或 umd 格式的 bundle 时，你需要通过 output.globals 选项来提供全局变量名称，以替换外部引入
    globals: {
      lodash: '_',
      dayjs: 'dayjs',
    },
  },
  external: ['lodash'], // 忽略打包某个库 这时候要提醒使用者安装这个库才能正常使用我们的库或框架
  plugins: [commonjs(), noderesolve()],
};
```

## 2.5.代码转换

- **rollup 中处理文件都是使用插件来完成的**
- **rollup 插件查询地址：**https://github.com/rollup/awesome
- terser 官网文档没更新 使用`npm i @rollup/plugin-terser`

```javascript
// 默认情况下rollup只会处理es module  但是引用了lodash lodash使用的是common js 所以要借助插件来解决

const commonjs = require('@rollup/plugin-commonjs');
const noderesolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');

module.exports = {
  // 入口
  input: './lib/index.js',

  // 出口
  output: {
    format: 'umd', // 打包的环境
    name: 'myUtil', // 使用umd必须要有name 这样打包到浏览器中这个名字就会作为全局的变量
    file: './dist/bundle.js', // 打包文件到哪里
    // 创建 iife 或 umd 格式的 bundle 时，你需要通过 output.globals 选项来提供全局变量名称，以替换外部引入
    globals: {
      lodash: '_',
      dayjs: 'dayjs',
    },
  },
  external: ['lodash'], // 忽略打包某个库 这时候要提醒使用者安装这个库才能正常使用我们的库或框架
  plugins: [
    commonjs(),
    noderesolve(),
    babel({ presets: ['@babel/preset-env'] }), // babel配置也可以单独放在一个配置文件 同webpack一样
    terser(),
  ],
};
```

## 2.6.处理 css 文件

- 这里使用 postcss
- `yarn add postcss rollup-plugin-postcss --dev `

```javascript
const postcss = require('rollup-plugin-postcss');

module.exports = {
  // 入口
  input: './src/index.js',

  // 出口
  output: {
    format: 'iife', // 打包的环境
    name: 'myUtil', // 使用umd必须要有name 这样打包到浏览器中这个名字就会作为全局的变量
    file: './dist/bundle.js',
  },
  plugins: [
    postcss({
      plugins: [require('postcss-preset-env')], // 也可以单独放到一个配置文件中配置
    }),
  ],
};
```

## 2.7.处理 vue 文件

- 使用的是 rollup-plugin-vue 插件
- `npm i rollup-plugin-vue`
- 但是打包后浏览器运行会报错
  - 因为 vue 打包的时候会用到 process.env.NODE_ENV 所以在打包后的源码中添加这个变量
- 还需要借助@rollup/plugin-replace 插件
- `npm install @rollup/plugin-replace -D `

```javascript
const vue = require('rollup-plugin-vue');
const replace = require('@rollup/plugin-replace');

module.exports = {
  // 入口
  input: './src/index.js',

  // 出口
  output: {
    format: 'iife', // 打包的环境
    name: 'myUtil', // 使用umd必须要有name 这样打包到浏览器中这个名字就会作为全局的变量
    file: './dist/bundle.js', // 打包文件到哪里
  },
  plugins: [
    vue(),
    // vue打包的时候会用到 process.env.NODE_ENV 所以在打包后的源码中添加这个变量
    // 如果是 'production'  解析的时候会将引号去掉，那么就是production  会报错因为没有定义这个变量  所以要 `'production'` 即使引号去掉了也还是一个字符串
    replace({
      'process.env.NODE_ENV': `'production'`,
    }),
  ],
};
```

## 2.8.搭建本地服务器

- **步骤一**：使用 rollup-plugin-serve 搭建服务
  - `npm i rollup-plugin-serve -D `
- **步骤二**：文件发生变化，自动刷新浏览器
  - `npm install rollup-plugin-livereload -D`
- **步骤三**：启动命令 -w 是 watch 的简写
  - `npx rollup -c -w`

```javascript
const server = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

module.exports = {
  // 入口
  input: './src/index.js',

  // 出口
  output: {
    format: 'iife', // 打包的环境
    name: 'myUtil', // 使用umd必须要有name 这样打包到浏览器中这个名字就会作为全局的变量
    file: './dist/bundle.js', // 打包文件到哪里
  },
  plugins: [
    server({
      port: 8888,
      open: true,
      contentBase: '.', // 启动文件夹 展示那个文件夹下的文件
    }),
    livereload(),
  ],
};
```

## 2.9.区分开发环境

- 比如我们在开发环境中是不需要压缩代码的，那么我们如何判断是开发还是生产环境呢？
- 在执行命令的时候加上` --environment NODE_ENV:production`
  - `eg: rollup -c --environment NODE_ENV:production`
- 那么在配置文件中可以通过`process.env.NODE_ENV`可以拿到`production这个值`

```javascript
const commonjs = require('@rollup/plugin-commonjs');
const noderesolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const postcss = require('rollup-plugin-postcss');
const server = require('rollup-plugin-serve');
const livereload = require('rollup-plugin-livereload');

const isProd = process.env.NODE_ENV;

const plugins = [
  commonjs(),
  noderesolve(),
  babel({ presets: ['@babel/preset-env'] }), // babel配置也可以单独放在一个配置文件 同webpack一样

  postcss({
    plugins: [require('postcss-preset-env')], // 也可以单独放到一个配置文件中配置
  }),
];
// 区分环境 比如开发环境不需要压缩代码
if (isProd) {
  plugins.push(terser());
} else {
  const extraPlugins = [
    server({
      port: 8888,
      open: true,
      contentBase: '.', // 启动文件夹 展示那个文件夹下的文件
    }),
    livereload(),
  ];
  plugins.push(...extraPlugins);
}

module.exports = {
  // 入口
  input: './src/index.js',

  // 出口
  output: {
    format: 'iife', // 打包的环境
    name: 'myUtil', // 使用umd必须要有name 这样打包到浏览器中这个名字就会作为全局的变量
    file: './dist/bundle.js', // 打包文件到哪里
    // 创建 iife 或 umd 格式的 bundle 时，你需要通过 output.globals 选项来提供全局变量名称，以替换外部引入
    globals: {
      lodash: '_',
      dayjs: 'dayjs',
    },
  },
  plugins,
};
```

# 3.快速开发工具 vite

## 3.1.认识 Vite

- 官方的定位:下一代前端开发与构建工具;

## 3.2.vite 的构造

- **Vite 主要有两部分组成**
  - `一个开发服务器`，它基于 ES 模块提供了丰富的内建功能，HMR 的速度非常快
  - `一套构建指令`，它使用 rollup 打包我们的代码，并且它是预配置的，可以输出生产环境的优化过的静态资源
- **在浏览器支持 ES 模块之前,JavaScript 并没有提供原生机制让开发者以模块化的方式进行开发**
  - 这也正是我们对 “打包” 这个概念熟悉的原因:使用工具抓取、处理并将我们的源码模块串联成可以在浏览器中运行的文件
  - 时过境迁，我们见证了诸如 webpack、Rollup 和 Parcel 等工具的变迁，它们极大地改善了前端开发者的开发体验。
  - 然而，当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相 当普遍
  - 基于 JavaScript 开发的工具就会开始遇到性能瓶颈:通常需要很长时间(甚至是几分钟!)才能启动开发服务器，即使使用 模块热替换(HMR)，文件修改后的效果也需要几秒钟才能在浏览器中反映出来。
- **Vite 旨在利用生态系统中的新进展解决上述问题**

## 3.3.浏览器原生支持模块化

- `现在浏览器已经支持模块化了`，但是如果直接使用原生开发而不使用工具会有以下的`问题`
  - `问题一：`引入的文件必须要写完整的后缀名
  - `问题二：`引入的文件如果还有引入其他文件那么所有的文件都会被加载，这对浏览器的压力非常大，会导致页面更新显示缓慢
    - 比如我们引入了 lodash 文件，但是 lodash 这个导出文件中又引入了几百个其他的文件，那么当运行在浏览器中，这几百个文件都会被加载即使没有使用，这会大大降低浏览器的性能
  - `问题三：`如果代码中有 ts、vue、react、less 等这些代码浏览器无法识别
- **事实上 vite 就帮我们解决上述的所有问题**

## 3.4.vite 的安装

- `npm i vite`

- 通过 vite 来启动项目
- `npx vite`
- 上述命令其实就是利用 vite 开启一个本地服务，然后这个服务会加载当前目录下的 index.html 文件(没有该文件浏览器会访问不到)

## 3.5.对 css 的支持

- **Vite 可以直接支持 css 的处理**
  - 直接导入 css 即可
- **Vite 可以直接支持 css 的预处理器，比如 less，**
  - 我们无需额外的配置（比如 webpack 中需要配置使用 loader 才能处理 less 文件），vite 默认配置好了，但是需要安装
  - 直接导入 less 文件
  - 之后安装 less 编译器即可
- **vite 直接支持 postcss 的转换**
  - 前提是需要安装，并且配置 postcss.congfig 的配置文件即可
  - 虽然 Vite 帮助我们配置好了 postcss 但是默认情况下 postcss 没有使用任何预设或者其他配置，所以这些配置我们需要自己配置，方便我们的拓展

## 3.6.对 TS 的支持

- **Vite 对 TypeScript 是原生支持的，他会直接使用 ESBuild 来完成编译(开发时)**
  - 只需要直接导入 ts 文件即可
- **我们查看浏览器中的请求，会发现请求的依然是.ts 结尾的文件**
  - 因为 vite 中的 Connect 会对我们的请求进行转发
  - 当浏览器请求.ts 文件后，connect 会请求本地转换后的.ts 文件，这个 ts 文件内部已经被转成了 js 文件，但是文件名依旧是.ts 结尾
- **注意：在 vite2 中已经不在使用 Koa，而是使用 Connect 来搭建服务器了**

## 3.7.对 Vue 的支持

- **对于三方框架的使用，需要使用一些插件来处理文件**
- 那么就需要在`vite.config.js`配置文件使用插件

- vite 对 vue 提供第一优先级的支持
  - 处理 Vue3 单文件的组件的插件：`npm i @vitejs/plugin-vue`
  - 处理 Vue3 JSX 组件的插件：`npm i @vitejs/plugin-jsx`
  - 处理 Vue2 组件的插件：`npm i @vitejs/vite-plugin-vue2`

**vite.config.js**

```javascript
// vite原生支持es module 所以这里可以使用es module的导入导出
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
});

// 上面的导出和下面的导出作用一样，唯一的区别是，上面的写属性会有代码提示
// export default {
//   plugins: [vue()],
// }
```

## 3.8.对 react 的支持

- **.jsx** **和** **.tsx** **文件同样开箱即用，它们也是通过** **ESBuild**来完成的编译:
  - 所以我们只需要直接编写 react 的代码即可;
  - 注意:在 index.html 加载 main.js 时，我们需要将 main.js 的后缀，修改为 main.jsx 作为后缀名;

## 3.9.Vite 打包项目

- 上面都是 Vite 在开发环境时候的配置
- 那么 Vite 这么打包项目呢，只需要执行下面命令即可
- `npx vite build`
- 如果运行打包后的文件，执行下面命令,会开启一个服务器，运行打包文件夹的文件
- `npx vite preview`

## 3.10.Vite 脚手架工具

- 在开发中，我们不可能所有的项目都是用 vite 从零去搭建
  - 这时候可以使用 vite 提供的脚手架工具
- 所以 Vite 实际上是有两个工具
  - `vite`：相当于一个构建工具，类似于 webpack、rollup
  - `@vitejs/create-app`：类似 vue-cli
- 使用脚手架
  - ​ `npm create vite`

## 3.11.ESBuild 的构建速度

- ESBuild 为什么这么快
  - 使用 Go 语言编写的，可以直接转换成机器码，而无需经过字节码在转成机器码(webpack、vite、rollup 需要转成字节码后在转成机器码)
  - ESBuild 可以充分利用 CPU 的多内核，尽可能让它们饱和运行;
  - ESBuild 的所有内容都是从零开始编写的，而不是使用第三方，所以从一开始就可以考虑各种性能问题;
    - webpack、vite、rollup 这些工具都有用到各种个样的库，所以是站在巨人的肩膀上
  - 等等....

# 4.开发自己的 CLI

## 4.1.基本使用

- 如何像别的脚手架工具一样，在命令行输入一个命令，就执行打包或别的操作呢

- 需要如下操作

  - **步骤一**：在`pickage.json`文件中添加`bin`属性，bin 的内容是对象

  - ```json
    // bin  是binary的缩写 也就是二进制的意思
    // 当我们在命令行中执行的命令 ymcli 就会执行对应的文件
    {
      ...
      "bin": {
        "ymcli": "./lib/index.js"
      },
    }
    ```

  - **步骤二**：在执行的文件中`顶部`添加`#!/usr/bin/env node`

    - 也就是上面对应的 lib/index.js 文件中
    - 这段话表示当我们执行 ymcli 命令的时候找到这个文件 系统就知道要用 node 来执行
    - `这段代码是固定的`

  - ```javascript
    #!/usr/bin/env node

    console.log('ym cli code execution~');
    ```

  - **步骤三**：如果是在本地的包，还没有发布到 npm 仓库中，我们需要执行`npm link`

    - 如果是在 npm 仓库中的包，也就是通过 npm install 安装到本地的包，会在当前环境变量中添加 bin 的命令 也就是会将`ymcli`添加到当前环境变量中。可以直接通过在命令行中输入 ymcli 执行对应的代码
    - 但是如果这个包没有发布，我们还在开发中，需要手动的在当前的环境变量中将 bin 中的命令添加到当前环境变量中,输入` npm link`即可

## 4.2.处理参数

- 这里要借助`commander`这个库帮忙处理传入的参数
- `npm i commander`
- eg：ymcli -v 就打印版本

```javascript
#!/usr/bin/env node
// commander包 可以帮助我们解析命令行的参数
const { program } = require('commander');

// 解析参数
// process.argv 可以拿到命令行中输入的命令参数

// 处理--version操作
const version = require('../package.json').version;
program.version(version, '-v -V --version'); // 通过-v -V --version 都可以触发 --version效果

// 增加其他的options选项
program.option('--desc', 'a cli program~');

// 参数一 是命令行后面跟的参数 -d --dest都是一样的 <dest>表示额外的参数 注意：<dest> 要和参数的最后一个同名  也就是 --dest <dest>  获取的时候通过dest来获取额外的参数
// 参数二 输入--help 告诉 -d --dest 是干嘛的 一个描述
program.option('-d --dest <dest>', 'a destination folder, eg: -d src/view');

// 监听help  只能监听--help  而且需要在program.parse之前
program.on('--help', () => {
  console.log('');
  console.log('others:');
  console.log('  xxx');
});

// 让commander解析process.argv参数
program.parse(process.argv);

// 获取而外传递的参数
console.log(program.opts().dest);
```

## 4.3.下载模版

- 上面的步骤已经可以使用命令行的方式来执行操作，但是我们需要的是可以像 vue cli 那样，可以下载一个模版
- 这时候需要借助`download-git-repo库`，这个库可以克隆 github 等仓库的文件
- `npm i download-git-repo`

```javascript
const { promisify } = require('util');
// 因为download 不支持promise的写法 所以用promisify将download变成支持promise的写法
const download = promisify(require('download-git-repo'));

// 如果clone的是main分支需要加#main  这库的语法具体可以去查
const VUE_REPO = 'direct:https://github.com/xxx/git#main';

async function cteateActions(project) {
  try {
    await download(VUE_REPO, project, { clone: true });

    // 安装方式二选一即可
    // 1. 让用户手动安装
    console.log(`
      cd ${project}
      npm install
      npm run dev
    `);
    // 2. 自动安装并运行 见下4.4
    // 参数一  让node执行的命令 参数二 命令后面跟的参数  参数三 告诉在哪个目录输出
    // 由于window要使用npm.exe 所以这里要区分一下  process.platform可以拿到当前系统
    const commandName = process.platform === 'win32' ? 'npm.exe' : 'npm';
    await execCommand(commandName, ['install'], { cwd: `./${project}` });
    await execCommand(commandName, ['run', 'dev'], { cwd: `./${project}` });
  } catch (error) {
    console.log(`github 连接失败 请稍后重试`);
  }
}

module.exports = {
  cteateActions,
};
```

index.js

```javascript
#!/usr/bin/env node
// commander包 可以帮助我们解析命令行的参数
const { program } = require('commander');
const helpOptions = require('./core/help-options');
const { cteateActions } = require('./core/actions');

// 1. 配置所有options
helpOptions(program);

// 2.增加具体的功能操作
program
  .command('create <project> [...others]') // 创建的命令
  .description(
    'cteate a vue project into a folder,eg: ymcli create demo_project',
  ) // 命令的描述
  .action(cteateActions); // 使用该命令执行的操作

// 让commander解析process.argv参数
// process.argv 可以拿到命令行中输入的命令参数
program.parse(process.argv);
```

## 4.4.对下载的模版执行 node 命令

- 有些脚手架将模版下载下来 给用户提示，要用户自己安装，自己执行命令
- 但是我们希望下载下来可以自动安装，并且执行命令
- 这时候要借助 node 子进程来帮助我们执行

```javascript
const { spawn } = require('child_process');

function execCommand(...args) {
  return new Promise((resolve) => {
    // npm install/npm run dev
    // 1.开启子进程执行命令
    const childProcess = spawn(...args);

    // 2.将子进程的信息和错误输出到当前进程
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    // 3.监听子进程执行结束
    childProcess.on('close', () => {
      resolve();
    });
  });
}

module.exports = {
  execCommand,
};
```

## 4.5.自动化添加 vue 组件命令

- 有这么一个场景
  - 我们开发后台管理系统的时候，需要创建菜单路由，每个子菜单其实都是一个 vue 组件
  - 那么这时候我们可以手动的一个一个创建
  - 也可以使用一个命令，自动化创建，孰快一看便知
- 原理
  - 当我们执行添加组件命令的时候，将我们事先编写好的 vue 模版，拷贝一份到目标文件夹中即可
  - 但是模版中的部分东西比如 `<div class="">`这个 class 我们不希望写死，而是外界动态传入的
  - 这时候需要借助`ejs`来帮助我们，这个库可以帮我们替换掉模版中的变量 (用法去官网看`https://ejs.bootcss.com/`)
  - `npm i ejs`

template.ejs

```javascript
<template>
  <div class="<%= name %>">
    <%= name %>.vue
  </div>
</template>

<script setup></script>

<style scoped>
  .<%=name %> {}
</style>
```

actions.js

```javascript
const { compileEjs } = require('../utils/compile-ejs');
const { program } = require('commander');

const fs = require('fs');

function writeFile(path, content) {
  return fs.promises.writeFile(path, content);
}

// 添加一个vue组件
// 默认在src/components添加
// 指定目录添加  ymcli addcpn navBar --dest ./src/views/home
async function addComponentAction(cpnname) {
  try {
    const dest = program.opts().dest || './src/components';
    // 1.读取模版文件，修改文件中的数据
    const content = await compileEjs(`component.vue.ejs`, { name: cpnname });
    // 2.将修改的文件写入对应的文件夹
    await writeFile(`${dest}/${cpnname}.vue`, content);
    console.log(`创建组件${cpnname}成功`);
  } catch (error) {
    console.log('组建创建失败', error);
  }
}

module.exports = {
  cteateActions,
  addComponentAction,
};
```

index.js

```javascript
#!/usr/bin/env node
// commander包 可以帮助我们解析命令行的参数
const { program } = require('commander');
const helpOptions = require('./core/help-options');
const { cteateActions, addComponentAction } = require('./core/actions');

// 2.2.添加一个vue组件
program
  .command('addcpn <cpnname>')
  .description(
    'add a vue component into a folder, 默认在./src/components下添加 eg: ymcli addcpn  NavBar; 指定添加目录 eg： ymcli addcpn navBar --dest ./src/views/home',
  )
  .action(addComponentAction);

// 让commander解析process.argv参数
// process.argv 可以拿到命令行中输入的命令参数
program.parse(process.argv);
```

# 5.git 提交规范

## 5.1.前言

在团队开发中，或者自己的项目中，我们都会用到 git 来管理我们的代码，但是当我们 commit(git commit)的时候，是没有规范的，有的时我们偷懒甚至`git commit -m'..'`，这种提交虽然当时爽，但如果有一天我们需要回滚版本的时候，`git relog`，妈耶，这都是啥啊，如果在团队开发中这种情况更让人绝望。这时候，指定制定一套 commit 规范显得格外重要，我们可以借助`husky`和`Commitizen`这两个工具帮助我们来管理 commit

## 5.2.Husky

### 5.2.1 定义

- `git有自己的hooks(钩子)`，其实就是类似于 vue 的生命周期
  - 比如在提交代码前，会调用 pre-commit hook
  - 如果不好理解 hook，那么你就想 vue 中，页面加载时会先调用 created 函数，当 commit 的时候会先调用 pre-commit，这么一举例是不是好理解点，如果还是不理解，没关系，先用，后面有机会在理解
- 这些 hook 都在`.git/hooks`中以`.sample`结尾的文件就是`hook`
- 如果我们手动调用，那么就会很麻烦，所以`husky`这个工具就孕育而生，对，这个工具就是让我们`调用这些git hook简单点`

### 5.2.2.安装及使用

#### 5.2.2.1 安装

- `npx husky-init && npm install`

- 上面的命令会帮我们做以下的操作(官网给的解释，可以了解即可)
  1. 在`package.json`的`script`中添加`"prepare": "husky install",`
  2. 在当前根目录创建`.husky`文件夹，并且在当前文件夹中创建一个`pre-commit`的文件
     1. 这个文件其实就是一个可执行文件，他的作用就是 commit 之前会调用这个文件
  3. 配置 git hook 的路径

#### 5.2.2.2.使用

- 当我们执行 git commit 时，就会先执行 pre-commit 文件的内容了

- 我们可以在其中添加添加自己的命令，比如 npx eslint

- 意思是 commit 之前先用 eslint 来检查代码

- ```shell
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  npx eslint
  ```

### 5.2.3.添加 hook

- 上面说到在安装的时候会帮我们创建一个`pre-commit`hook 文件，那么我们自己想要添加一个 hook 该怎么做呢，比如我们想要添加一个在 commit 时候执行的 hook

- git hook 官网写的很清楚哦，这里就不再细述每个 hook 是干嘛的了。[git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)

- 做法很简答，执行以下命令即可

- 解读一下其实也不难

- `npx husky add .husky/commit-msg ` 使用 husky 在.husky 文件夹下添加是`commit-msg`的钩子

- `'npx --no -- commitlint --edit "$1"' `表示在调用该 hook 时候要执行的命令

- 所以通用命令是`npx husky add .husky/钩子 '命令'`

```shell
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## 5.3.Commitizen

### 5.3.1.定义和规范

- 这是一个规范我们提交代码的工具

**规范**

| Type | 作用 |
| --- | --- |
| feat | 新增特性 (feature) |
| fix | 修复 Bug(bug fix) |
| docs | 修改文档 (documentation) |
| style | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor) |
| perf | 改善性能(A code change that improves performance) |
| test | 测试(when adding missing tests) |
| build | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore | 变更构建流程或辅助工具(比如更改测试环境) |
| revert | 代码回退 |

### 5.3.2.安装

```shell
# 安装Commitizen
npm install commitizen -D
# 安装cz-conventional-changelog，并且初始化cz-conventional-changelog
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

### 5.3.3.使用

- 安装完毕后，之后我们要用`npx cz`来代替`git commit`

  - 安装完毕后会在 node_modules/bin 创建一个 cz 的可执行文件

- 执行`npx cz`会依次出现以下的选项

- ```shell
  # 选择一个此次commit的类型
  1.Select the type of change that you're committing:
  # 此次commit影响的文件有哪些 比如我这次提交只是修改a.vue中的某个东西 那么就只影响到a.vue
  2.What is the scope of this change (e.g. component or file name):
  # 简短的描述一下这次具体的改动最多91个字符
  3. Write a short, imperative tense description of the change (max 91 chars)
  # 详细的描写一下你的改动 如果没有按空格键跳过
  4.Provide a longer description of the change: (press enter to skip)
  # 这次改动是重大的改动吗 （比如发布了大的版本）
  5.Are there any breaking changes?
  # 这次改动修复了别人提交的issues（这个选项针对开源项目，写n即可）
  6.Does this change affect any open issues?
  ```

- 完成以上的步骤你的 commit 才算是完成

### 5.3.4.修改 commitizen 提交指令

- 如果不想每次都是用`npx cz`，有的人会感觉别扭，或者记不住

- 这时候可以在`package.json`的`script`添加一个指令

- ```json
  {
    "script": {
      "commit": "cz"
    }
  }
  ```

- 这样我们就可以使用`npm run commit`来代替`git commit`了

## 5.4.代码提交验证

- 上面我们虽然规范了代码提交的风格，但是我们 commit 的时候不按照该规范依然可以提交成功，那么这时候这个就成了防君子不防小人了，团队中难免有漏网之鱼（哈哈哈～）
- 所以我们还需要通过`commitlint`来限制提交

### 5.4.1.安装

- ```shell
  npm i @commitlint/config-conventional @commitlint/cli -D
  ```

### 5.4.2.使用

- **步骤一**：在根目录添加`commitlint.config.js`文件

- **步骤二**：配置文件

- ```javascript
  // 我们这里直接继承官方给的默认规则，如果想要更改，自动查
  module.exports = {
    extends: ['@commitlint/config-conventional'],
  };
  ```

- **步骤三**：使用 husky 生成 commit-msg(这是 commit 时的 hook)文件，验证提交信息：

- ```shell
  npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
  ```

- 现在我们 commit 的时候如果不符合规范是无法 commit 哦

**注意**

如果遇到`commitlint.config.js is treated as an ES module file as it is a .js file...`这个错误，是因为在`package.json`文件中添加了` "type": "module"`，将这个属性删除即可，或者将 js 文件的后缀改为`.cjs`即可，因为`"type": "module"`这个属性是表示该项目都要用 es module 的方式导出导入
