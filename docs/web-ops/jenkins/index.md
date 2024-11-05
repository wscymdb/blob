# Jenkins

## 安装

由于 Jenkins 的版本会持续迭代，所以需要的 Java 版本也会不断变化，但是有些 Centons 的版本不支持更高级的 Java 版本，所以就需要安装老的 Jenkins 版本。但是由于使用 `yum install jenkins` 会是最新的版本，所以我们需要手动安装老的版本。

### 安装最新版本

**安装**

如果你的 Linux 的系统支持最新的 Jenkins 版本所对应的 Java 版本，那么你可以直接使用 yum 安装最新版本的 Jenkins。步骤如下

1. 打开[Jenkins 官网](https://www.jenkins.io/),点击 download 按钮，[传送门](https://www.jenkins.io/download/)
2. 往下滑 找到对应的系统，然后点击进去
3. 这时候你就会看到对应的步骤 按照步骤来即可

这里以 ContOs 举例

```bash
# 1 这两部分命令是用于安装 Jenkins CI 工具的。第一部分命令使用 wget 命令下载 Jenkins 的仓库配置文件 jenkins.repo 到 /etc/yum.repos.d/ 目录下，以便系统可以通过 yum 包管理器安装 Jenkins。第二部分命令使用 rpm 命令导入 Jenkins 的 GPG 密钥，以确保下载的 Jenkins 软件包是经过验证的。这两个步骤是安装 Jenkins CI 工具的前提步骤。
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# 2 安装
yum install fontconfig java-17-openjdk
yum install jenkins

```

**启动**

- 开机自启

```bash
sudo systemctl enable jenkins
```

- 启动

```bash
sudo systemctl start jenkins
```

- 查看状态

```bash
sudo systemctl status jenkins
```

### 安装历史版本

**安装**

如果你的 Linux 系统不支持最新的 Jenkins 版本所对应的 Java 版本，那么你需要手动安装历史版本的 Jenkins。步骤如下

1. 打开[Jenkins 官网](https://www.jenkins.io/),点击 download 按钮，[传送门](https://www.jenkins.io/download/)
2. 找到`Stable (LTS)`区域的`Past Releases`按钮点进去[传送门](https://get.jenkins.io/war-stable/)
3. 找到`Long Term Support (LTS) Release Line` 然后你会发现有很多版本，然后每个版本有对应的支持的 Java 版本，然后记住你需要的版本
4. 继续往下滑动，就可以看到历史版本，找到你刚刚记住的版本点进去
5. 找到`jenkins.war.sha256 `(验证包的完整性) 和`jenkins.war`(主要的文件)文件，右键复制他们的链接，保存下来(当然也可直接把他们下载下来，然后上传到服务器上)
6. 下载验证包 和 软件包 (刚刚复制的链接)

   ```bash
   wget https://get.jenkins.io/war-stable/2.346.1/jenkins.war.sha256  https://get.jenkins.io/war-stable/2.346.1/jenkins.war
   ```

7. 验证包的完整性(可选)

   ```bash
   # 这时候会在当前文件夹看到jenkins.war  jenkins.war.sha256 两个文件
   # jenkins.war.sha256文件是用来验证jenkins.war文件完整性的校验文件。
   # SHA256是一种加密算法，通过对jenkins.war文件进行SHA256哈希计算，可以生成一个固定长度的校验值。这个校验值会保存在jenkins.war.sha256文件中。
   # 当下载jenkins.war文件后，可以使用SHA256算法对jenkins.war文件进行哈希计算，然后与jenkins.war.sha256文件中的校验值进行比对，以确保jenkins.war文件在传输过程中没有被篡改或损坏。这样可以保证jenkins.war文件的完整性和安全性。

   sha256sum jenkins.war.sha256

   cat jenkins.war.sha256

   # 比较两个输出看是否一致 如果一致表示没有被篡改过 反正被篡改过就要当心了
   ```

**启动**

`方式一 直接运行` 这会有一个弊端，当你关闭了终端，那么 Jenkins 就会停止运行。

```bash
# 1. 运行
java -jar jenkins.war

# 2. 等待一段时间，直到看到类似以下信息的输出：
# INFO: Jenkins is fully up and running

# 3. 打开浏览器，并访问 http://localhost:8080/（如果您在远程服务器上运行Jenkins，则将localhost替换为服务器的IP地址）。
```

`方式二 使用nohup命令(推荐)` 终端关闭之后仍然不会停止运行

```bash
 # 1. 运行
 nohup java -jar jenkins.war &

 # 2. 等待一会 打开浏览器，并访问 http://localhost:8080/
```

## 新手入门

1. 在浏览器输入http://xxx.xx:8080/之后耐心等待一会会看到 `解锁 Jenkins` 页面，会看到红色的路径，在你的服务器输入 cat + 路径即可获取密码，然后粘贴到密码框中，然后点击`继续`按钮。

   ```bash
   cat /root/.jenkins/secrets/initialAdminPassword
   ```

2. 在`自定义Jenkins`页面选择`安装推荐的插件或手动选择插件`
3. `创建第一个管理员用户`页面可以创建一个新的管理员用户，输入用户名和密码，然后点击`保存并继续`按钮。或者直接点击`使用admin账户继续`。
4. `实例配置`页面保持不动即可，然后点击`保存并完成`按钮。

## 构建配置实战

文字的描述总是那么苍白无力，所以我写了图片的教程看下面的链接

[链接实战](https://juejin.cn/post/7433584884859289651)

## FAQ

### nohup 命令是啥？

nohup 是一个命令，用于在后台运行命令，即使终端关闭也不会停止运行。它的全称是 "No Hang Up"，意思是 "不挂起"。

基本语法：

```bash
nohup command &

# 其中，command是你想要在后台运行的命令。&符号用于将命令放入后台执行。
# 例如，如果你想要在后台运行一个长时间执行的脚本文件script.sh，你可以使用以下命令：
nohup ./script.sh &
```

### 怎么查看 nohup 命令的输出或状态

**查看 nohup 输出文件**：nohup 命令会将命令的输出重定向到一个名为 nohup.out 的文件中。可以使用 cat 命令或其他文本查看工具来查看这个文件的内容，例如：

```bash
cat nohup.out
```

**使用 ps 命令查看进程**：可以使用 ps 命令来查看后台运行的进程，找到您想要监视的进程。例如，可以使用以下命令列出所有后台进程：

```bash
 ps aux | grep your_command
```

### 怎么选择某个 JDK

如果系统中安装了多个版本的 JDK，可以使用以下命令来选择默认的 JDK 版本：

```bash
sudo update-alternatives --config java
```

执行以上命令后，会列出系统中所有已安装的 JDK 版本，并提示选择默认的 JDK 版本。根据提示输入对应的数字，即可选择默认的 JDK 版本。

### 那怎么关闭 nohup 启动的 Jenkins

要关闭通过 nohup 启动的 Jenkins 进程，您可以使用以下步骤：

1. 首先，您需要找到 Jenkins 进程的进程 ID（PID）。您可以使用`ps`命令结合`grep`来查找 Jenkins 进程的 PID。假设您知道 Jenkins 的关键字，比如`jenkins.war`，您可以运行以下命令来查找进程 ID：

   ```bash
   ps aux | grep jenkins.war
   ```

2. 找到 Jenkins 进程的 PID 后，您可以使用`kill`命令来终止该进程。假设 Jenkins 的 PID 为 12345，您可以运行以下命令来关闭 Jenkins 进程：

   ```bash
   kill 12345
   ```

3. 确保 Jenkins 进程已经被成功终止。您可以再次运行`ps aux | grep jenkins.war`来检查 Jenkins 进程是否已经关闭。

### 那怎么重启 nohup 启动的 Jenkins

要重启通过 nohup 启动的 Jenkins 进程，您可以按照以下步骤操作：

1. 首先，您需要找到 Jenkins 进程的进程 ID（PID），可以使用`ps`命令结合`grep`来查找 Jenkins 进程的 PID。假设您知道 Jenkins 的关键字，比如`jenkins.war`，您可以运行以下命令来查找进程 ID：

   ```bash
   ps aux | grep jenkins.war
   ```

2. 找到 Jenkins 进程的 PID 后，您可以使用`kill`命令发送重启信号给 Jenkins 进程。假设 Jenkins 的 PID 为 12345，您可以运行以下命令来重启 Jenkins 进程：

   ```bash
   kill -HUP 12345
   ```

3. 确保 Jenkins 进程已经成功重启。您可以再次运行`ps aux | grep jenkins.war`来检查 Jenkins 进程是否已经重新启动。
