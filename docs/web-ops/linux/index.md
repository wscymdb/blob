# 1.Linux 常用命令

## 1.1 Linux 常见目录

| 目录 | 用途 |
| --- | --- |
| / | 根目录(linux 不像 window 还有 C 盘 D 盘) |
| /boot | 启动目录，启动相关文件 |
| /dev | 设备文件 |
| /etc | 配置文件 |
| /home | 普通用户的家目录，可以操作 (家目录就是每个用户都有自己的目录,这个目录就是该用户的家目录) |
| /lib | 系统库保存目录 |
| /mnt | 移动设备挂载目录 |
| /media | 光盘挂载目录 |
| /misc | 磁带机挂载目录 |
| /root | 超级用户的家目录，可以操作 |
| /tmp | 临时目录，可以操作 |
| /proc | 正在运行的内核信息映射，主要输出进程信息、内存资源信息和磁盘分区信息等等 |
| /sys | 硬件设备的驱动程序信息 |
| /var | 变量 |
| /bin | 普通的基本命令，如 ls、ll、chmod 等，普通用户也可以使用 |
| /sbin | 基本的系统命令，如 shutdown、reboot，用于启动系统，修复系统，只用管理员才能运行 |
| /usr/bin | 是你在后期安装的一些软件的运行脚本 |
| /usr/sbin | 放置一些用户安装的系统管理的必备程序 |

## 1.2 命令基本格式

### 1.2.1 命令提示符

就是当我们登录到服务器后，终端会显现如下所示的一段提示符

```
[root@xxx ~]#
```

- **root** 表示当前登录用户
- **xxx** 表示 localhost 当前的主机名
- **~** 表示当前的工作目录，默认是当前用户的家目录， root 用户就是/root，普通用户就是/home/用户名
- **\#** 表示提示符，超级用户是#，普通用户是$

### 1.2.2 命令格式

- 命令 [选项] [参数]
- 当有多个选项时，可以写在一起
- 一般参数有简化和完整写法两种，`-a`与`--all`等效

**举例**

```shell
# 多个选项放一起即可 -al
ls -al book
```

### 1.2.3 ls

- 查询目录中的内容

**语法**

```shell
# 默认当前目录下的文件列表
ls [选项] [文件或目录]
```

**选项**

- -a 显示所有文件，包括隐藏文件
- -l 显示详细信息
- -d 查看目录本身的属性而非自文件 (只查看文件夹本身不会查看文件夹下的子内容)
- -h 人性化的方式显示文件大小 （显示大小方便我们阅读）

**举例**

```shell
# 查看当前文件夹下的所有文件包含隐藏文件
ls -a

# 查看book文件夹下的所有文件包含隐藏文件
ls -a book

# 查看book文件夹的本身的详细信息 且文件大小以人性化的方式显示
ls -dhl book
```

**-l 属性**

用来显示详细信息

```shell
drwxr-xr-x 2 root root 31 4月  14 14:18 book
```

| drwxr-xr-x     | 2   | root   | root   | 31       | 4 月 14 14:18 | book   |
| -------------- | --- | ------ | ------ | -------- | ------------- | ------ |
| 文件类型和权限 |     | 所有者 | 所属组 | 文件大小 | 最后修改时间  | 文件名 |

## 1.3 文件处理命令

### 1.3.1 mkdir

- 建立目录 make directory

**语法**

```shell
mkdir [选项] [目录名]
```

**选项**

- -p 递归创建
  - mkdir a/b 如果不存在 a 那么就会报错
  - mkdir -p a/b 如果不存在 a 那么会先创建 a 然后在创建 b

**举例**

```shell
# 创建demo文件夹
mkdir demo

# 创建a文件下且a文件夹中创建b文件夹 如果不存在a就创建a
mkdir -p a/b
```

### 1.3.2 cd

- 切换所在目录 change directory

- 相对路径是参照当前所在目录

- 绝对路径是从根目录开始

- 按 TAB 键可以补全命令和目录

**语法**

```shell
cd [目录]
```

**目录选项**

- `～` 家目录
- `.` 当前目录
- `..` 上级目录
- `目录名`

**举例**

```shell
# 切换当a目录 相对路径
cd a

# 使用绝对路径
cd /usr/shar
```

### 1.3.3 pwd

- 打印当前的工作目录
- print working directory

```shell
pwd
```

### 1.3.4 rmdir

- 删除空目录 remove empty directory
- 如果目录下有文件是无法删除的

**语法**

```shell
rmdir [目录名]
```

**举例**

```shell
# 删除a文件夹
rmdir a

# 删除a文件夹下的b文件夹
rmdir a/b
```

### 1.3.5 rm

- 删除文件或目录

**语法**

```shell
rm [选项] [文件或目录]
```

**选项**

- -r 删除目录
  - 会递归询问 比如 a 目录下有 a.txt
  - 使用 rm -r a 会先提示你是否进入 a 文件夹 然后在提示是否删除 a.txt 最后在提示你是否删除 a 文件夹 你都需要去做交互
- -f 强制删除
  - rm -f 强制删除不用做交互效果

**举例**

```shell
# 强制删除hello目录下的所有文件包括hello文件夹
rm -rf hello
```

### 1.3.6 cp

- copy 复制命令

**语法**

```shell
cp [选项] [源文件或目录] [目标文件]
```

**选项**

- -r 复制目录，默认是复制文件
- -i 会在复制文件的时候给提示，如果复制的目标文件存在，会给你提示是否要覆盖提示，`默认就会提示`

**举例**

```shell
# 在当前目录复制a.txt 名称是b.txt
cp a.txt b.txt

# 复制a.txt 到book目录下 名称还是a.txt
cp a.txt book/

# 复制a.txt 到book目录下 名称是b.txt
cp a.txt book/b.txt

# 复制family目录 名称为ff 注意会复制family下的所有内容
cp -r family/ ff
```

