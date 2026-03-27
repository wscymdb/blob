# 设计原则

## 什么是设计

- 按哪一种思路或者标准来实现功能
- 功能相同，可以有不同设计的方式
- 需求如果不断变化，设计的作用才能体现出来

# SOLID 五大设计原则

| 首字母 | 指代 | 概念 |
| --- | --- | --- |
| S | 单一职责原则 | 单一功能原则认为对象应该仅具有一种单一功能的概念。 |
| O | 开放封闭原则 | 开闭原则认为“软件体应该是对于扩展开放的，但是对于修改封闭的”的概念。 |
| L | 里氏替换原则 | 里氏替换原则认为“程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的”的概念。参考 契约式设计。 |
| I | 接口隔离原则 | 接口隔离原则认为“多个特定客户端接口要好于一个宽泛用途的接口”[5] 的概念。 |
| D | 依赖反转原则 | 依赖反转原则认为一个方法应该遵从“依赖于抽象而不是一个实例”[5] 的概念。依赖注入是该原则的一种实现方式。 |

## S 单一职责原则(重要)

- `Single responsibility principle`
- 一个程序只做好一件事
- 如果功能特别复杂就进行拆分

## O 开放封闭原则(重要)

- `Open Closed Principle`
- 对扩展开放，对修改关闭
- 增加需求时，扩展新代码，而非修改已有代码
- 这是软件设计的终极目标
- **开放封闭原则中的"修改"指的是：修改已有的、稳定的、经过测试的代码模块。这样可以保证之前的代码稳定**
-
- **适用场景(重要！！)**：**适用**新需求/功能，**不适用**修复 bug
  - 也就是说现在来了一个信息需求 那么是适合 O 原则的
  - 比如之前的需求有 bug 那么肯定要修老代码的 就不适用 O 原则了

## L 里氏替换原则

- `Liskov Substitution Principle`
- 子类能覆盖父类
- 父类能出现的地方子类就能出现
- **JS 使用比较少**

## I 接口隔离原则

- Interface Segregation Principle
- 保持接口的单一独立，避免出现胖接口
- **JS 中没有接口，使用较少**
- 类似于单一职责原则，更关注接口

## D 依赖倒置原则

- Dependence Inversion Principle
- 面向接口编程，依赖于抽象而不依赖于具体实现
- 使用方只关注接口而不关注具体类的实现
- **JS 中使用较少（没有接口，弱类型）**

## 举例

### S 和 O 原则

**场景**：实现一个 request 函数，需要满足两个要求：① 只返回状态码 200 的响应；② 将响应转换为 JSON 格式。

**单一职责原则的应用**：  
将"状态码校验"和"JSON 解析"这两个不同的职责，分别封装成  `checkStatus`  和  `parseJSON`  两个独立函数。每个函数只关注自己的事情，互不干扰。

**开放封闭原则的体现**：  
当新需求出现时——比如需要处理 code=1 的登录态提示——我们只需新增一个  `handleLoginError`  函数，然后调用 use 方法即可。

这正是开放封闭原则的核心：**通过扩展新代码来应对变化，而不是修改已有代码**。

```js
// 检测状态
function checkStatus(response) {
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  return response;
}

// 转换为json格式
function parseJSON(response) {
  return response.json();
}

// 新需求 处理登陆状态
function handleLoginError(response) {
  if (response.code === 1) {
    alert('需要先登陆');
    return;
  }

  return response;
}

const middlewares = [checkStatus, parseJSON];

export function use(middleware) {
  middlewares.push(middleware);
}

/**
 * 要求1: 只有状态码是200才返回数据，否则报错
 * 要求2: 返回json格式的数据
 *
 */
export default async function request(url, options) {
  try {
    let result = await fetch(url, options);

    for (const middleware of middlewares) {
      result = await middleware(result, url, options);
      if (result === undefined) return;
    }

    return result;
  } catch (err) {
    console.log(err);
  }
}

// 新需求：code是1那么就弹窗提示需要登陆
// 只需要调用use方法就行了 这样不会修改之前的代码
use(handleLoginError);
```

