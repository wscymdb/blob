## git 使用

> 一、新建的仓库第一次推数据
>
> git 上新建的仓库（远程仓库）、本地有仓库时需要先初始化远程仓库 git init-->与远程仓库建立连接 git remote add origin https://github.com/zhangjimu/my_test.git -->把文件放在暂存区 git add . -->提交 git commit -m ""-->推到仓库 git push
>
> 之后推代码直接：git add .-->git commit-->git push
>
> ```
> echo "# my_test" >> README.md
> git init:初始化仓库，本地仓库
> git init 仓库名:指定在本地生成一个仓库路径，执行完成之后生成一个.git目录
> git add README.md:将文件存放在暂存区
> git commit -m "first commit":提交
> git branch -M main
> git remote add origin https://github.com/zhangjimu/my_test.git
> git push -u origin main
> ```
>
> ```
> git config：配置信息
> git add：添加文件到缓存命令
> git status：查看文件的状态命令
> git diff：查看更新的详细信息命令
> git commit：提交命令
> git reset HEAD：取消缓存命令
> git rm：删除命令
> git mv：移动或重命名命令
> git branch 分支名：创建分支
> git checkout 分支名：切换到该分支
> git checkout -b 分支名：创建分支并切换到该分支
> 配置用户名和密码
> git config --global user.name '你的用户名'
> git config --global user.email '你的邮箱'
> ```
>
> 二、有仓库、第一次提交代码时需要先 clone 地址
>
> ```
> git clone https://github.com/zhangjimu/python_basic.git（克隆实际项目地址）
> git checkout 分支名：切换到对应的分支
> git add .：暂存
> git commit -m ""：提交
> git
> ```

## 字符串

#### 可变不可变数据类型

```python
"不可变数据类型":创建后不会被修改，修改后相当于创建一个新的
字符串、元组、数字类型
"可变数据类型"
列表、字典、集合
```

- 字符串**不可变序列**，创建时可以使用单引号或双引号

```python
name = 'hello'
name = "hello"
```

- **切片和索引**：可以使用索引来访问字符串中的单个字符；可以通过指定起始索引和结束索引获取字符串中的子串，不包括结束索引包含的字符

```python
name = "hello"
# 索引
print(name[0])
输出 h
# 切片
print(name[0:4])
输出 hell
```

- **字符串拼接**：可以使用+来拼接两个字符串

```python
name = "hello"
new_name = name + "张三"
print(new_name)
输出 hello 张三
```

- **字符串常用方法**
  - len()：字符串的长度
  - lower()：将字符串中的字母转换为小写
  - upper()：将字符串中的字母转换为大写
  - count(substring)：返回某子字符串在字符串中出现的次数
  - find(substring)：返回某子字符串在字符串中第一次出现的索引，未找到返回-1
  - replace(old,new)：将字符串中的旧字符串替换为新子字符串
  - split(separator)：将字符串按照指定的分隔符分割成多个子字符串，并返回一个列表
  - jion(interable)：将可迭代对象中的字符串连接起来，中间用指定的字符串分割

```python
name = "hello world"
print(len(name))
print(name.lower())
print(name.upper())
print(name.count('o'))
print(name.find('h'))
print(name.replace('hello','hello world'))
print(name.split("、"))
print(','.join(['apple','banana','orange']))
```

#### **字符串的格式化**

- 百分号（%）格式化：

  - 使用百分号（%）作为占位符，可以通过%运算符将变量的值插入到字符串中；%:必须要有的占位符，标记占位符的开始位置
  - 常见占位符占位符有：%s（字符串）、%d（整数）、%f（浮点数）

- ```python
  "xxx %[key][flags][width][.precision][length type]conversion type xxx" %
  values
  # 示例
  name = "john"
  age = "25"
  message = "my name is %s and age %d years old" .%(name,age)
  print(message)
  输出 my name is john and age 25 years old
  ```

- **format()方法格式化**

  - 使用 format()方法可以在字符串中使用花括号{}作为占位符，通过 format()方法将变量的值插入到字符串中
  - 花括号中可以使用位置参数或关键字参数来指定要插入的变量；format 适用于复杂的对齐方式

- ```python
  name = 'john'
  age = "25"
  # 位置参数-不使用索引
  message = "my name is {} and age {} years old"
  # 关键字参数,可能错误代码
  message1 = "my name is {name} and age {age} years old"
  ```

- **f-strings 格式化**

  - f-strings 是一种简洁的字符串格式化方式，在使用字符串钱加上字母“f”,在字符串中使用花括号{}来引用变量
  - 在花括号中可以直接使用变量名，不需要使用任何占位符

- ```python
  name = "john"
  age = "25"
  message = f"my name is {name} and age {age} years old"
  ```

- key、flags、width、.precision-点+精度（保留几位）、length type 选填
- conversion type:必填项，转换类型-标记占位符的开始

```python
%写法是固定的，后面必须要跟一个转换类型conversion type
常用三种conversion type
%s：转换为字符串，使用str()方法转换任何python对象
%d：转换为十进制整数
%f：转换为十进制浮点数，自动保留六位
%.XXf:说明要保留几位小数，不设置默认保留6位浮点
```

语法：

```python
"...{[filed_name][!conversion][:format_spec]}...".format(arguments)
```

**arguments 有两种情况**

#### 位置参数（positional arguments）

- 位置参数前面元组如果不使用索引来标注，后面的替换索引一一对应且替换索引个数和前面{}的个数要相等，否则会报错；利用索引可以重复使用同一个索引

```python
# 不使用索引直接按位替换
>>> "{} {}".format("lihua", 24)
'lihua 24'
# 使用索引来标识
>>> "{1} {0} {0} {1}".format("lihua", 24)
'24 lihua lihua 24'
#不使用索引，替换索引超出了位置参数元组的范围会报错
>>> "{} {} {} {}".format("lihua",24)
Traceback (most recent call last):
  File "<pyshell#7>", line 1, in <module>
    "{} {} {} {}".format("lihua",24)
IndexError: Replacement index 2 out of range for positional args tuple
```

#### 关键字参数（keyword arguments）

- 关键字参数：后面值和前面的位置以及符号都要一一对应，否则会报错
- 前面使用关键字，后面 arguments 也必须使用关键字，否则会报错

```python
"{hi},我是{name} 今年{age}岁，很高心认识你".format(hi="你好",name="小美",age=20)
你好，我是小美 今年20岁，很高心认识你
"{},我是{}今年{}岁".format("你好", "小美", 20)
你好，我是小美 今年20岁
"{hi},我是{name}今年{age}岁".format("你好", "小美", 20)
Traceback (most recent call last):
    File "<pyshell#36>", line 1, in <module>
      ""{hi},我是{name}今年{age}岁".format("你好", "小美", 20)"
keyErroe:'hi'
```

#### 修饰符

- 左对齐>、右对齐<、居中对齐^
- 长度不够，默认空格填充

```python
# 右对齐
>>> "{:9}".format(123)
'      123'
# 左对齐
>>> "{:<9}".format(123)
'123      '
# 居中对齐
>>> "{:^9}".format(123)
'   123   '
```

## 组合数据类型

### 列表-list-[ ]

列表：有序可变的、可变的数据类型

- 创建列表[]可以是字符串、数字、布尔值列表等任意类型

- 列表元素的访问：通过索引访问列表中的元素

```python
my_list = []  # 创建空列表
# 创建非空列表
test_list = [1,"hello",True,[1,2,3]]
# 打印列表中的第二个值，通过索引
print(test_list[1])
输出 "hello"
```

- 列表的基本方法

  - append(x)：在列表末尾添加一个元素

  - insert(index,x)：在指定位置插入一个元素，通过索引添加，或者直接列表+索引=要插入的数据

  - ```python
    list.insert(index,obj)
    # split()分隔符
    s = input().split()
    s.insert(0,"Allen")   # 在列表最前面加入
    ```

  - remove（x）：将元素 x 移除-移除具体的某个元素，列表中有多个元素时默认移除最先查找到的元素

    ```python
    题目：输入一个行多个字符串表示牛妹的朋友，请把它们封装成列表，然后再输入与牛妹吵架的朋友的名字，请使用remove函数帮她从列表中删除这个好友，然后输出完整列表
    # 用input函数获取用户输入并使用split函数对获取到的用户输入以空格分隔，创建成一个列表
    s = input().split()
    # 使用remove函数讲要删除的内容删除，有具体值直接输入要删除的数据
    s.remove(input())
    print(s)
    ```

  - pop(index)：将指定 index 位置的元素移除，删除并返回列表中的指定索引处的元素

  - del 根据索引删除列表数据

  - ```python
    题目：牛牛在各大互联网公司投入了简历，公司的名字通过字符串的形式在一行中输入，请用列表记录。现在牛牛已经确定了第一所公司的HR表露了不录用他的态度，请你使用del函数帮助牛牛从列表中删除第一个元素，然后输出列表
    # 方法一
    s = input().split()
    del(s[0])
    print(s)
    # 方法二
    s = input().split()
    print(s.pop(0))


    # 题目2：某实验班实行末位淘汰制，期中考试需要淘汰末三位同学。现输入一行多个字符串表示按分数排名的该班级同学的名字（数量一定不少于三个），请你使用list将其封装为列表，然后使用三次pop函数，去掉末三位同学的名字，最后输出淘汰后的班级名字列表
    s = input().split()
    for i in range(3):
        s.pop(-1)

    p
    ```

  - extend()：将另一个列表的元素追加到当前列表末尾

  - clear()：将本列表所有元素移除

  - index(x)：查找元素 x 首次出现的位置

  - count()：查询 x 出现的次数

  - sort()：对列表进行排序

  - len()：获取列表的长度

  - []+[]：连接列表

  - []\*x：列表的重复

  - len（）：列表长度

  - x in [x,x,x]：x 是否再列表中

  - for i in [x,x,x]:print x：迭代

  - x[a:]：从第几个元素开始获取

  - reverse()：反向列表元素

