# 核心概念 (Core Concepts)

Docker 的体系结构建立在两个最基础的概念之上：**镜像 (Image)** 与 **容器 (Container)**。

## 镜像 (Image) —— 静态的交付标准

**定义**： Docker 镜像是一个只读的模板，包含了应用程序运行所需的所有内容：代码、运行时环境、库文件、环境变量和配置文件。它是应用程序的**“交付单元”**。

**核心特性**：

- **只读性 (Read-Only)**：镜像一旦构建完成，其内容就是不可变的。这保证了环境的一致性（即“一次构建，到处运行”）。
- **分层存储 (Layered)**：镜像由多个文件系统层叠加而成，这种机制使得镜像可以复用基础层（如操作系统层），极大地节省了磁盘空间。
- **类比理解**：
  - **生活类比**：它就像是软件的**“安装光盘”**或操作系统的 **ISO 镜像文件**。
  - **编程类比**：在面向对象编程中，镜像相当于 **“类 (Class)”**。

## 容器 (Container) —— 动态的运行实体

**定义**：容器是镜像的运行实例。当镜像被“启动”后，它就变成了一个容器。Docker 会在镜像的只读层之上创建一个可写的容器层（Writable Layer），所有的数据变化都发生在这一层。

**核心特性**：

- **隔离性 (Isolation)**：每个容器都运行在独立的命名空间中，拥有独立的 IP、进程树和文件系统。它们互不干扰，就像一个个独立的轻量级沙箱。
- **短暂性 (Ephemeral)**：默认情况下，容器的文件系统是临时的。一旦容器被删除，其内部写入的数据也会随之丢失（除非使用了**数据卷**进行持久化）。
- **类比理解**：
  - **生活类比**：如果镜像是安装包，容器就是你双击运行后的**“程序窗口”**。你可以从同一个安装包启动多个互不影响的程序窗口。
  - **编程类比**：在面向对象编程中，容器相当于 **“实例 (Object)”**。

## 两者的关系 (Relationship)

容器必须基于镜像创建，二者是**静态**与**动态**的关系。

| 维度         | 镜像 (Image)           | 容器 (Container)                  |
| :----------- | :--------------------- | :-------------------------------- |
| **状态**     | 静态文件 (Static)      | 动态进程 (Dynamic)                |
| **可写性**   | **只读** (Read-Only)   | **可读写** (Read-Write)           |
| **存在形式** | 存储在硬盘上的文件     | 运行在内存中的进程 (也会占用硬盘) |
| **生命周期** | 长期存在，除非手动删除 | 随用随开，随关随停                |
| **关系**     | **模具 / 类**          | **成品 / 实例**                   |

> **💡 总结**
>
> - 没有镜像，就无法创建容器。
> - 镜像是“构建”的结果，容器是“运行”的结果。
> - 我们开发时是在制作**镜像**，部署时是在运行**容器**。

# 基础安装与国内加速配置

在国内服务器上使用 Docker，**必须**配置镜像加速器，否则 `docker pull` 会经常超时。

## 安装 Docker

```bash
# 使用官方脚本自动安装，--mirror Aliyun 是指定使用阿里云的下载源，速度更快
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

# 启动 Docker 服务
systemctl start docker

# 设置开机自动启动 Docker，省得每次开机都要手动点火
systemctl enable docker
```

## 配置加速器

编辑或创建 `/etc/docker/daemon.json`：

```bash
# 创建配置目录（如果不存在的话）
sudo mkdir -p /etc/docker

# 将加速地址写入配置文件 daemon.json
# 这些地址是目前国内可用的镜像站
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://do.nark.eu.org",
    "https://dc.jesscedar.icu",
    "https://docker.m.daocloud.io",
    "https://dockerproxy.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
EOF
# 重新加载配置
sudo systemctl daemon-reload

# 重启 Docker 让加速生效
sudo systemctl restart docker
```

# Docker 核心指令卡片

## 命令解释

### docker run

