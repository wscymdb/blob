# Docker Compose —— 容器界的“总指挥”

在掌握了 `docker run` 之后，你已经可以熟练地启动各种容器了。但在实际的开发和生产环境中，我们极少单独运行一个孤立的容器。

想象一下这个场景：你要部署一个**博客系统**。你需要：

1.  启动一个 **MySQL** 容器（数据库）。
2.  启动一个 **WordPress** 容器（网站程序）。
3.  启动一个 **Nginx** 容器（反向代理）。

如果你只用 `docker run`，你的操作流程是这样的：

1.  先手敲一行超长的命令启动 MySQL（还得小心翼翼地配置环境变量、密码）。
2.  记录下 MySQL 容器的 IP 地址（因为 IP 可能会变）。
3.  再手敲一行命令启动 WordPress，把刚才记下的 IP 填进去，顺便配置端口映射。
4.  最后再启动 Nginx……
5.  **最崩溃的是**：如果服务器重启了，你得凭记忆把上面的步骤**再做一遍**，顺序还不能错。

## 什么是 Docker Compose？

**Docker Compose** 是一个用于定义和运行**多容器** Docker 应用程序的工具。

如果说 `Dockerfile` 是让你可以自定义**一块积木**（比如做一个专门的镜像），那么 `Docker Compose` 就是一张**图纸**。它告诉你如何把这些积木堆成一个完整的**城堡**。

## 为什么要用它？

引入 Docker Compose 后，你的工作方式将发生革命性的变化：

1.  **文档即配置 (Configuration as Code)** 你不需要再把复杂的启动参数（`-p 8080:80 -v /data:/var/lib...`）记在脑子里或记事本里。所有的配置都写在一个名为 `docker-compose.yml` 的文本文件中。这不仅是配置，更是文档。

2.  **一键启动 (One-Step Start)** 无论你的项目包含 2 个容器还是 20 个容器，你只需要在目录下敲一个命令：`docker compose up -d`。Docker 就会按照你写好的剧本，自动下载镜像、创建网络、按顺序启动所有服务。

3.  **自动网络编排 (Magic Networking)** 这是最爽的一点。Compose 会自动创建一个内部局域网，容器之间可以通过**服务名**（比如 `db`、`redis`）直接通信，你再也不用去关心容器的 IP 地址是多少了。

::: info 一句话总结

以前你是**手动挡**司机，每一步都要自己操作；现在你是**交响乐团指挥**，挥舞一下指挥棒（YAML 文件），所有乐器（容器）就按部就班地开始演奏。

:::

# 实战一：搭建一个高可用的博客系统

我们将搭建一套经典的 **WordPress (网站) + MySQL (数据库)** 系统。

**为什么要选这个例子？**

1.  **多容器协作**：网站必须连上数据库才能工作，能很好地练习容器通信。
2.  **环境变量**：需要配置很多密码和用户名，练习环境配置。
3.  **持久化**：数据库不能丢，练习数据卷管理。

## 1. 准备工作

首先，在你的服务器或电脑上创建一个干净的文件夹：

```bash
mkdir my-blog
cd my-blog
```

确保你安装了 Compose（Docker Desktop 自带，Linux 需要单独安装或更新到 Docker 新版）。检查版本：

```bash
# 新版命令（推荐，Docker V2）
docker compose version
# 或者旧版命令
docker-compose version
```

## 2. 编写剧本：docker-compose.yml

在 `my-blog` 目录下创建一个名为 `docker-compose.yml` 的文件。

**这是 Compose 的核心。** 请仔细阅读下面的代码和**注释**（注释是精髓）。

```yaml
# 0. 版本号：通常用 3.8 或 3.x，支持最新的 Docker 特性
# 新版本不需要版本号了 如果写了会报警告的
# version: '3.8'

# 1. 服务定义：这里列出我们要启动的所有容器
services:
  # --- 服务 A: 数据库 ---
  # db是服务A的名称 可自定义 但是命名要有语义
  # docker compose ps 的 SERVICE 可以看到这个名称
  db:
    # 指定镜像，MySQL 5.7 是比较稳定的版本
    image: mysql:5.7
    # 容器名称：方便我们用 docker ps 查看，不写的话 Docker 会自动生成一个名字
    container_name: my-mysql
    # 自动重启策略：除非手动停止，否则挂了自动重启
    restart: always
    # 环境变量：MySQL 镜像要求的配置，用于初始化数据库
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword # root 用户密码
      MYSQL_DATABASE: wordpress # 创建一个名为 wordpress 的库
      MYSQL_USER: wp_user # 创建一个普通用户
      MYSQL_PASSWORD: wp_password # 普通用户的密码
    # 数据卷挂载：保证删除容器后，数据还在
    volumes:
      # 格式：[宿主机命名卷]:[容器内路径]
      # 这里使用的是 【命名卷】不是挂载卷
      - db_data:/var/lib/mysql
    # 资源限制（可选）：防止数据库吃光内存
    deploy:
      resources:
        limits:
          memory: 512M

  # --- 服务 B: 网站 ---
  wordpress:
    image: wordpress:latest
    container_name: my-wordpress
    restart: always
    # 端口映射：[宿主机端口]:[容器端口]
    # 我们访问服务器的 8080，转发给容器的 80
    ports:
      - '8080:80'
    # 环境变量：告诉 WordPress 怎么连接数据库
    environment:
      # 【核心知识点】这里的 'db' 就是上面定义的服务名！
      # Docker 会自动把 'db' 解析成数据库容器的内部 IP 地址
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wp_user
      WORDPRESS_DB_PASSWORD: wp_password
      WORDPRESS_DB_NAME: wordpress
    # 依赖关系：告诉 Docker，先启动 db，再启动我
    depends_on:
      - db
    # 挂载：把 WordPress 的上传目录挂载出来，防止重装后图片丢失
    volumes:
      - wp_data:/var/www/html

# 2. 顶层卷定义：声明上面用到的命名卷
# Docker 会自动在 /var/lib/docker/volumes/ 下创建这些卷
volumes:
  db_data:
  wp_data:
```