```python
# 初始列表元素
 l = [1,"hello",3.14]
 s = [10,"age":10]
# 在列表末尾添加
test_list = l.append("你好")
print(test_list)
输出 [1, 'hello', 3.14, '你好']
# 将另一个列表的元素追加到当前列表末尾,将后面列表元素添加到前面的列表中
l.extend(s)
print(l)
输出 1,hello,3.14,10,10
# 在指定位置插入一个元素
l1 = l.insert(2,"张三")
print(l1)
输出 1,hello,张三,3.14
# 删除列表中指定元素,删除该元素第一次出现的位置，之后的不管
l.remove(1)
# 删除并返回列表中的指定索引处的元素pop
l.pop("hello")
输出 hello
# 返回列表中指定元素的索引index
l.index(0)
输出 1
# 返回列表中指定元素的出现次数count
l.count(1)
输出 1
# 对列表进行排序sort()
l.
# 清空当前列表clear
s.clear()
输出 空
```

- 列表的遍历
- 使用 for 循环可以遍历列表中的所有元素，遍历可迭代对象（列表、字符串、元组等）；可以逐个访问可迭代对象中的元素，并执行相应的操作

```python
my_list = [1,"hello",True,[1,2,3]]
for i in my_list:
    print(i)
注解：my_list是要遍历的列表，i是一个临时变量，在每次循环中代表列表中的一个元素。在循环体中可以对临时变量进行任何操作-打印、计算、修改等

# 使用for循环计算列表中元素的和
test_list = [1,2,3,4,5]
sum = 0
for i in test_list:
    sum += i
print(sum)

```

- 遍历可迭代对象中的元素的索引需要使用 enumerate()函数来获取索引和元素的对应关系

```python
test_list = [1,2,3,4,5]
for index, i in enumerate(test_list):
    print(f"索引：{index}, 元素：{i}")

输出 索引：0， 元素：1
     ...
```

### 元组-tuple-( )

元组是不可表列表,**一旦创建不能修改**，使用切片也不能修改

- 元组中的元素不允许删除，使用 del 来删除整个元组输出会报错
- 元组的运算符和列表使用方法一样
- 无关闭分隔符：任意无符号的对象，以逗号隔开，默认为元组

```python
# 创建空元组
>>> tup = ()
# 创建非空元组
>>> tup1 = ["hello", 1, 2, 3, "physics", 3.14]
>>> tup2 = [1, 2, 3, 4, 5]
# 输出tup1和tup2
>>> tup1
('hello', 1, 2, 3, 'physics', 3.14)
>>> tup2
(1, 2, 3, 4, 5)
# 索引方式求出下标位1的元素
>>> tup1[1]
1
# 索引方式从小标为1的元素开始取
>>> tup2[1:]
(2, 3, 4, 5)
# 元组不支持修改，只能对元组进行组合连接--+
>>> tup3 = tup1 + tup2
>>> tup3
('hello', 1, 2, 3, 'physics', 3.14, 1, 2, 3, 4, 5)
# 元组里的元素不支持删除，可以将整个元组删除，删除后会报错
>>> del tup3
>>> tup3
Traceback (most recent call last):
  File "<pyshell#52>", line 1, in <module>
    tup3
NameError: name 'tup3' is not defined
# 元组的切片
>>> tup1[3:]
(3, 'physics', 3.14)
>>> tup2[0:3:2]
(1, 3)
```

### 范围-range

### 字典-dict-{}

- 一种 key-value 映射结构，其中 key 不能重复且不可变，值可以取任何数据类型；可以存储任意类型对象
- R 如果一个 key 中包含多个值/内容需要用容器来记录/列表"key":"[]"
- 可以 hash 的才能作为 key，哈希-不可变
- 常用函数：先将 keys 转为列表再处理-list(),len()
- 字典方法

  - 返回内容：d.get(key),d.keys(),d.values(),d.items()
  - 修改内容：d.pop(key),d.setdefault(),d.update(将一个字典值输入到另一个字典中，或将 k:v 添加到字典中)

- 索引：d[key]=value

格式如下：

```py
d = {key1:value1, key2:value2, key3:value3}
```

```python
# 创建字典
>>> d = {"name":"小美", "age":21, "height":50}
>>> d
{'name': '小美', 'age': 21, 'height': 50}
# 字典的修改/更新
>>> d = {"name":"小美", "age":21, "height":50}
>>> d
{'name': '小美', 'age': 21, 'height': 50}
# 字典的修改/更新
>>> d["sex"] = "女"
>>> d
{'name': '小美', 'age': 21, 'height': 50, 'sex': '女'}
 # 字典的修改
>>> d[age] = 23
Traceback (most recent call last):
  File "<pyshell#62>", line 1, in <module>
    d[age] = 23
NameError: name 'age' is not defined
>>> d["age"] = 23
>>> d
{'name': '小美', 'age': 23, 'height': 50, 'sex': '女'}
 # 删除字典键为"xx"的元素pop
>>> del d["sex"]
>>> d
{'name': '小美', 'age': 23, 'height': 50}
 # 清空字典所有元素clear
>>> d.clear()
>>> d
{}
# 删除字典
>>> del d
```

```python
# 将列表转换为字典
>>> d = dict(a=1,b=2,c=3)
>>> d
{'a': 1, 'b': 2, 'c': 3}
>>> d["a"]
1
# 查询get,利用key进行查询，可以不存在时不输出也不会报错
>>> d.get('a')
1
>>> d.get('aa')
>>> 'a' in d
True
# 输出字典中的key
>>> d.keys()
dict_keys(['a', 'b', 'c'])
# 判断某个key是否在字典中，
错误写法>>> 'b' in d.keys
Traceback (most recent call last):
  File "<pyshell#8>", line 1, in <module>
    'b' in d.keys
TypeError: argument of type 'builtin_function_or_method' is not iterable
正确写法>>> 'b' in d.keys()
True
# 输出字典中的value
>>> d.values()
dict_values([1, 2, 3])
>>> # 将字段转换为列表
>>> list(d)
['a', 'b', 'c']
# 输出字典的长度
>>> len(d)
3
>>> d
{'a': 1, 'b': 2, 'c': 3}
# 将字典按照k:v的形式组成一个元组，并把这些元祖放在列表中返回
>>> d.items()
dict_items([('a', 1), ('b', 2), ('c', 3)])
# 在d中添加一对值
>>> d['d'] = 6
>>> d
{'a': 1, 'b': 2, 'c': 3, 'd': 6}
>>> #update修改字典中某个key的值或者将另一个字典的值添加到一个字典中X.update(x)或将对应k:v值添加到字典中
错误写法>>> d_2 = {"x":X,"y":Y}
Traceback (most recent call last):
  File "<pyshell#25>", line 1, in <module>
    d_2 = {"x":X,"y":Y}
NameError: name 'X' is not defined
正确写法>>> d_2 = {"x":"X","y":"Y"}
>>> d.update(d_2)
>>> d
{'a': 1, 'b': 2, 'c': 3, 'd': 6, 'x': 'X', 'y': 'Y'}
>>> d.update({"key":"value"})
>>># 删除字典中key对应的value,d.pop()--默认删除末尾的
>>> d.pop("x")
'X'
>>> d
{'a': 1, 'b': 2, 'c': 3, 'd': 6, 'y': 'Y'}
# 当不确定删除的key存不存在，可以在后面设置一个不存在输出XX,防止报错
>>> d.pop("xx","不存在时输出不存在")
'不存在时输出不存在'
# 未设置不存在时的输出会报错
>>> d.pop("xx")
Traceback (most recent call last):
  File "<pyshell#33>", line 1, in <module>
    d.pop("xx")
KeyError: 'xx'
>>> # setdefault设置默认值，当key在字典中存在时直接返回对应的value,不存在时将设置的默认值添加到列表中
>>> d.setdefault("m", "987")
'987'
>>> d
{'a': 1, 'b': 2, 'c': 3, 'd': 6, 'y': 'Y', 'm': '987'}
>>> d.setdefault("a", "456")
1
# 清除clear
>>> d.clear()
>>> d
{}
```

- 字典键的特性

  - 不允许同一个键出现两次，创建时如果同一个键被赋值两次，前一个值会被覆盖只显示后面的值
  - 键不可变，不能使用列表-可以使用数字、字符串或元组充当

