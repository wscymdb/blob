# Docker 数据存储完全指南：命名卷 vs 绑定挂载

## 一、核心概念

Docker 的数据持久化主要有三种方式，理解它们的**存储位置**是关键：

1.  **命名卷 (Named Volume)**
    - **位置**：Docker 内部区域（`/var/lib/docker/volumes/`）。
    - **特性**：Docker 专属管理，也就是“黑盒”，不建议非 Docker 进程触碰。
2.  **绑定挂载 (Bind Mount)**
    - **位置**：宿主机的任意文件路径。
    - **特性**：宿主机和容器完全共享，两边都能直接读写。
3.  **内存挂载 (tmpfs Mount)**
    - **位置**：宿主机内存。
    - **特性**：速度极快，容器停止后数据丢失，用于敏感数据或临时缓存。

---

## 二、全方位对比（核心差异）

| 维度 | 命名卷 (Named Volume) 🧊 | 绑定挂载 (Bind Mount) 🔗 |
| :-- | :-- | :-- |
| **适用场景** | 数据库、持久化存储、生产环境 | 代码开发、配置文件、日志导出 |
| **管理方** | Docker 引擎自动管理 | 用户手动管理文件系统 |
| **宿主机路径** | 隐蔽 (`/var/lib/docker/...`) | 直观 (你指定的路径) |
| **跨平台性** | ✅ **完美** (屏蔽了路径差异) | ❌ **差** (Windows/Linux 路径格式不同) |
| **I/O 性能** | ✅ **原生速度** (Linux 环境下) | ⚠️ **有损耗** (Docker Desktop on Mac/Win 较慢) |
| **初始化行为** | **自动填充**：会将镜像内的内容复制到卷中 | **覆盖/隐藏**：宿主机目录会覆盖镜像内目录 |
| **目录不存在时** | 自动创建 | 自动创建 (但通常归属 `root` ⚠️) |

## 三、语法对比

```yaml
services:
  database:
    image: mysql:8.0
    volumes:
      # =======================================================
      # 1. 命名卷 (Named Volume) -> "交给 Docker 管"
      # =======================================================
      # ✅ 写法特征：纯字符串，绝对不能包含 "/" 或 "./"
      # 含义：Docker，请把容器里的路径映射到你内部管理的 "db_data" 卷中。
      - db_data:/var/lib/mysql

      # =======================================================
      # 2. 绑定挂载 (Bind Mount) -> "我自己管"
      # =======================================================
      # ✅ 写法特征：必须以路径符号开头 ( "/" 或 "./" 或 "~/" )
      # 含义：Docker，请直接使用我电脑上的 "./configs" 文件夹。
      - ./configs:/etc/mysql/conf.d # 相对路径 (推荐)
      - /opt/data:/var/lib/mysql # 绝对路径

# =======================================================
# ❓ 核心疑问：为什么必须要在顶层声明 volumes？
# =======================================================
volumes:
  db_data: # ⬅️ 必须在这里"注册"命名卷！


  # 💡 详细解释：
  # 1.【定义资源】：在 Docker Compose 逻辑中，命名卷是独立于 Service 存在的"基础设施"。
  #    就像你必须先建好"仓库"(Volumes)，"工人"(Services)才能去取货。
  # 2.【共享机制】：顶层声明后，这个卷就可以被多个 Service 同时挂载（如 app 和 db 共享数据）。
  # 3.【生命周期】：当你删除容器时，顶层声明的卷不会被自动删除，确保了数据安全。
  #
  # ⚠️ 注意：绑定挂载 (Bind Mount) 不需要在这里声明，因为它是文件系统的一部分，不由 Docker 托管。
```

## 四、深度解析与避坑

### 1. 命名卷 (Named Volume)

**数据初始化** 如果命名卷是**空**的，容器首次启动时，**镜像内该目录下的所有文件会被自动复制到卷中**。

::: details **解释**

假设我们使用命名卷挂载 nginx 了 那么会把 nginx 镜像内被挂载的那个文件夹的所有文件复制到命名卷中

```yaml
# 我们把 nginx 镜像内的 /usr/share/nginx/html 目录挂载到命名卷 my_web_data 中
# 启动前：命名卷 my_web_data 处于创建初期，内部是空的。
# 启动时：Docker 发现卷是空的，于是把镜像里的html的所有文件(index.html等文件) 复制 到 my_web_data 中。
# 启动后：Nginx 进程 成功读取到了文件，网页显示 "Welcome to Nginx"。
volumes:
  - my_web_data:/usr/share/nginx/html
```

