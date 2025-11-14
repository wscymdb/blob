# 1.定义

- webpack 是一个静态的模块化打包工具，为现代的 JavaScript 应用程序
- 官方解释
  - webpack is a `static module bundler` for `modern` JavaScript applications
- `打包bundler`：webpack 可以进行打包，所以是一个打包工具
- `静态的static`：webpack 最终可以将代码打包成静态资源
- `模块化module`：webpack 默认支持各种模块化开发
- `现代的modern`：现在的开发模式才需要打包

# 2.安装

- webpack 的安装目前分为：`webpack、webpack-cli`
- **两者的关系**
  - `执行webpack命令`，会执行 node_modules 下的.bin`目录下的webpack`
  - webpack 在执行时是依赖 webpack-cli 的，如果没有安装就会报错
  - 而`webpack-cli中代码执行时`，才是`真正利用webpack`进行编译和打包的过程
  - 所以在安装 webpack 时，需要同时安装 webpack-cli（第三方框架事实上没有用 webpack-cli 的，用的类似于自己的 vue-cervice-cli 的东西）

# 3.常见指令

**指定配置文件**

- 默认情况下 webpack 的配置文件是`webpack.config.js`
- 如果想`换成其他的`，就这终端输入`webpack --config 自定义名称`
  - webpack --config a.js

# 4.入口(entry)

## 单个入口简单写法

**string 形式**

```javascript
module.exports = {
  entry: './src/index',
};
```

**string\[\]形式**

- 这种情况下依赖项会按照数组的顺序依次加载

```javascript
// 打包的main.js中 会先引入index2的代码 然后引入index1的代码
module.exports = {
  entry: ['./src/index2', './src/index1'],
};
```

## 函数写法

- 这种写法方便拓展，可以动态配置入口

```js
// 示例 基于用户配置的动态入口
module.exports = {
  entry: async () => {
    // 可以从 API、数据库或配置文件动态获取入口
    const userConfig = await fetchUserConfig();
    const entries = {};

    userConfig.modules.forEach((module) => {
      if (module.enabled) {
        entries[module.name] = module.entryPath;
      }
    });

    return entries;
  },
};
```

## 对象写法

- 对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。

**多入口**

```js
// 这样打包的时候dist目录下就会有两个入口文件 分别是main.js和second.js
module.exports = {
  entry: {
    main: './src/index.js',
    second: './src/cc.js',
  },
};
```

**属性**