- ```python
  # 使用列表当作key
  >>> d = {["name"]:"hello", "age":7}
  Traceback (most recent call last):
    File "<pyshell#74>", line 1, in <module>
      d = {["name"]:"hello", "age":7}
  TypeError: unhashable type: 'list'
  ```

### 集合-set

- 集合是一个无序的不重复的元素序列
- 集合中的元素不会重复，可以用{}元素之间用,隔开来创建集合或者用 set()函数从列表创建集合
- set 创建集合需要用一个列表或者集合中只有一个字符串元素，否则会报错

```python
# 集合的创建格式
p = {value1,value2,...}
或者
set(value)
# {}创建集合
>>> set1 = {1,2,"hello",4}
# set创建集合，需要用列表的方式否则会报错
>>> set2 = set(8,0,9,1)
Traceback (most recent call last):
  File "<pyshell#76>", line 1, in <module>
    set2 = set(8,0,9,1)
TypeError: set expected at most 1 argument, got 4
>>> set2 = set([1,3,5,8])
# 集合的输出
>>> set1
{1, 2, 'hello', 4}
>>> set2
{8, 1, 3, 5}
>>> set3 = set(1)
Traceback (most recent call last):
  File "<pyshell#80>", line 1, in <module>
    set3 = set(1)
TypeError: 'int' object is not iterable
# 不加列表只能有一个元素且要加上字符串
>>> set3 = set("1")
>>> set3
{'1'}
>>> srt4 = set("1","3")
Traceback (most recent call last):
  File "<pyshell#83>", line 1, in <module>
    srt4 = set("1","3")
TypeError: set expected at most 1 argument, got 2
```

### 程序控制结构

- 结构化程序的三种基本结构：顺序结构、分支结构（选择结构、条件结构）、循环结构

#### 布尔值-bool

- 布尔值只有两个：True 和 False

```python
a = 100
if a == 1:
    print("a的值是1")
elif a == 2:
    print("a的值是2")
else:
    print("a的值既不是1也不是2")
```

#### 顺序结构

#### 分支结构

#### 循环结构

- 循环结构当满足某一条件循环执行某段代码
- 条件循环：while
- 循环遍历：for、循环计数器
- 循环控制：break(中止)、continue(快进)

```python
while True:
    content = input("请输入内容:")
    print(content)
```

```python
# 普通循环
d = {
    "A": [],
    "B": []
}

while True:
    content = input("请输入内容:")
    new_content = content.split(":")  # split分隔符可自定义，格式A:111
    try:
        user, text = new_content[0], new_content[1]
    except Exception as e:  # 捕捉异常
        print("请按照正确的格式输入")
        continue
    # setdefault() 是字典对象的一个方法，用于获取指定键的值，如果键不存在，则可以设置默认值并将其添加到字典中，键存在时不会改变原本键对应的值
    d.setdefault(user, [])  # 为其他用户创建默认值，键对应的值不存时自动田间到字典中
    if text == "exit":
        break
    elif text == "log":
        print(d)
    else:
        d[user].append(text)
        print(text)
```

#### 捕捉异常

- 捕捉异常可以将认为异常的代码包裹起来

```python
try:
    1/0
except Exception as e:
    print("捕捉到的异常{}".format(e))
print(2)
```

### 函数

#### 函数的定义和调用

- def 函数名(): 定义函数
- 函数名() 调用函数

```python
# 定义函数
def test():
    print("xxxx")

test()   # 调用函数
```

#### 函数参数

- 普通参数（必填）---调用时必须传参

```python
# 普通参数,定义一个普通参数name,调用时必须给name传参
def hello(name):
    print("你好", name)


hello("张朵")
#打印结果
你好，张朵
```

- 默认参数（选填）---定义函数时给参数默认值

```python
# 默认参数
def hello(name="张三"):
    print(name)


hello()   # 默认传函数中定义的值
hello("你好")  # 自定义参数后输出为自定义参数
#打印结果
张三
你好


# 无默认参数的普通参数不能放在有默认参数的普通参数后面（只能放在默认参数之前且调用时必须传参），否则会报错
def test(hi,name="我是test"):
    print(hi,name)


test("hello")
#打印结果
hello 我是test
```

- 不定长参数（任意参数）---不填写参数输出为元组()/字典{}

```python
def f(l=[]):
    # print(l.append(1))   为什么不能用这种方式写
    l.append(1)
    print(l)


f()
f()
#打印结果
[1]
[1,1]

"详解不能使用print(1.append(1))的原因？"
1.因为list.append()会修改列表本身比关切返回值为None,所有会返回NONE
2.函数f()由一个默认参数l，默认值为空列表[]，一次是调用f()函数时会创建一个空列表并将其分配给参数l；使用l.appemg(1)将1添加到列表中；再次调用时会默认参数会重复使用且使用的是同一个列表对象，因此第二次调用f()时列表打印结果为[1,1]
3. 为避免最好不要在函数默认参数中使用可变对象（如列表）。可以使用None作为默认值在函数内部进行判断和处理
def f(l=None):
    if l is None:
        l = []
    l.append(1)
    print(l)


f()
f()



# 不定长参数
def s(*args, **kwargs):  # 单*标识用来传递位置参数，双**表示用来传递关键字参数如：字典
    print(args)  # 元组，存储位置参数
    print(kwargs)  # 字典，存储关键字参数
    print("-" * 20)


s(1, 2, 3)  # 只传递位置参数
s(name="张朵")  # 只传递字典参数
s()  # 不传递参数
```

- 在 python 中，strings, tuples, 和 numbers 是不可更改的对象，而 list、dict 等则是可以修改的对象；未避免 bug 可以使用不可变参数

#### 函数的返回值

- 调用函数的产生的调用结果--返回值
- python 中函数一定有 一个返回值：默认返回值、特定返回值

```python
# 函数的返回值，每个函数一定有有一个返回值
def add(a, b):
    c = a + b
    print("a+b的和是:", c)


add(1, 11)


# print(res)  默认返回值为None


# 将c的值和100相加
# 方法1，改变函数的默认返回值，将返回值c的值和100相加改变函数的返回值可以使用return
def add(a, b):
    c = a + b
    print("a+b的和是:", c)
    return c  # 返回值为c的值


res = add(1, 11)
# print(res)  查看函数的返回值
add(res, 100)  # 112


# 方法2，用元组的方式打印a,b,c的值，将c的值与100相加
def add(x, y):
    d = x + y
    print("x+y的值为：", d)
    return x, y, d


x, y, d = add(1, 2)  # 用赋值的方式将1，2，3的值赋值给x, y ,d
add(d, 100)  # 将d的值和100相加
```

#### 变量作用域

- python 中有作用域的概念。在不同的作用域中，相同的变量名相互隔离不冲突
- Local：函数内部创建的变量，局部作用域--局部变量
- Enclosed：闭包作用域
- Global：未包含在任何函数中直接创建的变量，全局作用域--全局变量
- Built In：python 中内置作用域-内置变量
- 执行顺序 LEGB--局部、闭包、全局、内置

```python
# 函数变量的作用域
a = 1


def x():
    a = 2
    print("a in x:{}".format(a))


x()
print("a not in:{}".format(a))

# LEGB使用顺序
input = "你好"
import builtins


def f():
    global input  # 如果是全局变量可以直接声明，之后调用的都是全局变量
    input = "hello"  # 有局部作用域会调用局部作用域，没有才会调用全局作用域最后调用内置函数-作用域
    print(input)
    print(locals())  # 打印局部作用域，以为字典的方式
    print(globals())  # 打印全局作用域，以为字典的方式
    print(locals()['input'])
    print(globals()['input'])  # 以字典的形式打印
    print(builtins.input())  # 打印python中内置作用域


f()
```

#### 匿名函数

- 匿名函数：没有名字的函数，由 lambda 表达式创建
- 只有参数和函数体，没有函数名
- 函数体内只有表达式，没有注释和复合语句
- 匿名函数不需要 return

```python
def f(add):
    print("收到的函数{}".format(add))  # format用来格式化字符串，可以用来插入变量值、格式化数字、设置对其方式等在这里是插入变量的值add填充
    print("调用的函数{}".format(add(1, 2)))  # {}充当占位符


f(lambda a, b: a + b)
```

#### 部分内置函数

- type():查看变量类型 isintance(x,klass):判断 X 是否为 klass 类型的实例 dir():查看拥有的成员 help():获取帮助信息 id():查看变量唯一标识符

```python
a = 1
type(a)
isinstance(a,int)
dir(a)
id(a)
help(a)
```

#### 文件管理

##### 打开文件

使用 open()函数打开文件，open()函数接受两个参数，一个是文件名，另一个是打开文件的模式。常见模式有：

- "r"：以只读模式打开文件

- "w"：以写入模式打开文件文件不存在会创建文件，文件存在会清空文件内容（覆盖现有内容）

- "a"：以追加模式打开文件（在文件末尾写入）如果文件按不存在会创建文件

- "b"：二进制模式，用用于处理二进制文件，如图片、视频等

- "r+":以读写模式打开文件

- "w+"：以读写模式打开文件（覆盖现有内容）