**创建一个新容器并启动它**

```bash
docker run [选项] 镜像名 [命令] [参数]

# 举例
# 后台运行nginx，命名my-web，映射端口8080→80
docker run -d --name my-web -p 8080:80 nginx
```

### docker build

**根据 Dockerfile 构建一个新的镜像**

```bash
docker build [选项] 构建上下文路径

# 举例
# 用当前目录的Dockerfile构建名为myapp的镜像
docker build -t myapp .
```

### docker exec

**在正在运行的容器里执行命令**

```bash
docker exec [选项] 容器名 [命令] [参数]

# 举例
# 在my-web容器里执行ls命令
docker exec my-web ls
```

## 参数详解

### 启动与构建

| 命令场景 | 核心指令 | 参数 | 参数含义与作用 |
| :-- | :-- | :-- | :-- |
| **启动容器** | `docker run` | `-d` | **后台运行** (Detach)。让容器默默在后台跑，不占用控制台。 |
|  |  | `-p [外]:[内]` | **端口映射**。例如 `8080:80`，把服务器的 8080 转接到容器的 80。 |
|  |  | `--name [名字]` | **命名**。给容器起个好记的名字，方便后续管理。 |
|  |  | `-v [外]:[内]` | **挂载 (卷)**。把服务器的文件“投影”到容器里。**左边是你的文件，右边是容器的路径**。 |
|  |  | `--restart=always` | **自动重启**。服务器重启或程序崩溃后，自动救活容器（生产环境必加）。 |
|  |  | `--rm` | **用完即删**。容器停止后自动删除自己（常用于临时测试配置）。 |
| **构建镜像** | `docker build` | `-t [名]:[版]` | **打标签** (Tag)。给镜像起名，例如 `my-app:v1`。 |
|  |  | `.` | **上下文**。告诉 Docker 在**当前目录**寻找 `Dockerfile`。 |

### 管理与维护

| 命令场景 | 核心指令 | 参数与格式 | 参数含义与作用 |
| :-- | :-- | :-- | :-- |
| **查看容器** | `docker ps` | `-a` | **查看所有** (All)。列出包括**已停止 (Exited)** 的所有容器（默认只显示正在运行的）。 |
| **删除容器** | `docker rm` | `-f` | **强制删除** (Force)。即使容器正在运行，也强行杀掉并删除。 |
| **查看日志** | `docker logs` | `-f` | **实时跟随** (Follow)。像直播弹幕一样，实时滚屏显示最新的日志输出。 |
| **进入容器**<br>(交互模式) | `docker exec` | `-it [名] /bin/bash` | **“登录”容器**。<br>`-i` (交互) + `-t` (伪终端)。组合起来让你能像 SSH 一样进入容器内部进行一系列操作。<br>_(注：Alpine 系统请用 `sh`)_ |
| **执行指令**<br>(非交互模式) | `docker exec` | `[名] [具体命令]` | **“遥控”容器**。<br>**不进入容器**，直接让容器执行一条命令并把结果返回给你。<br>**实战例子**：`docker exec custom-nginx nginx -t` (让 Nginx 容器自己检查配置文件)。 |
| **拷贝文件** | `docker cp` | `[名]:[路径] [本地]` | **文件传输**。<br>从容器里把配置文件“偷”出来，或者把文件塞进去。 |
| **清理镜像** | `docker rmi` | `[镜像ID]` | 删除本地不再使用的镜像文件（安装包）。 |
| **下载镜像** | `docker pull` | [镜像名]:[标签]<br/>不写标签默认 latest | **下载镜像**。<br/>从 Docker Hub 拉取镜像到本地（如 nginx:alpine）。 |
| **构建镜像** | `docker build` | -t [名]:[版]<br/>. (当前目录) | 根据 Dockerfile 制作属于你自己的镜像。 |
| **查看镜像** | `docker images` | - | 列出本地下载好的所有镜像（查看本地仓库）。 |

# 实战案例一：部署 Nginx 网页服务器

