---
title: WSL 分支
showLastUpdateAuthor: true
sidebar_position: 2
---

# WSL 分支

如果你已经在“先选择安装分支”中决定使用 WSL，可以从这里开始操作。WSL 更接近 Linux 开发环境，也更适合经常使用开源 Agent 工具链的用户。

:::warning WSL 网络版本要求
如果你需要让 WSL 中的 Codex 直接访问 Windows 本机启动的 Y3 MCP Server，请确认系统是 Windows 11 22H2 或更高版本。WSL 的 `networkingMode=mirrored` 镜像网络模式需要 Windows 11 22H2 及以上；该模式可以让 Linux/WSL 使用 `127.0.0.1` 访问 Windows 侧服务。

低于 Windows 11 22H2 的系统不建议走 WSL 分支，否则可能出现无法配置镜像网络、无法直接访问本地 Y3 MCP Server 的问题。此时建议选择前面的 Windows 分支。
:::

## 一、安装 WSL

先确认你已经决定走 WSL 分支。如果你只是想最快把 Codex 用起来，或者你的 Windows 11 版本低于 22H2，请回到 [Windows 分支](./01-Windows分支.md)。

1. 打开 Windows Terminal。
2. 执行：

```bash
wsl --install -d Ubuntu
```

3. 安装完成后重启电脑。
4. 重启后打开 Windows Terminal，执行：

```bash
wsl -l -v
```

如果能看到 Ubuntu，并且版本是 2，说明 WSL 安装成功。

## 二、配置 WSL 镜像网络

如果后续需要让 WSL 里的 Codex 访问 Windows 本机启动的 Y3 MCP Server，建议先配置 WSL 镜像网络。

:::warning 只适合 Windows 11 22H2 及以上
如果你的 Windows 11 版本低于 22H2，或者你使用的是 Windows 10，不建议继续配置这一步。请改走 Windows 分支。
:::

1. 回到 Windows Terminal 的 PowerShell 标签页，不要在 Ubuntu 里执行这一步。
2. 执行：

```powershell
notepad $env:USERPROFILE\.wslconfig
```

3. 如果弹出“是否创建新文件”，点击“是”。
4. 在记事本中写入：

```ini
[wsl2]
networkingMode=mirrored
```

5. 保存并关闭记事本。
6. 在 PowerShell 中执行：

```powershell
wsl --shutdown
```

7. 重新打开 Ubuntu / WSL。

## 三、首次进入 Ubuntu

1. 在 Windows Terminal 中输入：

```bash
wsl
```

2. 第一次进入时会要求创建 Linux 用户名和密码。
3. 用户名可以使用英文。
4. 密码输入时不会显示字符，这是正常现象。输入完成后按回车即可。
5. 这个密码后续执行 `sudo` 命令时会用到，请记住。

## 四、在 WSL 中安装 Node.js

WSL 里不要直接照搬 Windows 的 Node.js 安装包。这里推荐使用 nvm 安装 Node.js LTS 版本。

进入 WSL 后执行：

```bash
sudo apt update
sudo apt install -y curl ca-certificates
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install --lts
nvm use --lts
node --version
npm --version
```

如果能看到版本号，说明安装成功。

## 五、在 WSL 中安装 Codex CLI

```bash
npm install -g @openai/codex@latest
codex --version
```

如果能看到版本号，说明安装成功。

注意：使用 nvm 安装 Node.js 后，正常情况下不需要在 `npm install -g` 前面加 `sudo`。如果教程里某一步要求你在 WSL 中对 npm 使用 `sudo`，先停下来确认原因，避免把权限和配置写乱。

## 下一步

继续阅读 [模型配置](./03-模型配置.md)。