- "a+"：以读写模式打开文件（在文件末尾写入）

- "r+"：读取和写入模式

- "w+"：写入和读取模式

- "a+"：追加和读取模式

- "rb+"：二进制读取和写入模式

- "wb+"：二进制写入和读取模式

-

- ```python
  #只读模式打开文件
  file = open("test.txt","r")
  #以写入模式打开文件（文件不存在时创建文件）
  file = open("test.txt","w")
  #以追加模式打开文件（文件不存在时创建文件）
  file = open("test.txt","a")
  #以二进制模式打开文件
  file = open("test.txt","rb")
  #读取和写入模式
  file = open("test.txt","r+")
  #写入和读取模式
  file = open("test.txt","w+")
  ```

##### 读取文件

- 读取整个文件 read()方法

- ```python
  with open("test.txt",r) as file:
      # file是讲文件对象"test.txt"赋值给变量file
      content = file.read()
      print(content)
      file.cloose() # 关闭文件
  ```
- 逐行读取 readline()方法，返回的是包含当前行内容的字符串

- ```python
  with open("example.txt", "r") as file:
      line = file.readline()
      # 使用while循环是有效的读取文件的每一行，直到文件的末尾
      while line:  # 只要 line 不为空字符串，就继续循环
          print(line)  # 打印当前行内容
          line = file.readline()  # 继续读取下一行内容



  #读取前几个字符
  with open("test.txt","r") as file:
      读取前三个字符
      print(file.readline(3))
  ```

- readlines()方法读取所有行，并将其存储在一个列表中

- 每次调用 `readlines()` 方法都会一次性读取文件的所有内容，并返回一个包含所有行内容的列表。因此，为了处理这个列表中的每一行，通常需要使用循环来遍历列表。

- ```python
  with open("test.txt","r") as file:
      lines = file.readlines()
      for line in lines:
          print(line)
  ```

##### 写入文件

打开文件时使用的模式不同，可以实现写入文件的不同方式

- 写入单行 write()方法

- ```python
  with open ("test.txt","w") as file:
      file.write("hello,my name is ZD")
      file.close() # 关闭文件
  ```

- 写入多行 writelines()方法

- ```python
  #需要先定义多行的内容
  lines = ["hello1\n","hello2\n","hello3\n"]
  with open("tast.txt","w") as file:
      print(file.writelines(lines))
  ```

##### 文件迭代器

文件对象是可以迭代的，需要使用 for 循环逐行读取文件内容

```python
with open("test.txt","r") as file:
    for line in file:
        print(line)
```

##### 上下文管理器

使用 with 语句打开文件，可以确保在文件使用完毕后自动关闭文件，避免资源浪费

```python
with open("test.txt","r") as file:
    content = file.read()
    print(content)
```

##### 异常处理

- 关键字

  - try：用于包裹可能会出现异常的代码块

  - except：用于捕获 try 模块中产生的异常，如果 try 模块中的代码发生异常将会跳转到匹配的 except 模块来处理异常

  - ```python
    try:
        #可能会出现异常的代码
        result = 10/0 #0不能作为除数，所有会出现异常
    except ZeroDivisionError:
        print("0不能为除数")
    expect Exception as e:
        #捕获其他异常
        print("发生异常:",e)
    ```

  - finally：该模块包含的代码无论是否发生异常都会被执行，通常用于执行清理操作，例如关闭文件或释放资源

  - ```python
    try:
        file = open("example.txt", "r")
        # 执行文件读取操作等
    except FileNotFoundError:
        print("文件未找到！")
    finally:
        if 'file' in locals():
            file.close()  # 确保文件被关闭
    ```

  - rasie：用于手动触发异常，可以使用 rasie 来抛出特定类型的异常或自定义异常

文件读写过程中，可能会出现异常，例如文件不存在或权限错误。因此在操作文件是最好使用异常处理来增强程序的健壮性

```python
try:
    with open("test.txt","r") as file:
        content = file.read()
        print(content)
    except FileNotFoundError:
        print("文件不存在")
    expect PermissionError:
        print("无权限访问文件")
    except Exception as e:
        print(f"发生位置错误：{e}")
```

##### 常用内置标准异常

| 异常类型 | 用法 |
| --- | --- |
| ZeroDivisionError | 用于指示发生了除零错误，除数为零时会抛出异常 |
| TypeError | 在操作或函数应用于错误类型的对象时引发，表示类型错误 |
| ValueError | 在操作或函数应用于正确类型但具有不合适值的对象时引发，表示值错误 |
| NameError | 访问不存在的变量或函数时引发，表示名称错误 |
| IndexError | 问不存在的序列索引时引发，表示索引错误 |
| KeyError | 使用不存在的键访问字典时引发，表示键错误 |
| FileNotFoundError | 打开不存在的文件时引发，表示文件未找到错误 |
| PermissionError | 只读文件写入数据时；不允许读取的文件；不允许写入的目录下创建文件或子目录；列出一个不允许读取的目录的内容时会有该提示 |
| AttributeError | 访问对象没有的属性时引发，表示属性错误 |
| SyntaxError | 代码语法错误时引发，表示语法错误 |
| IndentationError | 表示缩进错误 |
| AssertionError | 表示断言错误 |
| OverflowError | 数值运算超出系统定义的范围时引发，**表示溢出错误** |
| MemoryError | 内存分配失败时引发，表示内存错误 |
| ImportError | 无法导入模块或对象时引发，表示导入错误 |
| ModuleNotFoundError | 无法找到要导入的模块时引发，表示模块未找到错误 |
| UnicodeError | 处理 Unicode 字符串时发生编码或解码错误时引发，表示 Unicode 错误 |
| StopIteratio | 迭代器没有更多的值可供返回时引发，表示迭代结束 |

##### 文件关闭

使用 with 语句可以确保文件正常被关闭，有些情况下可能需要手动关闭文件

```python
file = open("test.txt","r")
content = file.read()
print(content)
file.close() #手动关闭文件
```

##### 二进制文件操作

在处理二进制文件时，打开文件时需要指定"b"模式

```python
with open("test.txt","rb") as file:
    data = file.read() # 对二进制数据进行操作
```

##### 文件定位

在文件读写中需要移动文件按指针的位置，可以使用 seek()方法

```python
with open("test.txt","r") as file:
    #读取文件前10个字符
    content = file.read(10)
    print(content)
    #移动文件指针到文件开头
    file.seek(0)
    #再去读取前5个字符
    content = file.read(5)
    print(content)
```

##### 标准库--csv 模块

- csv 模块适用于处理基本的 CSV 文件的读取和写入，导入即可使用 import csv

- **列表形式写入和读取文件**

- | 标题 1       | 标题 2   |
  | ------------ | -------- |
  | csv.writer() | 写入文件 |
  | csv.reader() | 读取文件 |

- ```python
  import csv

  # 列表形式写入和读取文件
  l = [
      ["姓名", "年龄", "性别"],
      ["张三", 18, "男"],
      [ "李四", 20, "女"]
  ]
  newline="",在csv文件中不对列表文件进行分隔,指定在写入文件时不要自动插入换行符
  with open ("test.csv", "w", encoding = "utf-8-sign", newline = "") as csvfile:
      writer = csv.writer(csvfile)
      for _ in l:   # 循环遍历列表中的每行数据
          writer.writerow(_)  # 对列表中的每行数据调用writer.writerow() 方法将其写入到 CSV 文件中。_ 表示当前遍历到的子列表，即一行数据

  with open ("test.csv", "r", encoding = "utf-8-sig", newline = "") as csvfile:
      # 创建一个文件读取对象readers，通过for循环遍历每一行并输出
      reader = csv.reader(csvfile)
      # 遍历每一行并输出
      for i in reader:
          print(i)

  ```

- **字典形式写入和读取文件**

- | 标题 1         | 标题 2   |
  | -------------- | -------- |
  | csv.DictWriter | 写入文件 |
  | csv.DictReader | 读取文件 |

```python
import csv

# 字典形式写入
l = [
    {"姓名" = "张三", "年龄" = 18, "性别" = "男"},
    {"姓名" = "李四", "年龄" = 19, "性别" = "女"},
]

with open("data.csv", "w", encoding = "utf-8-sig", newline  = "") as csvfile:
    writer = csv.DictWriter(csvfile)
    for i in l:
        writer.writerow(x)


# 读取
with open("data.csv", "r",encoding = "utf-8-sig", newline = "")as csvfile:
    创建一个文件读取对象readers，通过for循环遍历每一行并输出
    readers = csv.DictWriter(csvfile)
    for i in readers:
        print(i)
```

标准库--time 模块

- 获取当前时间

| 标题 1           | 标题 2                     |
| ---------------- | -------------------------- |
| time.time()      | 获取当前时间戳             |
| time.localtime() | 获取当前时间戳并结构化表示 |
| time.strftime()  | 格式化当前时间             |

#### 函数封装练习

```python
1.编写一个函数，接受一个列表作为参数，返回列表中最大的数
# 定义一个函数，接受列表作为参数，使用内置函数max获取列表中最大的数并返回
def get_max_number(numbers):
    return max(numbers)

# 将想要查找的最大数的列表作为参数（input_list）传递给 get_max_number 函数，用一个变量来接受(max_number)
input_list [1,3,5,10]
max_number = get_max_number(input_list)
print(max_numbers)
```