这是 Docker 最基础的用法：**拉取别人的镜像 -> 跑起来 -> 端口映射**。

## 1 运行容器

```bash
# 后台运行nginx容器，命名my-web，主机8080端口映射容器80端口
# 运行下面命令如果没有对应的镜像会自动拉取的
docker run -d -p 8080:80 --name my-web nginx
```

::: details 参数拆解

- `-d` (Detach): 后台静默运行，不占用你的命令行窗口。
- `-p 8080:80` (Port): **端口映射**。把服务器的 `8080` 端口连通到容器内部的 `80` 端口。
- `--name my-web`: 给容器起个好记的名字。
- `nginx`: 镜像的名字。

:::

## 2 验证结果

打开浏览器访问：`http://你的服务器IP:8080` 如果看到 "Welcome to nginx!" 页面，说明部署成功。

> **注意：** 如果打不开，99% 是因为你云服务器后台的**安全组（防火墙）**没有开放 8080 端口。

---

# 实战案例二：构建 Express 接口服务

这个案例模拟真实的开发流程：**写代码 -> 做镜像 -> 挂载运行（热更新）**。

## 开发环境

**为什么要在服务器上演示“热更新”？**

- 在真实的工业级开发中，我们绝不会直接在服务器上修改代码。
- 演示目的：这里之所以在服务器上演示 -v 挂载，是为了模拟体验本地开发的流程，并理解 Docker 如何打通“内外”文件系统。掌握了这个技巧，后在本地电脑使用 Docker Desktop 开发时也是一样的逻辑。

### 为什么我们要自己“做镜像”？

在实战一中，我们直接用了 `nginx` 镜像，那是别人已经打包好的通用软件，我们拿来直接用就行（拿来主义）。

但在开发 **Express** 或 **VitePress** 这种项目时，我们为什么要自己构建镜像呢？

1.  **代码是独特的**：官方的 `node` 镜像里只有 Node 环境，并没有你写的 `app.js` 或者 `Hello World` 网页代码。我们需要把**你的代码**塞进去。
2.  **依赖是复杂的**：你的项目可能需要安装 `axios`、`vue` 等各种插件。我们需要在镜像构建过程中自动执行 `npm install`，把环境一次性装好。
3.  **环境一致性**：一旦做成了镜像，无论你把这个镜像发给同事，还是传到阿里云服务器，它**绝对**能跑起来，再也不会出现“在我电脑上明明好的，怎么发给你就报错”这种烂事。

**总结：**

- **用别人的镜像**：跑数据库、跑服务器软件（MySQL, Nginx, Redis）。
- **做自己的镜像**：跑你写的业务代码、跑你的网站。

### 1 准备项目文件

新建一个目录 `my-express-app`，并在里面创建三个文件：

**1. `package.json`**

```json
{
  "name": "docker-express-demo",
  "version": "1.0.0",
  "main": "app.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**2. `app.js` (业务代码)**

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello Docker!</h1><p>Express is running...</p>');
});

app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});
```

**3. `Dockerfile` (构建镜像文件)**

```dockerfile
# 1. 基础镜像：使用轻量级 Alpine Linux 上的 Node.js 18 镜像
FROM node:18-alpine

# 2. 设置工作目录：容器内应用程序的工作目录
WORKDIR /app

# 3. 安装依赖：先复制 package.json 利用缓存，再安装 nodemon 用于热更新
# 这里COPY和步骤4的COPY为啥不合并一次 见FAQ的Q4
COPY package.json ./
RUN npm install && npm install -g nodemon

# 4. 复制源代码：把当前目录的所有内容都复制到容器内的工作目录(/app)中 以后这个镜像走到哪里，代码就带到哪里
COPY . .

# 5. 暴露端口：声明容器内应用程序监听的端口
EXPOSE 3000

# 6. 启动命令：使用 nodemon 而不是 node，为了支持代码热更新
CMD ["nodemon", "app.js"]
```

