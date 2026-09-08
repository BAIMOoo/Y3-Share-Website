---
title: CI工作流说明
sidebar_position: 3
---

本文介绍 Y3-Share 当前的自动化发布方案，包括实现原理、执行流程和配置要点。

## 一、目标

采用“提交代码 -> 推送版本标签 -> GitHub Actions 自动 build 并自动部署”的流程。日常推送分支不会部署，准备上线时再发布版本标签。

## 二、实现原理

当前仓库使用 GitHub Actions 工作流文件：

`/.github/workflows/deploy.yml`

核心原理如下：

1. 监听以 `v` 开头的标签的 `push` 事件，例如 `v1.0.0`。
2. 在 GitHub Runner 中执行 `npm ci` 和 `npm run build`，生成静态文件 `build/`。
3. 使用 SSH 私钥连接服务器。
4. 使用 `rsync --delete` 将 `build/` 同步到服务器 `DEPLOY_PATH`。
5. 服务器继续通过 `npm run serve` 对 `build/` 目录提供访问。

## 三、执行流程

### 1）触发阶段

- 触发条件：推送以 `v` 开头的标签，例如 `v1.0.0`。
- 推送 `master` 或其他分支不会触发部署，也不提供 `Run workflow` 手动入口。
- 构建的是标签指向的提交。标签匹配规则不限制所属分支，发布时应在更新后的 `master` 上创建标签。
- 所有版本共用部署并发组，正在执行的部署不会被新版本取消；GitHub 最多保留一个待运行任务，后来的任务可能替换等待中的任务。

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

1. 将本次修改提交到 `master`，并执行 `git push origin master`。这一步不会部署。
2. 确认当前位于 `master`，执行 `git pull --ff-only origin master`，确保发布的是更新后的主干。
3. 创建新的版本标签并单独推送，例如：

   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

4. 打开 GitHub Actions 查看 `Deploy Docusaurus` 运行状态。
5. 运行成功后，服务器 `build/` 内容自动更新。

每次发布使用新的版本号，不要移动或覆盖已发布的标签。标签指向的提交必须包含这份标签触发工作流。失败后可在 Actions 页面重新运行对应任务。

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
