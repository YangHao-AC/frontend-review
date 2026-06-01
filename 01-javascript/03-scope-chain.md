# 作用域链

> 第 1 周 · 第 2 课 · 第 2 节

## 概念

### 什么是作用域链

**找变量时的「由近到远」路径。**

1. 先在当前作用域找
2. 找不到，去外层找
3. 一直找到全局
4. 还没有 → `ReferenceError`

### 例子

```javascript
var name = '全局';

function outer() {
  var name = '外层';

  function inner() {
    console.log(name);  // inner 没有 → 去 outer 找 → '外层'
  }

  inner();
}
```

**规则：离得最近的优先。** 内层有同名变量就用内层的，不会继续往外找。

---

## 实践

`npm run console` 中完成。

### 练习 1

```javascript
var color = 'red';

function paint() {
  var color = 'blue';

  function showColor() {
    console.log(color);
  }

  showColor();
}

paint();
```

**答案：**

```
blue
```

`showColor` 里没有 `color` → 去 `paint` 里找 → 找到 `'blue'`，不会继续找全局的 `'red'`。

### 练习 2（可选）

删掉 `paint` 里的 `var color = 'blue'`，再调用 `paint()`：

```javascript
var color = 'red';

function paint() {
  function showColor() {
    console.log(color);
  }

  showColor();
}

paint();
```

**答案：**

```
red
```

内层没有 → 继续往外 → 全局找到 `'red'`。

---

## 我的笔记

（实验记录写在这里）
