# 原型链 / 继承 / new

> 第 1 周 · 第 1 课

## 概念

### 三个核心概念

| 概念 | 谁有 | 含义 |
|------|------|------|
| `prototype` | 只有**函数** | 给 `new` 出来的实例当「共享方法仓库」 |
| `__proto__` | 每个**对象** | 指向它的原型（规范里叫 `[[Prototype]]`） |
| 原型链 | — | 找属性时沿 `__proto__` 往上走，直到 `null` |

### 原型链结构

```
p  ──__proto__──▶  Person.prototype  ──__proto__──▶  Object.prototype  ──▶  null
```

### 属性查找规则

1. 先找实例自身
2. 再找原型链
3. 还没有 → `undefined`（调用则 `not a function`）

### new 做了什么（四步）

1. 创建空对象，原型指向 `Constructor.prototype`
2. 执行构造函数，`this` 指向新对象
3. 若构造函数返回对象，则用返回值；否则用新对象
4. 返回该对象

```javascript
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```

### 易错题：整体替换 prototype

```javascript
function Foo() {}
Foo.prototype.a = 1;
const f = new Foo();
Foo.prototype = { a: 2 };
f.a; // 1
```

- `Foo.prototype = { a: 2 }` 是**换了一个新对象**，不是改原对象
- `f` 在 `new` 时已连到**当时的**原型对象，不会跟着变
- 若写 `Foo.prototype.a = 2`（改属性），则会影响已有实例

### 面试一句话

> 通过 `new` 创建的实例，其 `[[Prototype]]` 在创建时指向构造函数的 `prototype` 对象；属性查找沿原型链向上直到 `null`。

---

## 实践

在 `npm run console` 中完成以下练习。

### 练习 1：验证原型链

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log(`Hi, ${this.name}`);
};

const p = new Person('小明');

console.log(p.__proto__ === Person.prototype);
console.log(Person.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__);
```

**答案：**

```
true
true
null
```

### 练习 2：调用原型方法

```javascript
p.sayHi();
```

**答案：**

```
Hi, 小明
```

> 注意：模板字符串用反引号 `` ` `` 和 `${}`，不是单引号 + `$(...)`。

### 练习 3：prototype 被整体替换

```javascript
function Foo() {}
Foo.prototype.a = 1;
const f = new Foo();
Foo.prototype = { a: 2 };

console.log('f.a =', f.a);
console.log('new Foo().a =', new Foo().a);
```

**答案：**

```
f.a = 1
new Foo().a = 2
```

`f` 连的是替换前的原型对象；之后 `new` 出来的实例连新对象。

### 练习 4：改属性 vs 换对象

```javascript
function Bar() {}
Bar.prototype.a = 1;
const b1 = new Bar();

Bar.prototype.a = 2;          // 改属性
console.log('改属性后 b1.a =', b1.a);

const b2 = new Bar();
Bar.prototype = { a: 99 };    // 换对象
console.log('换对象后 b1.a =', b1.a);
console.log('换对象后 b2.a =', b2.a);
console.log('换对象后 new Bar().a =', new Bar().a);
```

**答案：**

```
改属性后 b1.a = 2
换对象后 b1.a = 2
换对象后 b2.a = 2
换对象后 new Bar().a = 99
```

改属性影响所有连同一原型对象的实例；换对象只影响之后 `new` 的实例。

---

## 我的笔记

（实验记录写在这里）
