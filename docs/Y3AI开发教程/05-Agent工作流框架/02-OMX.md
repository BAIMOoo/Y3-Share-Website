---
title: OMX
showLastUpdateAuthor: true
sidebar_position: 2
---

# OMX（Oh My Codex）

OMX 全称是 **Oh My Codex**，是面向 Codex 的 Agent 工作流增强框架。它把常见开发流程封装成一组 skill / workflow，例如需求澄清、计划、持久执行、团队协作、QA 循环、代码评审和知识沉淀。

项目地址：

https://github.com/Yeachan-Heo/oh-my-codex

## 一、它解决什么问题

Codex 本身已经能读代码、改代码、运行命令。OMX 主要解决的是“让 Codex 更像一个有流程的开发团队”：

- 模糊需求先澄清，不急着实现。
- 复杂需求先规划，再执行。
- 长任务可以进入持久循环，不轻易半途停止。
- 多个任务可以拆给多个 worker 并行处理。
- 修改完成后要验证、评审、记录。

## 二、整体架构

OMX 可以理解成四层：

| 层级 | 典型内容 | 作用 |
| --- | --- | --- |
| Skill / workflow 层 | `$plan`、`$ralph`、`$team`、`$ultraqa` 等 | 用户直接调用的工作流入口 |
| Agent / role 层 | executor、architect、verifier、debugger 等 | 把不同任务交给不同角色 |
| Runtime / state 层 | `.omx/state`、`.omx/plans`、`.omx/logs` 等 | 记录计划、状态、日志和长期记忆 |
| Shell / tmux / helper 层 | team、hud、question、sparkshell 等 | 支持多进程协作、状态显示和受控命令执行 |

典型的复杂任务链路：

```text
$deep-interview 或 $plan
-> $ralplan
-> $ralph 或 $team
-> $ultraqa / $code-review
-> $wiki / $note
```

## 三、常用 skill / workflow

| Skill | 什么时候用 | 主要作用 |
| --- | --- | --- |
| `$deep-interview` | 需求很模糊、边界不清时 | 通过苏格拉底式提问澄清目标、限制和验收标准 |
| `$plan` | 需要先形成计划时 | 输出任务顺序、风险、验证方式 |
| `$ralplan` | 需要更稳的计划或共识计划时 | 通常作为 Ralph 前的计划门槛 |
| `$ralph` | 希望一个任务持续执行到完成时 | 进入持久执行 / 验证循环 |
| `$team` | 任务可拆成多个并行 lane 时 | 用多 agent / worker 协作处理 |
| `$ultrawork` | 有大量相对独立任务时 | 高吞吐并行执行 |
| `$ultraqa` | 主要目标是测试、构建、lint 通过时 | 反复运行验证、诊断、修复，直到目标达成或停止条件触发 |
| `$analyze` | 只想查原因，不想改代码时 | 做只读深度分析，给出证据和置信度 |
| `$code-review` | 代码改完后想系统评审 | 从正确性、维护性、风险等角度审查 |
| `$ai-slop-cleaner` | 想清理 AI 生成痕迹和冗余代码时 | 删除优先、复用优先、减少胶水代码 |
| `$visual-verdict` | UI / 截图对比类任务 | 做结构化视觉 QA |
| `$web-clone` | 需要按 URL 克隆页面视觉与交互 | 结合视觉验证迭代实现 |
| `$wiki` / `$note` | 想沉淀项目知识 | 把可复用事实、经验和决策写入长期记忆 |
| `$doctor` / `$omx-setup` | OMX 自身出问题或需要安装配置时 | 诊断和修复 OMX 环境 |

## 四、实际开发时怎么选

### 1. 需求还不清楚

推荐：

```text
$deep-interview -> $ralplan
```

不要直接进入 `$ralph` 或 `$team`。先让需求变清楚。

### 2. 需求清楚，但实现路径复杂

推荐：

```text
$plan 或 $ralplan -> $ralph
```

`$plan` 解决“怎么做”，`$ralph` 解决“持续做到完成并验证”。

### 3. 任务可以拆成多个并行部分

推荐：

```text
$ralplan -> $team
```

例如同时要改文档、修构建、补测试、调整页面结构，就适合 team。  
如果所有任务都要改同一个文件，反而不适合并行。

### 4. 只想查原因，不想动代码

推荐：

```text
$analyze
```

例如“为什么构建失败”“为什么 omx question 不可用”。这类问题先分析，不要直接修。

### 5. 代码已经改完，需要确认质量

推荐：

```text
$ultraqa -> $code-review
```

如果只是验证测试/构建，先 `$ultraqa`。如果要看设计和维护性，再 `$code-review`。

## 五、skill 之间有没有前后关系

有。OMX 的核心不是单个 skill，而是“先澄清、再计划、再执行、再验证”的流程。

常见流程：

```text
$deep-interview -> $ralplan -> $ralph
```

适合模糊需求到完整实现。

```text
$ralplan -> $team -> $ultraqa
```

适合复杂并行任务。

```text
$analyze -> $plan -> $ralph
```

适合先查原因，再制定修复方案，再执行。

```text
$ralph -> $code-review -> $ai-slop-cleaner
```

适合实现后做评审和清理。

## 六、在 Y3 项目中的建议用法

- 配置文档、教程结构调整：`$plan` 或直接手动编辑即可，复杂时用 `$ralph`。
- 大规模文档重构：`$ralplan -> $team -> $ultraqa`。
- Y3 MCP Server 连接失败：先 `$analyze`，再决定是否修配置。
- AI 生成代码太啰嗦：`$ai-slop-cleaner`。
- 需要沉淀项目经验：`$wiki` 或 `$note`。

如果你主要使用 Codex，并且想要更强的长期执行、验证和团队协作能力，OMX 比 superpowers 更适合复杂项目。
