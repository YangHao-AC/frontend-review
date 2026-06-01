# for 循环 + 闭包陷阱（var vs let）

> 第 1 周 · 第 2 课 · 第 4 节

## 概念

### 两阶段执行

`setTimeout` 不会立刻执行回调，所以：

```
阶段 1（同步）：for 循环飞快跑完
阶段 2（异步）：100ms 后回调才执行
```

回调执行时，循环早已结束。它读到的变量，是「执行那一刻」的值。

### var 版：只有一个 i

`var` 挂在**包住 for 的函数**（或全局）上，整个循环共享**同一个** `i`。

```
        i（同一个）
        ↓
   ┌────┼────┐
 回调1 回调2 回调3     执行时 i 已是 3
```

### let 版：每轮一个 j

`for (let j = 0; ...)` 时，**每一轮迭代会创建新的 `j` 绑定**（per-iteration environment），每个回调闭包捕获**当轮**的 `j`。

```
j=0 → 回调1
j=1 → 回调2
j=2 → 回调3
```

### 谁包住了变量？

| | 变量住在哪 | 「墙」是什么 |
|---|-----------|-------------|
| `var i` | 整个外层 function（或全局） | **function**，不是 for |
| `let j` | 每轮迭代各自一个 | **for + let 的迭代环境** |

`for` 并没有用隐藏函数包住 `var`；`var` 直接提升到外层函数顶部。

### 验证 let 不泄漏

```javascript
for (let j = 0; j < 3; j++) {}
console.log(j);  // ReferenceError
```

---

## 实践

`npm run console` 中完成，每次练习等输出后再做下一个。

### 练习 1：var + setTimeout

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log('var:', i);
  }, 100);
}
```

**答案：**

```
var: 3
var: 3
var: 3
```

整个循环只有 1 个 `i`，三个回调共享它；循环结束时 `i === 3`，回调执行时读到的全是 3。

### 练习 2：let + setTimeout

```javascript
for (let j = 0; j < 3; j++) {
  setTimeout(function () {
    console.log('let:', j);
  }, 200);
}
```

**答案：**

```
let: 0
let: 1
let: 2
```

`for (let ...)` 每轮创建新的 `j`，每个回调闭包捕获当轮的值。

### 练习 3：var 与 let 同处 for 中

```javascript
function demo() {
  for (var i = 0; i < 1; i++) {
    for (let j = 0; j < 1; j++) {
      console.log('i in inner:', i);
      console.log('j:', j);
    }
    console.log('j here:', j);
  }
}
demo();
```

**答案：**

```
i in inner: 0
j: 0
ReferenceError: j is not defined
```

`var i` 在函数级，内层能访问；`let j` 出了内层 for 就不能访问。

---

## 我的笔记

（实验记录写在这里）