::: details Dockerfile 详解

```dockerfile
# 1. 基础镜像：使用轻量级 Alpine Linux 上的 Node.js 18 镜像
#    node:18-alpine 包含：
#    - Node.js 18.x 版本
#    - 基于 Alpine Linux（仅5MB左右的微型Linux发行版）
#    - 比完整版Node镜像小得多（约180MB vs 1GB+）
#    - 适合生产环境，减少攻击面和镜像大小
#
#    官方镜像地址：https://hub.docker.com/_/node
#    查看所有标签：https://hub.docker.com/_/node/tags
FROM node:18-alpine

# 2. 设置工作目录：容器内应用程序的工作目录
#    WORKDIR /app 的作用：
#
#    a) 创建目录：如果 /app 不存在，Docker 会自动创建它
#
#    b) 设置当前目录：所有后续的 RUN、CMD、COPY、ADD 指令
#       都会在这个目录下执行，相当于 cd /app
#
#    c) 影响路径：相对路径都相对于 /app
#       COPY package.json ./   → 实际上是 /app/package.json
#       RUN npm install        → 在 /app 目录下执行
#
#    d) 进入容器时：
#       使用 docker exec -it <container> sh 进入容器后
#       默认就会在 /app 目录下，不是容器的根目录 /
#
#    示例说明：
#       WORKDIR /app           # 设置工作目录为 /app
#       COPY . .               # 从宿主机复制到 /app
#       RUN pwd                # 输出：/app
#       RUN ls -la             # 显示 /app 下的文件
#
#    常见工作目录路径：
#       /usr/src/app          # 传统选择
#       /app                  # 简单直接（最常用）
#       /opt/app              # 遵循 Linux 标准
#       /home/node/app        # 配合非 root 用户使用
#
#    注意：多次使用 WORKDIR 会形成路径叠加
#       WORKDIR /app          # 当前：/app
#       WORKDIR src           # 当前：/app/src
#       WORKDIR ../config     # 当前：/app/config
WORKDIR /app

# 3. 安装依赖：先复制 package.json 利用缓存，再安装 nodemon 用于热更新
# 这里COPY和步骤4的COPY为啥不合并一次 见FAQ的Q4
COPY package.json ./
RUN npm install && npm install -g nodemon

# 4. 复制源代码：从构建上下文复制到容器内的工作目录
#    COPY <源路径> <目标路径>
#
#    COPY . . 的两个点分别表示：
#
#    第一个点 (源路径):
#       代表 Docker 构建上下文（build context）的当前目录
#       即执行 docker build 命令时指定的目录
#
#       示例：docker build -t myapp .
#                    ↑
#              这里的点就是构建上下文
#       会复制这个目录下的所有文件（除.dockerignore指定的外）
#
#    第二个点 (目标路径):
#       代表容器内的当前工作目录
#       由前面的 WORKDIR /app 指令设定
#       相当于 /app
#
#    实际效果：COPY . .
#       把宿主机当前目录的所有文件
#       复制到容器的 /app 目录下
#
#    等价写法：COPY . /app
#       但使用 . 更灵活，如果修改 WORKDIR 不需要改这里
#
#    注意：两个点的含义完全不同！
#        第一个点 → 宿主机路径
#        第二个点 → 容器内路径
#
#    文件复制示例：
#       宿主机：/home/user/project/app.js
#       容器内：/app/app.js
COPY . .

# 5. 暴露端口：声明容器内应用程序监听的端口
#    EXPOSE <端口号>
#
#    作用：
#    a) 文档作用：告诉使用者这个容器内的应用在哪个端口运行
#    b) 元数据：写入镜像配置，docker ps 和 docker inspect 可以查看
#    c) 网络连接：为容器间通信提供信息
#
#    重要理解：
#    1. EXPOSE 只是声明，不自动映射到宿主机
#    2. 实际端口映射在运行容器时指定
#    3. 容器内应用必须监听指定的端口（如 3000）
#    4. 默认监听的是所有网络接口（0.0.0.0），不是 localhost
#
#    实际端口映射对比：
#    Dockerfile 中：EXPOSE 3000           ← 只是声明
#    运行命令时：-p 3000:3000             ← 实际映射
#
#    查看暴露的端口：
#    docker inspect <容器> | grep ExposedPorts
#    docker port <容器>                    ← 查看实际映射
EXPOSE 3000

# 6. 启动命令：使用 nodemon 而不是 node，为了支持代码热更新
CMD ["nodemon", "app.js"]
```

