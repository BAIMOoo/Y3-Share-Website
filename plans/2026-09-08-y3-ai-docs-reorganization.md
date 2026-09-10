# Y3 AI 教程盘点、汇总目录与迁移映射

初稿：2026-09-08；更新：2026-09-09。交付目标是 `docs/Y3AI开发教程/` 下完整、连续的 **Y3 Share 教程**。`../docs/packages/projects-docs/pages/` 仅作为内容来源；不建立两站分工或互相依赖的阅读路径。

## 已完成的盘点

完整阅读了两处原始 AI 教程的 9 篇正文、两种导航配置及上级目录，并检查了 27 张分享站本地 PNG 和 18 张来源站 CDN 图片。继续核对了编辑器安装、助手安装、Lua 初始化、日志、单位物编、Game/Timer/Unit 等相邻手册。

分享站使用 Docusaurus 自动侧栏，原 6 篇文章及 Agent 分类的排序均为 0，阅读从术语和主观模型排名开始。来源站使用 Nextra `_meta.json`，原 3 篇为环境、综合使用、更新日志。两套正文都缺少从配置到实际开发的清晰路径与分层排错说明。

两仓库没有适用的 `AGENTS.md`。分享站 `CLAUDE.md` 要求中文和 Markdown 相对图片引用。开始时分享站工作区干净，来源仓库只有用户原有的 `CloudScript.md` 修改。

## 最终目录

下面是 Y3 Share 的显示顺序。旧文件名保留用于链接兼容，导航标签不再带旧序号。

```text
Y3AI开发教程/
  index.md                    开始使用：选择工作方式
  EnvironmentSetup.md         准备 Y3 项目
  AssistantDevelopment.md     配置 Y3Maker
  DailyTasks.md               日常开发任务
  ProjectContext.md           项目上下文与可复用流程
  04-如何使用AI开发Y3项目.md    用外部 Agent 开发 Y3
  03-Agent部署教程/            外部 Agent 安装与接入
    Claude Code for VSCode 扩展安装以及配置教程.md
    Claude Code CLI部署教程.md
    Codex部署教程.md
    MCP接入.md
  Tools.md                    Y3 MCP 工具介绍
  Capabilities.md             能力、前提与限制
  Troubleshooting.md          排查问题
  LuaReference.md             工程与 Lua 参考
  02-模型对比.md              选择模型与 Agent
  01-AI相关专业名称释义.md      概念速查
  CHANGELOG.md                Y3Maker 更新记录
  Y3_AI_images/               原图片与迁入的来源图片
```

新手路径：安装 Y3 编辑器、VS Code、Y3 开发助手 → 打开工程 → 连接内置 Y3Maker 的模型服务 → 用一段提示词统一准备 Git、Python 3、Node.js LTS → 初始化项目 → 检查项目资料与工具 → 日常任务。按用户要求，三项均为本教程必装环境。已有外部 Agent 的用户仍可从开始使用分流到对应接入教程。

2026-09-09 对全部 17 篇教程做了面向零基础读者的文字整理：安装页保留具体操作，项目检查集中到对应客户端接入页，共用开发检查放在日常任务，刷新顺序与参数放在工具参考，故障和旧配置迁移集中到排错页。Y3Maker 配置页的“下一页”直接进入日常任务。

## 逐篇源文档迁移

| 来源 | 原文内容与核对结果 | Y3 Share 去向与处理 |
| --- | --- | --- |
| 分享站 `01-AI相关专业名称释义.md` | LLM、Context、Prompt、Agent、RAG、MCP、Skill；原文 token 与文字、上下文遗忘、MCP 加载成本描述过于绝对，示例围栏不完整 | 原路径改写为“概念速查”，保留全部主要术语，使用 Y3 例子，后置到参考部分 |
| 分享站 `02-模型对比.md` | 2026-02-09 的主观速度、费用、质量体验，无受控测量 | 原路径改写“选择模型与 Agent”；保留明确日期与性质的历史体验，增加同任务比较方法 |
| 分享站 `03-Agent部署教程/Claude Code CLI部署教程.md` | 旧环境部署、Node、CLI、中转服务、绕过 onboarding 与启动步骤 | 原路径提供官方 Windows 原生安装、登录和只读验收，清理旧子系统部署内容 |
| 分享站 `03-Agent部署教程/Claude Code for VSCode 扩展安装以及配置教程.md` | 与 CLI 重复的安装/令牌配置，图形入口有价值 | 原路径改写官方扩展安装、登录、项目验证；独立 CLI 按需安装 |
| 分享站 `03-Agent部署教程/Codex部署教程.md` | 将 CLI/Node 当扩展前提，固定旧模型，错误扩展名和未核实设置键 | 原路径区分扩展与 CLI，使用官方认证，连接本站 Y3 流程 |
| 分享站 `04-如何使用AI开发Y3项目.md` | 旧环境配置、superpowers、网盘 VSIX、固定版本 MCP 脚本、项目说明与大需求示例 | 原路径保留 Windows 外部 Agent 开发流程；上下文拆到 `ProjectContext.md`，MCP 拆到 `03-Agent部署教程/MCP接入.md`，具体开发链接 `DailyTasks.md` |
| 来源站 `AI_Development/EnvironmentSetup.md` | 编辑器、VS Code、Git、助手、可选 Python；项目与脚本目录区分不足，助手链接缺少标签 | 汇入本站 `EnvironmentSetup.md`；补齐图形界面操作，使用一段内置 Y3Maker 提示词统一安装并验证 Git、Python、Node.js；助手仅保留扩展商店安装步骤，公共工程/日志知识进入 `LuaReference.md` |
| 来源站 `AI_Development/AssistantDevelopment.md` | 配置、旧 CodeMaker 名称、两协议、`.y3maker`、规则/技能、任务、17 个 MCP 工具混排 | 主要去向 `AssistantDevelopment.md`；任务→`DailyTasks.md`，能力→`Capabilities.md`，工具→`Tools.md`，问题→`Troubleshooting.md` |
| 来源站 `AI_Development/CHANGELOG.md` | 2026 年 3–6 月知识库、技能和模板历史，没有最低发行版本对应表 | 汇入本站 `CHANGELOG.md`，逐字保留全部历史条目，补适用范围与本站当前能力链接 |

