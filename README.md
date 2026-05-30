# 前端跳槽复习

> 目标：系统复习 + 可检索笔记 + 面试前快速过一遍

## 怎么用

1. 每个主题一个文件夹，在里面写 `.md` 笔记或放代码示例
2. 文件名建议：`01-xxx.md`，方便按顺序复习
3. 每学完一个主题，在下方 checklist 打勾

## 复习路线（建议 4 周）

### 第 1 周：JavaScript 基础（必考）

- [ ] 原型链 / 继承 / `new` 做了什么
- [ ] 闭包、作用域、this 绑定规则
- [ ] Event Loop（宏任务 / 微任务）
- [ ] Promise / async-await / 手写 Promise
- [ ] 深浅拷贝、类型判断
- [ ] ES6+：解构、模块化、Proxy、WeakMap

→ 笔记目录：`01-javascript/`

### 第 2 周：浏览器 & 网络

- [ ] 从输入 URL 到页面展示（完整链路）
- [ ] 渲染流程：DOM → CSSOM → Layout → Paint → Composite
- [ ] 重排 / 重绘 / 合成层优化
- [ ] HTTP 缓存（强缓存 vs 协商缓存）
- [ ] HTTPS、跨域（CORS / 预检请求）
- [ ] Cookie / Session / Token / JWT

→ 笔记目录：`02-browser-network/`

### 第 3 周：框架 & 工程化

- [ ] React：虚拟 DOM、Diff、Hooks 原理、状态管理
- [ ] Vue：响应式（Proxy）、Composition API、生命周期
- [ ] 构建工具：Webpack vs Vite（可参考同仓库 `vite-demo` / `webpack-demo`）
- [ ] 包管理：npm / pnpm / monorepo 基础
- [ ] CI/CD、Git 工作流

→ 笔记目录：`03-framework-engineering/`

### 第 4 周：算法 + 项目 + 软技能

- [ ] 手写题：防抖 / 节流 / 深拷贝 / 扁平化 / 发布订阅
- [ ] LeetCode 热题：数组、链表、二叉树、双指针
- [ ] 准备 2～3 个项目的 STAR 描述（难点、方案、结果）
- [ ] 常见系统设计：前端监控、权限、微前端、性能优化

→ 笔记目录：`04-algorithm-interview/`

## 目录结构

```
frontend-review/
├── 01-javascript/           # JS 基础 & 手写题
├── 02-browser-network/      # 浏览器原理 & 网络
├── 03-framework-engineering/ # 框架 & 工程化
├── 04-algorithm-interview/  # 算法 & 面试题
└── cheatsheet/              # 面试前 30 分钟速查
```

## 面试前速查清单

- [ ] 能白板讲清楚 Event Loop
- [ ] 能手写防抖 / 节流 / Promise.all
- [ ] 能讲一个你主导的技术方案（STAR）
- [ ] 能解释最近项目里一个性能优化点
- [ ] 准备好「为什么离职」「期望薪资」的回答

---

**开始写第一篇笔记吧** → 打开 `01-javascript/`，新建 `01-prototype-chain.md`
