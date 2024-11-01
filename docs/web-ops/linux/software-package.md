# 1.软件包管理

- RPM 是 RedHat Package Manager (RedHat 软件包管理工具) 类似 Windows 里面的“添加/删除程序”

## 1.1 软件包的分类

**源码包(需要进过编译，把人所编写的源代码编译成机器语言才能运行)**

- 优点
  - 开源免费
  - 可以自由配置功能
  - 编译安装更适合自己系统，更稳定
  - 卸载方便
- 缺点
  - 安装过程比较复杂
  - 编译过程比较长
  - 安装一旦报错，非常难以排查

**二进制包(把源代码经过编译成二进制,PRM 包、系统默认的包)**

- 优点
  - 包管理系统比较简单，只要通过简单的命令就可以实现包的安装、升级、查询和卸载
  - 安装速度比源码包快很多
- 缺点
  - 进过编译则不能看到源代码
  - 功能选择不灵活
  - 依赖性比较麻烦

**脚本安装包(就是把复杂的安装过程写成了脚本，可以一键安装，本质上还是源代码和二进制包)**

- 优点
  - 安装简单
- 缺点
  - 失去了自定义性

# 2. YUM 在线管理

- yum(Yellow dog Updater Modified) 主要功能是更方便的添加/删除/更新/RPM 包，它能自动解决包的依赖性问题
- 这是 rpm 包的在线管理工具
- 将所有的软件名放到官方服务器上，当进行 YUM 在线安装时，可以自动解决依赖性问题
- 配置文件目录在`/etc/yum.repos.d/`下有配置文件(下面列出基本的)
  - CentOS-Base.repo

## 2.1 CentOs-Base.repo

内容(cat CentOS-Base.repo )

```shell
[BaseOS]
name=CentOS-$releasever - Base
baseurl=http://mirrors.cloud.aliyuncs.com/$contentdir/$releasever/BaseOS/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
```

| 字段 | 含义 |
| --- | --- |
| BaseOS | 容器名称，一定要放在[]中 |
| name | 容器说明，可以自己随便写 |
| mirrirlist | 镜像站点，可以注释掉，或者不写 |
| baseurl | YUM 源服务器的地址，默认是 CentOS 官方的 YUM 源 |
| enable | 此容器是否生效，不写或者写成 enable=1 表示生效，写成 enable=0 表示失效 |
| gpgcheck | 如果是 1 就是指定 PRM 的数字证书生效，如果是 0 表示不生效 |
| gpgkey | 数字证书的公钥文件保存位置，不用改 |

**使用阿里云镜像**

- 默认 baseurl 是 CentOS 官方的 YUM 源，国内下载会很慢，所以可以更改下载源

```shell
# 复制一份原有的配置文件 放置以后用
mv /etc/yum.repos.d/CentOS-Base.repo  /etc/yum.repos.d/CentOS-Base.repo.backup

# 把阿里云的地址更新到CentOS-Base.repo中 地址gpt查一下
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.cloud.aliyuncs.com/xxx
yum makecache
yum -y update # 升级所有包同时也升级软件和系统内核
```

# 3.YUM 命令

- yum 安装只需要写包名即可

| 命令 | 含义 |
| --- | --- |
| yum list | 查询所有可用软件包列表 |
| yun search 关键字 | 搜索服务器上所有和关键字相关的包 |
| yum -y install 包名 | 安装包，-y 自动回答 yes 否则需要输入 yes 才能安装 |
| yum -y update 包名 | 更新包 |
| yum -y remove 包名 | 卸载包，尽量不要卸载，假如卸载 a 可能 b 依赖 a 那么 b 就用不了了 |
| yum grouplist | 列出所有可用的软件组列表 |
| yum grouplist 软件组名 | 安装指定的组，组名可以用 grouplist 查询 |
| yum groupremove 软件组名 | 卸载指定软件组 |

**举例**

```shell
yum -y install gcc
```

# 4.添加安装源

- 有些安装包 YUM 源上可能没有，这时候就需要手动的添加一个安装源了

比如说现在 yum 的源上没有 mongodb 的包，那么我么需要手动的添加一个安装源

**第一步 添加源**

```shell
vim /etc/yum.repos.d/mongodb-org-3.4.repo

# 内容格式如下 但是里面的信息可能不对 网上查一下就行
# 添加内容如下
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=http://repo.mongodb.org/yum/redhat/xxx
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static
```

**第二步 更新缓存**

- 目的是把服务器的包信息下载到本地电脑缓存起来

```shell
yum makecache
```

**第三步 安装**

```shell
yum -y install mongodb-org
```

# 5.常用软件安装

- 当使用 yum 安装某个软件后可使用 systemctl 来控制

## 5.1 nginx

**安装**

```shell
yum install nginx -y

whereis nginx # 查看安装位置
```

