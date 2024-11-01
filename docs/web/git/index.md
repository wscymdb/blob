# 1. git

## 1.1.用户名和邮箱配置

**命令**

```
git config --global user.name  "名称"
git config --global user.email  "邮箱"
```

## 1.2.文件的状态

- `未跟踪(Untracked)`：默认情况下，git 仓库下的文件没有添加到 git 仓库中，需要通过 add 命令来操作
- `已跟踪(tracked)`：添加到 Git 仓库的文件处于已跟踪状态，git 可以对其进行各种跟踪管理

**已跟踪文件状态**

- `staged（暂缓）`：暂缓区的文件状态
- `Unmodified（未修改）`：commit 命令，可以将 staged 中的文件提交到 Git 仓库
- `Modified（修改）`：修改某个文件后，会处于 Modified 状态

## 1.3.git 相关命令

**查看状态**

```
git status  // 查看文件的状态
git status -s // 查看文件的状态(简洁显示)
git status --short // 查看文件的状态(简洁显示)
```

暂存

```
git add .  // 暂存全部文件
git add 文件名  // 暂存某个文件
```

**提交**

```
git commit -m 'message'  // 添加到本地仓库
git commit -a -m '自定义内容'   // 添加到暂缓去并且提交的本地仓库
```

**log**

```
git log  // 查看提交历史 最近的更新排在最上面

git log --pretty=oneline  // 每行显示一条信息

git log --pretty=oneline --graph  // 如果有多个分支合并到主分支，此操作可以查看每次提交来自于哪个分支
```

## 1.4.忽略文件

- 创建一个`.gitignore`文件用于忽略某些不需要提交的文件
- 一般不需要自己手动编写，脚手架会自动生成

## 1.5.git 的校验和

- git 中所有的数据在存储前都计算校验和，然后以`校验和`来引用
  - git 用以计算校验和的机制叫做 SHA-1 散列(hash)
  - 这是一个由 40 个十六进制字符(0-9 和 a-f)组成的字符串，基于 git 中文件的内容或目录结构计算出来
- 每次 commit 的时候都有一个 id 这个 id 就是校验和

## 1.6.版本回退

- 如果想要进行版本回退，需要直到目前处于哪个版本：git 通过 HEAD 指针记录当前版本
  - HEAD 是当前分支引用的指针，他总是指向该分支上的最后一次提交
  - 可以将`HEAD`看作是`该分支的最后一次提交的快照`

**命令**

- 上一个版本就是 HEAD^，上上一个版本就是 HEAD^^
- 如果上 10 个版本，可以使用 HEAD~10
- 也可以指定某一个版本的 commit id

```
git reset --hard HEAD^
git reset --hard HEAD~10
git reset --hard commitID  // commitID 只需要取不同的即可(比如取前8位)
```

**reflog**

- 记录了所有的操作
- 可以用来撤销回退的版本
  - 拿到回退之前的版本，然后回退过去

```
git reflog
```

## 1.7.验证方式-SSH 密钥

- Secure Shell(安全外壳协议，简称 SSH)是一种加密的网络传输协议，可在不安全的网络中为网络服务提供安全的传输环境
- SSH 以非对称加密实现身份验证

**生成密钥的命令**

```
ssh-keygen -t ed25519 -C '邮箱'
```

- 将生成的公钥放到服务器即可

## 1.8.管理远程仓库

**查看远程仓库地址**

```
git remote
git remote -v  // 完整版
```

**添加远程地址**

```
git remote add 仓库名 仓库地址
eg: git remote add origin http://www.xxx.com
```

**操作远程仓库**

```
// 重命名远程地址
git remote rename  旧名称  新名称

// 移除远程地址
git remote remove 仓库名
```

**操作远程仓库的完整流程(非 clone 的仓库)**

```
1. 创建本地仓库
git init
2. 提交本地代码到本地仓库
git add .
git  commit -m 'xxx'
3.远程连接
git romote add origin  git@gitee.com:wscymdb/main-process-of-scaffold.git
4. 拉取并且合并远程仓库到本地
git pull
```