:::

### 2 构建镜像 (Build)

```bash
# 注意最后那个点 "." 代表当前目录
# -t tag的缩写 给镜像打标签/命名
# my-express-app   ← 镜像名称，格式为[仓库名/]镜像名[:标签]
#  不写标签时默认是 :latest
# 不写仓库名时默认是没有

# 用当前目录的Dockerfile，构建一个名为my-express-app的本地镜像
docker build -t my-express-app .
```

### 3 启动开发容器

**修改本地代码，容器内立即生效，无需重启。(热更新)**

- 这里需要注意虽然我们在镜像中使用`COPY . . `把所有内容到复制到了镜像中 理论上容器的代码是固定的
- 但是我们使用了-v 挂载了 之前的代码就会被覆盖

```bash
docker run -d \
  -p 7772:3000 \
  --name my-express-dev \
  -v $(pwd):/app \
  -v /app/node_modules \
  my-express-app
```

**参数详解：**

- **`-v $(pwd):/app`**

  - **含义**：挂载工作目录。服务器当前的目录挂载到容器的工作目录(/app)目录下
    - 挂载的可以理解为 windows 中的软链接，只不过在 Linux 中是**绑定挂载（Bind Mount）** 他比软链接更加霸道不必深究，可以进入启动的容器发现里面的内容和服务器的内容一样
  - **`$(pwd)` (左边)**：你服务器上的当前目录（里面有 `app.js`, `package.json`）。
  - **`/app` (右边)**：容器里的工作目录（我们在 Dockerfile 里写的 `WORKDIR /app`）。
  - **作用**：**打通代码**。你在服务器上修改 `app.js`，容器里的 `/app/app.js` 也会瞬间变成新的。配合 `nodemon`，就实现了“不重启改代码”。

- **`-v /app/node_modules`**

  - **含义**：匿名卷（注意这里没有冒号）。
  - **作用**：**保护依赖包不被覆盖**。

::: details 为什么要写 `-v /app/node_modules`

为什么我们需要单独写一行 `-v /app/node_modules`？这涉及到了 Docker 的**文件系统分层**与**数据卷初始化（Data Copy）** 机制。

**1. 问题背景：构建时 vs 运行时**

- **构建时 (Build Time)**：我们在 `Dockerfile` 中执行了 `RUN npm install`。此时，镜像内部的 `/app/node_modules` 目录里已经**装满了**依赖包（积木）。
- **运行时 (Runtime)**：我们在宿主机启动容器，但宿主机的源代码目录中**并没有** `node_modules`

**2. 冲突产生：“桌布效应”**

当你执行 `-v $(pwd):/app` 时，Docker 相当于拿了一块“巨大的桌布”（宿主机目录）盖在了“桌子”（容器目录）上。

- **现象**：虽然桌子上原本放着“积木盒子”（镜像里的依赖包），但因为被“桌布”盖住了，程序在运行的时候只能看到空空如也的桌布。
- **结果**：程序报错 `Cannot find module`。

**3. 解决方案：匿名卷的“复活”魔法**

参数 `-v /app/node_modules` 的作用，相当于在“桌布”的对应位置**剪了一个洞**，并在洞里放了一个**全新的、空的**专用盘子（这就是所谓的“匿名卷”）。

**这里触发了 Docker 一个至关重要的隐藏机制——“数据回填”：**

