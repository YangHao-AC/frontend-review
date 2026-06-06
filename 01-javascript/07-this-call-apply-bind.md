# this 绑定：call / apply / bind（显式绑定）

> 第 1 周 · 第 2 课 · 第 6 节

## 概念

### 什么是显式绑定

前面学过：独立调用会丢 `this`。  
**显式绑定** = 调用函数时，**手动指定** `this` 指向谁。

三个 API：`call`、`apply`、`bind`。

### 三条规则在优先级中的位置

```
new 绑定  >  显式绑定(call/apply/bind)  >  隐式绑定  >  默认绑定
```

显式绑定比 `obj.fn()` 优先级更高。

### call vs apply vs bind

| 方法 | 是否立即执行 | 传参方式 | 返回值 |
|------|-------------|----------|--------|
| `call` | ✅ 立即 | 逐个传：`fn.call(obj, a, b, c)` | 函数返回值 |
| `apply` | ✅ 立即 | 数组传：`fn.apply(obj, [a, b, c])` | 函数返回值 |
| `bind` | ❌ 不执行 | 先绑 `this`，可预设参数，返回**新函数** | 新函数 |

### 基本用法

```javascript
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: '小红' };

greet.call(person, 'Hi', '!');        // Hi, 小红!
greet.apply(person, ['Hello', '.']);  // Hello, 小红.

const bound = greet.bind(person, 'Hey');
bound('~');  // Hey, 小红~
```

### bind 的典型场景：修复隐式丢失

```javascript
const user = { name: '小明', sayHi() { console.log('Hi, ' + this.name); } };

// 错误：this 丢失
setTimeout(user.sayHi, 100);

// 正确：bind 固定 this
setTimeout(user.sayHi.bind(user), 100);
```

### 手写 bind 思路（面试常考）

```javascript
Function.prototype.myBind = function (context, ...presetArgs) {
  const fn = this;
  return function (...args) {
    // new 调用时不能改 this（进阶，可先了解）
    return fn.apply(context, [...presetArgs, ...args]);
  };
};
```

### 面试一句话

> `call`/`apply` 立即调用并指定 `this`，区别在传参；`bind` 返回绑定了 `this` 的新函数，常用于回调里固定上下文。

---

## 实践

`npm run console` 中完成。

### 练习 1：call 和 apply

```javascript
function introduce(city, country) {
  console.log(`我是 ${this.name}，来自 ${city}, ${country}`);
}

const person = { name: '小红' };

introduce.call(person, '北京', '中国');
introduce.apply(person, ['上海', '中国']);
```

**答案：**

```
我是 小红，来自 北京, 中国
我是 小红，来自 上海, 中国
```

### 练习 2：bind 返回新函数

```javascript
function greet(msg) {
  console.log(msg + this.name);
}

const obj = { name: '小刚' };
const sayHey = greet.bind(obj, 'Hey, ');

sayHey();
sayHey === greet;  // false，是新函数
```

**答案：**

```
Hey, 小刚
false
```

### 练习 3：用 bind 修复 setTimeout 丢 this

```javascript
const user = {
  name: '小明',
  sayHi() {
    console.log('Hi, ' + this.name);
  },
};

setTimeout(user.sayHi.bind(user), 100);
```

**答案：**

```
Hi, 小明
```

### 练习 4：call 借用方法

数组没有 `slice`，但可以借用：

```javascript
const arrLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const arr = Array.prototype.slice.call(arrLike);
console.log(arr);
console.log(Array.isArray(arr));
```

**答案：**

```
[ 'a', 'b', 'c' ]
true
```

`call` 可以让任意函数在指定 `this` 上执行，经典用法是「方法借用」。

---

## 我的笔记

call 和 apply 的唯一区别：参数传递方式不同，call 逐个传参，apply 把参数放进一个数组中；
bind 和 call 的核心区别：call 会立即执行函数，bind 会返回一个新函数，不会执行；
为什么 setTimeout 要用 .bind(user)：setTimeout 只保存函数，不保存谁的方法。bind(user) 是提前造一个「无论怎么调用，this 都是 user」的函数再传进去。
