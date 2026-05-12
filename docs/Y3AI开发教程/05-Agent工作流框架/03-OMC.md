---
title: OMC
showLastUpdateAuthor: true
sidebar_position: 3
---

# OMC（Oh My ClaudeCode）

OMC 全称是 **Oh My ClaudeCode**，是面向 Claude Code 的 Agent 工作流增强框架。它和 OMX 的理念很接近：把需求澄清、计划、执行、团队协作、验证、知识沉淀等能力封装成可调用的 skill / workflow。

项目地址：

https://github.com/Yeachan-Heo/oh-my-claudecode

## 一、它解决什么问题

Claude Code 本身已经能改代码、运行命令、调用子代理。OMC 主要是在 Claude Code 外面增加一套更明确的流程约束：

- 模糊需求先 `deep-interview`。
- 大任务先 `plan` / `ralplan`。
- 长任务交给 `ralph` 持续推进。
- 多任务用 `team` 或 `ultrawork`。
- 完成前用 `verify` / `ultraqa`。
- 项目知识用 `wiki` / `remember` 沉淀。

## 二、整体架构

OMC 可以理解成四层：

| 层级 | 典型内容 | 作用 |
| --- | --- | --- |
| Skill / workflow 层 | `plan`、`ralph`、`team`、`ultraqa`、`verify` 等 | 用户直接调用的流程入口 |
| Agent 角色层 | analyst、architect、executor、debugger、verifier、writer 等 | 将任务交给不同专业角色 |
| 状态与记忆层 | `.omc/`、wiki、remember、project memory | 记录状态、项目知识和长期经验 |
| Claude Code 集成层 | Claude 原生 team、subagent、plugin、MCP | 借助 Claude Code 的原生能力执行 |

典型链路：

```text
deep-interview
-> plan / ralplan
-> ralph / team
-> ultraqa / verify
-> wiki / remember
```

## 三、常用 skill / workflow

| Skill | 什么时候用 | 主要作用 |
| --- | --- | --- |
| `deep-interview` | 需求不清楚时 | 通过连续追问澄清目标、边界和验收标准 |
| `plan` | 需要制定执行方案时 | 生成任务顺序、风险和验证方式 |
| `ralplan` | 想在执行前做更稳的计划时 | 常作为 `ralph` / `team` 前置门槛 |
| `ralph` | 想让 Agent 持续做到完成时 | 自引用循环，直到完成并通过验证 |
| `team` | 多个任务可并行时 | 使用 Claude Code 原生团队能力分工协作 |
| `ultrawork` | 大量独立任务需要高吞吐执行时 | 并行执行多个任务 |
| `ultraqa` | 构建、测试、lint、typecheck 失败时 | QA 循环：测试、诊断、修复、再测 |
| `verify` | 准备声明完成前 | 证明修改真的有效 |
| `debug` | 当前会话或项目状态异常时 | 从日志、状态、复现路径分析问题 |
| `ai-slop-cleaner` | AI 生成代码太臃肿时 | 清理冗余、重复、过度抽象 |
| `ask` / `ccg` | 需要外部模型观点时 | 调用 Claude / Codex / Gemini 等顾问并综合 |
| `wiki` | 想沉淀长期项目知识时 | 建立可检索项目知识库 |
| `remember` | 当前会话里出现可复用经验时 | 判断哪些内容应进入长期记忆 |
| `skillify` | 当前流程未来会重复使用时 | 把流程沉淀成新 skill 草稿 |
| `mcp-setup` | 需要配置常见 MCP Server 时 | 协助配置 MCP |
| `omc-setup` / `omc-doctor` | 安装、升级或诊断 OMC 时 | 管理 OMC 自身环境 |

OMC 还有一组 agent 角色，例如 `analyst`、`architect`、`executor`、`debugger`、`verifier`、`writer`、`security-reviewer` 等。它们不是用户每次都要手动选的 skill，而是 workflow 在合适阶段调用的专业角色。

## 四、实际开发时怎么选

### 1. 想法还很粗糙

推荐：

```text
deep-interview -> ralplan
```

先不要直接 `ralph`。模糊任务进入执行循环，容易做偏。

### 2. 已经明确要做什么

推荐：

```text
plan -> ralph
```

如果任务很小，也可以不使用完整工作流；但只要涉及多文件、多步骤，就建议先 plan。

### 3. 多人/多任务并行

推荐：

```text
ralplan -> team
```

适合 UI、后端、测试、文档等互相独立的任务。  
如果所有任务都改同一处逻辑，team 反而容易冲突。

### 4. 构建或测试失败

推荐：

```text
ultraqa
```

`ultraqa` 的重点是循环验证：失败、诊断、修复、再跑，直到达到目标或触发停止条件。

### 5. 想整理项目经验

推荐：

```text
remember -> wiki
```

`remember` 更像筛选器，判断哪些经验值得长期保存；`wiki` 更像项目知识库。

## 五、skill 之间有没有前后关系

有。OMC 的常见流程关系如下：

```text
deep-interview -> plan / ralplan -> ralph
```

适合从模糊需求到完整实现。

```text
ralplan -> team -> ultraqa -> verify
```

适合多任务并行开发后做统一质量验证。

```text
debug -> plan -> ralph
```

适合先查问题，再做修复。

```text
ralph -> verify -> ai-slop-cleaner
```

适合实现后确认有效，再清理 AI 生成痕迹。

```text
remember -> wiki
```

适合把会话中的有效经验沉淀到长期知识库。

## 六、和 superpowers、OMX 的区别

| 框架 | 更适合 | 特点 |
| --- | --- | --- |
| superpowers | Claude Code 新手 | 以软件开发方法论为主，流程清晰、上手简单 |
| OMX | Codex 用户 | 更偏 Codex runtime、团队协作、状态管理 |
| OMC | Claude Code 用户 | 更贴合 Claude Code 原生 team、agent、plugin 生态 |

如果你主要使用 Claude Code，并且希望比 superpowers 有更多模式、团队协作和项目记忆能力，可以考虑 OMC。
