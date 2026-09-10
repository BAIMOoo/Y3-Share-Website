# Y3 Share AI 教程交付与验证记录

初稿：2026-09-08；更新：2026-09-09。最终交付仅为 Y3 Share 的 `docs/Y3AI开发教程/`。来源仓库 `../docs` 只保留用户原有修改。

## 汇总结果

两处 9 篇原始 AI 教程，连同已核对的相邻工程、Lua 和日志资料，编排成本站 17 篇教程。阅读路径覆盖环境、Y3Maker、Claude Code/Codex、MCP、日常任务、项目上下文、工具、能力限制、排错、Lua 参考和更新记录。

目录与逐篇去向见 [迁移映射](./2026-09-08-y3-ai-docs-reorganization.md)，能力、版本和一手来源见 [事实核验记录](./y3-ai-capability-evidence-2026-09-08.md)。

核心教程均使用本站链接，17 篇均可从 `index.md` 沿站内链接到达。第三方安装、认证和规范保留必要的供应商链接。

“准备 Y3 项目”已按零基础读者补齐 Y3 编辑器、VS Code、Y3 开发助手的逐步安装、中文语言包、工程打开及初始化说明。按用户要求，Git、Python 3、Node.js LTS 均列为必装环境，使用一段提示词交给内置 Y3Maker 安装并验证；仍先连接模型服务，不把额外 Agent 安装设为前置条件。

2026-09-09 按用户纠正，编辑器安装改为从开发者学院点击“下载编辑器”，安装完成后使用自动创建的快捷方式启动；平台安装、手动查找程序和对应配图均已撤下。

## 文字精简与阅读顺序

按“零基础、详细但不重复”的要求重新整理了全部 17 篇。保留关键按钮、路径、命令、配置项、操作截图和任务完成标准，压缩重复前提、同类检查提示词与维护过程说明。旧配置兼容信息集中在排错页，完整工具列表与使用条件仍可查阅。

按 Markdown 解析后的文字、行内代码和代码示例统计（不计空白、链接地址、frontmatter 和兼容锚点），从 28,890 字符降至 18,198，约减少 37%。安装页从 6,097 降至 3,242 字符，保留官网下载、快捷方式启动、非 C 盘及完整路径建议、VS Code 中文设置、助手安装、内置 Y3Maker 提示词和初始化步骤。

侧栏已将日常任务与项目上下文前移，外部客户端集中在“外部 Agent 安装与接入”。Y3Maker 配置后的默认“下一页”直达日常任务。精简时保留了全部原页面 URL、编辑前的章节锚点及 2026 年 3–6 月更新条目；后续按用户要求移除助手的备用安装小节、配图及该小节标题锚点，构建和链接检查通过。

## 验证结果

| 检查 | 结果 |
| --- | --- |
| `npm run build` | 清理构建缓存后通过，已删除页面返回 404 |
| Markdown、frontmatter、分类 JSON、内部链接 | 17 篇全部通过 |
| 本站阅读可达性 | 从入口到达全部 17 篇，核心流程无跨文档站依赖 |
| 旧页面与章节 | 分享站原 6 篇 URL 保留；保留 87 个来源章节锚点，按清理要求移除 3 个子系统章节锚点 |
| 旧 Agent 分类 | `/docs/category/03-agent部署教程` 返回 200 |
| 浏览器页面 | 1440×1000、390×844 两种视口，共 34 次页面检查通过 |
| 图片与页面状态 | 所有正文图片加载成功，无页面 JavaScript 错误、缺失锚点或整页横向溢出 |
| 点击与交互 | 16 项通过：常规阅读路径、Y3Maker 下一页进入日常任务、首次配置后返回安装提示词、手机侧栏、表格横向滚动和旧分类链接 |
| 本地图片 | 29 张：16 张原图字节未变，13 张图片迁入本站；已清理旧子系统、平台安装和备用安装的相关配图 |
| 历史更新记录 | 2026 年 3–6 月条目与原文逐字一致 |
| `git diff --check` | 通过；Git 另有本机 LF/CRLF 转换提示 |

构建中的已有提示涉及博客作者定义、摘要截断标记、配置弃用及 Browserslist 数据版本，与本次 AI 教程内容无关；没有为此改写无关页面或升级框架。

图片来源清单见 [y3-ai-image-sources.json](./y3-ai-image-sources.json)。旧安装和凭据配置截图已从本站清理，原始 Git 历史未改写。

## 来源仓库恢复

已逐文件恢复本轮修改的三个 AI 原文、`_meta.json` 和 `packages/projects-docs/styles.css`；本轮新增的六篇来源站页面已经迁出并删除。来源仓库最终 `git status --short` 仅显示：

```text
 M packages/projects-docs/pages/guides/FunctionManual/CloudScript.md
```

`CloudScript.md` 的 SHA-256 在撤回前后相同：

```text
C68DB1CE45B280B44ED65A8195BEE6F12570CFA5865D579EB49AE3833487C047
```

仅停止了本轮启动的来源站预览/构建，清理了本轮生成的 `.next`、`public/sitemap.xml` 和 `public/sitemap-0.xml`。3101、3102 端口未监听；Y3 编辑器、MCP 服务和用户其他进程未操作。

## 尚未实测的功能

实际完成的是文档构建、浏览器验证、源码检查，以及现有助手/编辑器 MCP 的只读握手和工具发现。以下不标记为实测通过：

- 日常开发任务在真实地图中的运行、报错修复与迭代。
- 游戏运行时服务 `y3runtime` 的工具调用。
- 截图、UI/物编热更、资源下载、地形/模板/自动测试流程的实际执行。
- 多人同步、不同编辑器发行版本的兼容行为。
- 用户模型账号与费用、外部客户端配置写入、跨主机网络和项目迁移脚本。
- 全新 Windows 机器上的编辑器安装，以及由 Y3Maker 实际执行 Git、Python、Node.js 安装。编辑器直接下载安装步骤由用户确认；首次配置顺序与终端能力已按源码核对，本轮未安装这些软件或调用付费模型。

正文已明确这些能力的前提与验收条件。本次未调用付费模型、修改真实地图、发布站点、提交或推送。

## 复现验证与预览

在 Y3 Share 根目录执行：

```powershell
npm.cmd run clear
npm.cmd run build
node plans/verify-y3-ai-docs.mjs ../docs --built
npm.cmd run serve -- --host 127.0.0.1 --port 3100 --no-open
```

已启动的预览进程 PID 为 `21356`，只监听本机 `127.0.0.1:3100`。若当前预览仍在运行，不必再启动同端口服务。

[Y3 AI 教程本地预览](http://127.0.0.1:3100/docs/Y3AI开发教程/)

浏览器脚本使用本机提供的 Playwright 和 Chrome。原验证命令：

```powershell
$env:NODE_PATH = 'C:\Users\wb.lixinyan03\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
node plans/verify-y3-ai-browser.cjs
```

图片检查使用已提供的 Python/Pillow 运行时执行 `plans/audit-y3-ai-images.py`。上述脚本将结构结果、图片校验、浏览器结果、导航结果和截图写入被 Git 忽略的 `.cache-loader/y3-ai-docs/`，不写入来源仓库。
