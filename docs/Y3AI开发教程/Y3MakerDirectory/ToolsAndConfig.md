---
slug: /ai/y3maker-directory/tools-config
title: tools 与配置文件
sidebar_position: 6
showLastUpdateAuthor: true
---

# tools 与配置文件

`tools/` 保存本地辅助脚本；根目录 JSON 配置 MCP 连接和开发文档输出。

<span id="tools本地辅助脚本" className="legacy-anchor" />

## tools：本地辅助脚本 {#local-tools}

| 文件 | 用途 | 阅读重点 |
| --- | --- | --- |
| `draw_grid.py` | 在图片上绘制坐标网格和标签 | 文件开头的用法、输入路径、输出路径、网格间距和偏移选项 |
| `screenshot_with_cursor.py` | 截取带实际鼠标指针的屏幕画面 | 输出路径、Windows 截图实现与所需 Python 库 |

运行前确认 Python 及依赖可用。`draw_grid.py` 默认可能覆盖原图，需保留时指定独立输出路径。

脚本从本地终端运行，不会自动注册为 MCP 工具。

<span id="mcp_settingsjson连接哪些服务" className="legacy-anchor" />

## mcp_settings.json：连接哪些服务 {#mcp-settings}

`mcpServers` 按服务名保存连接配置：

| 服务 | 默认地址 | 对应进程 |
| --- | --- | --- |
| `y3-helper` | `http://127.0.0.1:8766/mcp` | VS Code 中的 Y3 开发助手 |
| `y3editor` | `http://127.0.0.1:8765/mcp` | Y3 编辑器 |
| `y3runtime` | `http://127.0.0.1:8767/mcp` | 运行中的游戏 |

字段含义如下，支持方式以客户端版本为准：

| 字段 | 用途 |
| --- | --- |
| `type` | 连接类型，当前示例为 `streamableHttp` |
| `url` | 服务连接地址 |
| `headers` | 连接时附带的请求头 |
| `timeout` | 请求超时配置 |
| `autoApprove` | 客户端工具调用审批相关选项 |
| `disabled` | 是否禁用该服务配置 |

配置后仍需启动对应服务；多开时核对端口归属，游戏未运行时运行时服务可能不可用。详见[Y3 MCP 工具介绍](../Tools.md)。

外部 Agent 的格式和作用域可能不同，按[接入教程](../03-Agent部署教程/MCP接入.md)迁移。

<span id="spec-configjson开发文档生成到哪里" className="legacy-anchor" />

## spec-config.json：开发文档生成到哪里 {#spec-config}

| 配置项 | 作用 |
| --- | --- |
| `gameName` | 用于生成文档名称的游戏名 |
| `paths` | 设计案、执行案、测试案、Markdown 报告和 HTML 报告的输出目录 |
| `fileNames` | 各类文件的命名模板 |
| `htmlReport.autoOpen` | 是否在生成 HTML 报告后自动打开 |
| `svn.autoUpload` | 是否启用报告自动提交 SVN 的相关流程配置 |
| `svn.commitMessage` | 该流程使用的提交说明模板 |

`fileNames` 中的 `{gameName}`、`{timestamp}` 由流程替换。例如游戏名为“塔防”时，`{gameName}设计案.md` 生成 `塔防设计案.md`。

当前配置将设计案、执行案、测试案和 Markdown 报告输出到 `openspec/docs/`，HTML 报告输出到 `openspec/reports/`，由执行流程解析路径并生成文件。

改配置不会搬迁旧文档或自动生成报告；调整后核对输出与文档引用。SVN 选项依赖工具和工作副本，配置本身不代表已提交。

`_comment` 字段是配置说明字符串，不是 JSON 注释语法。

<span id="版本管理与运行生成文件" className="legacy-anchor" />

## 版本管理与运行生成文件 {#version-control}

| 文件或目录 | 用途 |
| --- | --- |
| `.git/`（如有） | 配置库的 Git 版本信息 |
| `.gitignore` | 指定 Git 应忽略的文件模式 |
| `.gitattributes` | 指定文本、换行等版本管理属性 |
| `env_setup_done`（如有） | 环境流程记录的完成标记 |
| `.luals-log/`、`__pycache__/`（如有） | Lua 语言服务日志或 Python 运行缓存 |

这些文件通常无需阅读。`env_setup_done` 只记录曾完成检查；换电脑、升级或遇到问题时仍需核实环境。
