---
title: 工程与 Lua 目录结构参考
sidebar_position: 9
showLastUpdateAuthor: true
---

本页介绍 Y3 工程目录、Lua 脚本入口与初始化位置，以及日志路径。Lua 是 Y3 游戏逻辑使用的脚本语言。

## 工程目录

```text
工程根目录/
  header.project
  .y3maker/
  maps/
    EntryMap/
      script/
        main.lua
        y3/
        y3-helper/
        .log/
```

`EntryMap` 以实际主地图名为准。工程根目录用于识别项目，单张地图的 `script` 保存该地图脚本。

`main.lua` 是入口；`y3` 是官方库，`y3-helper` 是生成目录，业务代码放在自己的模块中。已有工程可能包含全局脚本，应沿用原结构。

## 入口与初始化

游戏加载 Y3 Lua 库后进入 `main.lua`。加载阶段定义函数、加载模块和注册事件；依赖游戏状态的逻辑放到“游戏-初始化”之后。

例如，已有 `gameplay.lua` 时，从入口加载：

```lua
require 'gameplay'
```

模块中注册初始化逻辑：

```lua
y3.game:event('游戏-初始化', function ()
    log.info('[ai-tutorial] initialized')
end)
```

将模块接入已有入口，避免重复注册。模块文件缺失时，`require` 会报错。

## 日志与诊断

`log.info('内容')` 写业务日志。开发模式通常在脚本目录 `.log/lua_player01.log`，编号对应玩家；平台运行通常在地图的 `custom` 目录。

查看本轮修改时间对应的日志。临时 `print` 会在游戏内显示，交付前应清理。错误定位方法见[排查问题](./Troubleshooting.md#找到正确的日志)。
