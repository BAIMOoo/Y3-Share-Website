const fs = require('node:fs/promises');
const path = require('node:path');
const manifest = require('./manifest.json');

// Ship redirects with build/, which is the only directory deployed by CI.
module.exports = function docUrlCompatibility() {
  return {
    name: 'doc-url-compatibility',
    async postBuild({outDir, routesPaths}) {
      const currentRoutes = new Set(routesPaths.map((route) => route.replace(/\/$/, '')));
      const oldRoutes = new Set();
      for (const {from, to} of [...manifest.documents, ...manifest.categories]) {
        const oldRoute = from.replace(/\/$/, '');
        if (!currentRoutes.has(to) || currentRoutes.has(oldRoute) || oldRoutes.has(oldRoute)) {
          throw new Error(`Invalid document redirect: ${from} -> ${to}`);
        }
        oldRoutes.add(oldRoute);
        // Targets are fixed local paths, never taken from URL query parameters.
        if (!/^\/docs\/[a-z0-9/-]+$/.test(to)) {
          throw new Error(`Invalid English document URL: ${to}`);
        }
        const html = `<!doctype html>
<html lang="zh-Hans">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<link rel="canonical" href="${to}">
<title>页面已迁移</title>
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash);</script>
</head>
<body><p>页面已迁移至<a href="${to}">新地址</a>。</p></body>
</html>
`;
        const directory = path.join(outDir, oldRoute);
        await fs.mkdir(directory, {recursive: true});
        // Never overwrite a real page emitted by Docusaurus.
        await fs.writeFile(path.join(directory, 'index.html'), html, {flag: 'wx'});
      }
    },
  };
};