实施期间产生的有价值新教程全部集中在上表目录。原拟来源站 `Overview.md` 的分流与任务入口合并到本站 `index.md`，不保留两个重复总览。

## 相邻资料去向

| 来源站资料 | 提取到本站的内容 |
| --- | --- |
| `Editor/Setting-up.md` | 仅保留适用背景；编辑器安装按用户 2026-09-09 纠正，采用开发者学院直接下载和自动创建的快捷方式启动 |
| `Download-Y3-Assistant.md` | `EnvironmentSetup.md` 的扩展 ID、安装、初始化及运行方式 |
| `Create_LUA_Project.md` | `LuaReference.md` 的目录、入口、初始化时机和玩家日志；环境页含可执行的最小验证步骤 |
| `DebuggingInformation.md` | `Troubleshooting.md` 的编辑器日志入口和复现材料 |
| `Object_Editor/Unit.md` | `LuaReference.md` 的单位类型、实例、模型与位置核对 |
| `API/Game.md`、`API/Timer.md`、`API/Unit.md` | `LuaReference.md` 的常用签名和约束；日常开发直接引用本站说明 |

原始手册仅作内容来源和事实依据，核心操作无需跳转回来源站才能完成。供应商安装、认证、下载及规范的外部链接作为必要的一手来源保留。

## 已核实功能

详细一手证据、版本和限制保存在 [功能核验记录](./y3-ai-capability-evidence-2026-09-08.md)。沿用已经完成的研究，不重新调研竞品。

- 当前扩展入口是“打开 Y3Maker”，模型协议为三种，模型 ID 必填，当前配置前缀是 `Y3Maker`。
- `.y3maker`、`.codemaker`、`.codex` 不可随意互换；项目资料、客户端指令与 MCP 分别验证。
- MCP 分助手 8766、编辑器 8765、运行时 8767。本机已完成前两个服务的只读握手与工具发现，分别有 9、59 个工具；未调用地图工具。
- 旧 17 个编辑器工具中 14 个仍存在，3 个旧 UI 名称需按当前 `screenshot_ui` 或助手启动/截图工具处理。
- 已读 Claude/Codex 官方安装、认证、MCP 和项目指令说明。外部客户端采用 Windows 原生流程，扩展不以独立 CLI 安装为前提。
- 运行时服务、完整玩法、外部配置写入及迁移工具尚未进行端到端实测，正文明确区分工具存在与运行成功。

## 图片与旧链接

分享站清理了 10 张旧子系统截图及 1 张备用安装配图，剩余 16 张原图未改动。来源教程及相邻安装手册的 13 张图片汇入本站资源目录，共保留 29 张本地图片；已撤下平台下载和手动查找程序的两张配图，来源清单同步更新。

分享站旧 6 篇页面与 Agent 分类生成页路径不变，保留仍适用的 87 个来源章节锚点；已删除的子系统内容对应的 3 个锚点一并移除。来源站 3 篇原文的章节锚点随正文迁入新页面，逐篇去向可在本表查询；来源站文件和路由保持原状，不修改其服务器重定向。核心教程之间均使用本站相对链接。

## 来源仓库撤回

已先将有价值的正文转入 Y3 Share，再逐文件恢复本轮编辑的 `AssistantDevelopment.md`、`EnvironmentSetup.md`、`CHANGELOG.md`、`_meta.json` 与 `packages/projects-docs/styles.css`，并删除本轮在来源站新增的六篇页面。

用户 `CloudScript.md` 撤回前后 SHA-256 均为 `C68DB1CE45B280B44ED65A8195BEE6F12570CFA5865D579EB49AE3833487C047`。来源仓库的最终 Git 状态仅包含该原有修改。本轮来源站预览和构建已停止，确认由本轮创建的 `.next` 与两个 sitemap 文件已清理；其他已有进程未操作。

## 验证计划与状态

- 已完成：两处 9 篇原文汇总为本站 17 篇教程，全部可从本站入口到达。
- 已通过：2026-09-09 精简后的生产构建，17 篇文档结构与可达性、87 个来源锚点、34 次桌面/手机页面检查和 16 项导航交互检查。后续按用户要求删除备用安装小节及配图，剩余 29 张图片；该小节的标题锚点随内容删除。
- 已确认：核心教程没有来源文档站链接依赖；原 6 个分享站页面 URL 和 Agent 分类 URL 保留；历史更新条目逐字保留。
- 已确认：来源仓库仅剩用户原有修改，来源站服务及本轮生成产物已清理。未发布或推送。
- 详细命令与未实测范围见 [交付与验证记录](./y3-ai-docs-verification-2026-09-08.md)。