1.  **创建空盘子**：Docker 看到 `-v /app/node_modules`，于是创建了一个全新的存储空间。
2.  **检查镜像**：Docker 回头看了一眼镜像，发现：“咦？镜像里的 `/app/node_modules` 原本是有东西的啊（构建时装好的依赖）！”
3.  **自动复制 (关键步骤)**：
    > **规则**：当一个**新创建的空卷**挂载到容器目录时，如果该目录在**镜像**中已有内容，Docker 会自动将**镜像里的内容复制到这个新卷中**。
4.  **最终效果**：原本被桌布挡住的依赖包，被 Docker 亲手“复活”并复制到了这个新盘子里。程序又能读到依赖了！

**结论**：通过这行命令，我们既让代码走宿主机（实时同步），又让依赖包走 Docker 的匿名卷（保留了镜像里的环境），两者互不干扰，完美共存。

:::

### 4 验证热更新

1.  浏览器访问 `http://IP:7772`，看到 "Hello Docker!"。
2.  在服务器修改 `app.js`，把文字改成 "Docker is Magic!"。
3.  直接刷新浏览器，内容变了！无需重启容器。

## 生产环境

在生产环境中，我们追求稳定。我们绝不使用热更新，因为这可能导致运行时的不确定性。生产环境的原则是：代码必须“焊死”在镜像里。

这里只列出与开发环境中的差异

#### dockerfile 文件差异

```dockerfile
# 只有第6步不同
# 6. 启动命令：直接使用 node 启动应用，不使用 nodemon
CMD ["node", "app.js"]
```

### 构建镜像差异

```bash
# 打一个正式的版本号标签，代表这是一个稳定的发布版本。
docker build -t my-express-app:v1.0 .
```

### 启动开发容器差异

- 这里不使用挂载模式了去掉了`-v`
- 新增了 --restart=always：
  - 含义：守护策略。
  - 作用：如果服务器重启了，或者程序意外崩溃退出了，Docker 会自动帮你重新启动这个容器，保证服务永远在线。

```bash
docker run -d \
  -p 80:3000 \
  --name my-prod-server \
  --restart=always \
  my-express-app:v1.0
```

# 实战案例三：Nginx 自定义配置与静态资源部署

在实际生产环境中，我们极少直接使用 Nginx 的默认页面。我们需要达成两个目标：

1.  **替换内容**：使用自定义的 HTML 页面或构建好的静态资源包（如 VitePress 的 dist 目录）。
2.  **修改配置**：调整 Nginx 的监听规则、开启 Gzip 压缩或设置自定义响应头。

## 1 准备工作与配置提取

直接手写 Nginx 配置文件容易出错，**最佳实践**是先从官方镜像中提取一份默认配置作为模板，在此基础上进行修改。

```bash
# 1. 创建并进入工作目录
mkdir my-custom-nginx
cd my-custom-nginx

# 2. 准备网页资源目录
mkdir html
# 创建一个测试用的 index.html，实际使用时这里可以是 VitePress 的 dist 目录
echo "<h1>Deployed via Docker</h1><p>Configuration verified.</p>" > html/index.html

# 3. 提取默认配置文件 (核心步骤)
# 3.1 启动一个临时容器，命名为 temp-nginx
docker run -d --name temp-nginx nginx

# 3.2 将容器内的默认配置文件复制到宿主机当前目录，重命名为 nginx.conf
# 格式：docker cp [容器名]:[容器内路径] [本地路径]
docker cp temp-nginx:/etc/nginx/conf.d/default.conf ./nginx.conf

# 3.3 删除临时容器，清理环境
docker rm -f temp-nginx
```

此时，你的当前目录下应包含 `html` 文件夹和 `nginx.conf` 文件。

## 2 修改 Nginx 配置

编辑本地的 `nginx.conf` 文件，增加自定义配置以验证效果。

```bash
vi nginx.conf
```

在 `server` 代码块中，添加一行 `add_header` 指令作为验证标识：

