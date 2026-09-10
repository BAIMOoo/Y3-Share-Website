const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {load} = require('cheerio');
const manifest = require('../plugins/doc-url-compat/manifest.json');

const root = path.resolve(__dirname, '..');
const routes = [...manifest.documents, ...manifest.categories];
const pages = new Map();
const englishPath = /^\/docs\/[a-z0-9]+(?:[/-][a-z0-9]+)*$/;
const englishAnchor = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const normalize = (url) => url.replace(/\/$/, '');
const readPage = (url) => load(fs.readFileSync(path.join(root, 'build', url, 'index.html'), 'utf8'));

assert.equal(new Set(routes.map(({to}) => to)).size, routes.length, 'Duplicate new routes');
assert.equal(new Set(routes.map(({from}) => normalize(from))).size, routes.length, 'Duplicate old routes');

// Check the current build, not leftover per-file metadata in .docusaurus/.
const data = JSON.parse(fs.readFileSync(path.join(root, '.docusaurus/globalData.json'), 'utf8'));
const currentDocs = data['docusaurus-plugin-content-docs'].default.versions[0].docs;
for (const doc of currentDocs) {
  assert.match(doc.path, englishPath, `Non-English document route: ${doc.path}`);
}
for (const {path: route} of currentDocs) {
  const to = normalize(route);
  const $ = readPage(to);
  const ids = $('[id]').toArray().map((node) => $(node).attr('id'));
  assert.equal(ids.length, new Set(ids).size, `Duplicate HTML IDs: ${to}`);
  $('article h2[id], article h3[id], article h4[id], article h5[id], article h6[id]').each((_, node) => {
    assert.match($(node).attr('id'), englishAnchor, `Non-English heading: ${to}`);
  });
  pages.set(to, {$, ids: new Set(ids)});
}
for (const {to} of routes) {
  assert(pages.has(to), `Missing redirect destination: ${to}`);
}

let anchors = 0;
for (const doc of manifest.documents) {
  const {$, ids} = pages.get(doc.to);
  for (const [oldId, newId] of Object.entries(doc.anchors)) {
    assert.match(newId, englishAnchor);
    assert(ids.has(oldId), `Missing legacy anchor: ${doc.to}#${oldId}`);
    assert(ids.has(newId), `Missing English anchor: ${doc.to}#${newId}`);
    if (oldId !== newId) {
      const alias = $('[id]').toArray().find((node) => $(node).attr('id') === oldId);
      assert.equal($(alias).next().attr('id'), newId, `Legacy anchor moved away from its heading: ${oldId}`);
    }
    anchors++;
  }
}

// All rendered navigation and body links must point to the canonical English URLs.
for (const [route, {$}] of pages) {
  $('a[href]').each((_, node) => {
    const href = $(node).attr('href');
    const url = new URL(href, `https://test.invalid${route}`);
    if (url.origin !== 'https://test.invalid' || !url.pathname.startsWith('/docs/')) return;
    const destination = decodeURIComponent(normalize(url.pathname));
    assert.match(destination, englishPath, `Legacy link on ${route}: ${href}`);
    const target = pages.get(destination);
    assert(target, `Unknown document link on ${route}: ${href}`);
    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1));
      // Docusaurus also emits an ASCII accessibility target with underscores.
      assert.match(id, /^[\x00-\x7f]+$/, `Non-English shared anchor: ${href}`);
      assert(target.ids.has(id), `Broken section link on ${route}: ${href}`);
    }
  });
}

// Execute the emitted redirect scripts with realistic raw and encoded fragments.
for (const {from, to} of routes) {
  const $ = readPage(from);
  assert.equal($('link[rel="canonical"]').attr('href'), to);
  for (const hash of ['', '#安装步骤', '#%E5%AE%89%E8%A3%85%E6%AD%A5%E9%AA%A4', '#installation']) {
    for (const search of ['', '?source=share&name=%E6%B5%8B%E8%AF%95']) {
      let redirected;
      vm.runInNewContext($('script').text(), {
        location: {search, hash, replace: (value) => { redirected = value; }},
      });
      assert.equal(redirected, to + search + hash, `Lost query/hash: ${from}`);
    }
  }
}

console.log(`Verified ${manifest.documents.length} documents, ${manifest.categories.length} categories, ${anchors} anchors and ${routes.length} redirects.`);
