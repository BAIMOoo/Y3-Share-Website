# Y3 AI 教程能力与安装事实核验

核验日期：2026-09-08。本文供教程重编排使用，不是面向玩家的安装教程。

## 核验范围与证据等级

- 已阅读待迁移的 `AssistantDevelopment.md`、`EnvironmentSetup.md`、`CHANGELOG.md`，社区教程的 Claude Code CLI、Claude Code VS Code、Codex 和 Y3 项目开发正文。
- 本机 `y3-helper` 工作树版本为 2.1.4，HEAD 为 `ba006e0`，提交日期 2026-09-04，标题“更新 MCP 配置文档”；本文涉及的助手源码文件无未提交修改。已安装扩展为 `sumneko.y3-helper-2.1.3`。
- 本机 `y3-maker-config` HEAD 为 `c51ec00`，提交日期 2026-06-11，标题“修复模板 Lua 语法与 LuaLS 注解诊断问题”。因此不把本机配置包当作 2026-09-08 所有用户均已安装的最新版本。
- **运行实例证据**：只向已有的 8765、8766 服务发送 MCP `initialize`、`notifications/initialized`、`tools/list`；没有调用地图工具、启动游戏、运行模型、安装产品或迁移真实项目。8766 临时 MCP 会话读取后已关闭。
- **源码证据**：证明当前工作树存在该实现，不等同于已经完成游戏运行、视觉截图、生成内容等端到端验证。
- **供应商文档证据**：读取了官方正文，日期均为 2026-09-08；只读文档中的安装命令，没有执行。
- **原文声称**：旧教程或 skill 里描述的行为，若缺少实现或运行实例证据，单独标注，不作为已验证承诺。

## 一手来源

下列来源均在 2026-09-08 读取。后文用编号引用每项事实拥有者。