### 1.3.7 mv

- 移动文件或者重命名 move

**语法**

```shell
mv [源文件或目录] [目标文件]
```

**举例**

```shell
# 如果移动后的位置还是当前的文件夹 那么就是重命名


# 重名称 本质就是剪切文件然后剪切后改名
mv a.txt a.md

# 移动文件到book文件夹下 名称还是a.txt
mv a.txt book/

# 移动文件到book文件夹下 名称改为c.txt
mv a.txt book/c.txt
```

### 1.3.8 ln

- 链接命令，生成链接文件 link

- 不加-s 就表示创建硬链接

**语法**

```shell
ln [选项] [源文件] [目标文件]

-s 创建软连接
```

**举例**

```shell
# 在当前目录下创建一个b.md的软链接 链接到book/b.md
ln -s book/b.md b.md
```

## 1.4 文件搜索命令

### 1.4.1 locate

- 在后台数据库中按文件名搜索，速度比较快
- 数据保存在`/var/lib/mlocate/mlocate.db`后台数据库，每天更新
  - 可以`updatedb`命令立刻更新数据库
  - 只能搜索文件名
- 需要安装 mlocate `yum -y install mlocate`

### 1.4.2 whereis

- 搜索 `命令所在路径`以及帮助文档所在位置

**语法**

```shell
whereis [选项] 命令名
```

**选项**

- -b 只查找可执行文件
- -m 只查找帮助文件

**举例**

```shell
# 查找cd命令的位置
whereis cd
```

### 1.4.3 which

- 可以看到别名

**举例**

```shell
# 查看ls命令所在位置 以及他的别名
which ls

# 输出
alias ls='ls --color=auto'
	/usr/bin/ls
```

### 1.4.4 环境变量

- 查看环境变量有哪些

**语法**

```shell
echo $PATH
```

### 1.4.5 find

- 文件搜索命令

**语法**

```shell
find [选项] [搜索范围] [搜索条件]
```

**选项**

- -name 按名称来搜索
- 通配符
- -i 忽略大小写
- -user 按所有者进行搜索
- -mtime 按时间搜索

#### **按名称搜索**

- 避免大范围的搜索，会非常消耗系统资源

```shell
# 搜索根目录下(/表示根目录)的所有名称是11.txt的文件
find / -name 11.txt
```

#### **通配符**

- 可以使用正则去匹配
- `*`匹配任意内容
- `?`匹配任意一个字符
- `[]`匹配任意一个中括号内的字符

```shell
# 在当前目录下找到符合匹配规则的文件
find . -name "ab[cdef].txt"
```

#### **不区分大小写**

- 因为 linux 是区分大小写的，所以可以使用`-i`(ignore)来忽略大小写

```shell
find . -iname "aB[cdef].txt"
```

#### **按所有者进行搜索**

```shell
# 查询root目录下所有者是root的文件
find /root -user root

# 查询root目录下没有所有者的文件
find /root -nouser
```

#### 按时间搜索

| 参数  | 含义             |
| ----- | ---------------- |
| atime | 文件访问时间     |
| ctime | 改变文件属性时间 |
| mtime | 修改文件内容时间 |

| 参数(5 只是举例 表示天数) | 含义              |
| ------------------------- | ----------------- |
| -5                        | 5 天内修改的文件  |
| 5                         | 第 5 天修改的文件 |
| +5                        | 5 天前修改的文件  |

```shell
# 在当前目录下查询 文件是5天前修改的文件
find . -mtime +5
```

#### 按文件大小搜索

- k 要小写
- M 要大写

| 参数 | 含义    |
| ---- | ------- |
| -8k  | 小于 8K |
| 8k   | 等于 8K |
| +8k  | 大于 8K |
| +8M  | 小于 8M |

```shell
# 在当前目录下查找大于8k的文件
find . -size +8k

# 在当前目录下查找大于8M的文件
find . -size +8M

# 在当前目录下查找大于8k且小于1M的文件
# -a 表示and 逻辑与 两个都满足
find . -size +8k -a -size -1M

# 在当前目录下查找大于1k或大于1M的文件
# -o 表示or 逻辑或 两个满足一个即可
find . -size -8k -o -size +1M

```

### 1.4.6 grep

- 在文件中寻找匹配的字符串

  - `-i` 忽略大小写
  - `-v` 排除指定字符串

```shell
# 在a.txt中寻找有a的字符串
grep a  a.txt

# 在a.txt中寻找有a的字符串 且忽略大小写
grep a -i a.txt

# 在a.txt中寻找有除了a的所有字符串 且忽略大小写
grep a -i -v a.txt
```

## 1.5 压缩与解压命令

### 1.5.1 zip 格式

- 如果文件特别小，压缩反而更大了，所以小文件不推荐压缩

| 功能       | 命令                             |
| ---------- | -------------------------------- |
| 压缩文件   | zip 压缩文件名.zip 源文件        |
| 压缩文件夹 | zip -r 压缩文件夹名.zip 源文件夹 |
| 解压       | unzip 解压文件(夹)名.zip         |

**举例**

```shell
# 如果没有zip或者unzip就安装一下
yum install zip unzip

# 压缩msg.txt文件 msg11.zip表示要压缩过后的文件的名称
zip  msg11.zip  msg.txt

# 压缩book文件夹
zip book.zip book

# 解压book.zip
unzip book.zip
```

### 1.5.2 gzip

- gzip 为高压缩，可以把文件压缩的更小
- gzip`不能压缩文件`夹只能压缩文件

**举例**

