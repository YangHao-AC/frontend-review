# 闭包、作用域、this 绑定

> 第 1 周 · 第 2 课

## 1. 作用域

### 三种作用域

| 关键字 | 作用范围 | 备注 |
|--------|----------|------|
| `var` | 整个函数 | 没有块级，if 里声明外面也能访问 |
| `let` | 当前{}块 | 出了块就报错 ReferenceError |
| `const` | 同 let | 不能重新赋值 |

作用域链：内层找变量时，从当前作用域向外层一层层找，直到全局。

### 我的实验记录

（把控制台输出和报错贴在这里）

---

## 2. 闭包
闭包：内层函数引用外层变量，外层执行完毕后变量仍被保留。
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

---

## 3. this 绑定

（后面再填）

---

## 4. 易错题

（后面再填）