### csv 文件处理

```python
#像文件中写入数据
	# 将列表件用，拼接为字符串
    # 将字符串用换行符拼接

# filename是字符串类型的参数表示要写入csv文件的文件名；lines是列表类型参数，包含了要写入csv文件的数据行，通常是一个包含了每列数据的列表
def write_csv(filwname,lines):
    new_lines = []
    # i代表循环中的迭代变量，每次循环中带哦表lines列表中的一个元素；lines是一个包含了多个字符串的列表
    for i in line:
        # 将列表i中的数据用都喊隔开
        lines = ",".jion(i)
        new_lines.append(line)
    text = "\n".jion(new_lines)
	try:
        #filename代表要打开文件的文件名称或路径；as f表示将打开的文件赋值给f变量
        with open(filename,mode="w", encoding="utf-8-sig")as f:
            f.write(text)
    # except关键字用于捕获异常；Exceptionpython中内置的异常类；将捕获到的异常赋值给变量e
    except Exception as e:
        print("文件打开失败:{}").format(e)

data = read_csv("test_csv")
print(data)
data.append(["王五","男","11"])
print(data)

write_csv("test_csv",data)
```

| 标题 1 | 标题 2 |
| ------ | ------ |
|        |        |
|        |        |

:smile_cat:常用快捷键

插入表格：|标题 1|标题 2| ，然后回车，再根据需要添加行列

分割线：\*\*\*或---

|标题一|

| 标题 1 | 标题 2 |     |
| ------ | ------ | --- |
|        |        |     |

### 第三方库

### 进阶

#### pycharm 集成开发环境

##### 格式化代码

- 控制台（终端）black 格式化整个文件--->black 文件名
- 安装 black--->pip install black
- black 配置格式化整个项目的代码格式
- 步骤
  - 设置--点击“+”--输入名称、文件类型、作用域、程序（black.exe 的文件路径）、实参($FilePath$)、输出路径(Projectpath$)--点击“确定”

##### 代码调试

- breakpoint()断点
- F8：跳过函数
- F7：进入函数内部

### 面向对象

#### 面向对象的特性

##### 封装

- 本质：将工作细节对外部隐藏
- 安全性：将重要的数据封装起来防止被修改
- 在 python 中可以使用**函数**来进行封装

##### 多态

- python 是动态、强类型的语言
- 不会声明变量的类型（不会限制变量的类型），天生的多态，所以提出新概念：鸭子类型
- 鸭子类型：动态类型的设计风格，如果一个动物的行为举止像鸭子，就称这个动物为鸭子

##### 继承

- 实现多态
- 复制代码

```python
# 面向对象特性-继承中的复制代码
class A:
    i = 1
    ii = 11
    iii = 111


class B(A):
    # B继承A的所有成员
    i = 3


print(B.i)  # B中有数据是会优先使用B中自己的数据  输出：3
print(B.ii)  # 输出：11
print(B.iii)  # 输出：111
```

###控制浮点数输出的位数的方法

#### 方法一：使用 round()方法

```python
number = 3.14159
rounder_number = round(number, 2)
# 多个数字时列表
rounder_number = round(num,2) for num in number
print(rounder_number)  # 输出3.14
```

#### 方法二：使用 format()函数

```python
numbers = [1.232, 4.343, 1.000]
# 只有一个数字时
format_number = "{:.2f}".format(变量名)
format_number = "{:.2f}".format(num) for num in numbers
print(format_number)
```

#### 方法三：使用 f-string（3.6 及以上版本）

```python
numbers = [1.232, 4.343, 1.000]
f_number = [f"{num:.2f}" for num in numbers]
print(f_number)
```

```python
num = folat(input())
print(round(num,2))
print('%.2f'%num)
print(f"{num:.2f}")
#print("{:.2f}".format(num))
```

### 去掉空格的方法 lstrip、strip、rstrip、replace

```python
a = " *heollo* "
1.去掉左边空格
print(a.lstrip(变量))
2.去掉左右边空格
print(a.strip(变量))
3.去掉右边空格
print(a.rstrip(变量))
4.去掉所有空格
a = "  你好  "
print(a.replace("",""))
```

split()：拆分字符串，通过指定分隔符对字符串进行切片，并返回分割后的字符串列表（list）

去掉换行符

c = "'''say"

print(c.split('\n'))

项目的什么阶段需要自动化测试

- 回归测试：减少人力和时间成本
- 需求变动不频繁、长期项目、测试开发比例高的项目适合做自动化测试

- 接口（）API：程序中具体负责在不同模块之间传输或接收数据并做处理的类或函数
- 前台应用程序--发送请求到 API-->后端应用程序-->数据库-->返回 API 响应--返回到前台应用程序（前端入参）
- 接口测试：针对 API 进行有针对性的输入输出测试，检查 API 的功能是否达到预期
- 接口测试的方法：通过工具或代码去模拟向客户端服务器发送请求，验证接口返回的内容是否符合预期
- 接口测试关心点：接口地址是否正确、入参有哪些、入参是否必填、返回的数据和预期是否一致、是否符合产品的安全 指标、性能是否达标
- 互联网五层模型：应用层、传输层、网络层、链路层、实体
  - 传输层：UDP（优点：简单容易实现 缺点：可靠性较差不确定对方是否接收到一般用于视频通话或直播等）、TCP（三次握手四次挥手、优点/缺点）

## 接口自动化测试框架

## 一、接口自动化测试主要技术

- yaml：主要用来写配置文件，存放一些固定步变的内容，如：用户名、密码以及数据库信息
- request：接口自动化测试的核心库，用于发送各种请求
- pytest：python 最流行的单元测试框架
- allure：存放测试报告
- **需要安装的包库和导入的包**

> 库：PyYAML、pytest、requests、allure-pytest(打印报告)、pytest-html(html 格式报告)、pytest-assume(断言插件)、allure-xdist(分布式运行测试用例)、allure-python-commons、allure-metadata、allure-rerunfailures(测试用例失败重跑插件)
>
> 包：json、os、allure(测试报告)

- **配置 Pytest 为默认测试框架**

> 1.选择 File(文件) -> Settings（设置）（或 PyCharm -> Preferences，对于 macOS 用户）。在 Tools(工具) -> Python Integrated Tools（python 集成工具） 中，找到 Testing （测试）部分，将 Default test runner (默认测试运行程序)设置为 pytest

## 二、新建项目时需要四个包和两个目录

- common：用于存放通用的方法
- labs：用来做测试的
- logs：存放日志方法和文件
- testcases：用来写测试用例
- config：存放配置文件（xxx.yaml）
- img：存放测试用例需要的图片

## 三、yaml 文件

yaml：一种标记语言，用来编写配置文件

### yaml 基础语法

```python
大小写敏感
使用缩进表示层级关系
缩进不允许使用tab，只允许使用空格
缩进的空格数不重要，只要相同层级的元素左对齐即可
“#”号表示注释
```

### yaml 数据类型

```xml
纯量：单个的、不可再分的值
数组：一组按次序排列的值，又称为序列/列表
对象：键值对的集合，又称为映射/哈希/字典
```

### 纯量

```xml
字符串：双引号不会对转移字符进行转移，单引号才会
username1:'周杰\n伦'转换为JS为{"username4": "周杰\\n论"}
布尔值
整数
浮点数
null
时间
日期
强制数据转换
```

```python
yaml文件
# 字符串
username: 周杰伦
username2: "周杰伦"
username3: '周杰伦'
username4: '周杰\n论'
username5: '周杰''伦'
str1: 这是第一行
 多行
 最后一行
str2: |
 这是第一行
 多行
 最后一行
str3: >
 这是第一行
 多行
 最后一行
# 字符串
isAdmin: true
# 整数
bookNumbers: 10
# 浮点数
cash: 9.98
cash2: 0.99e+2
#null
lock: null
lock2: ~
#时间
datetime: 2024-07-14T12:00:00+08:00
#日期
date: 2024-07-14
#强制转换
forceStr: !!str 123
forceStrBoll: !!str true
forceInt: !!int '123'
```

```python
yaml转换为js
{
    "username": "周杰伦",
    "username2": "周杰伦",
    "username3": "周杰伦",
    "username4": "周杰\\n论",
    "username5": "周杰'伦",
    "str1": "这是第一行\n多行\n最后一行",
    "str2": "这是第一行\n多行\n最后一行\n",
    "str3": "这是第一行 多行 最后一行\n",
    "isAdmin": true,
    "bookNumbers": 10,
    "cash": 9.98,
    "cash2": 99,
    "lock": null,
    "lock2": null,
    "datetime": "2024-07-14T04:00:00.000Z",
    "date": "2024-07-14T00:00:00.000Z",
    "forceStr": "123",
    "forceStrBoll": "true",
    "forceInt": null
}
```

## 四、安装 pyyaml 包（其他包也一样）