```shell
# 注意gzip压缩文件会把源文件干掉


# 压缩book.txt
gzip book.txt


# 压缩book.txt且保留源文件
# 使用-c命令
# -c会拿到gzip压缩book.txt返回的文件 然后使用 > 将返回值给到 book.txt.gz(自动创建)文件 所以就不会干掉源文件了
# 给的文件要使用后缀名加.gz  不然解压的时候去掉.gz后缀源文件就没有后缀了  book.txt.gz
gzip -c book.txt > book.txt.gz


# 压缩目录
# 这里的压缩目录并不是真的压缩目录而是压缩该目录下的所有文件
# 使用-r命令
gzip -r book

# 解压
# 使用 -d
gzip -d book.txt.gz
```

### 1.5.3 tar

- 打包命令，`只打包并不会压缩`

**选项**

- `-c` 打包
- `-x` 解包
- `-v` 显示过程
- `-f`指定打包后的文件名

**示例**

```shell
# 语法
tar -cvf 打包后的文件名 源文件

# 打包book文件夹为book.tar
# tar -cvf是tar -c -v -f 的简写
tar -cvf book book.tar

# 打包1.txt文件为1.txt.tar
tar -cvf 1.txt 1.txt.tar

# 解包
tar -xvf book.tar
```

### 1.5.4 tar.gz

- `zip`可以压缩目录，但是压缩效率不高，`gzip`压缩效率高但是不支持压缩目录
- 所以可以先打包为`.tar`，再压缩为`.gz`

**示例**

```shell
# -z 其实就表示gzip格式
# 其实就是先将文件夹压缩成.tar 然后再压缩成.gz
# 压缩book文件夹为gzip格式
tar -zcvf book.tar.gz  book

# 解压.tar.gz压缩包
tar -zxvf book.tar.gz
```

## 1.6 关机和重启命令

### 1.6.1 shutdown

- 关机命令 可以设置定时关机、重启

**选项**

- -c 取消前一个关机命令
- -h 关机
- -r 重启

**示例**

```shell
# 6点重启
shutdown -r 06:00

# 6点关机
shutdown -h 06:00

# 取消
shutdown -c
```

### 1.6.2 init

- 和 shutdown 差不多

```shell
# 关机
init 0

# 重启
init 6
```

### 1.6.3 logout

- 退出登录

```shell
logout
```

## 1.7 查看登录用户信息

### 1.7.1 w

- 查看登录用户信息

```shell
# 输入w即可
w

# 当输入后会显示如下的字段
# USER：登陆的用户名
# TTY：
# FROM：登陆的IP
# LOGIN@：登录的时间
# IDLE：用户闲置时间
# JCPU ：该终端所有进程占用的时间
# PCPU：当前进程所占用的时间
# WHAT：正在执行的命令
```

### 1.7.2 who

- w 命令的简洁显示

```shell
who
```

### 1.7.3 last

- 查看当前登录和过去登录的信息

```shell
last
```

## 1.8 文件查看命令

### 1.8.1 cat

- 查看文件的所有内容

```shell
cat 1.txt
```

### 1.8.2 more

- 如果当前终端显示`不全会展示部分`，
- 按`空格键`继续往下展示，
- 按`b键`往上展示

```shell
more 1.txt
```

### 1.8.3 head

- `从头展示`多少行的内容

```shell
# 假设1.txt有20行内容 第一行是1 第二行是2 直到第20行是20

# 从头开始展示前5行的数据
head -5 1.txt

# 从头开始展示前8行的数据
head -8 1.txt
```

### 1.8.4 tail

- `从尾展示`多少行的内容
- `-f`表示 follow 意思，实时跟踪文件的变化

```shell
# 假设1.txt有20行内容 第一行是1 第二行是2 直到第20行是20

# 从尾开始展示后2行的数据 结果就是19 20
tail -2 1.txt


# 实时监控1.txt的变化
# 当对1.txt添加或删除内容的时候可以立马显示
tail -f 1.txt


# ｜表示管道符
# 显示前10行的内容 然后通过管道符给到后面 使用tail -2显示给的内容的后2行 所以结果是 9 10
head -10 1.txt | tail -2
```

# 2. VI 编辑器

- VI (visual interface):可视化接口
- Linux 中的编辑器，类似与 windows 中的记事本
- VIM 是 VI 编辑器的升级版本
- 不需要鼠标，只用键盘就可以

## 2.1 打开文件

- 输入`vi 文件名`即可进入这个模式
- vi 文件名，如果这个文件不存在的话会创建然后在编辑内容
- vimtutor
  - 输入这个命令可以进入 vim 的教程

**举例**

```shell
vi 1.txt
vim 1.txt
```

## 2.2 操作模式

| 模式名称             | 含义                     |
| -------------------- | ------------------------ |
| 命令模式             | 等待输入的模式           |
| 输入模式             | 编辑模式，用于输入文本   |
| 底行(尾行、末行)模式 | 可以输入指令，搜索、保存 |

**步骤**

```shell
当vi 文本的时候，默认的模式是命令模式，这时候是不能输入的
然后英文模式下按键的 a\i\o\s键之一可以进入编辑模式
编辑完毕之后 按住esc键盘退出输入模式
然后英文模式下 输入冒号:  然后进入末行模式
这时候可以输入对应的指令，输入w(保存)等命令
```

## 2.3 命令模式

### 2.3.1 光标

- 下面的光标移动可以使用`上下左右键`进行移动

| 命令 | 含义     |
| ---- | -------- |
| h    | 光标左移 |
| j    | 光标下移 |
| k    | 光标上移 |
| l    | 光标右移 |

### 2.3.2 翻页

| 命令   | 含义       |
| ------ | ---------- |
| ctrl+f | 向下翻页   |
| ctrl+b | 向上翻页   |
| ctrl+d | 向下翻半页 |
| ctrl+u | 向上翻半页 |

### 2.3.3 插入类

- 输入以下命令，`会自动进入输入模式`

