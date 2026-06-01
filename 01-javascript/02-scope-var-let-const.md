# 作用域：var / let / const

> 第 1 周 · 第 2 课 · 第 1 节

## 概念

### 什么是作用域

**作用域 = 变量在哪些地方能被访问。**

- 内层可以访问外层
- 外层不能访问内层

### 三种声明方式

| 关键字 | 作用范围 | 可重复声明 | 暂时性死区 |
|--------|----------|------------|------------|
| `var` | 整个**函数**（无块级） | ✅ | ❌ |
| `let` | 当前 `{ }` **块** | ❌ | ✅ |
| `const` | 同 `let` | ❌ | ✅ |

### 关键区别

```javascript
if (true) {
  var a = 1;   // 出了 if 还能访问
  let b = 2;   // 出了 if 就 ReferenceError
}
```

**`var` 的「函数作用域」**：变量挂在**包住这段代码的函数**（或全局）上，`for`、`if` 的 `{ }` 挡不住它。

**`let` 的「块级作用域」**：变量被 `{ }` 块包住，出了块就不能访问。

---

## 实践

`npm run console` 中完成。

### 练习 1：感受 let 的块级作用域

```javascript
function outer() {
  var b = 2;

  if (true) {
    let c = 3;
    console.log('块里面 c =', c);
  }

  console.log('块外面 b =', b);
}

outer();
```

**答案：**

```
块里面 c = 3
块外面 b = 2
```

### 练习 2：证明 c 出了块就访问不了

在练习 1 的 `outer` 里，`console.log('块外面 b =', b);` 下面加一行：

```javascript
console.log(c);
```

**答案：**

```
ReferenceError: c is not defined
```

`let` 只在 `if { }` 块内有效，出了块就访问不了。

### 练习 3：对比 var

把练习 1 里的 `let c = 3` 改成 `var c = 3`，块外再访问 `c`：

```javascript
function outer() {
  var b = 2;

  if (true) {
    var c = 3;
    console.log('块里面 c =', c);
  }

  console.log('块外面 b =', b);
  console.log('块外面 c =', c);
}

outer();
```

**答案：**

```
块里面 c = 3
块外面 b = 2
块外面 c = 3
```

`var` 没有块级作用域，整个函数内都能访问。

---

## 我的笔记

（实验记录写在这里）
