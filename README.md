# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 文档链接维护

文档保留中文标题和文件名，通过 front matter 的 `slug` 设置稳定英文路径，例如 `slug: /ai/codex-cli` 对应 `/docs/ai/codex-cli`。章节使用显式英文 ID，例如 `## 安装 {#installation}`。分类页在 `_category_.json` 的 `link.slug` 设置英文路径。

标题措辞微调时不要更改 URL 或章节 ID。必须改动地址时，在 `plugins/doc-url-compat/manifest.json` 维护旧地址到最终地址的映射，并保留正文中的旧锚点别名。新增文档无需加入历史迁移清单，但路径和章节 ID 同样使用英文。

```bash
npm run build
npm run check:doc-urls
npm run serve
```

旧页面跳转由构建生成到 `build/`，需用生产构建预览；`npm run start` 不生成这些跳转页。跳转保留查询参数和章节片段，属于浏览器跳转而非 HTTP 301。发布流程会在部署前自动检查路径、站内链接、旧锚点及跳转。

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