| 命令 | 含义                     |
| ---- | ------------------------ |
| i    | 在光标当前位置插入       |
| a    | 在光标右边插入           |
| A    | 在光标右边的末行插入     |
| o    | 在光标所在行的下一行插入 |
| O    | 在光标所在行的上一行插入 |
| s    | 删除当前光标位置并插入   |

### 2.3.4 删除类

| 命令 | 含义         |
| ---- | ------------ |
| x    | 删除当前字符 |

### 2.3.5 行删除类

| 命令 | 含义                               |
| ---- | ---------------------------------- |
| dd   | 删除光标所在行(其实就是剪切当前行) |

### 2.3.6 撤销

| 命令 | 含义                   |
| ---- | ---------------------- |
| u    | 撤销最后执行的一次命令 |

### 2.3.7 剪切类

| 命令 | 含义                   |
| ---- | ---------------------- |
| dd   | 删除光标所在行         |
| yy   | 复制光标所在行         |
| p    | 在光标所在行的下方粘贴 |
| P    | 在光标所在行的上方粘贴 |

### 2.3.8 替换类

| 命令 | 含义                                                  |
| ---- | ----------------------------------------------------- |
| r    | 替换当前位置字符(先输入 r 然后在输入要替换的内容即可) |

### 2.3.9 搜索

- n 和 shift+N 命令是在进入搜索后可以进行的操作
- 也就是所要先执行/命令

| 命令    | 含义                                        |
| ------- | ------------------------------------------- |
| /       | 输入/后，在输入查找的内容，然后回车即可搜索 |
| n       | 查找下一个                                  |
| shift+N | 查找上一个                                  |

### 2.3.10 纠正错误

| 命令         | 含义                          |
| ------------ | ----------------------------- |
| :s/old/new   | 把光标所在行的 old 替换成 new |
| :s/old/new/g | 把所有行的 old 替换成 new     |

## 2.4 尾行模式

- 英文模式下按住`/`键进入尾行搜索模式
  - 然后输入要搜索的内容，回车即可
- 英文模式下按住`:`键进入尾行保存模式

  - 输入 w 或者其他命令进行保存相关的操作

- 在命令后面加`!`表示强制的意思
- 表格命令中的`:`不用输入 ，因为要按`:`才能进入尾行模式,直接输入如 w 这样的即可

| 命令 | 含义                         |
| ---- | ---------------------------- |
| :w   | 把写入保存到硬盘中 不会退出  |
| :q   | 退出当前 VI 编辑器打开的文件 |
| :wq! | 强制保存然后退出             |
| :q!  | 强制退出                     |

# 3. 用户和用户组

- 使用操作系统的人都是用户
- 用户组是具有相同系统权限的一组用户

## 3.1 配置文件

### 3.1.1 /etc/group

- /etc/group 文件存储的是当前系统中所有用户组的信息
- `root`组编号为`0`
- `1-499`是系统预留的编号，预留给安装的软件和服务的
- 用户`手动创建`的用户组从`500`开始
- 组密码占位符都是`x`，密码需要在别的文件查看
- 如果组内只用一个用户，且用户名和组名相同的话，是可以省略用户名的

**/etc/group 文件内容字段含义**

`root:x:0:root`

| 名称 | 含义           |
| ---- | -------------- |
| root | 组的名称       |
| x    | 密码占位符     |
| 0    | 组编号         |
| root | 组中用户名列表 |

### 3.1.2 /etc/gshadow

- 存放当前系统中用户组的`密码信息`
- 和`etc/group`中的记录一一对应

**/etc/gshadow 文件内容字段含义**

`root:*::root`

| 名称 | 含义                             |
| ---- | -------------------------------- |
| root | 组的名称                         |
| x    | 组密码，\*为空                   |
|      | 组管理者，为空表示都可管理这个组 |
| root | 组中用户名列表                   |

### 3.1.3 /etc/passwd

- 存放当前系统中所有用户的信息

**字段含义**

`root:x:0:0:root:/root:/bin/bash`

| 名称      | 含义         |
| --------- | ------------ |
| root      | 用户名       |
| x         | 密码占位符   |
| 0         | 用户编号     |
| 0         | 用户组编号   |
| root      | 用户注释信息 |
| /root     | 用户主目录   |
| /bin/bash | shell 类型   |

### 3.1.4 /etc/shadow

- 存放当前系统中所有用户的`密码`信息

**字段含义**

`root:$6$Z3PZ:19806:0:99999:7:::`

| 名称 | 含义 |
| --- | --- |
| root | 用户名 |
| $6$Z3PZ | 单向加密后的密码 |
| 19806 | 修改日期，这个是表明上一次修改密码的日期与 1970-1-1 相距的天数，也就是密码不可变更的天数，如果这个数是 8，则 8 天内不可更改密码，如果是 0，则随时可以更改 |
| 0 | 这个是表明上一次修改密码的日期与 1970-1-1 相距的天数，也就是密码不可变更的天数，如果这个数是 8，则 8 天内不可更改密码，如果是 0，则随时可以更改 |
| 99999 | 如果是 99999 则永远不用更改，如果是其他数字如 12345，那么必须在举例 1970-1-1 的 12345 天内修改密码，否则密码失效 |
| 7 | 修改期限前 N 天发出警告 |
|  | 密码过期的宽限天数 |
|  | 账号失效日期 |
|  | 保留：被保留项暂时还没被用上 |

## 3.2 用户命令

**显示登录的用户名**

```shell
whoami
```

**显示指定用户信息，包括用户组，用户名 注意组编号**

```shell

# root 表示要显示的用户
id root

# 查看zs这个用户的信息
id zs

# 输入上面的命令会有三个字段 uid  gid  groups
#  gid 表示用户的主要组
# groups 表示用户的所有组
# 因为一个用户可能属于不同的用户组
```

