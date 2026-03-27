## 什么是工厂模式

工厂模式是一种创建型设计模式，它提供了一种**创建对象**的最佳方式。在工厂模式中，我们创建对象时不会对客户端暴露创建逻辑，而是通过一个共同的接口来指向新创建的对象。

# 简单工厂(掌握)

在软件开发中，对象的创建往往伴随着复杂的初始化逻辑、依赖配置、参数校验等。如果在客户代码中直接使用  `new`  关键字创建对象，会导致以下问题：

- **代码重复**：多处使用相同对象时，创建逻辑散落各处
- **高耦合**：客户代码与具体实现类紧密绑定
  - 比如制作苹果汁 需要 new 糖类 还有 new 苹果类
- **难以维护**：当创建逻辑变化时，需要修改所有使用处
  - 比如类名改动了，需要更换项目用到的代码
  - 再比如 案例中如果还需要添加别的配料(比如蜂蜜)那么所有用到的地方也有更改
- **暴露细节**：客户需要了解对象如何创建、需要哪些依赖

简单工厂通过将对象的创建逻辑集中到一个工厂类中，有效解决了上述问题。

比如类名改动了 只需要修改工厂中的映射即可

## 代码示例

```js
// 糖类（配料）
class Sugar {
  constructor(name, sweetness = 5) {
    this.name = name;
    this.sweetness = sweetness; // 甜度
  }

  add() {
    console.log(`添加 ${this.name}，甜度 ${this.sweetness}`);
  }
}

// 饮品类（抽象）
class Drink {
  constructor(name) {
    this.name = name;
  }

  cook(sugar) {
    console.log(`制作 ${this.name}，需要添加 ${sugar.name}`);
    sugar.add();
    console.log(`${this.name} 制作完成！`);
  }
}

// 苹果汁
class AppleJuice extends Drink {
  constructor() {
    super('苹果汁');
    this.fruit = '🍎 苹果';
  }
}

// 橙汁
class OrangeJuice extends Drink {
  constructor() {
    super('橙汁');
    this.fruit = '🍊 橙子';
  }
}

// 工厂类
class JuiceFactory {
  static create(type, sugarAmount = 'normal') {
    // 糖的配置
    const sugarConfig = {
      none: { name: '无糖', sweetness: 0 },
      less: { name: '少糖', sweetness: 3 },
      normal: { name: '正常糖', sweetness: 5 },
      more: { name: '多糖', sweetness: 8 },
    };

    const sugar = new Sugar(
      sugarConfig[sugarAmount].name,
      sugarConfig[sugarAmount].sweetness,
    );

    let juice;
    switch (type) {
      case 'AppleJuice':
        juice = new AppleJuice();
        juice.cook(sugar);
        return juice;
      case 'OrangeJuice':
        juice = new OrangeJuice();
        juice.cook(sugar);
        return juice;
      default:
        throw new Error(`抱歉，没有 ${type} 这款饮品`);
    }
  }
}

// ========== 不使用工厂模式 ==========
console.log('=== 不使用工厂模式（DIY模式）===');
console.log('👤 顾客：我要一杯苹果汁，我自己做\n');

// 顾客需要知道：
// 1. 需要创建 AppleJuice 类
// 2. 需要创建 Sugar 类
// 3. 需要了解制作流程
const appleJuice = new AppleJuice();
const sugar1 = new Sugar('正常糖', 5);
appleJuice.cook(sugar1);

console.log('\n❌ 缺点：');
console.log('- 顾客需要了解所有制作细节');
console.log('- 需要自己准备配料');
console.log('- 制作流程暴露在外');

// ========== 使用工厂模式 ==========
console.log('\n=== 使用工厂模式（点单模式）===');
console.log('👤 顾客：服务员，我要一杯橙汁，正常糖\n');

// 顾客只需要：
// 1. 告诉服务员要什么
const orangeJuice = JuiceFactory.create('OrangeJuice', 'normal');

console.log('\n✅ 优点：');
console.log('- 顾客只需告诉需求');
console.log('- 制作细节由工厂封装');
console.log('- 易于维护和扩展');
```

# 工厂方法模式(了解)

前端中少见

## 定义

- 工厂方法模式（Factory Method），又称多态性工厂模式。
- 在工厂方法模式中，核心的工厂类不再负责所有产品的创建，而是将具体创建的工作交给子类去做。
- 说白了就是 父类规定子类必须实现哪些方法，子类怎么实现这些方法父类不关心

## 实现方式

**工厂方法模式的两种实现方式：**

**强类型约束**（TypeScript/Java 风格）：

- 定义抽象类/接口，子类必须实现 抽象类/接口的 方法