```nginx
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;

        # [修改点] 添加自定义响应头，用于验证配置文件是否生效
        add_header X-App-Environment "Docker-Production";
    }
    # ... 其他默认配置保持不变
}
```

## 3 启动容器并挂载资源

这是最关键的一步。我们需要将本地的**资源**和**配置**分别挂载到容器内的指定路径。

**Nginx 容器内的两个关键路径：**

- **静态资源路径**：`/usr/share/nginx/html`
- **配置文件路径**：`/etc/nginx/conf.d/default.conf`

```bash
docker run -d \
  -p 8080:80 \
  --name custom-nginx \
  -v $(pwd)/html:/usr/share/nginx/html \
  -v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf \
  nginx
```

::: details 参数详解

- **`-d`** (Detach)

  - **含义**：后台运行模式。
  - **作用**：让容器在后台默默工作，不会占满你的当前命令行窗口，确保你关掉终端后它还在跑。

- **`-p 8080:80`** (Publish Port)

  - **格式**：`[服务器对外端口] : [容器内部端口]`
  - **含义**：建立连接通道。
  - **作用**：当用户访问你服务器的 `8080` 端口时，Docker 会把流量直接转发给容器内部的 `80` 端口（Nginx 默认监听端口）。

- **`-v $(pwd)/html:/usr/share/nginx/html`** (Volume Mount)

  - **格式**：`[你的实际文件路径] : [容器里的固定路径]`
  - **`$(pwd)/html` (冒号左边)**：**来源**。这是你服务器当前目录下的 html 文件夹，里面装着你写好的网页（或者 VitePress 打包后的 dist）。
  - **`/usr/share/nginx/html` (冒号右边)**：**目的地**。这是 Nginx 镜像里**写死**的默认网页存放位置。
  - **效果**：容器启动时，会“欺骗”Nginx，让它以为 `/usr/share/nginx/html` 里放的是原本的文件，但实际上 Docker 偷偷把它**替换**成了你服务器上的 `html` 文件夹内容。

- **`-v $(pwd)/nginx.conf:/etc/nginx/conf.d/default.conf`**
  - **`$(pwd)/nginx.conf` (冒号左边)**：**来源**。你刚刚修改好的、自定义的配置文件。
  - **`/etc/nginx/conf.d/default.conf` (冒号右边)**：**目的地**。Nginx 容器启动时默认读取的核心配置文件路径。
  - **效果**：用你的配置文件，**覆盖**掉容器里自带的默认配置，从而让你修改的规则（如 gzip、跨域设置）生效。

:::

## 4 验证与维护

### 1. 验证部署结果

- **页面验证**：访问 `http://服务器IP:8080`，应显示 "Deployed via Docker"。
- **配置验证**：使用 `curl` 检查响应头。
  ```bash
  curl -I http://localhost:8080
  ```
  输出中应包含：`X-App-Environment: Docker-Production`，证明配置文件挂载成功。

### 2. 配置文件语法检查 (Syntax Check)

在修改了本地的 `nginx.conf` 后，为了防止语法错误导致容器崩溃，应在重载前进行检查。

```bash
# 在运行中的容器内执行 nginx -t 命令
docker exec custom-nginx nginx -t
```

- **成功输出**：`syntax is ok`, `test is successful`。
- **失败输出**：会具体提示第几行存在语法错误。

### 3. 平滑重载配置 (Reload)

确认语法无误后，无需重启容器即可让新配置生效。

```bash
# 发送 reload 信号给 Nginx 进程
docker exec custom-nginx nginx -s reload
```

好的，收到。这部分确实越精简越好，因为核心逻辑只有一点：**把“外挂”变成“内置”**。

这是精简后的版本，请插入到文档第 5 部分：

## 5 生产环境部署 (Production)

在生产环境中，为了保证服务的**可移植性**和**稳定性**，我们通常不使用 `-v` 挂载，而是编写 `Dockerfile` 将资源和配置**永久打包**到镜像中。