```
第四步会遇到两个问题：
问题一：
	原因是git本地仓库要和远程仓库的哪个分支相互链接
解决：
	git pull <remote> <branch>
	git pull origin master
但是每次pull的时候都要写后面的太麻烦,所以可以设置上游分支，这样以后就可以直接pull了

设置上游分支
	// git branch --set--upstream-to=origin/<branch> master

	git branch --set-upstream-to=origin/master master

问题二：

报错：fatal: refusing to merge unrelated histories

原因：
	Git2.9版本之后，不允许两个没有共同基础的两个分支相互合并，因为如果本地仓库是一个没有经验或没有规范的提交，那么本地就会有很多提交历史，如果合并到远程仓库，会导致远程仓库也有很多历史提交，显然这些是无用的，所以Git2.9之后就不被允许了

解决：
	添加：–-allow-unrelated-histories
	git pull –-allow-unrelated-histories
```

### 1.8.1.远程仓库的交互

**获取代码**

```
git clone <远程仓地址>
```

**推送**

- `默认情况下是将当前分支(比如master) push到 origin远程仓库的`

```
git push
git push origin master
```

- `注意`：

  - 当使用本地仓库链接远程仓库的时候，如果当前 push 所在的本地仓库和云仓的分支不一样的时候，使用 git push 默认情况下是使用的当 simple，如果云端没有当前本地的分支那么就会报错
  - Git2.0 版本之后 push.default 的值是`simple`
  - 所以设置 push 的默认值为`upstream`即可

  ```
  git config push.default upstream

  push.default的值
  1.simple(默认)：推送当前分支到远程仓库同名分支，没有同名分支会报错
  2.current：推送当前分支到远程仓库同名分支，没有同名分支会在远程仓库创建一个同名的分支
  2.upstream:推送当前分支的上游分支到远程仓库同名的分支
  ```

**获取最新代码**

- `默认情况下是从origin中获取代码`

```
git fetch
git fetch origin master
```

- `获取代码后默认并没有合并到本地仓库，许哟啊通过merge来合并`

```
git merge
git merge origin/master  // 表示将origin仓库的master分支合并到当前分支
```

**获取并合并**

- `是git fetch和gitmerge的合并写法`

```
git pull
```

## 1.9.Git 标签

- 对于重大的版本常常会打上一个标签，以表示他的重要性
- 比较由代表性的是人们会使用这个功能来标记发布节点

**创建标签**

- Git 支持两种标签：轻量标签(lightweight)和附注标签(annotated)

```
轻量标签
git tag v1.0.0

附注标签
git tag -a v1.1.1 -m"附注标签描述"
```

**查看**

```
git tag
```

**推送标签到远程仓库**

- 默认情况下，git push 命令并不会传送标签到远程仓库服务器上

```
git push origin  v1.0.0 // 推送指定tag
git push origin --tags  // 推送全部tag
```

**删除 tag**

```
// 删除本地tag
git tag -d <tagname>
// 删除远程tag
git push <remote> -delete <tagname>
```

**检出 tag**

- 回到某个 tag 的版本
- 正常情况下，要是想修改某个 tag 的内容，应该创建当前 tag 的分支，在该分支上进行修改

```
git checkout <tagname>
```

## 1.10.分支

**创建**

```
创建分支
git branch <branchname>

创建并切换到该分支
git checkout -b <branchname>
```

**查看**

```
查看所有分支
git branch

查看所有分支，并查看最后一次提交
git branch -v

查看所有合并到当前分支的分支
git branch --merged

查看所有没有合并到当前分支的分支
git branch --no-merged
```

**删除**

```
删除某个分支
git branch -d <branchname>

强行删除某个分支
git branch -D <branchname>
```

### 1.10.1.Git 远程分支

- 远程分支也是一种分支结构
  - 以\<remote>/\<branch>的形式命名
    - origin/master

**远程分支的管理**

- **`推送分支到远程`**

  ```
  git push <remote> <branch>

  eg:
  git push origin develop
  ```