- 终端/Terminal 页面输入：pip install pyyaml(pip install 包名)
- 指定下载地址：pip install -i 下载地址(https://pypi.tuna.tsinghua.edu.cn/simple) 包名
- 指定下载地址和包版本：pip install -i 下载地址(https://pypi.tuna.tsinghua.edu.cn/simple) 包名==版本号

pytest 中 request 库中的 response 对象的主要属性和方法

- pytest 进行接口自动化时，通常结合'request'库来发送 HTTP 请求何处理响应。接口的返回值对象主要是 reqnust 库中的'reponse'对象
- 主要属性和方法

```python
status_code:响应状态码
HTTP响应的状态码
断言：assert response.status_code == XX
打印：print(response.status_code)
headers:响应头部信息，以字典形式存储
断言：assert response.headers['Content-Type'] == 'application/json'
打印：print(response.headers)
# 验证json数据中的某个值
assert .json()["data"]['key'] == 'expected_value'
get("data", {}).get("token")
text:响应体的原始文本内容
    print(reponse.text)
json:将响应体中的json内容解析为python字典
    resopnse.json()
content:响应体的原始字节内容
    response.content
url:请求的url
    resopnse.url
reason:HTTP响应的原因短语
    assert response.reason == 'OK'
elapsed:请求所用的时间   				    print(reponse.elapsed.total_seconds())
```

##### 字符串转 json/json 转字符串

```python
import json

data = "{"username":"mall", "password":"123456"}"
# 字符串转换为json格式
json_data = json.loads(data)
print(json_data)
print(type(jason_data))   # <class 'dict'>

# json转换为字符串
str_data = json.dumps(data, ensure_ascii=False)  # ensure_ascii=False关掉默认编码
print(str_data)
print(type(str_data))   # <class 'str'>
```

### pytest 介绍

- pytest 是一个是构建简单和可伸缩的测试变得容易的框架
- 测试框架
  - 单园测试框架
  - 自动化测试框架
- pytest 基本规则
  - 用例文件.py 要以 test\_开头或——test 结尾，这样才能被识别为用例文件
  - 测试用例类必须以 Test 开头，且不能有 init 方法
  - 测试用例以 test\_开头，一个测试用例类下面可以有多个测试用例
  - 断言使用 python 原生 assert

#### pytest 集成/命令行执行测试用例（常用参数）

- 首先需要安装 pytest

  - pip install -i 镜像源地址 pytest

- 在终端输入要执行的命令

  - -s：在终端中打印调试信息

  - ```python
    pytest -s 文件名/类名/函数名
    ```

  - -m：用于指定只运行带有特定标记（marker）的测试。标记是在测试函数上应用的标签，用来分类或选择测试；pytest -m 标记名

  ```python
  import pytest

  @pytest.marks.slow
  def test_long_running():
      # 这个测试运行时间较长
      pass

  @pytest.marks.fast
  def test_quick():
      # 这个测试运行时间较短
      pass

  终端输入
  pytest -m "fast"
  pytest -m "slow"
  pytest -m "slow or fast"
  pytest -m "not fast"
  pytest -m "fast not slow"
  ```

  - -k：模糊匹配文件名、类名、方法名、执行匹配到的方法（运行特定的测试）

    ```python
    pytest -k 文件名、类名、方法名
    pytest -k "login"
    ```

  - -v：打印详细的执行信息-名称和状态

    ```python
    pytest -v
    ```

  - -q：打印简洁的执行信息

    ```python
    pytest -q
    ```

  - --collect-only：只列出当前目录下所有的测试模块、测试类、测试函数

    ```python
    pytest 目录名 --collect-only
    pytest testcases --collect-only

    # 结果
    <Dir api_autotest>          # 项目名称
      <Package testcases>		# 目录名
        <Module test_login.py>	#文件名
          <Class TestAPI>		# 类名
            <Function test_login>	#方法名
        <Module test_pytest_m.py>
          <Class Testbing>
            <Function test_bing>
            <Function test_baidu>
    ```

  - --maxfail：限制最大失败次数

  ```python
  pytest --maxfail=2   遇到两个测试失败后停止测试运行
  ```

  - --fixtures：列出所有的 fixtures 及其详细信息

    ```python
    pytest --fixture
    ```

  - --html：生成 hrml 格式的测试报告

    ```python
    pytest --html=report.html
    ```

  - --junitxml：生成 junitxml 格式的测试报告

    ```python
    pytest --junitxml=report.html
    ```

#### pytest 断言方式

> - 使用"=="、"!="、"<"、">"、">="、"<="
> - 使用 in 和 not in 来测试包含和不包含
> - 使用 true 或 false

```python
# 2024/8/23 17:47
# test_assert.py.py



class TestAssert:
    def test_assert(self):
        # ==,!=,>,<,>=,<=
        assert "mall" == "mall"
        assert "mall" != "admin"
        assert 1 < 2
        assert 3 > 2
        assert 3 <= 7-2
        assert 5 >= 1+3
        # 使用in或not in
        assert "mall" in "hello mall"
        assert "mall" not in "hello admin"
        # True和False
        assert (9<10) is True
        assert 1
        assert not False
```

### Fixture 的使用和作用

> - fixture 的用途：包裹测试用例

#### **Fixture 的作用**

1. **准备测试环境**：在测试运行之前，提供必要的设置，如创建数据库连接、启动服务、准备测试数据等。
2. **清理资源**：在测试运行之后，清理或释放资源，如关闭数据库连接、删除测试数据、停止服务等。
3. **代码复用**：通过 `Fixture`，可以避免在每个测试函数中重复编写相同的初始化代码。
4. **依赖注入**：`Fixture` 可以作为参数传递给测试函数，自动注入测试所需的依赖

#### **Fixture 的常见用途**

1. **数据库测试**：初始化数据库连接、准备测试数据，测试结束后清理数据。
2. **Web 测试**：启动浏览器会话（如 Selenium），在测试结束后关闭浏览器。
3. **API 测试**：设置 API 客户端或生成身份验证令牌。
4. **文件操作**：创建临时文件或目录，测试结束后删除这些文件。

### conftest 的作用

---

contest 和在 common_request 中封装 token 的区别

```python
# 单一断言data列表中的元素的某个值


class TestApi():
    def test_workOrder_page(self, auth_token):
        print("Token in test_workOrder_page:", auth_token)
        headers = {"Token": auth_token}
        # 或者如果使用Bearer Token，取消注释下面这行：
        # headers = {"Authorization": f"Bearer {auth_token}"}
        json_payload = {
            "pageNo": 1,
            "pageSize": 10
        }
        res = Requests().post("/admin/api/server/page", json=json_payload, headers=headers)

        try:
            response_data = res.json()
            print(response_data)
            # 首先检查'data'键是否存在以及'lists'键是否为非空列表
            data_lists = response_data.get("data", {}).get("lists", [])
            if data_lists:
                first_item_id = data_lists[0].get("id")
                assert first_item_id == 1022, "ID does not match expected value 1022"
                print(first_item_id)
            else:
                print("No lists available in response data.")
        except IndexError as e:
            print(f"IndexError: Trying to access an item out of range: {e}")
        except KeyError as e:
            print(f"KeyError: Missing key in the data structure: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

```

```python
# 追个断言多个字段


class TestApi():
    def test_workOrder_page(self, auth_token):
        print("Token in test_workOrder_page:", auth_token)
        headers = {"Token": auth_token}
        json_payload = {
            "pageNo": 1,
            "pageSize": 10
        }
        res = Requests().post("/admin/api/server/page", json=json_payload, headers=headers)

        try:
            response_data = res.json()
            print(response_data)
            # 确保响应数据存在
            assert "data" in response_data, "Response does not contain 'data'"
            data = response_data["data"]
            lists = data.get("lists", [])
            assert lists, "No lists available in response data."

            # 对lists中的第一个元素进行多个字段断言
            first_item = lists[0]
            assert first_item['id'] == 1022, "ID does not match expected value 1022"
            assert first_item['name'] == 'Expected Name', "Name does not match"
            assert first_item['status'] == 'Active', "Status is not Active"

            # 打印断言通过后的消息
            print("All assertions passed for the first item.")

        except AssertionError as e:
            print(f"AssertionError: {e}")
        except KeyError as e:
            print(f"KeyError: Missing key in the data structure: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

```

```python
# 单一断言验证多个字段

class TestApi():
    def test_workOrder_page(self, auth_token):
        print("Token in test_workOrder_page:", auth_token)
        headers = {"Token": auth_token}
        json_payload = {
            "pageNo": 1,
            "pageSize": 10
        }
        res = Requests().post("/admin/api/server/page", json=json_payload, headers=headers)

        try:
            response_data = res.json()
            print(response_data)

            # 检查数据结构是否存在并验证多个字段
            assert "data" in response_data and "lists" in response_data["data"] and len(response_data["data"]["lists"]) > 0, "Data structure is incorrect or empty."

            # 断言列表中su
            first_item = response_data["data"]["lists"][0]
            conditions = (
                first_item.get('id') == 1022,
                first_item.get('name') == 'Expected Name',
                first_item.get('status') == 'Active'
            )

            # 使用all()来检查所有条件是否为True
            assert all(conditions), f"Not all conditions are met: {conditions}"

            print("All conditions are met for the first item.")

        except AssertionError as e:
            print(f"AssertionError: {e}")
        except KeyError as e:
            print(f"KeyError: Missing key in the data structure: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

```

### 参数化

> ```
> 参数化适用于：数据类型一样，内容不同的适合参数化（数据有差异，操作一致的），例如新增数据
> ```

```python
import pytest
from common.common_request import Requests
from common.yaml_config import GetConf
from img.article_image import get_image_urls


all_urls = get_image_urls()
article_info_list=[
    {"title":"今日资讯",
     "image":all_urls[0],
     "content":"关于延迟退休这件事"
     },
    {"title":"今日头条",
     "image":all_urls[0],
     "content":"关于政策房屋检修事件的影响"
     }
]

class TestApi:
    @pytest.mark.parametrize("article_info",article_info_list)
    def test_add_acticle(self, auth_token,article_info):
        headers = {"token":auth_token}
        # 获取索引图片url
        # all_urls = get_image_urls()
        # params = {
        #     "title":"今日资讯",
        #     "image":all_urls[0],
        #     "content":"关于延迟退休这件事"
        # }
        res = Requests().post("admin/api/article/add", json=article_info, headers=headers)
        print(res.json())
        assert res.status_code == 200
        assert res.json()["code"] == 200
        assert res.json()["msg"] == "成功"
        assert res.headers["content-type"] == "application/json;charset=utf-8"
```

#### pytest-xdist 分布式运行测试用例插件

> 可以根据计算机内核（菜谱）自动计算分配每次执行几条用例
>
> 例如，电脑 cpu 是 6 核，最大并发数可以设置为 6
>
> 安装 pytest-xdist: pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn pytest-xdist
>
> 检查配置源：pip config list
>
> 清理 pip 缓存：pip cache purge
>
> 更新 pip：pip install --upgrade pip

使用方式

> 第一种：手动限制并发数
>
> 终端输入：pytest -s 需要执行的用例名称 -n 并发数
>
> 例如，pytest -s testcases -n 3
>
> 第二种：根据电脑 cpu 自动设置
>
> 终端输入：pytest -s 需要执行的用例名称 -n auto
>
> 例如，pytest -s testcases -n auto
>
> 第三中，测试用例前后有关联需要先执行前一个用力可以指定将该测试用例放在一个进程中
>
> 终端输入：pytest -s 用例文件名 -n auto --dist=loadscope
>
> 例如：pytest -s testcases -n auto --dist=loadscope

#### pytest-rerunfailures 测试用例失败重跑插件

> 安装 pytest-rerunfailures：pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pytest-rerunfailures

##### 使用方式

> 1.全局使用/指定文件使用(终端)：pytest -s 用例文件/用例文件中的指定文件 --reruns 指定次数 --reruns-delay 延迟事件
>
> 例如，pytest -s testceses/test_rerun --reruns5 --reruns-delay 1
>
> 2.指定的测试用例
>
> 指定文件使用的某个测试用例执行失败需要重跑时需要在该方法上加上装饰器@pytest.mark.falky(reruns=5, reruns_delay=1)，在终端执行时智慧对该方法有用

```python
class TestApi:
    @pytest.mark.parametrize(reruns=5, reruns_delay=2)
    def test_bussiness_add(self, auth_token):
        headers = {"token":auth_token}
        image_url = get_image_file()
        # urls = get_image_urls([0])
        # files = {
        #     "image":image_file}
        params = {
            "contacts": "大大",
            "mobile": "15790879001",
            "businessName": "大大家政",
            "categoryIds": "12,24,23,11,15",
            "attachment": "",
            "image":image_url,
            "provinceId": 140000,
            "cityId": 140300,
            "districtId": 140302,
            "address": "山西省泉阳市主城区",
            "openingBank": "中国工商银行",
            "bankCard": "6222358291538214065",
            "openingName": "测试",
            "reservedPhone": "15790879001",
            "openBankName": "测试"
        }
        res = Requests().post("admin/api/business-info/add", headers=headers, json=params)
        print(res.json())
        assert res.status_code == 200
        assert res.headers["content-type"] == "application/json;charset=utf-8"
        assert res.json()

```

#### pytest-assume 断言插件

> **特点**：允许在单个测试函数中使用多个断言，并记录所有断言的结果，而不是在第一个断言失败时中止测试。通常情况下，`pytest` 在断言失败后就会停止执行后续的代码，而 `pytest-assume` 使得测试在多个断言中失败后仍继续执行，从而捕获所有的错误信息
>
> 安装：pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pytest-assume

##### pytest.assume

```python
import json
import pytest
from common.common_request import Requests
from common.yaml_config import GetConf

class TestApi:
    def test_login_success(self):
        username, password = GetConf().get_username_password()
        params = {
            "username": username,
            "password":password
        }
        res = Requests().post("admin/api/system/login", json=params)
        assert res.status_code == 200
         pytest.assume(res.status_code == 301)
        assert res.headers["content-type"] =="application/json;charset=utf-8"
        # 断言token的三种方式
        assert "token" in res.json().get("data",{})
        assert res.json()["data"]["token"]
        assert json.loads(res.text)["data"]["token"]
        print(res.json())
        print("Requests params:", params)   # 输出请求入参

        # print(res.text)
        # print(res.status_code)
        # print(res.headers)
```

##### with assume

> 特点：一个测试用例代码块中有多个断言，且断言失败后继续执行测试用例并记录所有断言结果
>
> 上下文管理器，with 语句块执行完之后，自动释放资源
>
> 安装：pip install -i

```python
import json
import pytest
from  pytest_assume.plugin import assume
from common.common_request import Requests
from common.yaml_config import GetConf

class ApiTest:
    def test_login_usename_erroe(self):
        _, password = GetConf().get_username_password()
        wrong_username = "mall"
        params = {
            "username":wrong_username,
            "password":password
        }
        res = Requests().post("admin/api/system/login", json=params)
        # res_data = res.json()
        # print(res_data)
        print(res.json())
        print(f"Requests params", params)
        # with assume上下文管理器，with语句块执行完之后，自动释放资源
        with assume: assert res.json()["msg"] == "登录成功"
        with assume:
            assert res.status_code == 200
            assert res.status_code == 301
            """不能直接使用assert res.msg == "登录账号或密码错误"是因为Python中使用request库（或类型的http请求库）获取的"Response"的对象并不直接包含"msg"属性,
                       想要获取响应中的消息字符串可以调用.json()方法解析响应的JSON格式内容并返回一个字典"""
            assert res.json()["msg"] =="登录账号或密码错误"
            assert res.json()["data"] == []
            assert res.json()["code"] == 330
        print("执行完毕")
```

#### pytest-html 测试报告插件

> 安装：pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pytest-html
>
> 生成测试报告-终端(需要先选中 testcases 文件)：pytest -s testcases --html=report/report.html
>
> report：报告存放在 report 文件中；report.html 报告名
>
> 生成的报告不需要有单独的样式只需要有一个 html 文件
>
> 终端(需要先选中 testcases 文件)：pytest testcases -i --html=report/report.html --self-contained-html

#### pytest-allure 生成测试报告

> **安装 allure 和 jdk 并配置环境变量**
>
> > 下载 allure 包安装后在系统属性中-环境变量-系统变量选择 Path 添加环境变量（如：D:\allure-2.30.0\bin，路径选择 bin 目录然后复制路径）
>
> **终端输入**pytest -s testcases/test_article_add.py(对应的文件按照需求即可) --alluredir=report
>
> **打印报告方式**
>
> ​ allure generate report -o report/api_report
>
> ​ allure serve report：生成本地文件

#### allure 相关注解

> `step`、`description`、`epic`、`feature`、`story`、`tag`、`attach` 等）是用于描述和组织测试报告内容的。它们提供了测试用例的上下文、结构和附加信息，帮助更清晰地呈现测试的结果。

> step 用于将测试步骤显示在报告中，方便查看测试过程执行的各个步骤(例如通过、失败等)。
>
> 用法：

```python
@allure.step("step description")
def some_step():
    with allure.step("具体描述")
    pass
```

> description：用于给测试用例添加详细描述，解析测试的目的或流程
>
> 用法：

```python
@allure.descripition("需要添加的说明")
def test_case():
    pass
```

> epic：用于标记一个大的功能模块或项目，这个模块通常会包含多个 feature
>
> 用法：

```python
@allure.epic("具体的标记")
def test_case():
    pass
```

> feature：用于标记测试用例所属的功能或特性，通常是某个 epic 的子集（按功能模块分类展示测试用例）
>
> 用法：

```python
@allure.feature("feature descripition")
def test_case():
    pass
```

> story：用于标记测试用例所属的用户故事，即某个功能的特定使用场景或需求(在报告中 story 帮助更细粒度地组织和展示测试用例)
>
> 用法：

```python
@allure.story("story descripition")
def test_case():
    pass
```

> tag：用于给测试用例打上标签，方便通过标签来分类和过滤测试用例。标签可以是版本号、优先级、模块等(在报告中，tag 可以用作过滤条件，帮助快速查找特定标签地测试用例)
>
> 写完后在对应的封装的公共请求方法中设置对应的请求参考 7012345server_api 中 common 中的 dell_with_reponse.py 和 common_request.py

```python
@allure.tag("tag1", "tag2")
def test_case():
    pass
```

> attach：将接口请求和响应的相关信息以附件（如截图、日志、数据文件等））形式添加到报告中，以便调试和追踪；`allure` 是一个强大的报告生成工具，常用于自动化测试，通过对接口请求和响应的详细信息进行记录，使得测试报告具有更强的可读性和调试能力
>
> 用法：定义一个 del_with_res 将入参和出参写入该函数中，在封装的公共请求方法中将入参和出参传给 del_with_res(data, res)生成的测试报告可查看具体的详细信息

```python
allure.attach("this is a plan text attachment", name="attachment", attachment_type=allure.attachment_type.text)


示例
import allure

def deal_with_reponse(data, res):
    # 请求url
    request_url = str(res.request.url)
    allure.attach(request_url, "请求url")

    # 请求方法
    request_method = str(res.request.method)
    allure.attach(request_method, "请求方法")

    # 请求header
    request_header = str(res.request.headers)
    allure.attach(request_header, "请求header")

    # 入参报文
    request_data = str(data)
    allure.attach(request_data, "入参报文")

    # 响应时间
    reponse_time = str(res.elapsed.total_seconds()*1000)
    allure.attach(reponse_time, "响应时间")

    # 响应状态码
    status_code = str(res.status_code)
    allure.attach(status_code, "响应状态码")

    # 响应报文
    reponse_text = str(res.text)
    allure.attach(reponse_text, "响应报文")
```

```python
# 2024/8/26 17:31
# test_page.py
import pytest
from common.common_request import Requests
from common.yaml_config import GetConf
import allure



class TestApi():
    @allure.description("调用订单列表接口")
    @allure.epic("首页")
    @allure.feature("订单列表")
    @allure.story("订单数量")
    @allure.tag("订单金额")
    def test_workOrder_page(self,auth_token):
        print("Token in test_workOrder_page:", auth_token)
        # user_token = auth_token(uesr:"对应用户名")
        with allure.step("登录"):
            headers = {"Token":auth_token}
        # headers = { "Authorization": f"Bearer {auth_token}"}
        json = {
            "pageNo":1,
            "pageSize":10
        }
        with allure.step("调用查询订单接口"):
            res = Requests().post("/admin/api/server/page", json=json, headers=headers)
        # print(res.json())
        # assert res.json().get("data", {}).get("lists")[0]["id"] == 1022
        # 检查data是否存在以及lists列表是否为空
        with allure.step("断言"):
            try:
                response_data = res.json()  # 获取想要结果饼解析为json格式，解析数据返回字典格式
                print(response_data)
                assert "data" in response_data and "lists" in response_data["data"] and len(response_data["data"]["lists"])>0
                # 前面一种方式更适合不确定lists是否存在，data_list = response_data.get["data"]["list"]
                data_lists = response_data.get("data", {}).get("lists",[])
                assert len("lists") >= 2, "Not enough items in 'lists'"  # lists长度不符合的话会抛出异常”Not enough items in 'lists'“
                if data_lists:
                    # 需要断言的data中有多个元素时可以使用
                    first_item_id = data_lists
                    assert first_item_id[0]["id"] == 1022
                    assert first_item_id[1]["id"] == 1021
                    assert first_item_id[2]["id"] == 1020
                    assert first_item_id[2]["name"] == "测试"
                    print("所有断言都通过")
                else:
                    pass
                assert response_data["data"]["count"] == 45  # 断言"data"中的"count"的值
                # print(response_data["data"]["count"])
                assert res.status_code ==200  # status_code是request库（或类型的http请求库）获取的"Response"的对象直接包含的
                assert response_data["msg"] == "成功"
                assert response_data["code"] == 200
            except IndexError as e:
                print(f"列表索引错误:{e}")
            except KeyError as e:
                print(f"字典键错误：{e}")
            except Exception as e:
                print(f"捕获任何未特别处理的异常：{e}")
```

#### 解决 python 控制台提示“UnicodeEncodeError: 'gbk' codec can't encode”

> 首先，需要在设置-编辑器-文件编码中将全局编码、项目编码和属性文件的默认编码设置为 UTF-8
>
> 其次，在运行-编辑配置中在“环境变量”栏中添加 `PYTHONIOENCODING=utf-8`

只有以 test\_开头或结尾的函数才能被识别为测试用例

#### 解决每次新建项目都需要重复导包问题

> 方法一：新建项目时勾选【先前配置的解释器-Previously configured interpreter】
>
> 方法二：设置-项目-python 解释器-点击添加解释器（**Add**）选择添加本地解释器-勾选继承全局站点包（Inherit global site-packages）

#### 上传图片测试用例-获取文件方式

- **入参是 json 格式**

```python
# 2024/9/18 17:34
# test_upinfo.py
import allure
import pytest
import base64

from common.tools import sep,get_project_path
from common.common_request import Requests



class TestApi:

    def test_upload_img(self, auth_token):
        headers = {"token":auth_token}
        # 获取图片文件路径：get_project_path()项目根目录+img\img_file.png
        image_path = get_project_path()+ sep(["img","img_file.png"],add_sep_before=True)
        # 打开指定路径的图片文件（位于image_path位置）（以二进制模式）
        with open(image_path, "rb") as image_file:
            # 读取图片文件（image_file）的二进制内容，以字节形式返回，即原始的二进制数据并赋值给image_data
            image_data = image_file.read()
            # 将图片编码为Base64字符串，并转换为字符串，以便后续用于 JSON 或网络请求等操作
            """将读取的二进制图片编码为Base64字符串，decode('utf-8')将Base64编码的字符串转换为普通的utf-8字符串
            因为 base64.b64encode 返回的是字节数据，使用 decode('utf-8') 将其转换为可以轻松处理的字符串，
            Base64 是一种将二进制数据表示为 ASCII 字符串的编码方法，常用于在网络上传输图片、文件等。"""
            base64_image = base64.b64encode(image_data).decode('utf-8')
        # 创建包含Base64编码图像的JSON数据
        json_data = {
            "image": base64_image,
            "nickname":"管理员"
        }

        # 发送POST请求
        response = Requests().post('admin/api/system/admin/upInfo',json=json_data, headers=headers)


        # 打印响应内容
        print(response.text)

        # 断言响应状态码为200
        assert response.status_code == 200

```

- 入参是文件，格式是 json

```python
import os
import base64
import requests

class TestApi:

    def test_upload_pdf(self, auth_token):
        # 设置请求头
        headers = {"token": auth_token, "Content-Type": "application/json"}

        # 获取 PDF 文件路径
        pdf_path = get_project_path()+sep(["files", "document.pdf"])

        # 以二进制模式打开 PDF 文件并进行 Base64 编码
        with open(pdf_path, "rb") as pdf_file:
            # 读取 PDF 文件的二进制数据
            pdf_data = pdf_file.read()
            # 将二进制数据编码为 Base64
            base64_pdf = base64.b64encode(pdf_data).decode('utf-8')

        # 将 Base64 编码后的 PDF 数据放入 JSON 数据中
        json_data = {
            "file_name": "document.pdf",  # 文件名,y
            "file_data": base64_pdf,      # Base64 编码后的文件内容
            "description": "This is a test PDF file."  # 其他表单字段
        }

        # 发送包含 Base64 编码 PDF 文件的 POST 请求
        response = requests.post('http://example.com/api/upload', headers=headers, json=json_data)

        # 打印响应内容
        print(response.text)

        # 断言状态码为200
        assert response.status_code == 200

```

- 入参是 data 格式 up 图片、文件（）

```python
import os
import requests

class TestApi:

    def test_upload_img(self, auth_token):
        # 设置请求头
        headers = {"token": auth_token}

        # 获取图片文件路径
        image_path = get_project_path()+sep(["img", "image_file.jpg"], add_sep_before=True)
        # 获取pdf文件路径
        pdf_path = get_project_path()+sep(["file", "XXX.pdf"], add_sep_before=True)

        # 以二进制模式打开图片
        with open(image_path, "rb") as image_file:
            # 创建包含图片二进制数据的表单
            files = {
                "file": ("image_file.jpg", image_file, "image/jpeg")  # image/jpeg用于图片
            }
            # 以二进制模式打开pdf文件
        with open(pdf_path, "rb") as pdf_file:
            files = {
                "file": ("XXX.pdf", pdf_file, "application/pdf") # application/pdf用于PDF文件

            data = {
                "nickname": "管理员",
                "username": "admin"
            }

            # 发送带有文件的POST请求，文件放在data中
            response = requests.post('http://example.com/api/upload', headers=headers, files=files, data=data)

        # 打印响应
        print(response.text)

        # 断言状态码
        assert response.status_code == 200


```

### mysql 数据库操作封装

> 安装 pymysql：pip install pymysql -i https://pypi.tuna.tsinghua.edu.cn/simple pymysql

- python 连接 mysql 并操作 mysql 的过程

> 开始-->创建 connection-->获取 cursor-->执行 DML 语句(增删改查)-->关闭 cursor-->关闭 connection-->结束
