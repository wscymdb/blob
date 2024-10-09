# Git 合并方式

## 默认合并方式

默认情况下，Git 会使用**快速前进合并**（Fast-forward Merge），如果可能的话。当 `main` 分支没有新的提交时，Git 会直接将 `main` 的指针移动到 `feature` 的最新提交。

如果 `main` 分支有新的提交，Git 会进行**三方合并**（Three-way Merge），并创建一个新的合并提交。

你可以使用 `--no-ff` 选项来强制进行无快速前进合并，即使可以快速前进。

## 合并方式示例

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
