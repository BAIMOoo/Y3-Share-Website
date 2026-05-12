---
title: Windows 分支
showLastUpdateAuthor: true
sidebar_position: 1
---

# Windows 分支

这条分支适合大多数 Windows 10 / Windows 11 用户。OpenAI 官方文档说明，Codex CLI 可以在 Windows 上原生运行；如果你需要 Linux 原生环境，也可以改走 WSL 分支。

## 一、先确认 Windows 版本

1. 按下键盘上的 `Win + R`。
2. 输入：

```text
winver
```

3. 点击“确定”。
4. 记下弹窗中的 Windows 版本。

如果是 Windows 10，建议先安装 Windows Terminal。  
如果是 Windows 11，通常已经内置 Windows Terminal。

## 二、Windows 11：打开项目目录中的终端

更常用的方式是直接在项目目录中打开终端：

1. 在资源管理器中打开你的 Y3 项目文件夹。
2. 在文件夹空白处点击鼠标右键。
3. 点击 `Open in Terminal`、`在终端中打开` 或 `在此打开终端`。
4. 如果弹出命令行窗口，并且当前路径就是你的项目目录，说明终端已经可用。

也可以用下面几种方式打开：

- 点击开始菜单，搜索“Terminal”或“终端”，找到 Windows Terminal 后打开。
- 在资源管理器地址栏中输入 `wt`，然后按回车。
- 按 `Win + R`，输入 `wt`，然后按回车。

## 三、Windows 10：推荐先安装 Windows Terminal

Windows 10 自带的 `cmd` 和 PowerShell 也能用，但对零基础用户来说，Windows Terminal 的体验更统一，推荐先安装。

推荐安装地址：

https://github.com/microsoft/terminal

安装步骤：

1. 先查看电脑架构：按 `Win + R`，输入 `msinfo32`，点击“确定”。
2. 在“系统信息”窗口中找到“系统类型”。
3. 如果显示 `基于 x64 的电脑`，后面下载 x64 安装包；如果显示 `基于 ARM64 的电脑`，后面下载 ARM64 安装包。
4. 打开浏览器，访问上面的 GitHub 地址。
5. 进入项目页面后，点击 `Releases`。
6. 找到最新的稳定版本。
7. 在 Assets / 资产列表中下载适合自己电脑架构的安装包，通常名字里会带有 `x64`、`arm64` 或 `msixbundle`。
8. 下载完成后，双击安装包。
9. 安装完成后，点击开始菜单，搜索“Windows Terminal”并打开。

## 四、安装 Node.js

Codex CLI 可以通过 npm 安装，因此需要 Node.js。

1. 打开浏览器，访问：

```text
https://nodejs.org/
```

2. 下载 LTS 版本。
3. 双击下载的安装包。
4. 一路点击“Next”。
5. 如果看到“Add to PATH”之类的选项，保持默认勾选。
6. 点击“Install”完成安装。
7. 安装完成后，关闭所有已经打开的终端窗口。
8. 重新打开 Windows Terminal。

验证安装：

```bash
node --version
npm --version
```

如果两条命令都能输出版本号，说明安装成功。

## 五、安装 Codex CLI

在 Windows Terminal 中执行：

```bash
npm install -g @openai/codex@latest
```

安装完成后验证：

```bash
codex --version
```

如果能看到版本号，说明 Codex CLI 安装成功。

以后需要更新 Codex CLI 时，可以重新执行：

```bash
npm install -g @openai/codex@latest
```

## 下一步

继续阅读 [模型配置](./03-模型配置.md)。