**启动服务**

```shell
# 启动 以下命令选择一个即可
nginx -s start
systemctl start nginx

# 停止
systemctl stop nginx

# 查看状态
systemctl status nginx
```

## 5.2 redis 安装

**安装**

```shell
yum install redis -y
```

**操作服务**

```shell
# 启动
systemctl start redis.service
# 停止
systemctl stop redis.service
# 查看状态
systemctl status redis.service
# 重启
systemctl restart redis.service
```

好的，我会将常见选项部分移到基本用法之前。以下是更新后的笔记：

---

# 6. wget 使用笔记

## 1. 简介

`wget` 是一个用于从网络上下载文件的命令行工具。它支持 HTTP、HTTPS 和 FTP 协议，并且可以在后台运行，适用于下载大文件或需要断点续传的情况。

## 2. 安装

在大多数 Linux 发行版中，`wget` 通常已经预装。如果没有，可以使用包管理工具进行安装：

### 在基于 Debian 的系统上 (如 Ubuntu)

```sh
sudo apt-get install wget
```

### 在基于 Red Hat 的系统上 (如 CentOS)

```sh
sudo yum install wget
```

## 3. 常见选项

- `-O <file>` (Output): 将下载的内容保存为指定的文件名。
- `-c` (Continue): 断点续传，继续下载未完成的文件。
- `-r` (Recursive): 递归下载整个网站。
- `-l <level>` (Level): 设置递归下载的深度。
- `--limit-rate=<rate>` (Limit Rate): 限制下载速度，单位可以是 `k` (KB/s) 或 `m` (MB/s)。
- `-b` (Background): 后台下载。
- `-q` (Quiet): 安静模式，不输出下载信息。
- `-P <prefix>` (Prefix): 将文件下载到指定的目录。
- `--user=<user>` (User) 和 `--password=<password>` (Password): 用于需要身份验证的网站。

## 4. 基本用法

**1. 下载单个文件**

```sh
wget http://example.com/file.zip
```

**2. 下载并保存为指定文件名**

```sh
wget -O newfile.zip http://example.com/file.zip
```

**3. 断点续传**

```sh
wget -c http://example.com/file.zip
```

**4. 下载整个网站**

```sh
wget -r http://example.com
```

**5. 限制下载速度**

```sh
wget --limit-rate=200k http://example.com/file.zip
```

**6. 后台下载**

```sh
wget -b http://example.com/file.zip
```

## 5. 示例

**1. 下载一个文件并保存为特定文件名**

```sh
wget -O myfile.zip http://example.com/file.zip
```

**2. 递归下载一个网站，限制深度为 2**

```sh
wget -r -l 2 http://example.com
```

**3. 限制下载速度为 100 KB/s**

```sh
wget --limit-rate=100k http://example.com/file.zip
```

**4. 在后台下载文件**

```sh
wget -b http://example.com/file.zip
```

**5. 下载需要身份验证的文件**

```sh
wget --user=username --password=password http://example.com/protectedfile.zip
```

## 6. 高级用法

**1. 下载多个文件**

可以将多个 URL 写入一个文件，然后使用 `-i` 选项进行下载：

```sh
wget -i urls.txt
```

**2. 镜像网站**

使用 `-m` 选项可以镜像整个网站：

```sh
wget -m http://example.com
```

**3. 忽略证书错误**

在下载 HTTPS 内容时，如果遇到证书错误，可以使用 `--no-check-certificate` 选项忽略：

```sh
wget --no-check-certificate https://example.com/file.zip
```

# 7. curl 使用笔记

## 什么是 `curl`？

`curl` 是一个用于从命令行或脚本中进行数据传输的工具。它支持多种协议，包括 HTTP、HTTPS、FTP、SFTP、SMTP 等。`curl` 的名字来源于“Client URL”，它的主要功能是从网络上获取数据或将数据发送到网络。

## 使用场景

1. **测试 API 接口**

   - 开发人员常用 `curl` 来测试 RESTful API 接口。通过发送各种 HTTP 请求（GET、POST、PUT、DELETE 等），可以验证 API 的功能和响应。

2. **下载文件**

   - `curl` 可以用于从网络上下载文件，尤其是在需要自动化下载任务时。例如，定期从服务器下载日志文件或备份文件。

3. **上传文件**

   - 可以使用 `curl` 将文件上传到服务器，适用于需要将数据发送到远程服务器的场景，如上传图片、文档等。

4. **模拟浏览器请求**

   - `curl` 可以通过设置请求头来模拟浏览器的行为，这在需要绕过某些网站的限制或进行爬虫时非常有用。

5. **自动化脚本**

   - 在自动化脚本中，`curl` 常用于与外部服务交互，如获取天气信息、发送通知到聊天应用等。

6. **网络调试**

   - 网络管理员和开发人员可以使用 `curl` 来调试网络请求，查看请求和响应头信息，分析网络问题。

