# Agent 与 Harness 概念调研

调研日期：2026-09-09。范围：LLM 应用中的 agent、agent harness、framework、runtime，以及当前《AI 概念入门》第五节。本文只形成研究结论与修改建议，未修改教程。

## 结论

用户指出原文框架部分更接近 harness，这个判断成立；但不应因此把整章的 Agent 全部改名为 Harness。**Agent 描述能围绕目标采取行动的系统，或某个 SDK 中配置好的行动主体；Harness 描述让这样的主体实际运行的配套软件和策略。** 两者是不同观察角度，不是互相排斥的产品分类。[A1][A2][A3][O1]

当前教程用 Agent 指整体系统，有 Anthropic 官方定义支持，并非概念错误。不过，把这种用法当作唯一标准会让读者读不懂 OpenAI Agents SDK 的 `Agent`，也无法解释 Anthropic 所说的“同一 harness 上的不同 agents”。因此应明确给出系统语境与 SDK/角色语境，而不仅说“边界略有差异”。[A1][A2][O1]

Harness 不应直接等同于任何 agent framework 或仅等同于执行循环。LangChain 的用法更具体：harness 是带预置工具与能力、有明确设计取向的 framework；runtime 更侧重执行、持久化、恢复和流式输出。Anthropic 的长任务 harness 还包括提示策略、进度文件、初始化流程与测试办法。因此，推荐使用“运行支撑层（agent harness）”，注明这只是本文的解释性译法。[A2][L1][L2]

## 一手来源与原文证据

以下引文来自实际打开的官方正文或源码，不以搜索摘要代替原文。页面可能持续更新；文章标注的发表日期不等于当前网页内容全部保持发表时版本。

### A1. Anthropic：Building effective agents

- URL：https://www.anthropic.com/engineering/building-effective-agents
- 页面标注发表日期：2024-12-19；当前页面明确提示部分工具介绍已变化。
- 原文：“‘Agent’ can be defined in several ways.”
- 原文：“Workflows are systems where LLMs and tools are orchestrated through predefined code paths.”
- 原文：“Agents, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage”.
- 原文：“They are typically just LLMs using tools based on environmental feedback in a loop.”

**含义与边界：**这里 Agent 是系统层面的架构概念，强调模型动态影响过程与工具使用，而非单纯生成回答。固定 workflow 也会调用模型、工具，甚至包含模型分类或分解步骤；不能以“有工具”“有循环”“模型参与了一次决策”作为充分判据。文章本身说明有其他定义，不能把其二分法说成行业唯一标准。

### A2. Anthropic：Effective harnesses for long-running agents

- URL：https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- 页面标注发表日期：2025-11-26。
- 原文：“The Claude Agent SDK is a powerful, general-purpose agent harness”.
- 原文：“However, compaction isn’t sufficient.”
- 关键脚注：“We refer to these as separate agents in this context only because they have different initial user prompts.”
- 紧接脚注：“The system prompt, set of tools, and overall agent harness was otherwise identical.”

**含义与边界：**SDK 提供通用 harness，但长任务还需要初始化与后续增量工作两种提示策略，以及功能清单、Git 历史、进度文件、启动脚本和端到端检查。Harness 的设计范围因此不限于调 API、执行工具的那段程序；还包括如何组织上下文、工作环境与行为约束。文章称 initializer agent 与 coding agent 为不同 agent，并不是它们有不同模型或不同执行引擎，甚至系统提示也相同，只是初始用户提示不同。这是“Agent 可以指角色/运行实例，而不专指整套设施”的直接证据。

不能从该文章推出“每个 agent 都必须有多会话记忆、Git 或初始化 agent”；这些是特定长任务实验的设计。

### A3. Anthropic：Agent SDK overview

- 读取入口：https://platform.claude.com/docs/en/agent-sdk/overview
- 入口当前返回 Claude Code Docs 的 Agent SDK 正文。
- 原文：“An agent is an application that completes a task by planning its own steps and calling tools”.
- 原文：“The Agent SDK gives you the same tools, agent loop, and context management that power Claude Code”.
- SDK 对照表原文：“A library that runs the agent loop in your own process”.
- 同表对 Client SDK 的说明：“You implement the tool loop yourself.”

