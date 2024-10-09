# 1.git 提交规范

## 1.1.前言

在团队开发中，或者自己的项目中，我们都会用到 git 来管理我们的代码，但是当我们 commit(git commit)的时候，是没有规范的，有的时我们偷懒甚至`git commit -m'..'`，这种提交虽然当时爽，但如果有一天我们需要回滚版本的时候，`git relog`，妈耶，这都是啥啊，如果在团队开发中这种情况更让人绝望。这时候，指定制定一套 commit 规范显得格外重要，我们可以借助`husky`和`Commitizen`这两个工具帮助我们来管理 commit

## 1.2.Husky

### 1.2.1 定义

- `git有自己的hooks(钩子)`，其实就是类似于 vue 的生命周期
  - 比如在提交代码前，会调用 pre-commit hook
  - 如果不好理解 hook，那么你就想 vue 中，页面加载时会先调用 created 函数，当 commit 的时候会先调用 pre-commit，这么一举例是不是好理解点，如果还是不理解，没关系，先用，后面有机会在理解
- 这些 hook 都在`.git/hooks`中以`.sample`结尾的文件就是`hook`
- 如果我们手动调用，那么就会很麻烦，所以`husky`这个工具就孕育而生，对，这个工具就是让我们`调用这些git hook简单点`

### 1.2.2.安装及使用

#### 1.2.2.1 安装

- `npx husky-init && npm install`

- 上面的命令会帮我们做以下的操作(官网给的解释，可以了解即可)
  1. 在`package.json`的`script`中添加`"prepare": "husky install",`
  2. 在当前根目录创建`.husky`文件夹，并且在当前文件夹中创建一个`pre-commit`的文件
     1. 这个文件其实就是一个可执行文件，他的作用就是 commit 之前会调用这个文件
  3. 配置 git hook 的路径

#### 1.2.2.2.使用

- 当我们执行 git commit 时，就会先执行 pre-commit 文件的内容了

- 我们可以在其中添加添加自己的命令，比如 npx eslint

- 意思是 commit 之前先用 eslint 来检查代码

- ```shell
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  npx eslint
  ```

### 1.2.3.添加 hook

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

## 1.3.Commitizen

### 1.3.1.定义和规范

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

### 1.3.2.安装

```shell
# 安装Commitizen
npm install commitizen -D
# 安装cz-conventional-changelog，并且初始化cz-conventional-changelog
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

### 1.3.3.使用

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

### 1.3.4.修改 commitizen 提交指令

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

## 1.4.代码提交验证

- 上面我们虽然规范了代码提交的风格，但是我们 commit 的时候不按照该规范依然可以提交成功，那么这时候这个就成了防君子不防小人了，团队中难免有漏网之鱼（哈哈哈～）
- 所以我们还需要通过`commitlint`来限制提交

### 1.4.1.安装

- ```shell
  npm i @commitlint/config-conventional @commitlint/cli -D
  ```

### 1.4.2.使用

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
