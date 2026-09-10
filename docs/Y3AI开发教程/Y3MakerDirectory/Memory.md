---
slug: /ai/y3maker-directory/memory
title: memory：项目记忆
sidebar_position: 4
showLastUpdateAuthor: true
---

# memory：项目记忆

`memory/` 保存项目进展、决策和排错经验，供后续会话读取。

<span id="三类记录的区别" className="legacy-anchor" />

## 三类记录的区别 {#record-types}

| 路径 | 内容 |
| --- | --- |
| `Memory.md` | 项目阶段、重要决策、稳定约定与关键待办 |
| `sessions/`（使用后可能生成） | 单次会话的改动、验证与下一步 |
| `lua-issues/` | 错误现象、原因、修正方式与来源 |

格式和归档要求见 `rules/memory.mdc`。会话总结可能命名为 `report.md`，以当前规则和已有记录为准。

<span id="memorymd快速恢复项目背景" className="legacy-anchor" />

## Memory.md：快速恢复项目背景 {#project-background}

新会话先读项目概况，再查代码。这里只保留影响后续工作的结论，例如“背包由服务模块管理，UI 通过事件更新”；操作细节放入会话总结。

初始文件可能保留来源工程的名称和进度，首次使用时应核实并更新，不能沿用其“已完成”状态。

<span id="sessions交接一次任务" className="legacy-anchor" />

## sessions：交接一次任务 {#session-handoff}

| 内容 | 应写清什么 |
| --- | --- |
| 目标与结果 | 本次解决了什么，哪些仍未完成 |
| 变更位置 | 涉及的模块、文件、UI 节点或物编对象 |
| 验证 | 实际执行的检查、测试结果及未覆盖范围 |
| 后续工作 | 下一步动作、阻塞原因和需要核实的问题 |

继续任务前，对照当前文件与版本核实总结是否仍有效。

<span id="lua-issues区分-api-用错与运行时报错" className="legacy-anchor" />

## lua-issues：区分 API 用错与运行时报错 {#lua-issues}

`api_issues.md` 收集接口不存在、参数和路径格式错误；`trace_issues.md` 收集运行时报错与堆栈问题。

每条记录写清**现象、原因、修正方式、来源与适用范围**。例如，UI 查询混用 UID 与路径时，可先查 API 错题集，再按当前 Lua 库核实。

<span id="怎样保持记忆可靠" className="legacy-anchor" />

## 怎样保持记忆可靠 {#reliable-memory}

任务结束时按实际结果更新记录，区分“已验证”“推测”和“待办”；新结论替代旧结论时，更新原段落或标记失效。

更新或迁移前备份记忆，迁移后确认 Agent 能找到并读取文件。
