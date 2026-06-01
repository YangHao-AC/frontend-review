# 闭包

> 第 1 周 · 第 2 课 · 第 3 节

## 概念

### 什么是闭包

> **闭包 = 函数 + 它能记住的外部变量。**

内层函数引用了外层函数的变量，且外层函数**已经执行完毕**，那个变量仍被内层函数保留（不会被垃圾回收）。

### 引用链

```
counter  ──指向──▶  内层函数  ──引用──▶  count（存在闭包里）
```

- `counter` 指着内层函数 → 函数不被销毁
- 内层函数引用 `count` → `count` 不被销毁
- 每次调用操作的是**同一份** `count`

### 常见用途

| 场景 | 作用 |
|------|------|
| 私有变量 | 外部无法直接修改 |
| 保存状态 | 计数器、累加器 |
| 防抖 / 节流 | 保存 timer 引用 |
| 回调保留上下文 | 异步、事件处理 |

### 内存注意

闭包本身不是问题。若闭包长期引用大对象且函数一直不释放，可能导致内存无法回收。组件卸载时清掉引用即可。

---

## 实践

`npm run console` 中完成。

### 练习 1：实现计数器

```javascript
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
```

### 练习 2：连续调用

```javascript
const counter = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());
```

**答案：**

```
1
2
3
```

### 练习 3：理解引用链

**问题：** 为什么 `createCounter()` 执行完后，`count` 还在？

**答案：**

返回的内层函数引用了外层的 `count`，`counter` 变量指着这个内层函数，引用链不断 → `count` 不会被垃圾回收，每次调用操作的是同一份 `count`。

---

## 我的笔记

（实验记录写在这里）