- **`跟踪远程分支`**

  - 当克隆一个仓库时，通常会自动地创建一个跟踪 origin/master 的 master 分支

  - 也可以手动的设置其他的跟踪分支

    ```
    git checkout --track <remote>/<branch>

    简写
    git checkout <branch>

    // 1. 查看本地是否有该分支
    // 2. 查看云仓是否有，有的话就在本地创建一个分支并且跟踪远程的这个分支
    ```

- **`删除远程的分支`**

  ```
  git push origin -d <remotebranchname>
  ```

## 1.11. commit 操作相关

**修改你最近一次的 Git commit 信息** 你可以使用以下命令来修改你最近一次的 Git commit 信息：

```bash
git commit --amend
```

这将打开你的默认文本编辑器，你可以在其中编辑提交消息。保存并关闭编辑器后，新的提交消息将替换旧的。

如果你已经推送了这个提交到远程仓库，你需要强制推送更新：

```bash
git push --force
```

请注意，强制推送可能会覆盖其他人的工作，所以在团队协作时要谨慎使用。

如果你需要修改更早的提交，可以使用交互式 rebase：

1. 首先，启动交互式 rebase，指定你想要修改的提交之前的一个提交：

   ```bash
   git rebase -i HEAD~n
   ```

   其中 `n` 是你想要回溯的提交数量。

2. 在打开的编辑器中，将你想要修改的提交前的 `pick` 改为 `edit`。

3. 保存并关闭编辑器。Git 会暂停在你指定的提交上。

4. 使用 `git commit --amend` 修改提交信息。

5. 使用 `git rebase --continue` 继续 rebase 过程。

6. 最后，强制推送更新：

   ```bash
   git push --force
   ```

希望这些步骤能帮到你！如果有其他问题，请随时告诉我。

# 2. Git 合并方式

## 2.1 默认合并方式

默认情况下，Git 会使用**快速前进合并**（Fast-forward Merge），如果可能的话。当 `main` 分支没有新的提交时，Git 会直接将 `main` 的指针移动到 `feature` 的最新提交。

如果 `main` 分支有新的提交，Git 会进行**三方合并**（Three-way Merge），并创建一个新的合并提交。

你可以使用 `--no-ff` 选项来强制进行无快速前进合并，即使可以快速前进。

## 2.2 合并方式示例

### 1. 快速前进合并（Fast-forward Merge）

**场景：**

- 在 `feature` 分支上进行了几次提交。
- `main` 分支没有新的提交。

**操作步骤：**

```bash
git checkout main
git merge feature
```

**结果：**

- `main` 的指针直接移动到 `feature` 的最新提交。

**示例：**

```
main: A -- B
feature: A -- B -- C -- D
```

合并后：

```
main: A -- B -- C -- D
```

### 2. 无快速前进合并（No-fast-forward Merge）

**场景：**

- 在 `feature` 分支上进行了几次提交。
- `main` 分支没有新的提交。
- 希望保留合并历史。

**操作步骤：**

```bash
git checkout main
git merge --no-ff feature
```

**结果：**

- 创建一个新的合并提交。

**示例：**

```
main: A -- B
feature: A -- B -- C -- D
```

合并后：

```
main: A -- B -- E
             / \
            C -- D
```

### 3. 三方合并（Three-way Merge）

**场景：**

- `main` 分支有新的提交。
- `feature` 分支也有新的提交。

**操作步骤：**

```bash
git checkout main
git merge feature
```

**结果：**

- Git 自动合并两条分支的更改。

**示例：**

```
main: A -- B -- C
feature: A -- D -- E
```

合并后：

```
main: A -- B -- C -- F
             \    /
              D -- E
```

### 4. 变基合并（Rebase）

**场景：**

- `main` 分支有新的提交。
- `feature` 分支也有新的提交。
- 希望保持线性历史。

**操作步骤：**

```bash
git checkout feature
git rebase main
```

**结果：**

- `feature` 的提交被重新应用到 `main` 的最新提交之后。

**示例：**

```
main: A -- B -- C
feature: A -- D -- E
```

变基后：

```
main: A -- B -- C
feature: A -- B -- C -- D' -- E'
```

合并后：

```
main: A -- B -- C -- D' -- E'
```