**约定式**（JavaScript 风格）：

- 比如开发者约定每个工厂类都有 create 方法
- 语言本身不强制，通过团队规范/文档保证

## JavaScript 中的实现特点

由于 JavaScript 是弱类型语言，我们**不需要通过继承抽象类或实现接口**来约束工厂类的行为。（不需要实现这个父类，所有的子类都是靠开发这约定的）

模式的实现靠的是**开发者之间的约定**：

- 比如所有工厂类都约定实现  `create`  方法
- 这种约定是隐式的，语言本身不做强制检查
- 只要一个类拥有  `create`  方法，它在逻辑上就是一个合法的工厂类

> 相比 Java、C# 等强类型语言需要通过  `abstract`  或  `interface`  来强制约束，JavaScript 的实现更加灵活轻量，同时保留了工厂方法模式的核心思想。

**如果想要强类型可以使用 ts 来实现，这样理解可能更加直观一些**

## 代码示例

- 更好的做法是将每个产品类及其对应的工厂类拆分到独立的文件中，分别导出对应的工厂类。同时将工厂类的配置统一维护在一个配置对象中。这样一来，后续新增产品类型时，只需修改配置文件即可，整体结构更加清晰、易于维护。
- 案例为了方便演示都放到一个文件中了

**方案一 约定式**

- 示例中就没有实现所有工厂类的父类，而是约定每个工厂子类都要有`create`方法

```js
/**
 * 开闭原则实践说明
 *
 * 1. 新增 Cherry 类型时，只需：
 *    - 新增 Cherry 类和 CherryFactory 类
 *    - 在 setting 配置对象中注册新的工厂
 *
 * 2. 符合开闭原则的原因：
 *    - 未修改任何现有业务代码（Apple、Banner 相关逻辑）
 *    - setting 属于配置层，修改配置视为扩展而非修改
 */

class Plant {
  constructor(name) {
    this.name = name;
  }
}

class Apple extends Plant {
  constructor() {
    super('Apple');
  }
}

class AppleFactory {
  create() {
    return new Apple();
  }
}

class Banner extends Plant {
  constructor() {
    super('Banner');
  }
}

class BannerFactory {
  create() {
    return new Banner();
  }
}

// 新需求
class Cherry extends Plant {
  constructor() {
    super('Cherry');
  }
}

class CherryFactory {
  create() {
    return new Cherry();
  }
}

const setting = {
  apple: AppleFactory,
  banner: BannerFactory,
  cherry: CherryFactory, // 新拓展点
};

const apple = new setting.apple().create();
const banner = new setting.banner().create();
const cherry = new setting.cherry().create(); // 新需求
```

**方案二：强类型约束**

如果项目体量过大，那么约定式有时候不一定有用，这时候就需要使用抽象类来代替接口的实现

```js
class Plant {...}

class Apple {...}


// 定义一个抽象的父类 后面的工厂类都要继承这个抽象类
// 用这个抽象类来代替接口
// 所谓抽象类可以理解为对子类的约束 比如后续的子类需要实现create方法
class AbstractFactory {
	create() {
		throw Error('子类必须实现create否则用父类就会抛出错误')
	}
}

// 继承抽象类来实现create方法
class AppleFactory extends AbstractFactory {
	create() {
		console.log('我自己实现了套create')
	}
}

```

# 抽象工厂(了解)

前端中基本见不到

抽象工厂模式是一种**创建型设计模式**，它提供了一个**创建一系列相关或相互依赖对象的接口**，而无需指定它们具体的类。

如果说工厂方法模式解决的是**单个产品**的创建问题，那么抽象工厂模式解决的是**产品族**的创建问题。所谓产品族，是指属于同一场景或同一系列的一组相关产品。

# 工厂模式三兄弟对比

| 维度 | 简单工厂模式 | 工厂方法模式 | 抽象工厂模式 |
| --- | --- | --- | --- |
| **粒度** | 一个工厂生产**所有**产品 | 一个工厂生产**一种**产品 | 一个工厂生产**一族**产品 |
| **工厂数量** | 1 个工厂类 | 多个工厂类（每个产品对应一个） | 多个工厂类（每个产品族对应一个） |
| **扩展方式** | 修改工厂类的  `if/switch` | 新增产品 → 新增工厂类 | 新增产品族 → 新增工厂类 |
| **开闭原则** | ❌ 违反（修改已有代码） | ✅ 符合（新增类扩展） | ✅ 符合（新增类扩展） |
| **复杂度** | 低 | 中 | 高 |
| **适用场景** | 产品种类少且不常变化 | 产品种类多但单一品类 | 产品有家族关系需配套使用 |