**含义与边界：**进一步支持系统层 Agent 定义，以及“模型提出调用”与“软件驱动循环”的区分。Agent SDK 与普通 API Client SDK 不是同一层抽象。该页也区分托管产品：Managed Agents 由 Anthropic 运行 agent 与 sandbox。因此，harness 不必运行在用户本机；远端托管不会让执行设施消失。

### L1. LangChain：Runtimes, frameworks, and harnesses

- URL：https://docs.langchain.com/oss/python/concepts/products
- Framework 原文：“Agent frameworks provide abstractions that make it easier to get started when building with LLMs.”
- Runtime 原文：“Agent runtimes provide the tooling for running agents in production.”
- Harness 原文：“Agent harnesses are opinionated, batteries-included frameworks with built-in tools and capabilities”.

**该来源的分层：**LangChain 是提供 agent loop、middleware 和模型/工具等抽象的 framework；LangGraph 是 runtime，提供 durable execution、streaming、human-in-the-loop、persistence 等能力；Deep Agents 是带预置工具、提示、子智能体、上下文管理等能力的 harness。页面将 Claude Agent SDK 也列入 harness，将 OpenAI Agents SDK 列入 framework。

**边界：**这是 LangChain 对自家及相关生态的概念分类，不是标准组织发布的强制术语表。页面自己也把 LangGraph 称作“low-level orchestration framework and runtime”，说明这些称谓并非互斥。可以借此说明能力侧重点，不能要求所有厂商严格符合三层命名。

### L2. LangChain：Deep Agents overview

- URL：https://docs.langchain.com/oss/python/deepagents/overview
- 原文：“Deep Agents is an ‘agent harness’.”
- 原文：“It is the same core tool calling loop as other agent frameworks, but with built-in capabilities”.
- 原文：“It uses the LangGraph runtime for durable execution, streaming, human-in-the-loop, and other features.”

**含义与边界：**工具调用循环并不是 harness 独有的区分特征。Deep Agents 的定位建立在循环之外的文件系统、上下文压缩/卸载、子 agent、审批等配套能力上。当前页还明确 task planning 是可选能力，并说明 v0.7 起不再默认启用；不能把“有显式计划工具”设为 harness 或 agent 的必要条件。

### L3. Deep Agents 官方源码：graph.py

- URL：https://github.com/langchain-ai/deepagents/blob/master/libs/deepagents/deepagents/graph.py
- 实际读取：https://raw.githubusercontent.com/langchain-ai/deepagents/master/libs/deepagents/deepagents/graph.py
- 核对位置：`create_deep_agent` 定义、返回类型和最终构建调用；未对整个仓库做实现审计。
- 源码返回类型包含 `CompiledStateGraph`。
- 最终调用：`return create_agent(model, system_prompt=final_system_prompt, tools=_tools, middleware=deepagent_middleware, ...)`。

**含义与边界：**`create_deep_agent` 通过组合模型、工具、指令及 middleware 构造可运行 graph，印证 L1/L2 的分层；返回对象会被命名为 agent，而构造它的库被称为 harness。它不是“Agent = 模型权重”的证据。这里引用动态 master 分支，只用于说明读取时的结构，不据此保证历史版本或未来版本行为。

### O1. OpenAI Agents SDK：Agents

- URL：https://openai.github.io/openai-agents-python/agents/
- 原文：“An agent is a large language model (LLM) configured with instructions, tools, and optional runtime behavior”.
- 原文：“Agent plus Runner lets the SDK manage turns, tools, guardrails, handoffs, and sessions for you.”

**含义与边界：**这里的 `Agent` 是 SDK 中用于定义模型、指令、工具、handoff、guardrails、输出类型等的配置抽象。它不等于不带配置的裸模型，也不单独包含整个运行引擎。与 Anthropic 的系统定义相比，这是 API 抽象粒度不同，不宜宣布其中一家定义错误。

### O2. OpenAI Agents SDK：Running agents

- URL：https://openai.github.io/openai-agents-python/running_agents/
- 原文：“You can run agents via the Runner class.”
- 循环原文：“If the LLM produces tool calls, we run those tool calls, append the results, and re-run the loop.”

**含义与边界：**`Runner` 调用模型、执行工具、处理 handoff、识别最终输出和限制轮数。`Session` 可负责跨调用的会话历史。可以借此说明配置、执行循环、状态管理分别是什么，不应强行把官方没有这样命名的单个 `Runner` 类宣布为“完整 harness”；它承担的是相关执行职责。