**显示 xx 用户所在的所有组**

```shell
# root表示所要查询的用户
groups root
```

## 3.3 用户和用户组操作

### 3.3.1 用户组

**添加用户组**

```shell
# 添加zs用户组
groupadd zs
# 查看是否添加成功
cat /etc/group | grep zs
```

**添加用户组并指定编号**

```shell
# 添加zs用户组 指定编号为1008
groupadd zs
# 查看是否添加成功
cat /etc/group | grep zs
```

**修改用户组名称**

```shell
# 修改zs组名称为ls
# 语法：groupmod -n 修改之后的名称  修改哪个组
groupmod -n ls zs
# 查看是否添加成功
cat /etc/group | grep ls
```

**修改用户组编号**

```shell
# 修改zs组编号为1009
groupmod -g 1009 zs
# 查看是否添加成功
cat /etc/group | grep zs
```

**删除用户组**

```shell
groupdel zs
```

### 3.3.2 用户

**添加用户**

- 如果创建用户时候没有指定用户组，系统会为他创建一个用户组

```shell
# 向zs这个组添加jack这个用户
useradd -g zs jack

# 创建用户且指定家目录
useradd -d /home/lily lily


```

**设置用户密码**

- 只有 root 用户可以设置用户的密码

```shell
# 给jack用户设置密码

passwd jack
```

**指定个人文件夹**

```shell
# 修改lily的家目录文件夹为/home/lily
usermod -d /home/lily lily
```

**修改用户所在的用户组**

```shell
# 修改jack用户的用户组为lily
usermod -g lily jack
```

**删除用户**

```shell
# 删除jack这个用户
userdel jack
# 删除jack这个用户同时删除这个用户对应的家目录
userdel -r jack
```

**切换用户**

```shell
# 切换到zhangsan用户
su zhangsan
```

# 4. 权限

## 4.1 文件(夹)权限

- 该章节的所有操作也可用于文件夹

### 4.1.1 文件基本权限

- 文件类型

  - `-` 表示文件

  - `d` 表示目录

  - `l` 表示软连接文件

- 字符表示的权限

  - `r` 读
  - `w` 写
  - `x` 执行

```shell
# 假如当前文件夹有1.txt 输入以下指令
ll 1.txt

# 会得到如下的输出
 -rwxrwxrwx 1 root root 0 5月  20 22:35 1.txt

# 只需要关注 -rwxrwxrwx 这一段即可 这一段表示的就是权限
# 第一位表示的是文件类型，具体含义看上面
# 可以看到-表示当前这个类型是一个文件

# 接下来的9个字符分成3组 每3个表示一组
# 第一组表示 所有者(创建者)的权限。第二组表示 所属组(与创建人同属的组的人)的权限。 第三组表示 其他人的权限
# 可以看到案例中1.txt这个文件 所有者的权限是读、写、执行
# 所属组的权限是读、写、执行
# 其他人对这个文件的权限是读、写、执行

# 正常情况下创建的文件权限是这样的 -rw-r--r--
# 表示 这是一个文件
# 所有者的权限是 读、写
# 所属组和其他人的权限是读
# 除了第一个-表示文件类型后面的-都表示没有对应的权限
```

### 4.1.2 基本权限的修改

**语法**

```shell
# 选项不是必填项
# chmod是 change mode的缩写
chmod [选项] 模式 文件(夹)名
```

**选项**

- `-R` 递归修改

**模式**

- [ugoa]\[+-=][rwx]

- 每组选一个符合拼成了模式

- ```
  u 表示 user 所有者
  g 表示 group 所属组
  o 表示 other 其他人
  a 表示 all 所有者、所属组、其他人

  + 表示添加
  - 表示减少
  = 表示等于(就是让该文件只有这一个权限)
  ```

**权限对应的数字**

- `r` 对应 `4`
- `w`对应 `2`
- `x`对应 `1`

**举例**

```shell
# 3.txt的初始权限是 -rwxr--rw-

# 给所属组添加写的权限 执行结果 -rwxrw-rw-
chmod g+w 3.txt

# 给所有者减少执行的权限  执行结果 -rw-rw-rw-
chmod u-x 3.txt

# 让其他人的权限变成只读  执行结果 -rw-rw-r--
chmod o=r 3.txt

# 给所有用户添加执行权限  执行结果 -rwxrwxr-x
chmod a+x 3.txt

# 修改文件夹的权限和修改文件的权限方法一样
# 举例 给demo文件夹让其他人可执行(目录的可执行就是可进入当前目录)
chmod o+x demo

# 也可以同时添加多个权限
chmod u+rwx

# 给ugo三个同时添加rwx权限
chmod +rwx
```

### 4.1.3 数字权限

**`0表示没有权限`**

**当修改权限的时候除了可以用模式的方式进行修改，也可以用数字的方式进行修改**

**如果使用数字设置权限，权限数字是一个三位数**

- 第一位：文件所有者的权限（Owner）
- 第二位：文件所属组的权限（Group）
- 第三位：其他用户的权限（Others）

**文件(夹)的基本权限如下**

- 读权限：`4`
- 写权限：`2`
- 执行权限：`1`

```
Q: 为什么 4 2 1分别代表 读 写 执行呢？
A:
  计算机存储权限是采用二进制的方式

  如下所示

  读  写 执行
  [2² 2¹  2⁰]
   4  2   1


```

**通过将这些权限值相加，你可以得到每一位的权限数字。例如：**

- 读、写、执行权限（rwx）：4 + 2 + 1 = 7
- 读、执行权限（r-x）：4 + 0 + 1 = 5 (0 表示没有对应的权限)
- 读、写权限（rw-）：4 + 2 + 0 = 6

**注意**

