# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 重要规则

**始终使用中文回复用户。** 本项目是中文文档网站，所有交流应使用中文。

## 项目概述

Y3-Share 是一个使用 Docusaurus 3.9.2 构建的中文文档网站，专注于分享 Y3 编辑器相关知识。网站包含 Y3 TCP 和 WebSocket 服务部署教程、会议文档以及问答社区集成。

## 常用命令

### 开发
```bash
yarn start          # 启动本地开发服务器（自动打开浏览器，支持热重载）
yarn build          # 构建静态网站到 build/ 目录
yarn serve          # 本地预览已构建的网站
```

### Docusaurus 工具
```bash
yarn docusaurus <command>           # 运行任意 Docusaurus 命令
yarn clear                          # 清除 Docusaurus 缓存
yarn swizzle                        # 自定义 Docusaurus 组件
yarn write-translations             # 提取国际化翻译
yarn write-heading-ids              # 为 markdown 添加标题 ID
```

### 部署
```bash
yarn deploy                         # 部署到 GitHub Pages（需要 GIT_USER 环境变量）
USE_SSH=true yarn deploy            # 使用 SSH 部署
```

## 架构说明

### 配置文件
- **docusaurus.config.js**: 网站主配置文件，包含：
  - 网站元数据（标题：'Y3-Share'，中文语言：'zh-Hans'）
  - 导航栏配置（文档、Y3QA 外部服务、博客链接）
  - GitHub Pages 部署配置（组织：BAIMO，仓库：Y3-Share）
  - 编辑链接指向 Gitee 仓库
  - 代码高亮的 Prism 主题

- **sidebars.js**: 侧边栏配置，使用 docs 文件夹自动生成结构

### 内容结构
- **docs/**: 按主题组织的主要文档：
  - `Y3Tcp服务部署教程/`: TCP 服务部署教程（Linux/Windows）
  - `Y3Websocket服务部署教程/`: WebSocket 服务部署教程
  - `Y3面对面会议分享文档/`: 会议演示文档（UI 同步、调试、动画、地形生成）
  - 根目录：简介和 Y3QA 信息

- **blog/**: 博客文章，包含 authors.yml 和 tags.yml 配置

- **src/**: React 组件和页面：
  - `pages/index.js`: 首页，包含横幅和特性展示
  - `components/HomepageFeatures/`: 首页特性卡片组件
  - `css/custom.css`: 自定义样式

- **static/**: 静态资源（图片、favicon、GitHub Pages 的 .nojekyll 文件）

### 主要特性
- 默认使用中文语言（zh-Hans）
- 集成外部 Y3QA 社区（http://60.205.162.211:9888/）
- 博客支持 RSS/Atom 订阅
- 编辑链接指向 Gitee 仓库
- 启用 Docusaurus v4 兼容性标志

## 开发注意事项

- 需要 Node.js >= 18.0
- 使用 React 19.0.0
- Markdown 文件使用 frontmatter 设置 title 和 sidebar_position
- 文档侧边栏从文件夹结构自动生成
- 网站已准备好多语言支持，但目前仅使用中文

## 文档编写规范

### 图片引用格式
在 Markdown 文档中引用图片时，**必须使用 Markdown 格式**，不要使用 HTML 格式：

✅ **正确格式**（使用相对路径）：
```markdown
![img](./img/图片名称.png)
```

❌ **错误格式**（避免使用 HTML）：
```html
<div align="left"><img src="img/图片名称.png" alt="图片"></div>
```

**说明**：
- 使用相对路径 `./` 开头
- 图片文件通常存放在与 Markdown 文件同级的 `img/` 或其他图片文件夹中
- 保持与项目中其他文档（如 Y3Tcp 服务部署教程）的风格一致