- **dependOn**: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。
- **filename**: 指定要输出的文件名称。
- **import**: 启动时需加载的模块。
- **runtime**: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。
- 更多见[官网](https://webpack.docschina.org/concepts/entry-points/#entry-description-object)

**dependOn**

vendor.js

```js
export const verndor = 'vendor';
```

index.js

```js
import { verndor } from './vendor';
console.log(verndor);
```

webpack.config.js

```js
// 如果不使用dependOn字段 那么打包的时候vendor和main会各打包各自的
// 如果使用了dependOn 那么打包的时候main.js不会打包vendor.js的内容 而是require进来
module.exports = {
  entry: {
    vendor: './src/vendor.js',
    main: {
      // 指定入口文件
      import: './src/index.js',
      // 声明该入口的前置依赖
      dependOn: 'vendor',
    },
  },
};
```

**runtime**

- **runtime**: 指定包含 Webpack 运行时代码的 chunk 名称
- **运行时代码**: 包含模块加载、模块交互等 Webpack 自有功能的代码

```js
// 下面打包会多出一个runtime-main.js 这个里面放的是运行时的代码 比如浏览器是不认识cjs的require语法的 所以webpack就会自己实现一个
// 如果runtime没写或者为false 那么打包的时候mian.js内就会有一套webpack自己实现的require方法
// 如果不为false 那么就会生成runtime对应的value 如下示例中也就是runtime-main.js
// 里面放的是require方法 然后mian.js就会生成require方法 而且引入runtime-main

// 如果多入口的情况下runtime的value相同那么也只会打包一份运行时代码
// 如果不同则会打包多个
module.exports = {
  entry: {
    main: {
      import: './src/index.js',
      runtime: 'runtime-main',
    },
    main1: {
      import: './src/index1.js',
      runtime: 'runtime-main',
    },
  },
};
```

# 4.loader

## 4.1.loader 配置方式

- `module.rules`中允许我们配置多个 loader

**module.rules 配置**

- rules 属性对应的值是一个`数组`: **\[Rule\]**
- 数组中存放的是一个个 Rule，`Rule是一个对象`，对象中可以设置多个属性
  - `test属性`：用于对 resource(资源)进行匹配，通常会设置成`正则表达式`
  - `use属性`：对应的值是一个数组\[UseEntry\]
    - UseEntry 是一个对象，可以通过对对象的属性来设置一些其他属性
      - loader:必须有一个 loader 属性，对应的是一个字符串
      - options：可先的属性，值是一个字符串或对象，会被传入到 loader 中
      - query:目前已经使用 options 来代替
    - userEntry 是一个字符串：是 loader 的一种简写
  - `loader属性`：如果只有一个 loader 时候，可以使用这个属性简写

```javascript
const path = require('path');
module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 告诉webpack匹配什么样的文件
        test: /\.css$/,
        // 详细写法
        // use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        // 简写一：只有一个loader的情况
        // loader: "css-loader",
        // 简写二:多个loader不需要其他属性
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

### 4.2 resourceQuery

这是 rules 里面的一个属性，类型是一个正则，此选项用于测试请求字符串的查询部分（即从问号开始）。

**注意 resourceQuery 和 test 并不冲突，test 匹配文件路径和文件名 resourceQuery 匹配的是?后面的**

**webpack.config.js**

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        resourceQuery: /inline/,
        use: 'url-loader',
      },
      {
        test: /\.css$/,
        resourceQuery: /custom/,
        use: 'style-loader',
      },
    ],
  },
};
```

**举例**

```jsx
import from './index.css?custom'
// 这样导入就会命中rules的最后一项
// 因为resourceQuery匹配的是?后面的内容
```

### 4.3 oneOf

**主要作用是提高规则匹配效率和避免冲突**

这是 rules 里面的一个属性，类型是数组，他的作用是只查找一次，也就是从这个数组中从第一个开始查找，只要匹配到了，后面就不会继续查找，如果都没有匹配到就不会应用

**webpack.config.js**

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          // 这些规则按顺序匹配，第一个匹配成功后停止
          //
          {
            resourceQuery: /inline/, // foo.css?inline
            use: 'url-loader',
          },
          {
            resourceQuery: /external/, // foo.css?external
            use: 'file-loader',
          },
          {
            use: 'file-loader', // 兜底 都没匹配到就会应用这个
          },
        ],
      },
    ],
  },
};
```

**举例**

```jsx
import from './index.css?inline'