这样做的最大好处是：**你只需要把镜像传到服务器，不需要在服务器上上传 html 文件或修改配置文件，容器启动即用。**

### 5.1 编写 Dockerfile

在项目根目录下创建一个 `Dockerfile`：

```dockerfile
# 1. 基础镜像
FROM nginx:alpine

# 2. 替换默认配置
# 将本地准备好的 nginx.conf 复制到容器的配置目录
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3. 植入静态资源
# 将构建好的 dist (或 html) 目录复制到 Nginx 默认网页目录
# 注意：这里假设你的静态文件都在 html 文件夹里，如果是 VitePress 请改为 dist
COPY html /usr/share/nginx/html
```

### 5.2 构建生产镜像

给镜像打上版本号，代表这是一个固定的发布版本。

```bash
docker build -t my-custom-nginx:v1.0 .
```

### 5.3 启动生产容器

**注意差异：**

1.  **去掉了** 所有 `-v` 挂载参数（文件都在镜像肚子里了）。
2.  **加上了** `--restart=always` 守护进程。

```bash
docker run -d \
  -p 80:80 \
  --name my-prod-nginx \
  --restart=always \
  my-custom-nginx:v1.0
```

---

### 💡 总结：Nginx 的两种玩法

| 模式 | 命令特征 | 文件位置 | 适用场景 |
| :-- | :-- | :-- | :-- |
| **开发/调试** | 用 `-v` 挂载 | 文件在**服务器硬盘**上 | 需要频繁修改 Nginx 配置，或者调试网页内容时。 |
| **生产/发布** | 用 `COPY` 打包 | 文件在**镜像内部** | 正式上线。追求稳定，防止服务器文件丢失导致网站 404。 |

# FAQ

## Q1: 容器跑起来了，但浏览器转圈圈打不开？

- **先测内网**：在服务器里输入 `curl http://localhost:7772`。
  - 如果通了：说明 Docker 没问题，去**阿里云/腾讯云后台的安全组**里，手动添加规则，放行 7772 端口。
  - 如果不通：说明容器挂了，看日志。

## Q2: 报错 `Error: Cannot find module 'express'`？

- **原因**：用了 `-v` 挂载代码，但忘记加 `-v /app/node_modules`，导致容器里的依赖包被外面空的文件夹盖住了。
- **解决**：删掉容器，加上那个保护参数重新 run。

## Q3: 怎么看容器为什么挂了？

- 绝杀技：`docker logs my-express-dev`。报错信息通常在最后几行。 sudo systemctl restart docker

这是一个 Docker 构建中最经典的最佳实践，非常值得写进 FAQ。这是为了利用 **Docker 的缓存机制** 来让构建速度飞起来。

请把这段加到 **# 5. 新手避坑指南 (Troubleshooting)** 的最后面：

---

## Q4: Dockerfile 里为什么要写两次 `COPY`？不能一次全拷进去吗？

**❌ 这样做也可以（但不推荐）：**

```dockerfile
COPY . .           # 把代码和 package.json 一口气全拷进去
RUN npm install    # 安装依赖
```

**后果：** 只要你修改了 `app.js` 里哪怕一个标点符号，Docker 就会认为“文件变了”，从而强制重新执行 `npm install`。你的构建过程每次都要傻傻地重新下载几百兆的依赖包，慢得要死。

**✅ 推荐做法（两次 COPY）：**

```dockerfile
COPY package.json ./   # 1. 先只拷依赖描述文件
RUN npm install        # 2. 安装依赖 (这一步会生成缓存层)
COPY . .               # 3. 最后再拷业务代码
```

**原理：** Docker 是分层构建的。

- 当你修改业务代码（`app.js`）时，Docker 发现第一步的 `package.json` 根本没变。
- 于是它会**直接使用缓存**里装好的 `node_modules`（跳过耗时的 `npm install`）。
- 它只需要重新执行最后一步 `COPY . .`。 **好处：** 你的构建速度将从“几分钟”瞬间变成“几秒钟”！