```shell
# 当使用权限数字设置权限的时候 一共要输入3个数字 这3个数字对应的分别(从左往右)是所有者、所属组、其他人

# 当然也可以不设置3个数字 但是情况会有所不同
# 如果不是3位数字那么空的数字会转为0


# 只设置一位数字
# 表示 设置给其他人的权限是7 所属人和所属组的全是设置为0
chmod 7 a.txt

# 只设置两位数字
# 表示 设置给所属组的权限是7 其他人的权限是3 所有人的权限是0
chmod 73 a.txt
```

**举例**

```shell
# 假设a.txt的权限是 -rwx--x---
# 需求: 给a.txt的所属组添加写的权限

# 方式一： 模式修改权限
chmod g+w a.txt

# 方式二：使用权限数字进行修改权限
# 所属人原来的权限是rwx 对应的数字是7
# 所属组原来的权限是--x 对应的数字是1 现在要加上写的权限(数字是2) 所以写、执行的权限对应的数字是3(1+2=3)
# 其他人原来的权限是---(无任何权限)  对应的数字是0
chmod 730 a.txt
```

### 4.1.4 权限的作用

- 对文件来说最高权限是`x`
- 对目录来说最高权限是`w`，只有读的权限没有意义，对目录有了写的权限，可以在目录里做任何事情

**文件权限**

| 权限 | 含义 | 举例 |
| --- | --- | --- |
| r | 读取文件内容 | cat、more、head、tail |
| w | 编辑、新增、修改文件内容，不能删除文件，除非对目录有写的权限 | vi、echo |
| x | 可以执行文件 |  |

**目录权限**

| 权限 | 含义 | 举例 |
| :-- | --- | --- |
| r | 可以查看目录下的文件名 | ls |
| w | 具有修改目录结构的权限。如新建、删除和重命名次目录下的文件和目录 | touch、rm、mv、cp |
| x | 进入目录 | cd |

### 4.1.5 其他权限命令

#### **chown**

- change owner 的缩写 意为变更所有者
- 可以变更一个文件(夹)的所有者

**语法**

```shell
chown 用户名 文件(夹)名
```

**举例**

```shell
# 用户a在家目录创建了demo文件夹和一个a.txt文件
# 这时候想要变更所有者给b用户
chown b demo
chown b a.txt

# 也可以写在一起
chown b a.txt demo
```

#### chgrp

- change group 的缩写 意为变更所属组
- 可以变更一个文件(夹)的所属组

**语法**

```shell
chgrp 用户名 文件(夹)名
```

**举例**

```shell
# 用户a在家目录创建了demo文件夹和一个a.txt文件
# 这时候想要变更所属组 为mm

chogrp mm a.txt demo
```

## 4.2 默认权限

- 默认权限就是当创建`文件(夹)`的时候，默认的权限

### 4.2.1 umask

- 也叫做`掩码`
- 这个命令是用来查看默认权限的
- 作用是指定创建文件(夹)的默认权限
- 默认值是：0022
  - 第一位的 0 表示文件特殊权限 0 表示没有特殊权限
  - 022 才是文件的权限

```shell
umask
```

**创建的文件(夹)的权限减去 umask 的值是为了使得文件(夹)的权限相对小一点 这样更安全一点，遵循权限最小原则**

### 4.2.2 文件权限

- 文件默认是没有执行权限的，必须手动赋予执行权限，因为不安全
  - 想想一下黑客入侵你的电脑创建一个木马文件，然后可以执行
- 文件的默认权限最大为`666`
  - 因为默认文件是不可以执行的
- `建立文件之后的默认权限`，为 666`减去`umask 的值

```shell
# 666表示文件的默认最大权限 也就是rw-rw-rw-
# umask的默认值是 0022 第一位是特殊权限忽略 所以就是022
# 创建文件之后的默认权限就是 644 也就是 rw-r--r--
666 - 022 = 644
```

### 4.2.3 目录权限

- 目录的默认权限最大为`777`
- `建立目录之后的默认权限`，为 777`减去`umask 的值

```shell
# 777表示文件的默认最大权限 也就是rwxrwxrwx
# umask的默认值是 0022 第一位是特殊权限忽略 所以就是022
# 创建文件之后的默认权限就是 755 也就是 rwxr-xr-x
777 - 022 = 755
```

### 4.2.4 修改 umask 的值

**临时修改**

**语法**

```shell
# 这样只能临时修改
# 一重启就没用了
umask 数字
```

**举例**

```shell
# 注意第一位表示特殊权限一定要加上 写0即可表示没有特殊权限
umask 0002

# 注意到修改了umask为022
# 所以再创建文件的默认权限就变成了 666 - 002 = 664 也就是rw-rw-r--
# 再创建目录的默认权限就变成了 777 - 002 = 775 也就是rwx-rwx-r-x
```

**永久修改**

```shell
# 如果想要永久生效 需要更改下面的文件
# 打开文件看到umask字段 然后修改后面对应的值即可
vi /etc/profile
```

## 4.3 sudo 权限

- sudo 命令的全拼是 "superuser do"。它允许用户以超级用户（root）或其他用户的身份执行命令，从而获得更高的权限来完成某些需要特权的操作。
- 总的来说 sudo 其实就是让普通用户可以以 root 的权限执行某个命令 或者执行只用 root 用户才能执行的命令

```shell
# 比如现在的用户是zs 他想要执行ls命令(假设这个命令只有root才能执行)
# 那么他就需要在的输入命令前加上 sudo 命令
# 这样就可以让zs这个普通用户可以使用ls这个root用户才能使用的命令
# 前提是zs得有执行ls命令的权限
sudo ls
```

### visudo

**问题**

