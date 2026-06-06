# this 绑定：箭头函数

> 第 1 周 · 第 2 课 · 第 7 节（this 收尾）

## 概念

### 箭头函数没有自己的 this

普通函数：`this` 看**怎么调用**。  
箭头函数：`this` 看**定义时外层**的词法环境（闭包捕获），**不能被** call / apply / bind 改掉。

```javascript
const obj = {
  name: '对象',
  normal() {
    console.log('normal:', this.name);
  },
  arrow: () => {
    console.log('arrow:', this.name);
  },
};

obj.normal();  // normal: 对象
obj.arrow();   // arrow: undefined（外层 this，不是 obj）
```

### 对象方法不要用箭头函数

```javascript
// ❌ 错误：箭头函数当对象方法
const user = {
  name: '小明',
  sayHi: () => console.log(this.name),
};

// ✅ 正确：普通函数或简写方法
const user = {
  name: '小明',
  sayHi() {
    console.log(this.name);
  },
};
```

### 箭头函数的典型场景

| 场景 | 为什么用箭头函数 |
|------|------------------|
| 回调里要外层 `this` | `setTimeout(() => this.xxx)` |
| React class 组件早期写法 | 构造函数里 `this.handler = () => {}` |
| 数组方法回调 | 若需访问外层 `this` |

```javascript
const obj = {
  name: '外层',
  getData() {
    setTimeout(() => {
      console.log(this.name);  // 外层：箭头函数继承 getData 的 this
    }, 100);
  },
};
```

### 箭头函数 vs 普通函数（面试对照）

| | 普通函数 | 箭头函数 |
|---|---------|----------|
| `this` | 调用时决定 | 定义时外层决定 |
| `arguments` | 有 | 无（用 rest `...args`） |
| `new` | 可以 | 不可以 |
| `prototype` | 有 | 无 |
| call/apply/bind 改 this | 可以 | **无效** |

### 四条规则 + 箭头函数

箭头函数**不参与**四条 this 规则，它的 `this` 在定义时就固定了。

### 面试一句话

> 箭头函数没有自己的 `this`，继承定义时外层函数的 `this`；适合回调，不适合做对象方法。

---

## 实践

`npm run console` 中完成。

### 练习 1：对象方法 — 普通 vs 箭头

```javascript
const obj = {
  name: '测试对象',
  normal() {
    console.log('normal this.name:', this.name);
  },
  arrow: () => {
    console.log('arrow this.name:', this.name);
  },
};

obj.normal();
obj.arrow();
```

**答案：**

```
normal this.name: 测试对象
arrow this.name: undefined
```

（非 strict 全局下 `arrow` 可能读到全局 `name` 或仍是 `undefined`，核心是 **arrow 的 this 不是 obj**。）

### 练习 2：回调里箭头函数保留外层 this

```javascript
const timer = {
  name: '计时器',
  start() {
    setTimeout(function () {
      console.log('function:', this.name);
    }, 100);
    setTimeout(() => {
      console.log('arrow:', this.name);
    }, 200);
  },
};

timer.start();
```

**答案：**

```
function: undefined
arrow: 计时器
```

普通函数回调 → 独立调用，丢 `this`；箭头函数 → 继承 `start` 的 `this`（即 `timer`）。

### 练习 3：bind 对箭头函数无效

```javascript
const obj = { name: '小红' };

const arrow = () => console.log(this.name);
const bound = arrow.bind(obj);

bound();
```

**答案：**

```
undefined
```

`bind` 改不了箭头函数的 `this`。

### 练习 4：易错题

```javascript
var name = '全局';

const obj = {
  name: '对象',
  getName() {
    return function () {
      return this.name;
    };
  },
  getNameArrow() {
    return () => this.name;
  },
};

console.log(obj.getName()());
console.log(obj.getNameArrow()());
```

**答案：**

```
全局
对象
```

内层普通函数独立调用 → `this` 是全局；内层箭头函数 → `this` 继承 `getNameArrow` 的 `this`（即 `obj`）。

---

## 第 2 课 this 总结

| 规则 | 场景 | this |
|------|------|------|
| new | `new Fn()` | 新对象 |
| 显式 | `call/apply/bind` | 指定的对象 |
| 隐式 | `obj.fn()` | `obj` |
| 默认 | `fn()` | 全局 / undefined |
| 箭头 | 任意调用方式 | **定义时外层** |

---

## 我的笔记

（实验记录写在这里）