### 📝 核心概念详解

1.  **Service (服务)**：在 YAML 里，`db` 和 `wordpress` 就是服务名。**在 Docker 的内部网络中，服务名 = 主机名 (Hostname)**。

    - 这就是为什么 WordPress 的配置里写 `WORDPRESS_DB_HOST: db:3306` 就能连上数据库。你完全不需要知道 MySQL 的 IP 是多少。

2.  **Depends_on (依赖)**：这只是控制**启动顺序**。Docker 会先发命令启动 `db`，然后再启动 `wordpress`。

    - _注意：它不保证 `db` 已经完全初始化好（比如 MySQL 启动需要几秒钟），它只保证容器已经 Run 起来了。不过 WordPress 有重试机制，所以通常没问题。_

3.  **Volumes (顶层卷)**：在文件最底部定义的 `volumes:` 是**全局命名卷**。如果不写这一块，上面服务里引用的 `db_data` 会报错找不到。

## 3. 启动与管理 (实战操作)

### 第一步：一键启动

在 `docker-compose.yml` 所在的目录下执行：

```bash
# -d 代表后台运行 (Detached)
docker compose up -d
```

**你会看到类似这样的输出：**

1.  Network my-blog_default Created (自动创建了一个专用网络)
2.  Volume my-blog_db_data Created (自动创建了数据卷)
3.  Container my-mysql Started
4.  Container my-wordpress Started

### 第二步：查看状态

```bash
docker compose ps
```

如果你看到 State 都是 `Up`，说明成功了。

### 第三步：验证成果

打开浏览器，访问 `http://你的服务器IP:8080`。你应该能看到 WordPress 的安装界面（选择语言、设置标题）。 _你可以随便填一下安装，发表一篇文章，测试一下。_

### 第四步：查看日志 (Debug 神器)

如果网页打不开，或者显示“数据库连接错误”，你需要看日志。

```bash
# 查看所有服务的日志
docker compose logs -f

# 只看数据库的日志
docker compose logs -f db
```

## 4. 常用运维命令 (Lifecycle)

理解这几个命令的区别非常重要：

| 命令 | 作用 | 数据还在吗？ | 场景 |
| :-- | :-- | :-- | :-- |
| `docker compose stop` | **暂停**容器。 | ✅ 在 | 就像合上笔记本电脑盖子，想省点 CPU 时用。 |
| `docker compose start` | **恢复**运行。 | ✅ 在 | 配合 stop 使用。 |
| `docker compose down` | **停止并删除**容器、网络。 | ✅ 在 (默认保留卷) | **修改了配置文件** (yml) 后，需要先 down 再 up 才能生效。 |
| `docker compose down -v` | **毁灭打击**。删除容器、网络 + **数据卷**。 | ❌ **全没了** | **慎用！** 只有在彻底重置开发环境时才用。 |
| `docker compose restart` | 重启服务。 | ✅ 在 | 服务卡死或代码更新后使用。 |

---

## 5. 进阶技巧：使用 `.env` 文件隐藏密码

在实际项目中，我们**绝对不会**把密码（如 `rootpassword`）明文写在 `docker-compose.yml` 里，因为这个文件通常要上传到 Git 仓库。

**最佳实践**是使用 `.env` 文件。

### 1. 创建 `.env` 文件

在同级目录下新建 `.env`：

```bash
# .env 文件内容
DB_ROOT_PASS=Secret123!
DB_USER=wp_user
DB_USER_PASS=UserPass456!
```

### 2. 修改 `docker-compose.yml`

使用 `${变量名}` 的语法来引用：

```yaml
services:
  db:
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASS} # 自动读取 .env
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_USER_PASS}

  wordpress:
    environment:
      WORDPRESS_DB_PASSWORD: ${DB_USER_PASS}
      # ... 其他保持不变
```

这样，你只需要把 `.env` 加入 `.gitignore` (不上传到代码仓库)，你的密码就安全了。

## 6. 练习作业

1.  **修改端口**：修改 `docker-compose.yml`，把 WordPress 的对外端口从 `8080` 改为 `9090`。
2.  **生效配置**：思考一下，修改完文件后，运行什么命令让它生效？
    - _答案：直接再次运行 `docker compose up -d` 即可。Docker 很聪明，它会检测到配置变了，自动重建受影响的容器。_
3.  **销毁实验**：
    - 运行 `docker compose down`。
    - 检查 `docker ps -a` (应该空了)。
    - 再次运行 `docker compose up -d`。
    - 访问网页，你会发现**之前安装的 WordPress 数据还在**！因为默认没有删除 volume。
    - 最后尝试 `docker compose down -v`，再重来，你会发现一切回到了原点（需要重新安装 WP）。
