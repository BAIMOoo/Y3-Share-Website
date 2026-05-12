---
title: superpowers
showLastUpdateAuthor: true
sidebar_position: 1
---

# superpowers

superpowers 是一套面向 Coding Agent 的软件开发方法论。它不是模型，也不是单个命令，而是一组可组合的 skill，加上一套要求 Agent 在合适时机主动调用 skill 的工作流约束。

项目地址：

https://github.com/obra/superpowers

## 一、它解决什么问题

没有工作流框架时，Agent 很容易直接开始写代码，常见问题是：

- 需求没有问清楚就实现。
- 没有设计文档，后续很难判断是否偏题。
- 没有任务拆分，复杂需求做到一半就乱。
- 没有测试和验收，Agent 容易过早宣布完成。

superpowers 的思路是：把软件开发拆成几个固定阶段，让 Agent 先理解需求，再写设计，再写计划，再执行，再验证。

## 二、整体架构

superpowers 的核心结构可以理解成三层：

| 层级 | 内容 | 作用 |
| --- | --- | --- |
| 入口规则 | `using-superpowers` | 要求 Agent 在回答或行动前先检查是否有适用 skill |
| 开发流程 skill | brainstorming、writing-plans、executing-plans、subagent-driven-development 等 | 把需求从想法推进到设计、计划和实现 |
| 质量保障 skill | test-driven-development、systematic-debugging、requesting-code-review、verification-before-completion 等 | 用测试、调试、评审和验证减少幻觉式完成 |

它的典型流程是：

```text
using-superpowers
-> brainstorming
-> writing-plans
-> executing-plans / subagent-driven-development
-> test-driven-development
-> requesting-code-review
-> verification-before-completion
```

不是每次都要完整走完全部流程。简单问题可以只触发其中一两个 skill；复杂功能开发才建议走完整链路。

## 三、主要 skill 能力

| Skill | 什么时候用 | 主要作用 |
| --- | --- | --- |
| `using-superpowers` | 会话开始或任何任务开始前 | 让 Agent 先判断是否有 skill 适用，避免直接裸跑 |
| `brainstorming` | 新功能、改行为、做设计前 | 先问清目标、约束和验收标准，再形成设计 |
| `writing-plans` | 已经有 spec / 需求，需要落地前 | 把设计拆成可执行任务，强调 TDD、YAGNI、DRY |
| `executing-plans` | 已经有计划，准备实现时 | 按计划逐步执行，并在关键节点复核 |
| `subagent-driven-development` | 计划中存在多个相对独立任务时 | 用子代理并行执行，实现后做检查 |
| `dispatching-parallel-agents` | 有 2 个以上互不阻塞的任务时 | 并行分派，节省时间 |
| `test-driven-development` | 写新功能或修 bug 前 | 先写失败测试，再实现，再让测试通过 |
| `systematic-debugging` | 出现 bug、测试失败、行为异常时 | 先定位根因，避免凭感觉乱改 |
| `requesting-code-review` | 完成重要功能或准备合并前 | 请求评审，检查需求、质量和边界 |
| `receiving-code-review` | 收到评审意见后 | 先判断反馈是否合理，再修改 |
| `verification-before-completion` | 准备说“完成”前 | 必须跑验证命令并读取输出 |
| `using-git-worktrees` | 需要隔离开发环境时 | 用 worktree 或独立工作区避免污染当前分支 |
| `finishing-a-development-branch` | 实现完成后 | 决定合并、PR、清理或继续迭代 |
| `writing-skills` | 想把重复流程沉淀成新 skill 时 | 指导如何写可复用 skill |

## 四、实际开发时怎么选 skill

### 1. 只有一个模糊想法

例如：“我想做一个幸存者肉鸽玩法。”

推荐流程：

```text
brainstorming -> writing-plans -> executing-plans
```

先不要让 Agent 写代码。先用 `brainstorming` 把玩法、范围、限制和验收标准聊清楚。

### 2. 已经有设计文档

例如：你已经写好了 `design/幸存者肉鸽游戏设计.md`。

推荐流程：

```text
writing-plans -> executing-plans -> verification-before-completion
```

这时不需要从零头脑风暴，可以直接让 Agent 读设计文档并拆任务。

### 3. 修 bug

推荐流程：

```text
systematic-debugging -> test-driven-development -> verification-before-completion
```

不要直接让 Agent “修一下”。先定位根因，再补测试，最后验证。

### 4. 多个独立任务

例如：同时要改 UI、补数据结构、写测试。

推荐流程：

```text
writing-plans -> dispatching-parallel-agents / subagent-driven-development -> requesting-code-review
```

前提是任务之间没有强依赖。如果任务互相影响很大，先拆成顺序计划更安全。

## 五、skill 之间有没有前后关系

有，而且 superpowers 的特点就是前后关系比较明确。

常见强顺序：

```text
brainstorming -> writing-plans -> executing-plans
```

常见质量闭环：

```text
test-driven-development -> requesting-code-review -> verification-before-completion
```

常见问题修复闭环：

```text
systematic-debugging -> test-driven-development -> verification-before-completion
```

可以理解为：

- `brainstorming` 负责“想清楚要做什么”。
- `writing-plans` 负责“拆成怎么做”。
- `executing-plans` / `subagent-driven-development` 负责“开始做”。
- `requesting-code-review` / `verification-before-completion` 负责“确认真的做对”。

## 六、适合 Y3 开发的使用方式

Y3 项目里，superpowers 很适合用在“从玩法想法到代码实现”的前半段：

1. 先把粗略玩法想法写到 `design/` 目录。
2. 让 Agent 用 `brainstorming` 补全规则、边界和验收标准。
3. 用 `writing-plans` 拆成小任务。
4. 用 `executing-plans` 或 `subagent-driven-development` 实现。
5. 最后结合 Y3 MCP Server 运行游戏、看日志、修 bug。

如果你只用 Claude Code，并且刚开始接触 Agent 工作流，superpowers 是最容易上手的一种选择。