// 因为导入的是一个css文件 所以就会命中如下的规则
// 然后又因为使用oneOf 所以就会在oneOf中从第一个开始查找
// oneOf第一个item使用了resourceQuery
// 所以本次导入就会命中，就会使用这个里面的内容，然后停止oneOf里面其余的查找
```

### 4.4.css-loader

### 4.5.style-loader

### 4.6.less-loader

# 5.postcss 工具

**作用**

- PostCSS 是一个通过 Javascript 来转换样式的工具
- 这个工具可以进行一些`CSS的转换和适配`，比如自动添加浏览器前缀、css 样式的重置
- 实现这些功能需要`借助PostCSS对应的插件`

**注意**

- PostCSS 通常需要配合  **Browserslist**  来工作，特别是当使用  **Autoprefixer**  这样的插件时。
  - 因为 Autoprefixer 依赖 Browserslist，Autoprefixer 根据 Browserslist 配置自动添加浏览器前缀
- 其他 PostCSS 插件也使用 Browserslist
  - `postcss-preset-env`
  - `postcss-normalize`
  - 其他 CSS 转换工具

**使用**

- 第一步：查找 PostCSS 在构建工具中的扩展，比如 webpack 中的 postcss-loader；
- 第二步：选择可以添加你需要的 PostCSS 相关的插件；

**安装**

`npm install postcss-loader -D`

## 5.1.使用 postcss 里面的插件

### **autoprefixer**

- autoprefixer 是给需要添加 css 前缀的属性添加前缀
- 需要下载 npm install autoprefixer -D

```javascript
module: {
    rules: [
        {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                "less-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: ["autoprefixer"],
                        },
                    },
                },
            ],
        },
    ],
},
```

- 上面的配置让页面显得太复杂了
- 可以使用一个`postcss.config.js`文件

**postcss.config.js**

```javascript
module.exports = {
  plugins: ['autoprefixer'],
};
```

**webpack.config.js**

```javascript
{
    rules: [

        {
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                "less-loader",
                "postcss-loader",
            ],
        },
    ],
},
```

#### postcss-preset-env

- 事实上，在配置 postcss-loader 时，并不需要 autoprefixer 插件
- 可以使用`postcss-preset-env`插件
- 这个插件可以自动将一些`现代的CSS特性`，`转换成大多数浏览器认识的CSS`，并且会根据目标浏览器或者运行时环境添加所需的 polyfill
- 也包括自动帮助我们添加 autoprefixer(相当于内置了 autoprefixer 插件)

postcss.config.js：

```javascript
module.exports = {
  plugins: ['postcss-preset-env'],
};
```

# 6.asset module type

- webpack5 之前加载类似图片资源、文字资源需要用对应的 loader 进行处理，webpack5 内置了这些 loader，只需要设置对应的 type 即可
- 资源模块类型
  - `asset/resource`：生成一个单独的文件并导出 URL
    - 之前通过使用 file-loader 使用
  - `asset/inline`：导出一个资源的 data URI
    - base64 格式
    - 之前通过使用 url-loader 实现
  - `asset/source`：导出资源的源代码
    - 拿到文件的二进制代码
    - 之前通过 raw-loader 实现
  - `asset`：在 asset/inline 和 asset/resource 之间自动选择
    - 之前通过 url-loader，并配置资源体积实现

## 6.1.**根据图片大小设置不同资源类型**

- 开发中我们往往希望小点的照片使用 base64 格式，大点的照片生成一个单独的文件
- 只需要两步
  1. 将 type 设置为 asset
  2. 添加一个 parser 属性，并且制定 dataUrl 的条件，添加 maxSize 属性
- 如果`大于maxSize`的文件将会使用`asset/resource`类型，反之使用`asset/inline`类型
- maxSize 的单位是字节(byte)

```javascript
module: {
    rules: [
        {
            test: /\.(jpe?g|png|svg|gif)$/,
            // type: "asset/resource",
            // type: "asset/inline",
            // type: "asset/source",
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 60 * 1024, // 60KB
                },
            },
        },
    ],
}
```

## 6.2.生成自定义的文件名

- 可以在 output 的 assetFilename 中设置
- 也可以在`匹配对应规则之后设置(常用)`
  - 在`generator`属性中指定

```javascript
module: {
    rules: [
        {
            test: /\.(jpe?g|png|svg|gif)$/,
            // type: "asset/resource",
            // type: "asset/inline",
            // type: "asset/source",
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 60 * 1024,
                },
            },
            generator: {
                // 占位符
                // name:指向原文件的名称
                // ext：拓展名
                // hash：webpack生成的hash值
                // [hash:8]:指定截取hash的数量
                // 还可以指定一个文件夹 在文件前面加文件夹名称即可
                filename: "images/[name]_[hash:8][ext]",
            },
        },
    ],
}
```

# 7.babel 工具

- Babel 是一个工具链，主要用于旧浏览器或者环境中将 ECMAScript 2015+代码转换为向后兼容版本的 JavaScript；
- 包括：语法转换、源代码转换等；

## 使用 babel 中的插件

- 单独设置 babel-loader 是不会将箭头函数、const 这些转成 es5 的代码的，需要使用插件进行配置
- 这里使用 Babel 的预设插件
  - 这个插件内置了很多常用的插件

**安装**

`npm install @babel/preset-env -D`

```javascript
module: {
    rules: [

        {
            test: /\.js$/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        plugins: ["@babel/plugin-transform-arrow-functions"],
                    },
                },
            ],
        },
    ],
}
```

- 上面的配置还可以抽成一个单独的配置文件`babel.config.js`

- 如果是预设，那么要添加在`presets`属性中

- ```javascript
  module.exports = {
    // plugins: ["@babel/plugin-transform-arrow-functions"],
    presets: ['@babel/preset-env'],
  };
  ```

**常见的预设**

- env：将 es6 转为 es5
- react
- TypeScript

# 8.resolve 模块

- resolve 用于设置模块如何解析
  - 在开发中会有各种各样的模块依赖
  - resolve 可以帮助 webpack 从每个 require/import 语句中，找到需要引入到合适的模块代码

**webpack 能解析三种文件路径**

- 绝对路径
  - 给出了绝对路径，因此不需要在做进一步的解析
- 相对路径
  - 使用 import 或 require 的资源文件所处的目录，被认为是上下文目录
  - 在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径
- 模块路径
  - 在 resolve.modules 中指定的所有目录检索
    - 默认值是`['node_modules']`，所以默认会从 node_modules 中查找文件

**确定文件还是文件夹**

- 如果是一个文件

- 如果文件具有拓展名，则直接打包
- 否则，将使用 resolve.extensions 选项作为文件拓展名解析

```javascript
module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue'],
  },
};
```

- 如果是一个文件夹

  - 会在文件夹中根据 resolve.mainFiles`配置选项中指定的文件顺序查找`
    - resolve.mainFiles 的默认值是['index']
    - 再根据 resolve.extensions 来解析拓展名

```javascript
module.exports = {
  resolve: {
    mainFiles: ['index'],
  },
};
```

## **alias**

- 起别名

```javascript
module.exports = {
  resolve: {
    mainFiles: ['index'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};
```

# 9.webpack 常见的插件(plugin)

## 9.1.认识 plugin

- Loader 是`用于特定的模块类型`进行转换
- Plugin 可以用于`执行更加广泛的任务`，比如打包优化、资源管理、环境注入等

## 9.2.CleanWebpackPlugin

- 每次打包之后将之前的打包文件夹删除

**安装**

npm install clean-webpack-plugin -D

**配置文件**

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "bundle.js",
    },
    module: {}

    plugins: [new CleanWebpackPlugin()],
};
```

## 9.3.HtmlWebpackPlugin

- 生成一个 html 文件

**安装**

npm install html-webpack-plugin -D

**配置**

- 自定义模板数据填充
  - title：生成 html 的 title 属性
  - template：按照模板生成 html 文件

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "bundle.js",
    },
    module: {}

    plugins: [  new HtmlWebpackPlugin({
    title: "我是大帅逼",
    template: "./index.html",
})],
};
```

## 9.4.DefinedPlugin

- DefinedPlugin`允许在编译时创建配置的全局常量`
- 是一个 webpack 的`内置插件`，无需安装

**配置**

- 注意：配置的值在解析的时候`会当成代码解析`，所以要`加引号`让他变成字符串

- 默认注入的全局变量

  - `process.env.NODE_ENV`：判断当前的开发环境

- ```javascript
  const { DefinePlugin } = require("webpack");
  module.exports = {
      entry: "./src/main.js",
      output: {
          filename: "bundle.js",
      },
      module: {}

      plugins: [  new DefinePlugin({
      named: "'Jack'",
  })],
  };
  ```

# 10.Mode 配置

- 可以告知 webpack`使用相应的内置优化`
  - 默认值是`production`
  - 可选值有：'none' | 'development' | 'production'

# 11.devServer

- 监听代码变化，自动编译并且刷新浏览器
- webpack-dev-server 在编译之后`不会生成文件到文件夹中`，而是启动一个本地服务，将编译好的代码放入到本地服务中，浏览器在过来请求拿到文件

**安装**

`npm install webpack-dev-server -D`

**命令**

`webpack serve`

## 11.1.热模块替换(HMR)

### 定义

- HMR 的全称是`Hot Module Replacement`
- 模块热替换是指在 `应用程序运行过程中`，`替换、添加、删除模块`，而`无需刷新整个页面`

**优点**

- 不重新加载整个页面，这样可以保留某些应用程序的状态不丢失
- 只更新需要变化的内容，节省开发时间
- 修改了 css、js 源码，会立即在浏览器更新

**使用**

- 默认情况下，webpack-dev-server 已经支持 HMR，只需要开启即可(`默认开启`)
- 在不启用 HMR 的情况下，当修改了源代码之后，整个页面会自动刷新，使用的是 live reloading

修改 webpack 配置

```javascript
module.exports = {
  devServer: {
    hot: true,
  },
};
```

**指定哪些模块需要热更新**

- 注意：如果入口文件发生了变化，还是会刷新整个网页的

```javascript
if (module.hot) {
    console.log("hot");
    module.hot.accept("./utils/demo.js", () => {
        console.log("mian.js is changed");
    });
```

- 在`框架中`，框架已经对每个组件开启了 HMR，所以`不用手动设置`

## 11.2.devServer 配置

**port**

- 设置端口号

**host**

- 配置主机
- 设置成：`local-ipv4`
  - 监听 IPV4 上所有的地址，在根据端口找到不同的应用程序

**open**

- 是否打开浏览器

**compress**

- 是否为打包后的代码压缩 gzip compression
- 默认值是`true`