7. **数据传输**

   - `curl` 支持多种协议，因此可以用于各种数据传输任务，如通过 FTP 上传或下载文件，通过 SMTP 发送邮件等。

8. **安全测试**
   - 在安全测试中，`curl` 可以用于测试服务器的安全性，例如通过发送特定的请求来检查服务器的响应和漏洞。

## 常用选项

- `-X`：指定请求方法（GET, POST, PUT, DELETE 等），等价于 `--request`
- `-H`：添加请求头，等价于 `--header`
- `-d`：发送 POST 数据，等价于 `--data`
- `-o`：将输出保存到文件，等价于 `--output`
- `-O`：将输出保存为 URL 中的文件名，等价于 `--remote-name`
- `-L`：跟随重定向，等价于 `--location`
- `-u`：使用用户名和密码进行认证，等价于 `--user`
- `-v`：显示详细的请求和响应信息，等价于 `--verbose`
- `-I`：仅查看响应头，等价于 `--head`
- `-x`：使用代理，等价于 `--proxy`
- `-F`：上传文件或表单数据，等价于 `--form`

## 基本用法

1. **基本请求**

   - 执行一个简单的 GET 请求：
     ```bash
     curl http://example.com
     ```
   - 使用 HTTPS：
     ```bash
     curl https://example.com
     ```

2. **保存响应到文件**

   - 使用 `-o`（等价于 `--output`）选项指定输出文件：
     ```bash
     curl -o output.html http://example.com
     ```
   - 使用 `-O`（等价于 `--remote-name`）选项保存文件名与 URL 中的相同：
     ```bash
     curl -O http://example.com/file.txt
     ```

3. **发送 POST 请求**

   - 发送带有数据的 POST 请求：
     ```bash
     curl -d "param1=value1&param2=value2" http://example.com/resource
     ```
   - 发送 JSON 数据：
     ```bash
     curl -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' http://example.com/resource
     ```

4. **添加请求头**

   - 使用 `-H`（等价于 `--header`）选项添加自定义请求头：

     ```bash
     curl -H "Authorization: Bearer token" http://example.com/resource

     # 添加多个请求头
     curl -H "Authorization: Bearer token" -H "Content-Type: application/json" http://example.com/resource
     ```

5. **处理重定向**

   - 使用 `-L`（等价于 `--location`）选项跟随重定向：
     ```bash
     curl -L http://example.com
     ```

6. **查看请求和响应头**

   - 使用 `-v`（等价于 `--verbose`）选项查看详细信息：
     ```bash
     curl -v http://example.com
     ```
   - 仅查看响应头：
     ```bash
     curl -I http://example.com
     ```

7. **上传文件**

   - 使用 `-F`（等价于 `--form`）选项上传文件：
     ```bash
     curl -F "file=@/path/to/file" http://example.com/upload
     ```

8. **使用代理**

   - 使用 `-x`（等价于 `--proxy`）选项指定代理：
     ```bash
     curl -x http://proxyserver:port http://example.com
     ```

9. **认证**
   - 使用 `-u`（等价于 `--user`）选项进行基本认证：
     ```bash
     curl -u username:password http://example.com
     ```

# 8. wget 和 curl 的区别

`curl`和`wget`都是用于从命令行下载文件的工具，但它们有一些关键的区别：

1. **基本功能**：

   - `wget`：主要用于下载文件，支持递归下载，可以下载整个网站。
   - `curl`：不仅可以下载文件，还可以用于发送各种类型的 HTTP 请求（如 POST、PUT 等），更适合用于 API 测试和与服务器进行复杂的交互。

2. **协议支持**：

   - `wget`：主要支持 HTTP、HTTPS 和 FTP 协议。
   - `curl`：支持更多的协议，包括 HTTP、HTTPS、FTP、FTPS、SFTP、SCP、LDAP、SMB 等。

3. **递归下载**：

   - `wget`：支持递归下载，可以下载整个网站。
   - `curl`：不支持递归下载。

4. **输出**：

   - `wget`：默认将下载的文件保存到当前目录。
   - `curl`：默认将输出发送到标准输出（stdout），需要使用`-o`或`-O`选项来保存到文件。

5. **续传功能**：

   - `wget`：支持断点续传。
   - `curl`：也支持断点续传，但需要使用`-C`选项。

6. **代理支持**：

   - 两者都支持通过代理进行下载，但配置方式有所不同。

7. **易用性**：
   - `wget`：通常更简单易用，适合快速下载文件。
   - `curl`：功能更强大，但也更复杂，适合需要更多控制和选项的场景。

根据具体需求选择使用哪个工具，如果只是简单的文件下载，`wget`可能更方便；如果需要复杂的 HTTP 请求或支持更多协议，`curl`可能更合适。
