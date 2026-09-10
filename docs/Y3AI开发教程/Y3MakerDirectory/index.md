---
title: .y3maker 目录与文档说明
sidebar_label: 目录概览
sidebar_position: 0
slug: /Y3AI开发教程/Y3MakerDirectory
showLastUpdateAuthor: true
---

# .y3maker 目录与文档说明

初始化 Y3 工程后，根目录的 `.y3maker/` 保存 AI 开发所需的知识、规则、流程和配置。游戏脚本位置见[工程与 Lua 目录结构参考](../LuaReference.md)。

本组文档依据本机 `y3-maker-config`，文件以工程实际版本为准；配置库路径均相对于 `.y3maker/`。

## 目录总览

```text
工程根目录/
├─ header.project
├─ .y3maker/
│  ├─ knowledge/          Y3 知识库
│  ├─ rules/              开发规则
│  ├─ skills/             可复用的任务流程
│  ├─ memory/             项目记忆与问题记录
│  ├─ templates/          可复用的功能模板
│  ├─ tools/              本地辅助脚本
│  ├─ mcp_settings.json   MCP 服务连接配置
│  └─ spec-config.json    开发流程文档配置
└─ maps/                  地图数据与脚本
```

## 按目录深入阅读

| 子文档 | 查阅内容 |
| --- | --- |
| [knowledge：知识库文档](./Knowledge.md) | 核心系统、物编、UI 的功能与字段规范 |
| [rules：开发规则](./Rules.md) | `.mdc` 规则的职责、适用条件与维护方式 |
| [skills：技能与配套资料](./Skills.md) | 任务流程、参考文档、脚本和示例 |
| [memory：项目记忆](./Memory.md) | 项目进展、会话交接与 Lua 错题集 |
| [templates：功能模板](./Templates.md) | 模板等级、依赖与接入方式 |
| [tools 与配置文件](./ToolsAndConfig.md) | 辅助脚本、MCP 连接与文档输出配置 |

## 它们怎样配合

制作背包时，从 **knowledge** 查物品和 UI 规范，按 **rules** 和 **skills** 开发，按需复用 **templates**、调用辅助脚本及 MCP，最后将结果写入 **memory**。按任务查阅即可，无需一次读完。

外部 Agent 按[接入教程](../03-Agent部署教程/MCP接入.md)迁移并确认文档已加载；MCP 连通不代表加载成功。旧 `.codemaker` 路径按当前工程和迁移结果定位，更新前备份自定义规则与记忆。
