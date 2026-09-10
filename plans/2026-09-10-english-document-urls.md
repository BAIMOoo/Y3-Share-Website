# 文档英文链接迁移方案（已实施）

## 已确认的范围

- 覆盖当前 43 篇文档、3 个生成分类页和文档章节锚点；博客不纳入。
- 不修改文档标题、文件名、目录结构和侧边栏显示名称。
- 新 URL 使用小写英文、数字和连字符，省略排序编号和纯导航层级。
- 旧页面 URL 跳转到新页面，保留 query 和 hash；旧章节锚点保留兼容别名。
- 现有英文显式锚点继续保留；其余章节设置语义明确的英文 ID。
- 同步站内引用；标题措辞微调不改变稳定 URL。

## 页面映射

所有新路径均以 `/docs` 开头。旧路径从对应当前源文件的 Docusaurus 路由规则提取，不能直接采用残留缓存；当前缓存含已删除或搬迁文件的元数据。

| 当前文档标题 | 新路径（省略 /docs） |
| --- | --- |
| 简介 | /intro |
| 关于Y3QA | /y3qa |
| Y3 AI 开发教程 | /ai |
| AI 概念入门 | /ai/concepts |
| 用外部 Agent 开发 Y3 | /ai/agent-workflow |
| 配置 Y3Maker | /ai/y3maker-setup |
| Y3Maker 更新记录 | /ai/changelog |
| 准备 Y3 项目 | /ai/project-setup |
| 工程与 Lua 目录结构参考 | /ai/project-structure |
| Y3 MCP 工具介绍 | /ai/mcp-tools |
| 排查问题 | /ai/troubleshooting |
| 前言：如何选择 Agent | /ai/choose-agent |
| Codex/Claude 模型配置 | /ai/model-config |
| 连接 Y3 配套MCP | /ai/mcp-setup |
| Claude Code CLI | /ai/claude-code-cli |
| Claude Code VS Code扩展 | /ai/claude-code-vscode |
| Codex App | /ai/codex-app |
| Codex VS Code 扩展 | /ai/codex-vscode |
| Codex CLI | /ai/codex-cli |
| .y3maker 目录与文档说明 | /ai/y3maker-directory |
| knowledge：知识库文档 | /ai/y3maker-directory/knowledge |
| memory：项目记忆 | /ai/y3maker-directory/memory |
| rules：开发规则 | /ai/y3maker-directory/rules |
| skills：技能与配套资料 | /ai/y3maker-directory/skills |
| templates：功能模板 | /ai/y3maker-directory/templates |
| tools 与配置文件 | /ai/y3maker-directory/tools-config |
| TCP：00-功能介绍 | /tcp/overview |
| TCP：01-客户端示例项目下载 | /tcp/client-example |
| TCP：03-确定服务端地址 | /tcp/server-address |
| TCP：04-数据库基础概念讲解 | /tcp/database-basics |
| TCP：05-ECA接口 | /tcp/eca-api |
| TCP：06-可视化管理数据库 | /tcp/database-management |
| Linux部署教程 | /tcp/linux |
| Windows部署教程 | /tcp/windows |
| WebSocket：00-功能介绍 | /websocket/overview |
| WebSocket：01-示例项目下载 | /websocket/example |
| WebSocket：02-如何链接开源游戏服务端框架 | /websocket/server-framework |
| 补间动画 | /talks/tween-animation |
| 随机地形生成 | /talks/random-terrain |
| 线上问题定位方案推荐 | /talks/production-debugging |
| 小窗挂机UI实现分享 | /talks/idle-window-ui |
| UI同步讲解 | /talks/ui-sync |
| y3 custom_python汇总 | /talks/custom-python |

TCP、WebSocket 前缀仅用于表格区分同名标题，不修改实际标题。

| 当前分类页路径（省略 /docs） | 新路径（省略 /docs） |
| --- | --- |
| /category/03-agent部署教程 | /ai/agent-setup |
| /category/agent-安装教程 | /ai/agent-installation |
| /category/02-服务端部署 | /tcp/server-deployment |

## 兼容方式与证据

- `.github/CI工作流说明.md` 说明使用 `npm run serve`；部署工作流同步 `build/`。采用构建输出内的静态跳转页面，避免依赖额外服务器配置。
- 跳转保留 `location.search` 和 `location.hash`，目标页面保留旧章节 ID 别名。
- 本地 Docusaurus `mdx-loader/lib/remark/headings/index.js` 支持 `{#english-id}`。
- 旧章节 ID 按实际 Markdown 解析和 Docusaurus slugger 记录，包括重复标题的编号；不把代码块中的注释误识别为标题。
- 本次保证当前文档对应的旧地址；缓存内已删除内容不能仅凭旧标题臆测跳转目标。

## 实施验收

1. 迁移前记录当前源码生成的全部页面、分类页和章节 ID，形成精确旧地址映射。
2. 新页面路径和公开章节锚点全部使用 ASCII，路径唯一、单页 ID 唯一。
3. 所有旧页面跳转目标存在，所有记录的旧章节别名存在；验证 query/hash 保留。
4. 文档标题、正文显示与导航名称不变；Markdown 文件引用和写死的路由链接均有效。
5. 生产构建通过，检查构建产物并在本地静态服务验证旧链接、章节定位和新分享链接。
6. 不覆盖当前已有的 `docs/Y3AI开发教程/_category_.json` 用户改动。

## 决策状态

用户已确认实施。43 篇文档、3 个分类页和 225 个可分享章节锚点已完成迁移；标题、正文标题文字、文件名和目录结构保持不变。精确页面及章节对照保存于 `plugins/doc-url-compat/manifest.json`。

生产构建通过；`npm run check:doc-urls` 验证页面路径、章节 ID、站内链接和 46 个兼容跳转。另已通过本地静态服务验证 138 种旧 URL 访问形式（中文、编码、尾斜杠），并在浏览器确认旧中文章节定位、新英文分享链接、分类页跳转及查询参数保留。已有的旧版锚点别名继续保留。

本次只完成本地修改与验证，未部署。构建仍有原有的博客元数据和配置弃用提示，不影响构建通过。
