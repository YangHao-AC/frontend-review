# this 绑定：默认绑定 & 隐式绑定

> 第 1 周 · 第 2 课 · 第 5 节

## 概念

### this 和作用域变量的区别

| | 普通变量 | `this` |
|---|---------|--------|
| 由什么决定 | **定义位置**（词法作用域） | **调用方式**（运行时） |

**找变量看定义位置，找 this 看调用方式。**

### 四条规则（优先级从高到低）

```
new 绑定  >  显式绑定(call/apply/bind)  >  隐式绑定(对象.方法)  >  默认绑定
```

本节只学后两条。

### 规则 1：默认绑定

**函数独立调用**（前面没有 `对象.`，也没有 `new`）：

| 模式 | 非 strict | strict |
|------|-----------|--------|
| 独立调用普通函数 | `this` → 全局对象 | `this` → `undefined` |

### 全局对象是谁？

| 环境 | 全局对象 | 非 strict 独立调用时 |
|------|----------|----------------------|
| 浏览器 | `window` | `this === window` |
| Node.js | `global` | `this === global` |
| `npm run console`（jsdom） | 有 `window`，也有 Node 的 `global` | 行为取决于执行上下文，建议用 `'use strict'` 做实验 |

补充：

- ES Module（`type="module"` / `import`）顶层 `this` 是 `undefined`，与 strict 无关
- 箭头函数没有自己的 `this`（下节详讲）

### 规则 2：隐式绑定

**`对象.方法()` → `this` 指向点号前面的对象。**

```javascript
user.sayHi();  // this 是 user
```

### 隐式丢失

```javascript
const fn = user.sayHi;
fn();  // 独立调用 → 走默认绑定，this 丢失
```

把方法当回调传出去（如 `setTimeout(user.sayHi, 100)`）也会丢 `this`。

---

## 实践

`npm run console` 中完成。

### 练习 1：strict 模式下的默认绑定

```javascript
(function () {
  'use strict';
  function showThis() {
    console.log('strict 模式下 this:', this);
  }
  showThis();
})();
```

**答案：**

```
strict 模式下 this: undefined
```

独立调用 + strict → 默认绑定，`this` 为 `undefined`。

### 练习 2：隐式绑定

```javascript
const user = {
  name: '小明',
  sayHi() {
    console.log('Hi, ' + this.name);
  },
};

user.sayHi();
```

**答案：**

```
Hi, 小明
```

`user.sayHi()` → `this` 指向 `user`。

### 练习 3：隐式丢失

```javascript
const fn = user.sayHi;
fn();
```

**答案：**

```
Hi, undefined
```

（strict 下 `this.name` 为 `undefined`；非 strict 可能读到全局的 `name` 或仍输出 `Hi, undefined`。）

`fn()` 是独立调用 → 走默认绑定，`this` 丢失，不再是 `user`。

### 练习 4（可选）：非 strict 下的全局 this

```javascript
function showThis() {
  console.log('非 strict this === window:', this === window);
}
showThis();
```

**答案（浏览器 / 本项目 jsdom 控制台）：**

```
非 strict this === window: true
```

Node 纯环境（无 jsdom）则是 `this === global`。

---

## 我的笔记

（实验记录写在这里）