### O3. OpenAI Cookbook：Session memory

- URL：https://developers.openai.com/cookbook/examples/agents_sdk/session_memory
- 页面日期：2025-09-09；由主线程实际读取并提供证据。
- 原文：“The session becomes the memory object: you repeatedly call Runner.run(agent, "...", session=session), and the SDK handles context”.

**含义：**作为 O1/O2 的配套实例，说明 Agent 配置、Runner、Session 如何协作。无需依赖已经标记 archived 的 2024 年 Swarm/`run_full_turn` 示例证明现行 API 分工。

### H1. Hugging Face smolagents：Introduction to agents

- URL：https://huggingface.co/docs/smolagents/conceptual_guides/intro_agents
- 由主线程实际读取并提供证据。
- 原文：“AI Agents are programs where LLM outputs control the workflow.”
- 同页将 agency 解释为连续谱，并给 router、tool caller、多步及 multi-agent/code agent 不同等级。

**含义与边界：**它使用“自主程度连续谱”，而非把 Agent 与 workflow 作为绝对互斥的二分类型。因此教程可以采用 Anthropic 的区分帮助入门，但应说明这是本文采用的解释方式，而非统一判定规则。

### B1. Harbor：评测框架与被评测 Agent

- URL：https://harborframework.com/docs
- URL：https://harborframework.com/docs/agents
- 由主线程实际读取并提供证据。
- 原文：“Harbor is a framework for evaluating and optimizing agents and models in container environments.”
- Agents 页区分 external agent 的 `BaseAgent`/`setup`/`run` 与容器中的 installed agent。

**含义与边界：**评测平台负责安排任务、环境与评价，被评测 agent 负责完成任务。`evaluation harness` 与 `agent harness` 可能处于不同层，不要因为都叫 harness 就视作同一个概念。本报告没有核对具体 Terminal-Bench 排行榜的单条成绩，不能对其具体配置作结论。

## 术语对照：按问题区分，而不是按产品名称硬分

| 概念 | 主要回答的问题 | 需要保留的语境限制 |
| --- | --- | --- |
| Model | 根据上下文生成什么回答或行动请求？ | 裸模型与包含托管工具的 API 产品要区分 |
| Agent（系统语境） | 谁围绕目标选择行动、获取反馈并推进任务？ | Anthropic 的架构文章/SDK overview 用法 |
| Agent（SDK/角色语境） | 用哪个模型，以什么指令、工具和角色工作？ | OpenAI `Agent`；Anthropic 两个不同初始提示的 agents |
| Agent loop | 如何反复进行模型调用、执行行动、回传反馈直到停止？ | 是运行机制，不等于完整 harness；workflow 也能有循环 |
| Agent harness | 给 agent 提供怎样的工具、上下文组织、执行控制和工作策略？ | 通常包含多个模块；不是固定的必备功能清单 |
| Framework | 提供什么可复用的构建抽象、集成与接口？ | 宽泛类别；harness 可以是一种 framework |
| Runtime | 如何实际执行、暂停、恢复、持久化和传递事件？ | LangGraph 等用法；和 framework 的词义可能重叠 |
| Evaluation harness | 如何组织环境、任务与评分来评测 agent？ | 属于评测侧，不能直接替代 agent 自身运行设施 |

“Agent = Model + Harness”可以作为某个整体系统的教学近似，不能作为严格定义或唯一分解公式：工具、提示、环境如何计入 harness，各来源不同；一个 harness 可以运行多个 agent，多个 agent 也可以共用同一模型。[A2][L1][O1][O2]

## 对当前教程第五节的评估

目标文件：`docs/Y3AI开发教程/01-AI相关专业名称释义.md`。

### 1. 保留系统定义，但把“参与决策”收紧，并展开另一种用法

当前“由模型参与决策”较宽，固定 workflow 的分类步骤也满足。建议强调：**模型根据目标与反馈动态选择后续行动或任务推进路径，而不只是完成预先写死流程中的一个固定步骤。** 随后明确说明，本文主要用 Agent 指整体系统，但 SDK 中也可指配置后的主体。不要把“系统”改成唯一正确的“模型”，也不要反过来。[A1][O1][H1]

### 2. 将 Harness 的“运行框架”改为带限定的“运行支撑层”

