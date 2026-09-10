---
title: Claude Code VS Code扩展
slug: /ai/claude-code-vscode
showLastUpdateAuthor: true
sidebar_position: 4
pagination_next: Y3AI开发教程/Agent部署教程/CC Switch安装与使用
---
<span id="claude-code-for-vscode-简介"></span>
<span id="环境需求"></span>
<span id="一安装nodejs"></span>
<span id="方法1使用官方安装包推荐"></span>
<span id="方法2"></span>
<span id="二安装claude-code"></span>
<span id="三api令牌获取配置"></span>
<span id="四配置claude-code"></span>
<span id="五vscode下载安装"></span>
<span id="六启动claude-code"></span>
<span id="4-进入-y3-开发"></span>

在 VS Code 面板中使用 Claude Code，无需单独安装 CLI。Y3 项目环境见[准备 Y3 项目](../../EnvironmentSetup.md)配置。

<span id="1-安装扩展" className="legacy-anchor" />

## 1. 安装扩展 {#install-extension}

[![VS Code 下载页：① Windows，② User Installer 的 x64 或 Arm64](../img/vscode-download.png)](../img/vscode-download.png "点击查看原图")

1. 安装或更新 [VS Code](https://code.visualstudio.com/download)，按 `Ctrl+Shift+X` 打开扩展面板。
2. 搜索 `Claude Code`，核对发布者 **Anthropic**、标识 `anthropic.claude-code`。
3. 点击“安装”，按提示重新加载窗口。

[![Anthropic 发布的扩展](../../Y3_AI_images/image25.png)](../../Y3_AI_images/image25.png "点击查看原图")

<span id="2-打开扩展面板" className="legacy-anchor" />

## 2. 打开扩展面板 {#open-extension}

1. 用 VS Code 打开自己的工程和一个文件。
2. 点击编辑器右上角的 Claude 图标；找不到时，按 `Ctrl+Shift+P` 搜索 Claude Code 入口。

[![Claude Code 面板入口](../../Y3_AI_images/image24.png)](../../Y3_AI_images/image24.png "点击查看原图")

能打开面板即安装成功。在终端执行 `claude` 或 `claude mcp add` 需安装[独立 CLI](<./Claude Code CLI部署教程.md>)。

<span id="下一步" className="legacy-anchor" />

## 下一步 {#next-steps}

前往 [Codex/Claude 模型配置](<../CC Switch安装与使用.md>)，配置模型服务并验证连接。

来源：[官方 VS Code 教程](https://code.claude.com/docs/en/vs-code)，核对于 2026-09-08；安装时以扩展的 VS Code 兼容提示为准。