### L 原则

- 使用 ts 举例

```typescript
class Person {
  constructor(public name: string) {}

  buy() {}
}

class Man extends Person {
  constructor(name: string) {
    super(name);
  }

  buy() {
    console.log('买了男人该买的');
  }
}

class Woman extends Person {
  constructor(name: string) {
    super(name);
  }

  buy() {
    console.log('买了女人该买的');
  }
}

// ===============================
// 原则1: 子类能够覆盖父类
// 子类可以替换父类出现的位置，且程序行为正确（多态）
function goShopping(person: Person) {
  // 这里调用的是 person.buy()
  // 但实际传入的是哪个子类，就执行哪个子类的 buy()
  person.buy();
}

// 可以用子类 Man 替换父类 Person
const man = new Man('张三');
goShopping(man); // 输出：买了男人该买的

// 可以用子类 Woman 替换父类 Person
const woman = new Woman('李四');
goShopping(woman); // 输出：买了女人该买的

// ===============================
// 原则2:父类能出现的地方子类就能出现
function processPerson(person: Person) {
  console.log(`处理: ${person.name}`);
  person.buy();
}

// 子类 Man 出现在父类出现的地方
const man1 = new Man('张三');
processPerson(man1); // 子类替换父类，正常工作

// 子类 Woman 出现在父类出现的地方
const woman1 = new Woman('李四');
processPerson(woman1); // 子类替换父类，正常工作
```

### I 原则

- 使用 ts 举例，帮助理解

```ts
// 违反 ISP
// 一个包含太多职责的"胖"接口
interface Worker {
  work(): void;
  code(): void;
}

// 实现类被迫实现所有方法
class Robot implements Worker {
  work() {
    console.log('工作');
  }
  eat() {
    throw new Error('机器人不吃饭');
  } // 被迫实现
}

// 符合 ISP
// 将大接口拆分成多个小接口
interface Workable {
  work(): void;
}
interface Eatable {
  eat(): void;
}
interface Codable {
  code(): void;
}

// 开发者只需要实现需要的接口
class Robot implements Workable, Codable {
  work() {
    console.log('工作');
  }
  code() {
    console.log('写代码');
  }
  // 不需要实现 eat
}
```

# 为什么要用设计模式

虽然设计模式最终的实现和无设计模式没有太大的差别，但是设计模式带来的收益是给到每位队员的。比如可读性和可维护性，带来巨大的收益。

设计模式不是为了炫技，而是为了**让代码更容易被理解和维护**。

# 举例

现在需要编写一个验证器

## 无设计模式

- 直接使用一个函数，写起来看似简单
- 但是后面如果条件变多那么那么这个函数就会很长
- 一方面可读性比较差
- 一方面维护性比较困难(如果后面越来越多)

```js
/**
 * 验证器
 * 用户名验证 长度不能小于6位
 * 密码验证 必须包含数字
 * 年龄验证 大于等于18岁
 */
const validator = (value) => {
  // 用户名验证
  if (value.length >= 6) {
    return true;
  }

  // 密码验证
  if (/\d/.test(value)) {
    return true;
  }

  // 年龄验证
  if (value >= 18) {
    return true;
  }

  return false;
};
```

## 使用策略模式改造

- 使用策略模式改造每个规则都是一个单独的校验器
- 后面如果再有新的规则只需要添加新的即可
- 如果要对原有的规则改造，也只需要更改对应的函数即可
- 这样的好处就是
  - 可读性很好、可维护性也很好
  - 而且每个函数职责单一方便单元测试
- 想写的更好一些可以把每个验证写成一个文件，更显得高级

```js
// 用户名验证
const userNameValidator = (value) => {
  return value.length >= 6;
};

// 密码验证
const passwordValidator = (value) => {
  return /\d/.test(value);
};

// 年龄验证
const ageValidator = (value) => {
  return value >= 18;
};

const strategy = {
  userName: userNameValidator,
  password: passwordValidator,
  age: ageValidator,
};

// 验证器
const validator = (type, value) => {
  return strategy[type](value);
};
```
