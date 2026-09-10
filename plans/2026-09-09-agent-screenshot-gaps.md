# Agent 教程截图交付与缺图清单

日期：2026-09-09。范围：`docs/Y3AI开发教程/03-Agent部署教程/Agent安装教程/` 下 5 篇教程，以及 `CC Switch安装与使用.md`（页面标题“Codex/Claude配置”）。

## 本次结果

本次新增 **8 张本机 Chrome 网页实拍**，在 6 篇教程中共引用 10 次（两个扩展教程共用 VS Code 下载图；Codex App 与配置教程共用 GitHub Assets 通用入口图）。新增图片位于 `docs/Y3AI开发教程/03-Agent部署教程/img/`，均裁剪到相关内容并添加红框、编号及中文说明。图中没有账号、密钥或内部地址。

**本次没有取得 Windows 原生应用的新截图。** CC Switch 窗口已找到，但原生截图工具在恢复窗口并重新选择后仍报 `SetIsBorderRequired failed: 不支持此接口 (0x80004002)`。浏览器截图不受这一错误影响。没有用网页或官方旧图冒充本机应用截图，也没有把安装说明截图标为安装成功。

原有 7 张图片保留：4 张 VS Code 扩展图片、3 张 CC Switch 官方图片。下文分别标明待替换内容。

## 新增图片与对应操作