表格、标题和架构图中的译名应一致。明确“这是解释性译法，并非统一术语标准”。可补一句：一些资料把 harness 视作带预置工具与策略的 framework；runtime 则偏执行与状态基础设施。这样保留入门可读性，也避免与 LangChain 等官方 framework 概念混淆。[L1][L2]

### 3. 删除编辑历史表述，并补充策略与配置的作用

“原先用‘代码执行 + 提示词策略’描述的框架部分”不应出现在面向独立读者的成稿里。直接定义 harness。现有模型接入、上下文、权限、状态清单基本正确，但应注明它还可能包含预置工具、系统提示、任务规划或进度交接策略，并非只有底层程序；也并非所有实现必须包含清单全部项目。[A2][L1]

### 4. 给工具循环示例加作用域说明

现有伪代码能正确表达模型生成请求、软件执行、回传结果的分工，可保留。把“一次模型调用”明确为“裸模型的一次生成”，并说明示例展示应用侧执行的工具循环；实际也可由 SDK、远端服务或托管产品驱动。不要让读者误解为每次前端 API 请求只能包含一轮模型推理，或一定要自己手写这个循环。[A3][O2]

### 5. 保留整体系统图，但标明视角并添加一例

现有图“Agent 包含 Model/Harness/Tools”在本文系统视角下合理，不必删除。图注应说明这不是所有 SDK 的类结构，工具也可以随 harness 一起提供。加上“同一 harness 上运行代码编写 agent 与测试 agent，二者可共用模型，但使用不同指令/任务”的例子，就能避免把 agent 与 harness 绑定为一对一关系。[A2][L2][O1]

Terminal-Bench 的提醒可保留，但最好链接具体评测配置文档，并避免把评测平台自身称作被评测 agent 的 harness；本次只核对了 Harbor 框架说明，未核对榜单条目。[B1]

## 可供教程替换的核心段落

以下是研究后建议的成稿片段，不是已经应用到教程的修改：

> 在本文讨论的 LLM 应用中，**Agent（智能体）通常指围绕目标，根据当前信息和行动结果，动态选择下一步行动并推进任务的系统**。例如，修复报错时，它可以先读代码，再决定修改什么、运行什么检查，并根据检查结果继续处理。固定程序也能调用模型和工具；这里强调的是模型能在任务过程中动态选择行动，而不只是完成预先写好的某个步骤。
>
> **Agent harness 是支撑这种运行过程的配套软件与策略**。它组织模型调用和工具执行，管理上下文、权限、状态与停止条件，也可能提供预置工具、提示策略、子智能体和进度交接机制。本文将它解释为“运行支撑层”；这不是行业统一的中文译名。
>
> Agent 还有另一种常见用法：在 OpenAI Agents SDK 等代码中，`Agent` 指配置了模型、指令和工具的主体，实际循环由 `Runner` 驱动。因此，阅读资料时需要先判断它说的是完整系统，还是系统里的某个角色或配置对象。一个 harness 可以支持多个 agent，多个 agent 也可以使用同一模型。
>
> 模型负责生成回答或提出行动请求；运行设施负责按规则执行这些请求、收集结果并继续调用模型。这个过程可以由本地代码、SDK 或远端服务实现。仅在提示词里写“执行后继续”，不会让裸模型自行执行外部操作。

上面的“动态选择”采用系统架构解释，避免把 agency 宣布为严格的 0/1 分类；对希望继续深入的读者，可加链接说明不同社区存在连续谱与不同 API 抽象。[A1][H1][O1]

## 证据限制与后续使用

- 核心判断由 Anthropic、LangChain 和 OpenAI 当前官方正文交叉支持；不是根据二手文章的术语口号推导。
- `harness` 的确切边界、中文译法、必备组件没有在这些来源中形成统一标准。本报告采用“常见职责 + 指明来源语境”的写法。
- OpenAI Cookbook、Hugging Face、Harbor 的读取由主线程完成，证据在本报告集中整理；其余上述正文与 Deep Agents 源码由研究子任务直接读取。
- 部分 OpenAI 产品页面在主线程请求中返回 403，未将其未读内容作为证据；现有结论使用已成功读取的 Agents SDK 官方文档与 Cookbook。
- 本次仅新增 `plans/` 研究报告，未变动站点文档。若按建议修改教程，需遵循用户要求重新构建并核对本地预览。