| 编号 | 来源 | 用途 |
| --- | --- | --- |
| Y1 | [y3-helper package.json](C:/Users/wb.lixinyan03/Desktop/y3-helper/package.json:1)；[已安装扩展 package.json](C:/Users/wb.lixinyan03/.vscode/extensions/sumneko.y3-helper-2.1.3/package.json:1) | 产品名、版本、VS Code 要求、命令、模型配置、扩展依赖 |
| Y2 | [y3-helper README](C:/Users/wb.lixinyan03/Desktop/y3-helper/README.md:94) | 内置 MCP、自动启动、Y3Maker 配置、外部 Agent 迁移入口 |
| Y3 | [extension.ts](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/extension.ts:127)；[env.ts](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/env.ts:416) | 初始化项目、工作区和项目根目录、自动启动守卫 |
| Y4 | [Y3Maker 入口](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/mainMenu/pages/codemaker.ts:1)；[主菜单](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/mainMenu/mainMenu.ts:20)；[功能菜单](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/mainMenu/pages/features.ts:484) | 实际菜单名 |
| Y5 | [McpHub](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/codemaker/mcpHandlers/index.ts:201)；[技能来源](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/codemaker/skillsHandler.ts:70) | `.y3maker` MCP 配置位置、`.codemaker` 技能兼容读取 |
| Y6 | [助手 MCP server](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/mcp/tcpServer.ts:13)；[游戏会话实现](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/mcp/gameSessionManager.ts:209) | 8766 HTTP 服务、9 个工具、游戏状态和重连 |
| Y7 | [Y3Maker 配置仓库 MCP 配置](C:/Users/wb.lixinyan03/Desktop/y3-maker-config/mcp_settings.json:1) | 三个默认服务的类型和地址 |
| Y8 | [本地编辑器 MCP 工具定义](C:/Users/wb.lixinyan03/Desktop/kk8-engine/dm/editor/mcp/tools.py:27)；[编辑器 HTTP 服务](C:/Users/wb.lixinyan03/Desktop/kk8-engine/dm/editor/mcp/mcp_server.py:56)；[UI 截图实现](C:/Users/wb.lixinyan03/Desktop/kk8-engine/dm/editor/mcp/handlers/ui_handlers.py:97) | 编辑器工具归属、当前截图工具名、截图限制 |
| Y9 | [配置仓库更新实现](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/y3makerConfig.ts:132)；[更新菜单](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/mainMenu/pages/y3makerConfigUpdate.ts:6) | `.y3maker` 来源与更新、旧目录备份 |
| Y10 | [API 配置读取](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/codemaker/configProvider.ts:6)；[API 子进程实现](C:/Users/wb.lixinyan03/Desktop/y3-helper/src/codemaker/apiServer.ts:84) | 真实设置前缀、内置进程启动依赖 |
| Y11 | [技能索引](C:/Users/wb.lixinyan03/Desktop/y3-maker-config/skills/README.md:18)；[测试 skill](C:/Users/wb.lixinyan03/Desktop/y3-maker-config/skills/y3-auto-test/SKILL.md:43)；[环境 skill](C:/Users/wb.lixinyan03/Desktop/y3-maker-config/skills/y3-env-setup/SKILL.md:231)；[MCP 规则](C:/Users/wb.lixinyan03/Desktop/y3-maker-config/rules/mcp-rules.mdc:1) | skill 与工具区别、流程能力、热更保存、按需依赖和限制 |
| Y12 | [Y3Maker Migration Skills README](https://github.com/BAIMOoo/y3maker-migration-skills)；[实际读取的原文](https://raw.githubusercontent.com/BAIMOoo/y3maker-migration-skills/main/README.md) | Y3 助手 README 推荐的第三方迁移项目说明，不是 Agent 厂商文档 |
| R1 | 本机 `http://127.0.0.1:8766/mcp` 的 `initialize`、`tools/list` 响应 | 已运行助手 MCP 的只读协议验证 |
| R2 | 本机 `http://127.0.0.1:8765/mcp` 的 `initialize`、`tools/list` 响应 | 已运行编辑器 MCP 的只读协议验证 |
| C1 | [Claude Code setup](https://code.claude.com/docs/en/setup)；[实际读取 Markdown](https://code.claude.com/docs/en/setup.md) | 当前 Windows CLI 安装依赖 |
| C2 | [Claude Code VS Code](https://code.claude.com/docs/en/vs-code)；[实际读取 Markdown](https://code.claude.com/docs/en/vs-code.md) | 官方扩展、面板安装认证、CLI 的可选性 |
| C3 | [Claude Code authentication](https://code.claude.com/docs/en/authentication)；[实际读取 Markdown](https://code.claude.com/docs/en/authentication.md) | 官方认证路径 |
| C4 | [Claude Code MCP](https://code.claude.com/docs/en/mcp)；[实际读取 Markdown](https://code.claude.com/docs/en/mcp.md) | HTTP 配置语法、scope、连接状态 |
| O1 | [OpenAI Codex Windows](https://developers.openai.com/codex/windows)；[实际读取 Markdown](https://developers.openai.com/codex/windows.md) | Windows 原生使用和系统支持等级 |
| O2 | [OpenAI Codex IDE](https://developers.openai.com/codex/ide)；[实际读取 Markdown](https://developers.openai.com/codex/ide.md) | 官方扩展 ID 和打开入口 |
| O3 | [OpenAI authentication](https://developers.openai.com/codex/auth)；[实际读取 Markdown](https://developers.openai.com/codex/auth.md) | ChatGPT/API key 两种认证、共享登录缓存 |
| O4 | [OpenAI MCP](https://developers.openai.com/codex/mcp)；[实际读取 Markdown](https://developers.openai.com/codex/mcp.md) | MCP 配置格式、作用域和状态检查 |
| O5 | [OpenAI Codex CLI](https://learn.chatgpt.com/docs/codex/cli)；[实际读取 Markdown](https://learn.chatgpt.com/docs/codex/cli.md) | Windows CLI 原生安装与 npm 备选 |
| O6 | [本机 OpenAI 扩展 package.json](C:/Users/wb.lixinyan03/.vscode/extensions/openai.chatgpt-26.901.22334-win32-x64/package.json:1) | 官方扩展标识、实际配置键核对 |
| O7 | [OpenAI Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)；[实际读取 Markdown](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md)；[官方目录](https://learn.chatgpt.com/llms.txt) | `AGENTS.md` 文件名与项目加载范围；补充核验日期 2026-09-08 |

## 产品关系与环境依赖

| 事实 | 证据和等级 | 教程处理建议 |
| --- | --- | --- |
| 产品扩展为“Y3开发助手”，ID `sumneko.y3-helper`；内置 AI 面板为“Y3Maker”。命令 ID 保留 `y3-helper.codemaker.open`，菜单已显示“打开 Y3Maker”。 | Y1、Y4，源码与已安装清单 | 统一面向用户名称；把 CodeMaker 当作历史名称或内部标识解释一次。 |
| 当前 VS Code 引擎要求为 `^1.96.0`，扩展依赖 `actboy168.lua-debug`、`sumneko.lua`、`sumneko.vscode-operator`。 | Y1，源码与已安装清单 | 使用近期稳定版 VS Code；不要教用户绕过扩展版本兼容要求。 |
| 初始化会用 Git 克隆 `y3-lualib`，再把 `y3-maker-config` 克隆到工程根目录 `.y3maker`。 | Y3 `extension.ts:180`、`:239`，源码 | Git 是该初始化路径所需依赖，不是可省略的泛用建议。 |
| 项目根目录是含 `header.project` 的工程目录；单张地图的脚本目录是 `maps/<地图>/script`。初始化后扩展会打开工程根目录。 | Y3，源码；原 `EnvironmentSetup.md` 一致 | 先把工程根与地图脚本目录分清。不要让读者从任意脚本子目录启动后假定工程根 `.y3maker` 会被读取。 |
| Y3Maker 的 MCP 配置读取首个 VS Code 工作区文件夹的 `.y3maker/mcp_settings.json`。初始化后的 `.y3maker` 已包含默认配置。 | Y2、Y5、Y7，源码 | 默认路线不用重复手工安装 MCP。以项目配置和面板工具目录做验收。 |
| `.codemaker/skills` 仍在兼容技能源列表中；McpHub 的实际配置读取位置是 `.y3maker`。内部 `src/codemaker` 命名不代表当前项目配置目录应叫 `.codemaker`。 | Y5，源码 | 不能把 `.codemaker` 和 `.y3maker` 当作可随意重命名的同义目录；保留旧项目并采用迁移流程。 |
| `.y3maker` 是 Y3Maker 的规则、skills、知识、模板、记忆、MCP 配置等项目资产，不是 AI 模型本身，也不是所有外部 Agent 自动读取的统一标准。 | Y5、Y7、Y11、Y12，源码/项目说明 | 把模型认证、项目知识和工具连接分别验收。 |
| Y3Maker API server 使用扩展进程的 `child_process.fork` 启动；默认三个 MCP 是 HTTP 服务，不是要求用户手工用 `node.exe` 启动的 stdio 脚本。 | Y10、Y7，源码 | 不把独立安装 Node 或 Claude CLI 列成内置 Y3Maker 的通用前置条件。 |
| Python 被环境 skill 和 UI/物编/地形等脚本使用；它不是只打开聊天面板的必要条件。 | Y11，配置包说明和脚本 | 按用户要求与 Git、Node.js 一起列为教程必装环境，并验证解释器及 pip。 |
| 环境 skill 会关闭编辑器自动保存，并写完成标记；这属于会持久改变用户设置的流程行为。 | Y11 `y3-env-setup/SKILL.md:231` | 自动环境配置不能只写“一键无感完成”，应让读者知道设置变化、手动保存责任和恢复位置。 |
| `.y3maker` 更新用 Git；无 `.git` 的旧目录迁移会备份到 `.y3maker.bak`，更新冲突有强制远端处理路径。 | Y9，源码 | 更新前备份项目自定义内容；不要推荐删目录重装作为通用排障。 |

## Y3Maker 模型配置

Y1、Y10 的实际设置均为 `Y3Maker` 前缀，旧教程“搜索 codemaker”和“两种协议”不再准确。

| 设置键 | 说明 | 核验 |
| --- | --- | --- |
| `Y3Maker.CodeChatApiBaseUrl` | 模型供应商提供的 API 基础地址 | Y1、Y10 |
| `Y3Maker.CodeChatApiKey` | 对应服务的凭据 | Y1、Y10；没有读取或输出真实配置值 |
| `Y3Maker.CodeChatModel` | 模型名称，配置定义明确标为必填 | Y1 |
| `Y3Maker.CodeChatWireApi` | `chat-completions`、`responses`、`anthropic-messages` 三种枚举 | Y1；默认 `chat-completions` |
| `Y3Maker.CodeChatRequestTimeoutMs` | 请求超时，默认 60000 毫秒 | Y1；不建议把增大超时当作所有错误的处理办法 |

协议、地址、模型和凭据必须匹配所选供应商。仅凭“收到回复”不能证明项目规则、MCP 和游戏验证全部正常。模型质量、价格、地区可用性与供应商稳定性没有在本次任务中实测，不能把旧文“某中转站稳定”“推荐固定模型”变成新教程的客观结论。

## MCP 拓扑、启动与生命周期

| 服务配置名 | 默认 URL | 拥有者与启动条件 | 本次证据 |
| --- | --- | --- | --- |
| `y3-helper` | `http://127.0.0.1:8766/mcp` | VS Code 的 Y3开发助手；已初始化 Y3 项目会尝试自动启动，可手动启动/停止 | Y2、Y6、Y7；R1 握手与列工具成功，9 个工具 |
| `y3editor` | `http://127.0.0.1:8765/mcp` | Y3 编辑器进程；需对应编辑器和项目处于可用状态 | Y7、Y8；R2 握手与列工具成功，59 个工具 |
| `y3runtime` | `http://127.0.0.1:8767/mcp` | 游戏运行时；配置包规则要求游戏运行 | Y7、Y11；本次端口未监听，没有运行时端到端验证 |

实际菜单路径是“Y3开发助手 > 功能 > MCP Server > 启动 MCP Server”，并有“停止 MCP Server”。项目选择入口为“重新选择Y3地图路径”。内置聊天入口是“打开 Y3Maker”。来源：Y4；本次没有操作这些按钮。

Y6 与 Y3 的启动实现只绑定 `127.0.0.1:8766`。若端口被另一个 VS Code 实例占用，当前实例报告“端口 8766 已被占用，当前实例未启动”，不会自动切换到新端口。因此“能连上 8766”不证明连到了这张地图；多项目时要先核对打开的工程和返回的地图信息。

Y6 `gameSessionManager.ts:209` 在游戏成功启动后会调用 McpHub `pingMcpServers()` 尝试重连断开的服务；停止游戏后运行时连接可能变为断开。因此当前流程宜写“游戏启动后检查运行时连接，未恢复时刷新/重连”，不应机械保留旧 skill 中“每次启动必定需要人工刷新”的版本假设。外部 Agent 仍按各自 MCP 客户端重连入口处理。

本次 R1 返回 `serverInfo.name=y3-helper`、`version=1.0.0`、`protocolVersion=2025-03-26`；R2 返回 `serverInfo.name=game_editor_mcp`、`version=1.0.0`、`protocolVersion=2024-11-05`。这些是服务协议标识，不能用服务的 `1.0.0` 推断扩展或编辑器安装版本。

## 当前工具能力

### 助手服务：9 个工具

以下名称同时由 Y6 注册代码和 R1 实际工具目录核验。除目录读取外，没有实际调用。

| 工具 | 能力 | 前置和限制 |
| --- | --- | --- |
| `launch_game` | 启动当前项目游戏 | 需要有效项目、启动地图与调试环境 |
| `get_game_status` | 查询游戏状态和已连接客户端 | 多开时检查 `clientSlot`，不能凭端口猜当前游戏 |
| `execute_lua` | 在已运行游戏执行 Lua | 游戏客户端必须连接；是运行操作，不是静态代码检查 |
| `quick_restart` | 快速重启游戏 | 需要连接的客户端；实现有重连超时结果 |
| `stop_game` | 停止游戏 | 会停止当前或指定客户端 |
| `get_logs` | 获取游戏日志 | 区分地图/客户端，返回范围以参数和工具结果为准 |
| `capture_screenshot` | 获取运行游戏截图 | 需要游戏窗口和客户端；未实测截图画面 |
| `read_problems_lua` | 获取项目 Lua 诊断 | 调用 `vscodeOperator_readProblems`，依赖 `sumneko.vscode-operator`；当前实现返回 warning 及以上，最多 100 项，空结果不等于运行时没有问题 |
| `get_ui_canvas` | 获取当前地图的 UI 节点树 | 输出节点名、类型、UID，支持 `nodePath` 和 `depth`；不等于视觉验收 |

### 旧正文 17 个编辑器工具的迁移核验

R2 实际工具目录中 14 个旧名称仍存在，3 个不存在。Y8 当前源码与该结论一致。

| 旧正文名称 | 当前结果 | 新正文处理 |
| --- | --- | --- |
| `preview_ui` | R2、Y8 无此工具 | 移除旧名；需要查看 UI 时使用当前 `screenshot_ui` 和工具目录 |
| `screenshot_ui_preview` | R2、Y8 无此工具 | 改为 `screenshot_ui` |
| `run_game_and_screenshot` | R2、Y8 无此工具 | UI 编辑器截图改用 `screenshot_ui`；游戏启动/截图分别用助手 `launch_game`、`capture_screenshot` |
| `delete_screenshot` | 存在于 `y3editor` | 用于临时截图清理，不是通用文件删除工具 |
| `hotfix_ui_editor` | 存在于 `y3editor` | UI JSON 改动后的编辑器刷新 |
| `hotfix_object_editor` | 存在于 `y3editor` | 物编 JSON 改动后的编辑器刷新 |
| `save_editor` | 存在于 `y3editor` | 编辑器保存操作，和外部文件写入/热更分别处理 |
| `get_editor_log` | 存在于 `y3editor` | 编辑器日志，与助手 `get_logs` 的游戏日志区分 |
| `get_official_editor_model` | 存在于 `y3editor` | 按 ID 查询官方模型资源信息 |
| `get_official_editor_sound` | 存在于 `y3editor` | 按 ID 查询声音资源信息 |
| `get_official_editor_effect` | 存在于 `y3editor` | 按 ID 查询特效资源信息 |
| `get_official_editor_icon` | 存在于 `y3editor` | 按 ID 查询图标资源信息 |
| `get_official_resource_associate_match` | 存在于 `y3editor` | 查询资源联想/配套资源 |
| `download_editor_model_resource` | 存在于 `y3editor` | 下载模型资源 |
| `download_editor_effect_resource` | 存在于 `y3editor` | 下载特效资源 |
| `download_editor_icon_resource` | 存在于 `y3editor` | 下载图标资源 |
| `download_editor_sound_resource` | 存在于 `y3editor` | 下载声音资源 |

`screenshot_ui` 的实际 schema 提供 `ui_path` 和 `delay_ms`，后者默认 1000 毫秒。Y8 实现会确保 UI 编辑器打开、按 layer 切换、居中并缩放到 33%、等待后截取屏幕。实际目录也要求编辑器窗口可见；该工具会改变编辑器当前视图，不能描述成没有界面状态前提的离线渲染。

R2 当前的 59 个工具还覆盖 `get_map_info`、`get_ui_list`、`import_ui`/`export_ui`、`get_object_editor_list`、`import_object_editor`/`export_object_editor`、导入本地模型/图标、地形读取与批处理、实体创建删除、点/区域/路径以及 `import_eca`。这证明运行实例公布了这些接口，不能据此声称模板/地形/导入流程已全部实测。实际运行实例比本机 `kk8-engine` 编辑器 MCP 工作树的工具列表更丰富，应以当前客户端获取的 schema 为准。

### skill、MCP 工具和测试能力

Y11 的 skill 是执行指引/流程资产；MCP 工具由服务公开，两者不能互称。MCP 本身不“新增 skills”。

配置包实际包含 11 个 skills：`y3-game-spec`、`y3-env-setup`、`y3-ui-pipeline`、`y3-ui-generator`、`y3-lua-pipeline`、`y3-lua-review`、`y3-obj-edit`、`y3-auto-test`、`y3-gen-terrain-from-image`、`y3-terrain-template`、`y3-template-export`。来源：本机目录与 Y11；不是完整的产品未来承诺。

Y11 把 UI 需求路由到 `y3-ui-pipeline`，Lua 需求路由到 `y3-lua-pipeline`，物编查询生成修改路由到 `y3-obj-edit`。自动测试 skill 描述了测试计划、UI 结构、Lua 诊断、运行时执行、游戏日志、UI 点击和截图存证，因此 `CHANGELOG.md` 的“自动化测试能力”有配置包证据。但报告中必须区分静态检查、实际运行、视觉验证和未执行项，不能把“AI 已生成代码”当作测试通过。

Y11 的 MCP 规则要求外部 JSON 修改后先热更、等待编辑器同步、再保存；其当前规则给出 3 秒等待。异步 UI/物编导入另有串行完成确认要求，固定睡眠不是导入完成信号。规则也要求 MCP 超时或连续失败停止该测试流程。教程可以保留这些具体的状态/验收约束，并标明按当前工具结果判断完成，避免承诺“生成后全自动成功”。

## 外部 Agent 的最短接入路径

以下是根据官方客户端文档与 Y3 源码组合出的**待用户环境验证示例**。本次没有执行 `mcp add` 或写入任何真实 Agent 配置。示例面向与 Y3 编辑器同一 Windows 主机上的原生客户端。

1. 使用 Y3开发助手打开正确的、已初始化的工程，保持需要的编辑器进程打开；查看“功能 > MCP Server”，必要时启动。
2. 先添加 `y3-helper` 和 `y3editor`，检查连接及真实工具目录；需要游戏 UI 自动测试时再配置 `y3runtime` 并在游戏运行后验证。
3. 让 AI 读取项目说明和任务相关 Y3 知识；工具连接不会自动迁移 `.y3maker` 规则和 skills。
4. 使用一个小任务完成“读取项目 > 修改 > 静态检查 > 游戏运行/日志 > 人工或截图验收”，分别记录结果。

### Claude Code HTTP 配置

C4 官方语法为 `claude mcp add --transport http <name> <url>`。可以显式使用 `--scope local`，这是当前项目对应的用户本地配置；`--scope project` 写工程 `.mcp.json`，需要项目服务器信任/批准。不要把 Y3Maker 的 `type: streamableHttp` 原样复制到 Claude JSON；当前 Claude 接受 `http` 或别名 `streamable-http`。

```powershell
claude mcp add --transport http --scope local y3-helper http://127.0.0.1:8766/mcp
claude mcp add --transport http --scope local y3editor http://127.0.0.1:8765/mcp
claude mcp add --transport http --scope local y3runtime http://127.0.0.1:8767/mcp
claude mcp list
claude mcp get y3-helper
```

C4 明确 `Added ...` 只说明配置已写入；`Connected`、`Failed to connect`、`Pending approval` 等才说明后续连接/配置状态。C2、C4 的面板 `/mcp` 可管理现有服务和重连。安装扩展并不把 `claude` 放到终端 PATH，要执行这些 CLI 命令需另装 CLI。

### Codex HTTP 配置

O4 规定用户配置为 `~/.codex/config.toml`；受信任项目可用工程 `.codex/config.toml`。桌面、CLI、IDE 在同一 Codex 主机共享配置。应合并到已有文件而非整文件覆盖；不要把 Y3Maker 的 JSON 直接粘进 TOML。

```toml
[mcp_servers.y3-helper]
url = "http://127.0.0.1:8766/mcp"

[mcp_servers.y3editor]
url = "http://127.0.0.1:8765/mcp"

[mcp_servers.y3runtime]
url = "http://127.0.0.1:8767/mcp"
```

O4 给出 `codex mcp list` 查看配置，会话 `/mcp` 查看活跃服务。不要把它们当成“配置存在即地图功能可用”的证明。运行时端点应在需要且游戏已运行时验收。

### Y3 项目规则/skills 迁移

Y2 在 2026-09-04 更新的 README 推荐 Y12。该项目区分 `sync-y3maker-to-codex` 和 `sync-y3maker-to-claude`：先 inventory，再 dry-run，再 apply 和 verify；明确选择 MCP 作用域，保留原始 `.y3maker`，用 manifest 跟踪后续同步。其 README 示例使用 Node 脚本，因此“执行该迁移工具”可以有 Node 依赖，这和“使用 Y3Maker 聊天”不是同一依赖范围。

本次只核验该 README，未审计整个迁移脚本，未安装或执行该项目。可把它作为高级迁移入口，并保留预览/验证步骤；不能把“一键迁移成功”写成已实测结果。

## Claude Code 安装和认证修正

| 事实 | 来源 | 对旧文的修改 |
| --- | --- | --- |
| 当前官方支持 Windows 10 1809+ / Windows Server 2019+。 | C1 | 去掉没有测量依据的“Win11 显著优于 Win10”；按原生 Windows 路径编写安装步骤。 |
| 推荐原生安装，也提供 `winget install Anthropic.ClaudeCode`。原生 Windows 可用 PowerShell；Git for Windows 当前为推荐/可选，用于 Bash 工具。 | C1 | 不再强制 `sudo npm install` 链路；按所选安装路径说明依赖。 |
| VS Code 官方扩展 ID `anthropic.claude-code`；要求 VS Code 1.94.0+。扩展自带私有 CLI 供聊天面板使用。 | C2 | 扩展入门无需先装 Node 和全局 Claude CLI。 |
| 若要在终端运行 `claude` 或 `claude mcp add`，需要额外的独立 CLI 安装。 | C2 | 把终端路径作为可选分支，解释其用途。 |
| 可从打开文件后的编辑器右上角 Spark 图标，或命令面板 Claude Code 相关命令打开。 | C2 | 不把“必须右上角有图标”作为唯一入口；没打开文件时可用命令面板。 |
| 首次面板选择 Sign in 并在浏览器授权；CLI 首次 `claude` 打开浏览器，成功提示 `Login successful`。 | C2、C3 | 不再教读者修改 `.claude.json` 的 `hasCompletedOnboarding` 绕过引导。 |
| 认证支持 Claude 订阅/组织账号、Console 以及按文档配置的云平台；`ANTHROPIC_API_KEY` 可用于 API key 路径。 | C3 | 不把任意中转商购买令牌作为通用必需步骤；具体供应商按其正式文档配置。 |

官方 Windows CLI 命令示例（仅引用，未执行）：

```powershell
irm https://claude.ai/install.ps1 | iex
```

或选择包管理器路径：

```powershell
winget install Anthropic.ClaudeCode
```

C1 对 WinGet 安装说明手工升级；不要把所有安装方式写成自动更新。

## Codex 安装和认证修正

先执行了官方域搜索，再实际读取 O1-O5 的正文，遵循 OpenAI Docs 技能的来源顺序。搜索返回质量有限，但官方 Markdown 页面成功获取。最初 curl 证书吊销检查错误在使用 `--ssl-no-revoke` 后消除；一次 CLI 页面连接重置后从官方 `learn.chatgpt.com` 的对应页面取得正文。没有使用搜索摘要替代正文。

| 事实 | 来源 | 对旧文的修改 |
| --- | --- | --- |
| Windows 可原生使用桌面、CLI 和 IDE；当前官方建议默认原生 Windows sandbox。 | O1 | 按 Windows 原生路径编排。O1 把 Windows 11 列为推荐，近期更新的 Windows 10 为 best effort，这与 Claude 的要求分别说明。 |
| 官方 VS Code 扩展为 `openai.chatgpt`，入口 `Codex: Open Codex Sidebar`。 | O2；O6 本机清单一致 | 修复“Codexs”、混入 Claude 扩展的安装段落，以及模糊的“ChatGPT/CodeX 相关扩展”。 |
| IDE 入门是安装扩展、打开、登录；没有把全局 npm 安装 CLI 列为此前置步骤。 | O2 | 先完成扩展最短路径，终端用户才进入 CLI 分支。 |
| 本机扩展版本 `26.901.22334` 的 VS Code 引擎要求为 `^1.96.2`。 | O6 | 不把它与 Y3/Claude 扩展要求混成同一最低版本；建议近期稳定版。 |
| 本地工作支持 Sign in with ChatGPT 和 API key；IDE 的 API key 按钮为 Use API Key。CLI 可运行 `codex login`，认证状态为 `codex login status`。 | O3 | 官方认证作为标准路径；API key 与订阅权限不同，不承诺免费额度或固定价格。 |
| CLI 与扩展共享登录缓存，可用 `auth.json` 或系统凭据存储；手工制作 `auth.json` 不是官方新手流程。 | O3 | 移除教程中手工创建含凭据 JSON 的默认方案；不提交/展示真实认证缓存。 |
| 本机官方扩展配置定义没有 `chatgpt.apiBase`、`chatgpt.config.apiKey`；当前官方自定义模型/MCP 配置使用 Codex 配置体系。 | O6、O3、O4 | 删除未证实的 VS Code 设置示例，避免表面无报错但实际上不生效。 |
| CLI 官方提供 Windows 独立安装器，npm 是另一可选路径。 | O5 | 不把 Node 18+ 当所有 Codex 安装方式的共同前提；版本要求以所选安装器/包元数据为准。 |

O5 的 Windows CLI 示例（仅引用，未执行）：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

O5 的 npm 备选是 `npm install -g @openai/codex`。教程只需选一个主要安装路径，避免让读者误以为每个方法都要执行。

### AGENTS.md 项目加载范围补充

2026-09-08 再次进行官方域搜索，并实际读取 O7 官方目录与正文。官方目录的 Agent Configuration 分类列出当前地址 `https://learn.chatgpt.com/docs/agent-configuration/agents-md.md`，正文 HTTP 200，标题为“Custom instructions with AGENTS.md”。因此新教程可将旧的 `/codex/guides/agents-md` 引用更新为 O7 的当前页面地址。

O7 明确说明：

- Codex 开始工作前读取 `AGENTS.md`。发现指引发生在启动时，每次运行建立一次指令链。
- 项目范围从项目根目录（通常为 Git 根目录）沿路径走到当前工作目录；无法找到项目根时，只检查当前目录。
- 路径中每一层目录依次检查 `AGENTS.override.md`、`AGENTS.md`，再检查配置的后备文件名；每个目录最多选取一个文件。
- 指引从根目录向当前目录合并，较近目录的指引在冲突时覆盖前面的指引。它不是递归扫描所有子目录的 `AGENTS.md`。
- 另有全局 Codex home 范围，默认 `~/.codex`；同样优先 `AGENTS.override.md`，再用 `AGENTS.md`。空文件被忽略，指令合并受配置字节上限约束。

这项证据只证明文件约定和加载范围，不证明 `.y3maker` 迁移内容会自动生效；本次未创建或修改任何真实 `AGENTS.md`，也未启动新的 Codex 模型会话做加载测试。

## 未完成的运行验证与发布边界

### 新手安装顺序补充核验

2026-09-08 再次核对，新增以下证据，用于“准备 Y3 项目”的详细安装教程：

- 2026-09-09 用户纠正安装流程：从 [Y3 开发者学院](https://163.com/learn/)点击“下载编辑器”，下载安装后使用安装程序自动创建的快捷方式启动。当前教程采用此流程，撤下来源旧手册中的平台安装和手动查找程序步骤；本轮未执行编辑器安装。
- [VS Code Windows 安装文档](https://code.visualstudio.com/docs/setup/windows)明确推荐 User setup，安装器文件名前缀为 `VSCodeUserSetup-`，通常无需管理员权限。配合现有 Windows 安装选项及中文语言包截图编写具体步骤。
- [Y3 开发助手扩展页](https://marketplace.visualstudio.com/items?itemName=sumneko.y3-helper)确认名称、发布者与扩展 ID；[官方最新发布页](https://github.com/y3-editor/y3-helper/releases/latest)及 GitHub release API 此次返回 `v2.1.4`，附件为 `y3-helper-v2.1.4.vsix`。
- `y3-helper/src/codemaker/index.ts` 在扩展启动时创建面板和 API 服务，注册 `y3-helper.codemaker.open`；`src/mainMenu/pages/codemaker.ts` 的入口没有以 Lua 库初始化为显示前提。
- `src/codemaker/utils/executeFunction.ts` 将 `run_terminal_cmd` 派发到内置终端实现，`utils/terminal/index.ts` 使用 Node 子进程执行本机命令；它不以 Git、Lua 库或 MCP 连接为前置条件。命令执行仍需满足面板的用户确认与本机权限要求。
- `src/codemaker/apiServer.ts` 使用扩展运行环境的 `fork`，打开 Y3Maker 不要求读者另装全局 Node.js；缺少 `.y3maker` 时规则可为空，不能据此阻止首次配置模型、使用内置工具准备 Git。

因此新手路线使用内置 Y3Maker：先安装三个图形界面组件并打开工程，配置模型服务，使普通对话和内置终端可用；随后用一段提示词统一准备 Git、Python 3、Node.js LTS，初始化新项目，再检查 Y3 资料与 MCP。三项均必装是用户明确要求的教程标准，不代表打开 Y3Maker 本身以三项安装完成为前提。未在全新 Windows 环境端到端执行安装。

### 运行验证范围

- 未调用付费模型，未验证用户账号、供应商配额、地区、定价和真实 API key，因此不评价具体模型/中转商效果。
- 未启动/重启/停止游戏，未生成 UI、Lua、物编或地形，未截图，所以“工具存在”不能改写为“这个例子已运行成功”。
- 8767 当前未监听，没有核验运行时工具目录；`trigger_ui_touch_event_by_path` 和 `get_ui_center_by_path` 仅有 Y11 配置包规则/skill 声明证据。
- 8765 实际发布实例有 59 个工具，本机引擎工作树工具定义较旧；新增接口不宜从旧源码猜参数，要使用当前客户端 schema。
- `.y3maker` 自定义配置合并、外部迁移脚本、原生 Windows 客户端配置没有实测；应作为明确的后续环境验收项。
- 本次没有任何教程正文变更；研究产物仅本文，供主任务实施使用。