- 上面说到使用 sudo 可以让普通用户 zs 执行 ls 命令
- 但是 zs 并没有被赋予 ls 命令的权限，换句话来说就是 zs 可以通过 sudo 来执行 ls 命令 但是他本身是不具备 ls 命令的权限

**解决**

- 通过`visudo`命令，可以超级用户赋权
- 实际修改的是`/etc/sudoers`文件
- 命令必须写绝对路径

**举例**

```shell
# 给zs这个用户赋予ls命令的权限
# 终端输入以下命令
visudo
# 然后会进入编辑页面
# 找到如下 root    ALL=(ALL)   ALL
# 然后在他下面添加 然后保存即可
# /bin/ls 表示ls命令的绝对路径
zs  ALL=(ALL)  /bin/ls


# 格式语法
# 可使用的身份 表示以什么身份运行命令 可以是root 、zs等不同的用户不同的用户对应的权限也不同
用户名  被管理主机地址=(可使用的身份)  授权命令(使用绝对路径)

# 解析
root ALL=(ALL)  ALL
# root：这是用户名，表示这条规则适用于 root 用户。
# ALL：第一个 ALL 表示这条规则适用于所有主机。这在多主机环境中很有用，可以指定规则只在特定主机上生效。
# =(ALL)：括号中的 ALL 表示 root 用户可以以任何用户的身份运行命令。这意味着 root 用户不仅可以以自己的身份运行命令，还可以以其他用户的身份运行命令。
# ALL：最后一个 ALL 表示 root 用户可以运行所有命令。

```

# 5 进程管理

## 5.1 查看进程的命令(ps)

- `ps aux` 查看系统中所有进程，使用`BSD`操作系统格式展示
- `ps -le` 查看系统中所有进程，使用`Linux`标准格式展示
- ps -ef

### 5.1.1 选项

| 参数 | 含义                               |
| ---- | ---------------------------------- |
| -a   | 显示一个终端的所有进程             |
| -u   | 显示进程的归属用户及内存的使用情况 |
| -x   | 显示没有控制终端的进程             |
| -l   | 长格式显示，显示更详细的信息       |

### 5.1.2 结果字段含义

- 使用 ps aux 或者 ps -le 打印的结果的字段含义

| 参数 | 含义 |
| --- | --- |
| USER | 该进程是由哪个用户创建的 |
| PID | 进程 ID 号 |
| %CPU | 该进程占用 CPU 资源的百分比，占用越高说明越消耗资源 |
| %MEM | 该进程占用物理内存的百分比，占用越高说明越消耗资源 |
| VSZ | 该进程占用虚拟内存的百分比，单位是 KB |
| RSS | 该进程占用实际物理内存大小，单位是 KB |
| TTY | 该进程在哪个终端运行，tty1~tty7 表示本地控制终端，tty1~tty6 是字符终端,tty7 是图形终端,pts/0~255 表示虚拟终端,?表示此终端是系统启动的 |
| STAT | 进程状态( `R`(Running) 运行。`S`(Sleep) 休眠 `T`(Terminated) 停止。`S`(Son)包含子进程。`+`位于后台) |
| START | 进程的启动时间 |
| TIME | 该进程占用 CPU 的运算时间，数值越高说明越消耗系统资源 |
| COMMAND | 产生此进程的命令名 |

举例

```shell
ps aux

# 部分结果
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.3 187272  7448 ?        Ss   3月24   2:04 /usr/lib/systemd/system
root           2  0.0  0.0      0     0 ?        S    3月24   0:03 [kthreadd]
nginx     304868  0.0  0.5 152740  9508 ?        S    6月27   0:00 nginx: worker process
...
```

## 5.2 pstree

- 使用树的结构查看进程
- 语法
  - pstree [选项]
  - -p 显示进程 PID
  - -u 显示进程的所属用户

## 5.3 查看进程(top)

**语法**

```shell
top
```

**选项**

- `-b` 使用批处理模式输出 一般和-n 配合使用
- `-n` 次数，指定 top 命令执行的次数，一般和-b 选项配合使用
- `-d` 秒数 指定 top 命令每个几秒更新，默认是 3 秒

**举例**

```shell
使用top命令会每隔3秒进行更新 如果想要只执行一次可以这么做
top -b -n 1
```

**top 执行返回结果含义**

```shell
# 状态栏信息
top - 16:03:21 up 111 days, 18:38,  1 user,  load average: 0.00, 0.01, 0.00
Tasks: 106 total,   1 running, 105 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.2 us,  0.5 sy,  0.0 ni, 97.7 id,  0.0 wa,  0.5 hi,  0.2 si,  0.0 st
MiB Mem :   1826.7 total,    218.4 free,    315.9 used,   1292.4 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1342.9 avail Mem
# 进程信息
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 306410 root      20   0  117452  15620  12568 S   1.0   0.8 142:07.78 AliYunDun
 306421 root      20   0  201052  45312  17348 S   0.7   2.4 235:47.75 AliYunDunMonito
  97320 root      20   0  912276  51364  20928 S   0.3   2.7  59:40.74 PM2 v5.3.1: G
```

**状态栏第一行为任务队列信息**

| 内容 | 说明 |
| --- | --- |
| 16:03:21 | 系统当前时间 |
| up 111 days, 18:38, | 系统的运行时间，本机已经运行了 111 天 18 小时 38 分钟 |
| 1 user | 当前登录了一个客户端 |
| load average: 0.00, 0.01, 0.00 | 系统在之前 1 分钟、5 分钟、15 分钟的平均负载，一般认为小于 1 时负载较小，大于 1 超过负载 |

**状态栏第二行为进程信息**

| 内容 | 说明 |
| --- | --- |
| Tasks: 106 total | 系统中的进程总数 |
| 1 running | 正在运行的进程数 |
| 105 sleeping | 睡眠的进程 |
| 0 stopped | 正在停止的进程 |
| 0 zombie | 僵尸进程，(有些父进程 killed 了 但是子进程还在，那么认为这些子进程就是僵尸进程)，如果不是 0 的话要进行检查 |

