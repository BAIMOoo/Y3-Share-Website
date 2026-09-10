---
slug: /ai/mcp-tools
title: Y3 MCP 工具介绍
sidebar_position: 7
showLastUpdateAuthor: true
---

# Y3 MCP 工具介绍

本页按 **Y3 Helper（9 个）** 和 **Y3 Editor（59 个）** 列出本次核对的全部工具。不同版本可能增减工具，参数以客户端当前说明为准。

安装 Git 等软件使用 Y3Maker 的内置终端，见[准备本机环境](./EnvironmentSetup.md#support-tools)。

默认配置位于 `.y3maker/mcp_settings.json`；外部客户端通过[迁移 skill 接入](./03-Agent部署教程/MCP接入.md)。VS Code、Y3 编辑器和 Agent 应打开同一工程；多开时核对端口归属。

## Y3 Helper MCP（`y3-helper`） {#y3-helper-mcpy3-helper}

由 VS Code 的 Y3 开发助手提供，用于游戏控制、调试和 Lua 诊断。

- **连接条件：** VS Code 已启用 Y3 开发助手，并打开、初始化工程。服务未自动启动时，选择助手的 **功能 > MCP Server > 启动 MCP Server**。
- **默认地址：** `http://127.0.0.1:8766/mcp`。

<span id="游戏控制" className="legacy-anchor" />

### 游戏控制 {#game-control}

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `get_game_status` | 查询游戏状态，多开时核对目标窗口 |
| `launch_game` | 启动当前工程；先保存地图和脚本 |
| `stop_game` | 停止当前或指定游戏客户端 |
| `quick_restart` | 快速重启已连接的游戏客户端 |

</div>

<span id="调试与检查" className="legacy-anchor" />

### 调试与检查 {#debugging}

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `execute_lua` | 在运行中的游戏执行 Lua，会改变游戏状态 |
| `get_logs` | 读取可用游戏客户端的日志，核对玩家和本轮时间 |
| `capture_screenshot` | 截取游戏窗口，需要可用的窗口和客户端 |
| `read_problems_lua` | 获取 Lua 诊断，需要对应 Lua 扩展 |
| `get_ui_canvas` | 读取 UI 节点树，包括名称、类型和标识 |

</div>

<span id="游戏运行时连接" className="legacy-anchor" />

### 游戏运行时连接 {#runtime-connection}

`y3runtime` 在游戏启动后可用，默认地址为 `http://127.0.0.1:8767/mcp`。助手启动游戏后会尝试重连；仍离线时，手动刷新或重连，再检查工具列表。

## Y3 Editor MCP（`y3editor`） {#y3-editor-mcpy3editor}

由 Y3 编辑器提供，用于地图与地形编辑、UI、物编、资源和触发器操作。

- **连接条件：** Y3 编辑器已运行并打开目标工程。
- **默认地址：** `http://127.0.0.1:8765/mcp`。

<span id="编辑器操作" className="legacy-anchor" />

### 编辑器操作 {#editor-operations}

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `hotfix_ui_editor` | 刷新外部修改后的 UI 数据 |
| `hotfix_object_editor` | 刷新外部修改后的物编数据 |
| `save_editor` | 保存编辑器当前内容 |
| `get_editor_log` | 读取编辑器日志 |
| `get_map_info` | 读取工程与地图路径、地图名称、点阵尺寸和地形模式 |
| `modify_editor_config` | 修改编辑器配置；当前支持 `close_auto_save`（关闭自动保存） |
| `restart_editor` | 重启编辑器并打开当前地图；默认先保存地图 |

</div>

<span id="ui-查询导入与截图" className="legacy-anchor" />

### UI 查询、导入与截图 {#ui-tools}

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `get_ui_list` | 列出当前地图的画板、元件和场景 UI |
| `export_ui` | 将全部或指定 UI 导出为 `.upui` 文件 |
| `import_ui` | 从 `.upui` 导入 UI，自动刷新视图并保存编辑器 |
| `screenshot_ui` | 打开指定 UI 并截图，编辑器窗口需可见 |
| `delete_screenshot` | 删除指定路径的临时截图 |

</div>

`screenshot_ui` 会切换 UI 预览层、将缩放设为 33%，使用前先保存。实际层级和交互需在游戏中检查。

<span id="官方资源工具" className="legacy-anchor" />

### 官方资源工具 {#official-assets}

<div className="y3-ai-table">

| 工具 | 用途 |
| --- | --- |
| `get_official_editor_model` | 按 ID 查询模型 |
| `get_official_editor_sound` | 按 ID 查询声音 |
| `get_official_editor_effect` | 按 ID 查询特效 |
| `get_official_editor_icon` | 按 ID 查询图标 |
| `get_official_resource_associate_match` | 查询配套素材 |
| `download_editor_model_resource` | 下载模型 |
| `download_editor_effect_resource` | 下载特效 |
| `download_editor_icon_resource` | 下载图标 |
| `download_editor_sound_resource` | 下载声音 |

</div>

<span id="本地资源导入" className="legacy-anchor" />

### 本地资源导入 {#import-assets}

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `import_mdx` | 导入 MDX 模型，需要模型文件路径和 War3 文件夹路径 |
| `import_editor_icon` | 将本地图片导入为编辑器图标 |
| `import_editor_fbx_model` | 导入 FBX 模型，可通过 `resource_map_json` 批量导入贴图和动画 |

</div>

<span id="物编查询与导入导出" className="legacy-anchor" />

### 物编查询与导入导出 {#object-editor}

以下五个自定义数据查询工具均支持：无参读取全部，或指定物编、字段查询。

<div className="y3-ai-table">

| 工具 | 用途 |
| --- | --- |
| `get_editor_unit_custom_data` | 查询自定义单位物编 |
| `get_ability_all_custom_data` | 查询自定义技能物编 |
| `get_editor_item_custom_data` | 查询自定义物品物编 |
| `get_modifier_all_custom_data` | 查询自定义魔法效果物编 |
| `get_projectile_all_custom_data` | 查询自定义投射物物编 |
| `get_object_editor_list` | 列出物编 ID、名称和文件夹，支持按类型筛选 |
| `export_object_editor` | 将全部或按类型、ID 筛选的物编导出为 `.zip` |
| `import_object_editor` | 从 `.zip` 导入物编，自动刷新视图并保存编辑器 |

</div>

<span id="地图尺寸与地形" className="legacy-anchor" />

### 地图尺寸与地形 {#map-and-terrain}

`_block` 工具批量处理格子。地形模式和尺寸可先用 `get_map_info` 查询，修改后用 `terrain_get_block` 核对。

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `resize_terrain` | 扩大或缩小地形，可指定方向；尺寸须为 16 的倍数，范围 16～480 |
| `terrain_get_block` | 读取格子的高度、水体、裂缝等状态 |
| `terrain_set_height_block` | 抬高、降低或整平悬崖高度 |
| `terrain_set_deep_water_block` | 设置深水，不可通行 |
| `terrain_set_shallow_water_block` | 设置浅水，可通行 |
| `terrain_set_plain_water_block` | 设置平面水 |
| `terrain_erase_plain_water_block` | 擦除平面水 |
| `terrain_set_road_block` | 设置斜坡或道路 |
| `terrain_set_crack_block` | 设置裂缝（地形空洞），不可通行 |
| `terrain_hill_lift_block` | 隆起或降低地形，`delta_height` 正值为隆起、负值为降低 |
| `terrain_hill_flat_block` | 将地形推平到指定高度 |
| `terrain_hill_smooth_block` | 平滑地形 |
| `terrain_hill_steep_block` | 使地形陡峭化 |
| `terrain_hill_hollow_block` | 镂空地形 |

</div>

<span id="地表纹理与植被" className="legacy-anchor" />

### 地表纹理与植被 {#textures-and-vegetation}

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `ensure_terrain_textures` | 查询纹理面板并补入缺失纹理，上限 32 个；返回面板满或未下载等结果 |
| `terrain_cover_draw_block` | 整格替换地面材质层 |
| `terrain_draw_texture_block` | 绘制混合纹理层，支持渐变混合 |
| `terrain_erase_texture_block` | 擦除混合纹理层 |
| `terrain_vegetation_draw_block` | 绘制植被；植被坐标系与地形坐标系不同 |
| `terrain_vegetation_erase_block` | 擦除植被 |

</div>

<span id="场景实体点区域与路径" className="legacy-anchor" />

### 场景实体、点、区域与路径 {#scene-objects}

点、区域和路径工具中的二维坐标 `[x, y]` 对应引擎的 X、Z 轴。

<div className="y3-ai-table">

| 工具 | 用途与条件 |
| --- | --- |
| `entity_create_block` | 批量创建实体，不含点、区域和路径 |
| `entity_delete_block` | 批量删除实体 |
| `add_point` | 按坐标摆放一个点 |
| `add_rect_area` | 按左上角、右下角坐标摆放矩形区域 |
| `add_circle_area` | 按圆心和半径摆放圆形区域 |
| `add_point_path` | 按有序点创建折线路径，至少需要 2 个点 |

</div>

<span id="触发器" className="legacy-anchor" />

### 触发器 {#triggers}

<div className="y3-ai-table">

| 工具 | 用途 |
| --- | --- |
| `import_eca` | 从 JSON 文件导入全局触发器并热更到运行时，支持覆盖或新建 |

</div>

<span id="刷新与保存" className="legacy-anchor" />

### 刷新与保存 {#refresh-and-save}

外部修改 UI 或物编 JSON 时，依次执行：

1. 保存编辑器当前内容。
2. 修改文件，调用 `hotfix_ui_editor` 或 `hotfix_object_editor`。
3. 等待同步完成，核对内容后再保存。

异步导入也需等工具报告完成后再保存，避免编辑器旧内容覆盖文件修改。

<span id="旧工具名称迁移" className="legacy-anchor" />

### 旧工具名称迁移 {#legacy-tool-names}

当前核对的服务未提供以下旧名称：

<div className="y3-ai-table">

| 旧名称 | 当前用法 |
| --- | --- |
| `preview_ui` | 手动打开 UI，或用 `screenshot_ui` 查看 |
| `screenshot_ui_preview` | 使用 `screenshot_ui`，重新读取它的参数说明 |
| `run_game_and_screenshot` | 游戏使用 `launch_game` 和 `capture_screenshot`；编辑器预览使用 `screenshot_ui` |

</div>

---

核对日期：2026-09-10。Y3 Editor 的 59 个工具来自运行服务的完整 `tools/list`；Y3 Helper 当前服务离线，9 个工具按本机助手源码注册项核对。未逐项执行地图操作，`y3runtime` 工具不在本页清单范围内。连接故障见[排查问题](./Troubleshooting.md)。