如果使用的是绑定挂载

```yaml
# 启动前：宿主机的 ./my_empty_folder 是空的。
# 启动时：Docker 直接把这个空文件夹盖在了容器的 /usr/share/nginx/html 上。
# 启动后：Nginx 进程 只能看到这个空目录，找不到 index.html，所以报错。
# 所以需要手动复制镜像内的 index.html 到 ./my_empty_folder 中。
volumes:
  - ./my_empty_folder:/usr/share/nginx/html
```

:::

- _场景_：数据库自带的初始配置、CMS 系统的默认主题文件。

**🔧 高级操作：使用外部卷** 如果你不想让 `docker-compose down -v` 误删数据，可以使用 `external: true`。

```yaml
volumes:
  data:
    external: true # 告诉 Docker 这个卷已经存在，不要创建也不要删除
```

### 2. 绑定挂载 (Bind Mount)

**坑 1-文件覆盖：** 绑定挂载会**隐藏**镜像内该路径原本存在的文件。

- _现象_：挂载一个空文件夹到 `/app/config`，容器启动报错“找不到配置文件”。
- _解决_：确保宿主机目录内已经有了必要的文件。

**坑点 2-自动创建的权限问题：** 如果在 `docker-compose.yml` 中指定了一个不存在的宿主机路径，Docker 会自动创建它，**但所有者通常是 `root`**。

- _后果_：容器内的非 root 用户无法写入。
- _解决_：**先在宿主机手动创建目录并赋予权限**，再启动容器。

## 五、最佳实践场景

### 场景一：数据库 (MySQL/Postgres)

**选择：命名卷**

- **理由**：
  1.  性能最好（特别是在 Windows/Mac 上）。
  2.  文件权限由 Docker 内部处理，不折腾。
  3.  防止误删宿主机文件导致数据库损坏。

### 场景二：Web 开发 (Node/Python/PHP)

**选择：混合模式**

- **代码**：用 **绑定挂载** (`./src:/app/src`) → 实现热重载。
- **依赖**：用 **匿名卷** (`/app/node_modules`) → 防止宿主机（如 Windows）的 `node_modules` 覆盖容器内（Linux）的依赖，避免二进制兼容性问题。

### 场景三：配置文件 (Nginx/Prometheus)

**选择：绑定挂载 (只读)**

- **理由**：修改方便，无需进入容器。
- **技巧**：加上 `:ro` 标志，防止容器意外修改配置。
  ```yaml
  - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
  ```

## 六、常用运维命令

### 1. 清理空间

Docker 运行久了会产生很多僵尸卷。

```bash
# ⚠️ 警告：这会删除所有未被容器使用的卷
docker volume prune

# 推荐：先查看有哪些
docker volume ls -f dangling=true
```

### 2. 查看所有卷

```bash
docker volume ls
```

### 3. 查看卷的具体信息(元数据)

```bash
# Mountpoint 字段 是卷在宿主机的具体路径
docker volume inspect <卷名>
```

### 4. 数据备份 (万能公式)

不需要停止容器，直接利用临时容器打包：

```bash
# 备份命名卷 my-data 到当前目录的 backup.tar.gz
docker run --rm \
  -v my-data:/source:ro \
  -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz -C /source .
```

## 七、如何查看“持久化”的数据？

这里只介绍在 linux 上如何查看

### 1. 绑定挂载 (Bind Mount) —— 最简单

- **方法**：直接打开文件夹。
- **解释**：因为绑定挂载就是普通目录。
  - 如果你写的是 `- ./data:/var/lib/mysql`
  - 那你直接打开当前目录下的 `data` 文件夹，数据就在那，想怎么改就怎么改。

### 2. 命名卷 (Named Volume)

可以直接访问文件系统，但需要 root 权限。

1.  先查路径：`docker volume inspect <卷名>` 找到 `Mountpoint`字段 获取卷在宿主机的具体路径。
2.  直接查看：
    ```bash
    # 通常路径长这样，必须用 sudo，因为权限归 root 所有
    sudo ls -l /var/lib/docker/volumes/<卷名>/_data/
    ```
