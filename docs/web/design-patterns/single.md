**单例模式**

# 用途

在前端开发中，全局状态管理、配置信息、数据库连接等往往需要在应用中只存在一个实例，避免多次实例化带来的数据不一致。例如在一个前端应用中，全局的 loading 状态通常需要一个单例模式来确保其唯一性。

# 通过静态方式实现

```javascript
// 单例模式-静态方法实现

class Person {
  // instance 是私有静态属性  使用#来表示私有属性
  static #instance = null;
  constructor(name) {
    this.name = name;

    if (!Person.#instance) {
      Person.#instance = this;
    }

    return Person.#instance;
  }
}

const p1 = new Person('zs');
const p2 = new Person('ls');

console.log(p1 === p2); // true
```

# 通过闭包实现

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  /**
   * 单例模式一般都是使用一个静态方法来获取实例
   * 通常借助闭包来实现
   * 这种方式有问题
   */
  static getInstanceError(name) {
    let instance = null;

    if (!instance) {
      instance = new Person(name);
    }

    return instance;
  }
}

/**
 * 如果使用上的方式实现单例模式，那么每次调用getInstance方法都会创建一个新的实例
 * 所以可以通过即调函数来实现单例模式 也就是立即执行函数 那么instance就是闭包中的变量了
 */
Person.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Person(name);
    }
    return instance;
  };
})();

const p1 = Person.getInstance('zs');
const p2 = Person.getInstance('ls');

console.log(p1 === p2); // true
```

# 说明

两种方式实现的本质其实都是通过 instance 来判断是否已经实例化过，有点类似加锁操作，从而实现示例的唯一性

# 两种方式的优缺点总结

| 特性           | 静态属性方式          | 闭包方式                        |
| -------------- | --------------------- | ------------------------------- |
| **代码简洁度** | ⭐⭐⭐⭐⭐ 非常简洁   | ⭐⭐⭐ 稍复杂                   |
| **封装性**     | ⭐⭐⭐⭐ 私有字段保护 | ⭐⭐⭐⭐⭐ 完全闭包保护         |
| **语义清晰度** | ⭐⭐⭐ new 容易误解   | ⭐⭐⭐⭐⭐ getInstance 语义明确 |
| **灵活性**     | ⭐⭐⭐ 固定返回逻辑   | ⭐⭐⭐⭐ 可在闭包中添加额外逻辑 |
| **兼容性**     | ⭐⭐⭐ 需要 ES2022+   | ⭐⭐⭐⭐⭐ 任何环境             |
