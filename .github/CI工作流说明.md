---
title: CI工作流说明
sidebar_position: 3
---

本文介绍 Y3-Share 当前的自动化发布方案，包括实现原理、执行流程和配置要点。

## 一、目标

将原先“本地 push -> 服务器 pull -> 手动 build”的流程，改为“本地 push -> GitHub Actions 自动 build 并自动部署”，减少人工操作和发布错误。

## 二、实现原理

当前仓库使用 GitHub Actions 工作流文件：

`/.github/workflows/deploy.yml`

核心原理如下：

1. 监听 `master` 分支的 `push` 事件。
2. 在 GitHub Runner 中执行 `npm ci` 和 `npm run build`，生成静态文件 `build/`。
3. 使用 SSH 私钥连接服务器。
4. 使用 `rsync --delete` 将 `build/` 同步到服务器 `DEPLOY_PATH`。
5. 服务器继续通过 `npm run serve` 对 `build/` 目录提供访问。

## 三、执行流程

### 1）触发阶段

- 触发条件：`master` 分支有新提交。
- 手动触发：Actions 页面点击 `Run workflow`。

### 2）构建阶段

- `actions/checkout@v4`：拉取代码。
- `actions/setup-node@v4`：安装 Node.js 20。
- `npm ci`：安装依赖。
- `npm run build`：构建 Docusaurus 静态站点。

### 3）安全校验阶段

工作流中增加了部署路径校验，防止误覆盖源码目录：

- `DEPLOY_PATH` 不能为空。
- 禁止使用 `/root/Y3-Share-Website` 作为部署目标。
- `DEPLOY_PATH` 必须以 `/build` 或 `/build/` 结尾。

### 4）部署阶段

- 载入 `SERVER_SSH_KEY`。
- `ssh-keyscan` 写入主机指纹。
- `rsync -az --delete` 同步 `build/` 到 `${SERVER_USER}@${SERVER_HOST}:${DEPLOY_PATH}`。

## 四、必须配置的 GitHub Secrets

在仓库 `Settings -> Secrets and variables -> Actions` 中配置：

- `SERVER_HOST`：服务器 IP 或域名
- `SERVER_PORT`：SSH 端口（默认通常是 `22`）
- `SERVER_USER`：登录服务器的用户名
- `SERVER_SSH_KEY`：登录服务器私钥完整内容（多行）
- `DEPLOY_PATH`：部署目录绝对路径，必须是 `.../build/`

示例：

`DEPLOY_PATH=/root/Y3-Share-Website/build/`

## 五、日常发布流程

1. 本地写文档并提交代码。
2. 执行 `git push origin master`。
3. 打开 GitHub Actions 查看 `Deploy Docusaurus` 运行状态。
4. 运行成功后，服务器 `build/` 内容自动更新。

## 六、常见问题

### 1）`The ssh-private-key argument is empty`

原因：`SERVER_SSH_KEY` 未配置或名称不一致。  
处理：确认 Secret 名称为 `SERVER_SSH_KEY`，且值为完整私钥内容。

### 2）部署后网站 404

常见原因：`DEPLOY_PATH` 配置为仓库根目录，导致 `rsync --delete` 覆盖源码。  
处理：将 `DEPLOY_PATH` 改为 `.../build/`，并重新运行工作流。

### 3）`Permission denied (publickey)`

原因：私钥与服务器授权公钥不匹配。  
处理：将对应公钥加入服务器目标用户的 `~/.ssh/authorized_keys`。

## 七、建议

- 建议为 CI 部署单独生成 SSH Key，避免复用个人密钥。
- 建议定期检查 Actions 运行日志，及时发现构建告警。
- 后续可增加通知能力（如企业微信/钉钉）用于发布结果提醒。
