---
title: skills：技能与配套资料
sidebar_position: 3
showLastUpdateAuthor: true
---

# skills：技能与配套资料

`skills/README.md` 是技能索引。每个技能的 `SKILL.md` 说明适用条件、步骤、参考资料与输出要求。

## 一个技能目录包含什么

目录示意（不一定全部存在）：

```text
skills/某个技能/
├─ SKILL.md       任务入口与执行流程
├─ references/    详细参考资料（部分技能使用 reference/）
├─ scripts/       配套执行脚本
├─ templates/     生成内容时使用的模板
├─ data/          字段映射、样本等辅助数据
└─ examples/      用法或产物示例
```

先读 `SKILL.md`，再按引用查资料、准备输入和依赖、运行脚本并验证。

## 需求组织与环境准备

| 技能 | 用途与阅读重点 |
| --- | --- |
| `y3-game-spec` | 协调需求、设计、执行与验证；按当前阶段读配套文档 |
| `y3-env-setup` | 检查环境与依赖；关注检查项、完成条件及标记 |

`y3-game-spec` 的配套资料：

| 文件或目录 | 用途 |
| --- | --- |
| `game-design-guide.md` | 游戏设计阶段的指导 |
| `feasibility-redlines.md` | 评估实现可行性与限制 |
| `phase-2-execution.md` | 执行阶段的详细流程 |
| `patch-mode.md` | 对已有功能进行增量修改的流程说明 |
| `roadmaps/` | 塔防、生存等类型的设计案与执行案参考 |
| `examples/` | 具体设计示例，例如塔防或 UI 面板 |

示例供参考，当前项目产物按 `spec-config.json` 指定的位置保存。

## 物编、UI 与 Lua 开发

| 技能 | 职责 | 重点资料 |
| --- | --- | --- |
| `y3-obj-edit` | 查询、生成、修改单位、技能、物品、魔法效果和投射物 | `reference/` 中对应对象的文档，以及 `data/` 中的辅助数据 |
| `y3-ui-pipeline` | 组织 UI 制作和接入流程 | 入口中的阶段要求与后续技能引用 |
| `y3-ui-generator` | 生成 UI 数据 | `widget_template_config.md`、`icon_config.md`、适配参考和控件模板 |
| `y3-lua-pipeline` | 编写 Lua 逻辑、接入 UI 与游戏对象 | `references/` 中各对象、UI 接口与常见错误文档 |
| `y3-lua-review` | 审查已有 Lua 代码 | 入口中的检查范围与结果处理流程 |

`y3-ui-generator/templates/` 保存按钮、血条、物品槽等 JSON 模板，`scripts/html_to_y3_ui.py` 提供转换；输入与参数见技能说明。

`y3-lua-pipeline/references/` 按需查阅 `unit.md`、`ability.md`、`item.md`、`timer.md`、`ui-events.md`，或 `api_errors.md`、`common_errors.md` 等错题资料。

## 地形、测试与模板导出

| 技能 | 职责 | 重点资料 |
| --- | --- | --- |
| `y3-gen-terrain-from-image` | 根据图片组织地形生成 | `references/` 中的地形基础、纹理与装饰资源资料，`templates/` 中的生成提示模板 |
| `y3-terrain-template` | 复用已有地形模板 | `references/file_manifest.md` 解释文件清单，`library/` 保存模板资源与说明 |
| `y3-auto-test` | 组织自动化测试 | `gen-test-plan.md` 等测试计划资料及入口中的执行要求 |
| `y3-template-export` | 将已有功能整理成模板 | 入口中的打包、登记与验证要求，产物进入顶层 `templates/` |

修改地形模板前，需查清 `template_meta.json`、地形 JSON 与资源数据的关联；测试报告应记录实际执行结果。

## Skill、参考文档与 MCP 怎样分工

Skill 组织流程，参考文档提供依据，MCP 执行导入、刷新与调试等操作。执行需要可用的工具和工程环境；新增或调整技能后，应确认 Agent 已识别入口，外部 Agent 不一定自动加载 `.y3maker/skills/`。