**状态栏第三行为 CPU 信息**

| 内容            | 说明                                                    |
| --------------- | ------------------------------------------------------- |
| %Cpu(s): 1.2 us | 用户模式占用的 CPU 百分比                               |
| 0.5 sy          | 系统模式占用的 CPU 百分比                               |
| 0.0 ni          | 改变过优先级的用户进程 占用的 CPU 百分比                |
| 97.7 id         | 空闲的 CPU 的 CPU 百分比                                |
| 0.0 wa          | 等待输入/输出的进程的占用 CPU 百分比                    |
| 0.5 hi          | 硬中断(由外界的影响导致的中断)请求服务占用的 CPU 百分比 |
| 0.2 si          | 软中断(由自身的影响导致的中断)请求服务占用的 CPU 百分比 |
| 0.0 st          | st(Steal time)虚拟时间百分比                            |

**状态栏第四行为物理内存信息**

| 内容 | 说明 |
| --- | --- |
| MiB Mem : 1826.7 total | 物理内存的数量，单位是 KB |
| 218.4 free | 空闲的物理内存的数量 |
| 315.9 used | 已经使用的物理内存数量 |
| 1292.4 buff/cache | 作为缓冲的内存数量，可以存放需要写入硬盘的数据，用来加速数据的写入 |

**状态栏第五行为交换分区信息**

| 内容                | 说明                         |
| ------------------- | ---------------------------- |
| MiB Swap: 0.0 total | 总计的交换分区(虚拟内存)大小 |
| 0.0 free            | 空闲的交换分区大小           |
| 0.0 used            | 已经使用的交换分区大小       |
| 1342.9 avail Mem    | 暂时不知道什么意思           |

## 5.4 杀死进程

**语法**

```shell
kill 进程号
```

### 5.4.1 进程信号

- 当我们使用 kill 命令杀死进程的时候，有些进程可能不会立刻结束，可能会杀不死，所以要用到代码信号来告诉系统如何杀死进程

**语法**

```shell
# 查看可用的进程信号
kill -l
```

| 信号代码 | 信号名称 | 说明 | 示例 |
| --- | --- | --- | --- |
| 1 | SIGHUP | 该信号让进程立即关闭，然后重写读取配置文件后重启，平滑重启 | kill -1 -HUP 进程号 |
| 2 | SIGINT | 程序终止信号，用于关闭前台进程，相当于 ctrl+c | kill -2 进程号 |
| 9 | SIGKILL | 用来立刻结束程序的运行，本信号不能阻塞、处理和忽略，一般用于强行终止 |  |
| 15 | SIGTERM | 正常结束进程的信号，kill 命令的默认信号，如果不能正常终止，才会尝试 SIGKILL 信号 |  |

# 6 系统资源查看

## 6.1 free

- 查看内存使用状态

**语法**

```shell
free [选项]
```

**选项**

- -b 以字节为单位查看
- -k 以 kb 为单位查看
- -m 以 MB 为单位查看
- -g 以 GB 为单位查看

**举例**

```shell
free -m
# 结果
# Mem表示内存 Swap表示交换区
# total总量。used：使用量  free：空闲量  shared：多个进程共享的内存数。  buff/cache：缓存/区内存数
# 所以第一行就是内存相关的 第二行就是交换区相关的
                           total        used        free      shared  buff/cache   available
Mem:           1826         318         215           1        1292        1340
Swap:             0           0           0
```

## 6.2 查看内核相关信息

```shell
uname

# 结果
Linux
```

## 6.3 查看操作系统位数

```shell
file /bin/ls

# 结果
/bin/ls: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=f4154ce8a36c20d9aa270cc21c6b25ec026ac00f, stripped
```

## 6.4 查看发行版本

```shell
lsb_release -a

# 结果
LSB Version:	:core-4.1-amd64:core-4.1-noarch
Distributor ID:	CentOS
Description:	CentOS Linux release 8.2.2004 (Core)
Release:	8.2.2004
Codename:	Core
```

# 7 定时任务

- 有些任务比如备份数据库等操作需要在系统空闲的时候执行

### 7.1 crontab

- 可以循环定时执行任务

```shell
systemctl restart crond.service
```

### 7.1.1 crontab 设置

**语法**

```shell
crontab [选项]
```

**选项**

- `-e` 编辑 crontab 定时任务
- `-l` 查询 crontab 任务
- `-r` 删除当前用户所有的 crontab 任务

### 7.1.2 crontab 编辑语法

- 所有的选项不能为空 `必须填写`
- crontab 最小单位是分钟，最大单位是天
- 不管写命令还是脚本，都必须使用绝对路径

```shell
# 一共有5个选项 后面跟的是执行的任务通常是一个文件的路径
# 这5个选项对应的是特殊的符号 看下面的符号介绍
* * * * * 执行的任务
```

**每颗星的含义**

| 位置     | 含义               | 范围          |
| -------- | ------------------ | ------------- |
| 第一颗星 | 1 小时中的第几分钟 | 0-59          |
| 第二颗星 | 1 天当中的第几小时 | 0-23          |
| 第三颗星 | 1 月当中的第几天   | 1-31          |
| 第四颗星 | 1 年当中的第几月   | 1-12          |
| 第五颗星 | 1 中当中的星期几   | 0-6(0 是周日) |

**特殊符号**

| 符号 | 含义                 | 例子       |
| ---- | -------------------- | ---------- |
| \*   | 代表任意时间         |            |
| ,    | 代表不连续的时间     | 比如 1,2,3 |
| -    | 代表连续的时间范围   |            |
| \*/n | 代表每隔多久执行一次 |            |
