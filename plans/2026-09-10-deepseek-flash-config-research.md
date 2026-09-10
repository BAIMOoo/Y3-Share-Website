# DeepSeek Flash 配置核实

核实日期：2026-09-10。范围：DeepSeek 官方 API 与 CC Switch 当前 main 源码；未使用付费密钥发起实际请求。

## 型号结论

教程经用户确认采用 **DeepSeek V4 Flash**，API 模型 ID 为 **`deepseek-v4-flash`**。

后续浏览器核实更正：2026-09-10 在已登录的官方平台 Usage 页面看到 V4.1 Flash 公告，说明 V4 Pro 将于 2026-09-14 下线并转向 V4.1 Flash。此前仅凭公开文档未检索到该名称就判断“官方未列出”不完整。公告未提供新的 API 模型 ID，不能据此猜写 `deepseek-v4.1-flash`；按用户要求，教程不讨论该命名差异。

- [DeepSeek 首次调用](https://api-docs.deepseek.com/)
- [DeepSeek 模型与价格](https://api-docs.deepseek.com/quick_start/pricing)

## Codex：现在可以原生 Responses 直连

DeepSeek 官方已支持 Responses API，官方 Codex 集成页直接使用 `wire_api = "responses"`，端点 `https://api.deepseek.com/`，模型 `deepseek-v4-flash`。不能写成“DeepSeek 仅有 Chat Completions，必须转换协议”。

- [官方 Responses API](https://api-docs.deepseek.com/guides/responses_api)
- [官方 Codex 集成](https://api-docs.deepseek.com/quick_start/agent_integrations/codex)

CC Switch 当前 Codex DeepSeek 预设源代码对应：

| 项目 | 值 |
| --- | --- |
| 名称 | DeepSeek |
| API Key 页面 | `https://platform.deepseek.com/api_keys` |
| Base URL | `https://api.deepseek.com` |
| 默认模型 | `deepseek-v4-flash` |
| 上游格式 | `openai_responses`（界面 Responses 原生） |
| 上下文 | `1048576` |
| 思考档位 | `low`、`high`、`max` |

源码备注：后端按 deepseek.com 域名镜像官方模型目录，目录需要 Codex CLI 0.144.0 或更新。使用新建的原生 Responses 预设，无需打开本地路由与 Codex 接管。

- [CC Switch Codex 预设源码](https://github.com/farion1231/cc-switch/blob/main/src/config/codexProviderPresets.ts)

已另查 GitHub 最新正式发布版本为 **v3.20.2**，并读取该固定 tag 的预设源码，确认上述 Responses 格式、默认 Flash 模型、模型目录与思考档位均已发布，不是仅 main 中尚未发布的改动。

- [正式发布 v3.20.2](https://github.com/farion1231/cc-switch/releases/tag/v3.20.2)
- [v3.20.2 固定版本 Codex 预设](https://github.com/farion1231/cc-switch/blob/v3.20.2/src/config/codexProviderPresets.ts)

CC Switch [DeepSeek 路由攻略](https://github.com/farion1231/cc-switch/blob/main/docs/guides/codex-deepseek-routing-guide-zh.md)说明：3.19.1 起新建 DeepSeek 预设为 Responses 原生；旧供应商不会自动迁移，可编辑高级选项把“上游格式”切为“Responses（原生）”。保留 Chat Completions 的旧配置仍需路由，不能仅升级软件就假定转换完成。

**文档过时差异**：当前 [添加供应商手册](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md)仍将 DeepSeek 列在 Chat 类，路由攻略也仍有 “pro 未开放 Codex” 的旧说明。后者已被最新预设源码（注明 2026-08 开通）和官方模型表反驳。教程优先采用官方当前能力及实际预设源码。

## Claude Code：Anthropic 兼容接口

官方配置使用：

```text
ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
ANTHROPIC_AUTH_TOKEN=<DeepSeek API Key>
```

官方集成例子主模型默认 Pro、Haiku 与子代理 Flash。用户要求全程用 Flash，因此教程需将以下字段**全部**设为 `deepseek-v4-flash`：

```text
ANTHROPIC_MODEL
ANTHROPIC_DEFAULT_OPUS_MODEL
ANTHROPIC_DEFAULT_SONNET_MODEL
ANTHROPIC_DEFAULT_HAIKU_MODEL
CLAUDE_CODE_SUBAGENT_MODEL
```

前四项在 CC Switch 预设中存在，默认并非全部 Flash；第五项来自 DeepSeek 官方集成说明，若表单没有独立栏，可在 JSON 编辑器的 env 中添加。全部 Flash 属于根据官方字段进行的教程配置选择，而非逐字复制官方 Pro 示例。

- [DeepSeek 官方 Claude Code 集成](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code)
- [CC Switch Claude 预设源码](https://github.com/farion1231/cc-switch/blob/main/src/config/claudeProviderPresets.ts)
- [DeepSeek Anthropic 兼容接口](https://api-docs.deepseek.com/guides/anthropic_api)

Anthropic 兼容接口会把未知模型自动映射为 Flash，因此“错误模型名也能回复”不能证明配置正确。核验应看配置/模型菜单，而非让模型自报身份。Claude 名称 claude-opus 会映射到 Pro，claude-haiku/claude-sonnet 会映射到 Flash；显式填写全部模型字段可避免混用。

## 验证与截图边界

官方平台创建 API Key，确认余额，再回 CC Switch 添加对应应用的 DeepSeek 供应商、填写 API Key 与模型、启用，重启对应客户端后做简单文本请求。API 用量按官方平台规则计费；未实际调用前不能宣称连接测试已通过。DeepSeek V4 Flash 普通型号不是视觉模型，勿用图片提问作为该教程的最小连通性测试（官方另列 `deepseek-v4-flash-vision-exp`）。

截图应使用隐藏真实密钥的界面；如采用自制示意图或项目官方示例图，必须清楚标注，不能称作本机实测成功画面。