| 图片 | 对应文档与步骤 | 实拍来源 |
| --- | --- | --- |
| [codex-official-download.png](../docs/Y3AI开发教程/03-Agent部署教程/img/codex-official-download.png) | Codex App：官方网页下载入口和备用 winget 命令位置 | [官方 Windows 页面](https://learn.chatgpt.com/docs/windows/windows-app)，由教程原链接跳转 |
| [codex-mirror-assets.png](../docs/Y3AI开发教程/03-Agent部署教程/img/codex-mirror-assets.png) | Codex App：Assets 内 x64 / arm64 `.Msix` 文件识别 | [镜像发布页 26.903.61454](https://github.com/Wangnov/codex-app-mirror/releases/tag/codex-app-26.903.61454) |
| [node-download.png](../docs/Y3AI开发教程/03-Agent部署教程/img/node-download.png) | Codex CLI：Node.js LTS、Windows 架构和 MSI 下载入口 | [Node.js 下载页](https://nodejs.org/en/download) |
| [vscode-download.png](../docs/Y3AI开发教程/03-Agent部署教程/img/vscode-download.png) | 两篇 VS Code 扩展教程：Windows / User Installer 架构选择 | [VS Code 下载页](https://code.visualstudio.com/download) |
| [claude-install-page.png](../docs/Y3AI开发教程/03-Agent部署教程/img/claude-install-page.png) | Claude CLI：备用 Native Install / Windows PowerShell 命令位置 | [Claude Code 安装页](https://code.claude.com/docs/en/setup) |
| [cc-switch-assets.png](../docs/Y3AI开发教程/03-Agent部署教程/img/cc-switch-assets.png) | Codex/Claude配置：Windows MSI、便携包和 ARM64 文件选择 | [CC Switch v3.20.2](https://github.com/farion1231/cc-switch/releases/tag/v3.20.2) |
| [github-assets-toggle.png](../docs/Y3AI开发教程/03-Agent部署教程/img/github-assets-toggle.png) | Codex App 与配置教程：展开 Assets 的通用入口 | Codex 镜像发布页，图注已明确跨页面复用 |
| [codex-mirror-links.png](../docs/Y3AI开发教程/03-Agent部署教程/img/codex-mirror-links.png) | Codex App：x64 / ARM64 备用镜像直链 | 同一镜像发布页的 Latest quick downloads 区域 |

上面只完成“入口和文件选择”画面，不代表已完成下载、安装、登录或连接验证。图片上的版本号为拍摄时示例。

## 缺图原因分类

- **已安装跳过**：按用户约定不卸载、重装、重置。只读检查发现 Node.js、VS Code、Codex 和 Claude 命令入口存在；CC Switch 与桌面应用正在运行。命令入口存在不等于本次执行过版本验证。
- **工具故障**：Windows 原生窗口截图接口不兼容；CC Switch 已复现并按工具指导重选窗口重试一次。其他原生窗口没有逐个重复尝试相同截图接口。
- **需要人工操作**：首次登录、终端执行画面、真实启用结果，或当前工具能力不允许自动操作的界面。后续补拍时保留本轮约定，不改变现有服务商或认证状态。
- **未指定服务商**：没有一个可代表所有读者的服务商控制台，不使用用户私人账号的后台冒充通用流程。

## 逐项缺图：Agent 安装教程

| 文档 | 缺少的具体画面 | 状态 / 原因 | 后续补拍要求 |
| --- | --- | --- | --- |
| Codex App · 官方方式 | Microsoft Store / 应用安装程序的安装过程与完成画面 | 已安装跳过 | 在未安装环境拍摄；本次已有图只覆盖官方网页入口 |
| Codex App · winget 方式 | 打开 PowerShell、输入安装命令、执行及完成结果 | 已安装跳过；需要人工操作 | 本次官方网页中的命令不算终端实拍 |
| Codex App · 镜像步骤 2 | Windows 设置 > 系统 > 关于 > 系统类型 | 工具故障 | 只保留系统类型，遮盖设备名称、设备 ID 等信息 |
| Codex App · 镜像步骤 4 | 双击 MSIX 后的安装窗口、安装完成 | 已安装跳过 | 不在当前电脑重装应用 |
| Codex App · 备用命令 | `Add-AppxPackage` 输入实际路径及执行结果 | 已安装跳过；需要人工操作 | 使用示例用户路径；不伪造输出 |
| Codex App · 完成检查 | 从开始菜单启动、成功打开桌面应用 | 需要人工操作；工具故障 | 使用空白或无私人任务的界面 |
| Codex CLI · Node.js | MSI 安装向导和完成画面 | 已安装跳过 | 已拍官网下载入口，安装过程仍缺图 |
| Codex CLI · 开始菜单 | 搜索并打开 PowerShell | 需要人工操作 | 与 Claude CLI 共用一张即可 |
| Codex CLI · 环境检查 | `node --version`、`npm.cmd --version` 的真实输出 | 需要人工操作 | 未执行该验证；只有命令入口存在的只读证据 |
| Codex CLI · npm 安装 | `npm.cmd install -g @openai/codex` 过程和完成 | 已安装跳过 | 不重新全局安装 |
| Codex CLI · 验证 / 排错 | `codex --version`、重新打开终端后识别命令 | 需要人工操作 | 不把官方说明或手绘终端当作执行截图 |
| Codex VS Code · 基础安装 | VS Code 安装 / 更新向导 | 已安装跳过 | 下载入口已拍；更新和安装结果未拍 |
| Codex VS Code · 扩展安装 | Ctrl+Shift+X 搜索、发布者 OpenAI、扩展标识、安装状态 | 已有旧图，待本机截图替换 | 保留 `image26.png`；未核实本机扩展安装状态，不标为“已安装” |
| Codex VS Code · 打开面板 | 侧栏入口、Ctrl+Shift+P 搜索命令、侧栏打开结果 | 已有旧图，待本机截图替换；需要人工操作 | 保留 `image27.png`；命令面板备用入口仍缺图 |
| Codex VS Code · 兼容提示 | 扩展要求更新 VS Code 的提示与更新入口 | 需要人工操作 | 当前没有复现该异常，不人为制造 |
| Claude CLI · 开始菜单 | 搜索并打开 PowerShell | 需要人工操作 | 可与 Codex CLI 共用 |
| Claude CLI · WinGet 安装 | `winget install Anthropic.ClaudeCode` 过程与完成 | 已安装跳过 | Claude 命令入口存在，本次未重装 |
| Claude CLI · 验证 / 排错 | 重开 PowerShell、`claude --version` 和成功输出 | 需要人工操作 | 命令入口存在不等于该步骤已实拍 |
| Claude CLI · 备用安装 | 执行原生安装器的过程与完成 | 已安装跳过；需要人工操作 | 官方 Native Install 页面已拍，真实执行结果仍缺 |
| Claude VS Code · 基础安装 | VS Code 安装 / 更新过程 | 已安装跳过 | 与另一扩展教程共用缺图项 |
| Claude VS Code · 扩展安装 | 搜索 Claude Code、发布者 Anthropic、标识、安装 / 重载状态 | 已有旧图，待本机截图替换；工具故障 | 保留 `image25.png`；未核实本机扩展状态 |
| Claude VS Code · 打开工程 | 打开自己的工程和一个文件 | 工具故障 | 使用示例工程，遮盖内部项目内容 |
| Claude VS Code · 打开面板 | 编辑器右上角 Claude 图标、命令面板备用入口、面板打开结果 | 已有旧图，待本机截图替换；工具故障 | 保留 `image24.png`；命令面板备用入口仍缺图 |

## 逐项缺图：Codex/Claude配置

| 章节 | 缺少的具体画面 | 状态 / 原因 | 后续补拍要求 |
| --- | --- | --- | --- |
| 1 · MSI 安装 | 双击 MSI、安装向导、完成 | 已安装跳过 | CC Switch 已在运行 |
| 1 · 便携版 | 完整解压到目录、启动程序 | 已安装跳过 | 不另建第二套运行环境来复现替代安装方式 |
| 1 · 打开与语言 | 开始菜单启动、齿轮入口、中文语言选项 | 工具故障 | 不为截图修改当前语言设置 |
| 2 · 主界面 | Windows 下应用选择、添加供应商、当前启用标记 | 已有官方旧图，待本机截图替换；工具故障 | 保留 `main-zh.png`，正文继续注明为 macOS 窗口 |
| 2 · 首次导入 | 导入已有 CLI 配置的首次提示或入口 | 需要人工操作 | 不重置应用或配置以触发首次提示 |
| 3 · 服务商准备 | 额度 / 余额、创建密钥入口、接入说明里的地址和模型 ID | 未指定服务商 | 确定具体服务商后单独拍摄；不展示真实密钥 |
| 4 · Codex 第三方 | Codex 应用下添加按钮、预设 / 自定义选择 | 工具故障 | 不用 Claude 的旧表单图替代 Codex 表单 |
| 4 · Codex 表单 | 名称、API Key、Base URL、模型 ID 填写位置 | 工具故障 | 示例值，截图后取消，不保存或启用 |
| 4 · 保存与启用 | 保存入口、返回列表、启用按钮和当前状态 | 工具故障；需要人工操作 | 只展示现有状态及按钮；图注明确未实际切换 |
| 4 · 可选路由 | 本地路由服务与 Codex 接管入口 | 工具故障 | 只展示位置，不启动服务或接管当前客户端 |
| 4 · 官方账号 | Codex 官方预设选择、保存 / 启用入口 | 工具故障 | 只打开表单；不更换现有供应商 |
| 4 · 官方认证 | ChatGPT 登录、`codex login`、异常时退出 / 重新登录 | 需要人工操作 | 不退出当前账号，不展示验证码或认证凭据 |
| 4 · 重启客户端 | CLI 重开终端、App 完全退出重开、VS Code 重载窗口、新会话 | 需要人工操作 | 不打断用户正在进行的任务 |
| 5 · Claude 第三方 | Claude 应用选择、添加预设 / 自定义配置 | 已有官方旧图，待本机截图替换；工具故障 | 保留 `add-zh.png` |
| 5 · Claude 表单 | 名称、API Key、地址、模型映射、添加按钮 | 已有官方旧图，待本机截图替换；工具故障 | 保留 `provider-form.png`；模型映射未单独配图；示例表单截图后取消 |
| 5 · Claude 启用 | 返回列表、启用状态、重开客户端、新会话 | 工具故障；需要人工操作 | 不真实启用新配置 |
| 5 · 官方账号 | Claude Official 预设入口、Agent 浏览器登录 | 工具故障；需要人工操作 | 预设入口与真实认证分开标注 |
| 6 · 编辑与切换 | 编辑已有供应商、修改字段、保存 / 启用入口 | 工具故障 | 不打开可直接暴露真实密钥的内容；不提交修改 |
| 6 · 托盘菜单 | 右键 Windows 托盘，选择 Agent 和供应商的子菜单 | 工具故障 | 截图到菜单即可，不执行切换 |
| 6 · 切回官方 | 官方卡片入口、登录状态检查 | 工具故障；需要人工操作 | 不为截图切回官方账号 |
| 7 · 验证连接 | 当前启用标记、新会话、测试提问及真实回复 | 工具故障；需要人工操作 | 本次未发送测试请求，未取得成功对话截图 |
| 7 · 用量核对 | 服务商后台本次请求 / 用量记录 | 未指定服务商 | 与第 3 节选择的同一服务商对应并脱敏 |
| 常见问题 | 401 / 403、429、404 等报错及对应控制台排查 | 需要人工操作；未指定服务商 | 不制造真实故障；将来有对应案例时补拍 |
| 常见问题 | 环境变量冲突、配置目录设置、权限 / 写入错误、默认目录定位 | 工具故障；需要人工操作 | 不打开含密钥的配置内容；仅截必要目录或提示 |

## 原有图片来源与待替换情况

| 原图 | 当前来源记录 | 处理 |
| --- | --- | --- |
| `image24.png`、`image25.png` | 本站原有 Claude 扩展图片，原始外部来源与拍摄版本未记录 | 保留，正文注明为旧图，未冒称本机新图 |
| `image26.png`、`image27.png` | 本站原有 Codex 扩展图片，原始外部来源与拍摄版本未记录 | 保留，正文注明为旧图，未冒称本机新图 |
| `cc-switch/main-zh.png`、`add-zh.png`、`provider-form.png` | 官方仓库提交 `f21e09449a11529341d2251c5ea19cb79e236d2d`，原路径已在教程文末列出 | 保留官方来源，主图继续注明 macOS 外观 |

## 工具限制与复拍边界

原生截图失败发生在 Windows Computer Use 的 `get_window_state`，已完成一次重选窗口后的重试。本次不修改截图工具实现、Windows 设置或应用配置来规避接口错误。

此外，[Computer Use guidance](C:/Users/wb.lixinyan03/.codex/plugins/cache/openai-bundled/computer-use/26.901.51231/docs/guidance.md) 明确要求 “Do not automate terminal applications such as Windows Terminal, Command Prompt, or Windows PowerShell.”、“Do not automate user authentication dialogs.” 和 “Do not automate the ChatGPT desktop app UI or Codex CLI or Codex extensions within Windows apps.”。因此这几类原生操作需要后续人工补拍，不能只靠原生截图接口恢复就全部完成。

## 校验

- 新增 8 张图片均已检查裁剪、编号位置和文字说明；Assets 图的编号已避开展开三角。
- 最终 `npm.cmd run build` 通过，生成 `build/`。仍有既有 Docusaurus 配置弃用、博客作者 / 摘要、浏览器数据过期提示，无构建错误。
- 浏览器访问 6 篇教程，在桌面 1920 px 与手机 390 px 宽度分别检查，共 12 个页面检查通过。滚动触发懒加载后，17 处图片引用（10 处新图、7 处原图）在两个宽度下全部加载成功，无页面横向溢出。
- 已目视检查配置教程桌面和手机排版。检查记录保存在 `.cache-loader/agent-screenshots/qa-desktop.json`、`qa-mobile.json`；页面截图为 `page-desktop.png`、`page-mobile.png`。浏览器尺寸覆盖已恢复。
- 长页面全页截图曾超时，最终使用滚动加载检查与可视区域截图完成验证；没有将超时记作验证成功。
- `git diff --check` 通过。未提交、推送或部署。

本次原始网页截图暂存于 `.cache-loader/agent-screenshots/`；交付用的裁剪标注图在教程 `img/` 目录。`plans/annotate-agent-screenshots.py` 记录了裁剪坐标和标注，可使用 Python 3 + Pillow 在保留原始截图的本机重新生成；没有合成或改写任何应用 UI。

## 2026-09-10 展示调整

按用户反馈删除上述 6 篇教程图片下方的独立斜体说明；来源记录保留于本清单和配置教程文末。Codex 官方下载图裁掉重复的 winget 命令，仅展示下载链接；安装命令继续保留在正文代码块中供复制。前述交付描述记录初版情况，当前展示以本次调整为准。

## 2026-09-10 完整画面与清晰度调整

8 张新增截图改为完整浏览器内容视口，保留周边内容和原始像素尺寸，以无损 PNG 保存，不缩小或放大重采样。删除所有后加的标题及底部解释文字，仅保留红框和编号。Codex 官方页重新拍摄页面顶部，包含标题、导航、侧栏和下载入口，不再出现重复的 winget 命令。6 篇教程的所有图片支持点击查看原图；既有图片的原始清晰度不作虚假提升。原生应用截图缺口仍按前述清单处理。

## 2026-09-10 原图压缩根因与修复

此前关于“无损原图”的表述不准确：原始采集文件虽命名为 `.png`，文件头实际为 JPEG（`ff d8 ff e0`），导出 PNG 无法恢复已丢失的细节。查看原图的浏览器截图只用于验证，没有作为文档图片来源。

现已直接从 8 个原网页画面重新采集真正的 PNG（`89 50 4e 47 0d 0a 1a 0a`）。7 张使用浏览器 2 倍像素密度重新渲染，宽 3810 / 3840 像素；CC Switch 的超长发布页在 2 倍密度下出现截图拼块异常，改用 1905 像素宽的原生 PNG，未放大或锐化充数。完整画面、操作红框和原图链接保留，未加回解释文字。

新采集源位于 `.cache-loader/agent-screenshots-lossless/`；可复核的来源、像素密度和标注坐标保存在 `plans/agent-screenshots-capture.json`。标注脚本现在检查真实 PNG 格式、画面尺寸和空白截图，拒绝将伪装为 PNG 的 JPEG 当作无损来源。浏览器像素密度设置已恢复。
