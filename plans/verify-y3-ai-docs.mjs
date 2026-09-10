import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import GithubSlugger from 'github-slugger';
import matter from 'gray-matter';

const share = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRepo = path.resolve(process.argv[2] || path.join(share, '../docs'));
const base = 'docs/Y3AI开发教程';
const sourceBase = 'packages/projects-docs/pages/guides/Editor/AI_Development';
const output = path.join(share, '.cache-loader/y3-ai-docs');
fs.mkdirSync(output, {recursive: true});
const parser = unified().use(remarkParse).use(remarkFrontmatter).use(remarkGfm);
const walk = (node, fn) => { fn(node); node.children?.forEach(child => walk(child, fn)); };
const text = node => node.value || node.children?.map(text).join('') || '';
const files = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
  const file = path.join(dir, entry.name);
  return entry.isDirectory() ? files(file) : [file];
});
function parse(source) {
  const headings = [];
  const links = [];
  const images = [];
  const anchors = [];
  const slugger = new GithubSlugger();
  walk(parser.parse(source), node => {
    if (node.type === 'heading') {
      const label = text(node);
      const explicit = label.match(/\s*\{#([^}]+)\}$/);
      const title = explicit ? label.slice(0, explicit.index) : label;
      const id = explicit ? explicit[1] : slugger.slug(title);
      headings.push({depth: node.depth, title, id});
      anchors.push(id);
    }
    if (node.type === 'html') {
      for (const match of node.value.matchAll(/\bid=["']([^"']+)["']/g)) anchors.push(match[1]);
    }
    if (node.type === 'link') links.push({url: node.url, label: text(node)});
    if (node.type === 'image') images.push({url: node.url, alt: node.alt});
  });
  return {headings, links, images, anchors, frontmatter: matter(source).data};
}
const retiredAnchorIds = new Set([
  '一安装wslwindows-subsystem-for-linux',
  '二终端中执行wsl进入linux子系统',
  '三在linux子系统中执行claude启动claude-code',
]);
const baseline = [
  {site: 'share', repo: share, base},
  {site: 'product', repo: sourceRepo, base: sourceBase},
].flatMap(root => {
  const names = execFileSync('git', ['-c', 'core.quotepath=false', 'ls-tree', '-r', '--name-only', 'HEAD', root.base], {cwd: root.repo, encoding: 'utf8'}).trim().split('\n');
  return names.filter(file => /\.mdx?$/.test(file)).map(file => {
    const parsed = parse(execFileSync('git', ['show', `HEAD:${file}`], {cwd: root.repo, encoding: 'utf8'}));
    return {
      site: root.site,
      file,
      targetFile: root.site === 'share' ? file : `${base}/${path.basename(file)}`,
      ...parsed,
      anchors: parsed.anchors.filter(id => !retiredAnchorIds.has(id)),
      retiredAnchors: parsed.anchors.filter(id => retiredAnchorIds.has(id)),
    };
  });
});
fs.writeFileSync(path.join(output, 'baseline.json'), JSON.stringify(baseline, null, 2));
const current = files(path.join(share, base)).filter(file => file.endsWith('.md')).map(file => ({
  file: path.relative(share, file).replaceAll('\\', '/'),
  ...parse(fs.readFileSync(file, 'utf8')),
}));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const docAt = new Map(current.map(doc => [path.resolve(share, doc.file), doc]));
const resolveFile = file => [file, file + '.md', file + '.mdx', path.join(file, 'index.md')].find(name => fs.existsSync(name) && fs.statSync(name).isFile());
const externalLinks = new Set();
for (const doc of current) {
  const absolute = path.join(share, doc.file);
  check(new Set(doc.anchors).size === doc.anchors.length, `Duplicate anchors: ${doc.file}`);
  check(doc.headings.length > 1, `Missing content: ${doc.file}`);
  check(Number.isFinite(doc.frontmatter.sidebar_position), `Missing sidebar position: ${doc.file}`);
  for (const link of [...doc.links, ...doc.images]) {
    check(Boolean(link.label || link.alt), `Empty link/image label: ${doc.file} -> ${link.url}`);
    if (/^https?:/.test(link.url)) {
      externalLinks.add(link.url);
      const url = new URL(link.url);
      check(!(url.hostname === '163.com' && url.pathname.startsWith('/y3/docs')), `Cross-site tutorial dependency: ${doc.file} -> ${link.url}`);
      check(url.hostname !== 'y3share.natapp1.cc', `Use a relative site link: ${doc.file} -> ${link.url}`);
      check(!doc.images.includes(link), `Tutorial image is not local: ${doc.file} -> ${link.url}`);
      continue;
    }
    if (link.url.startsWith('mailto:')) continue;
    const [urlPath, anchor] = decodeURI(link.url).split('#');
    const target = resolveFile(urlPath ? path.resolve(path.dirname(absolute), urlPath) : absolute);
    check(target, `Broken local link: ${doc.file} -> ${link.url}`);
    if (target && anchor && /\.mdx?$/.test(target)) {
      const parsed = docAt.get(target) || parse(fs.readFileSync(target, 'utf8'));
      check(parsed.anchors.includes(decodeURIComponent(anchor)), `Broken anchor: ${doc.file} -> ${link.url}`);
    }
  }
}
for (const old of baseline) {
  const next = current.find(doc => doc.file === old.targetFile);
  check(next, `Unmapped source document: ${old.file}`);
  for (const id of old.anchors) check(next?.anchors.includes(id), `Missing migrated anchor: ${old.targetFile}#${id}`);
}
const reachable = new Set();
const queue = [path.join(share, base, 'index.md')];
while (queue.length) {
  const file = queue.shift();
  if (reachable.has(file)) continue;
  reachable.add(file);
  for (const link of docAt.get(file)?.links || []) {
    if (/^[a-z]+:/.test(link.url)) continue;
    const urlPath = decodeURI(link.url).split('#')[0];
    const target = resolveFile(urlPath ? path.resolve(path.dirname(file), urlPath) : file);
    if (docAt.has(target) && !reachable.has(target)) queue.push(target);
  }
}
check(reachable.size === current.length, 'Some tutorials cannot be reached from the local index');
const groups = new Map();
for (const doc of current) {
  const directory = path.dirname(doc.file);
  if (!groups.has(directory)) groups.set(directory, []);
  groups.get(directory).push(doc.frontmatter.sidebar_position);
}
for (const [directory, positions] of groups) check(new Set(positions).size === positions.length, `Duplicate document order: ${directory}`);
for (const file of files(path.join(share, base)).filter(file => file.endsWith('.json'))) JSON.parse(fs.readFileSync(file, 'utf8'));
const oldHistory = execFileSync('git', ['show', `HEAD:${sourceBase}/CHANGELOG.md`], {cwd: sourceRepo, encoding: 'utf8'});
const newHistory = fs.readFileSync(path.join(share, base, 'CHANGELOG.md'), 'utf8');
const historyBody = source => source.slice(source.indexOf('## 2026')).replaceAll('\r', '').trim();
check(historyBody(oldHistory) === historyBody(newHistory), 'Historical changelog entries changed');
const media = JSON.parse(fs.readFileSync(path.join(share, 'plans/y3-ai-image-sources.json'), 'utf8'));
for (const asset of media) check(fs.existsSync(path.join(share, asset.file)), `Missing migrated image: ${asset.file}`);

if (process.argv.includes('--built')) {
  const metadata = path.join(share, '.docusaurus/docusaurus-plugin-content-docs/default');
  const routes = fs.readdirSync(metadata).filter(file => file.endsWith('.json')).map(file => JSON.parse(fs.readFileSync(path.join(metadata, file), 'utf8'))).filter(doc => doc.source?.startsWith('@site/' + base + '/')).map(({source, id, permalink}) => ({source, id, permalink}));
  check(routes.length === current.length, 'Built route count differs from source document count');
  const previousFile = path.join(output, 'share-routes.json');
  if (fs.existsSync(previousFile)) {
    const previous = JSON.parse(fs.readFileSync(previousFile, 'utf8'));
    for (const old of baseline.filter(doc => doc.site === 'share')) {
      const before = previous.find(route => route.source === '@site/' + old.file);
      const after = routes.find(route => route.source === '@site/' + old.file);
      check(before && after && before.permalink === after.permalink, `Old page URL changed: ${old.file}`);
    }
  }
  fs.writeFileSync(previousFile, JSON.stringify(routes, null, 2));
}
const report = {
  sourceDocuments: baseline.length,
  deliveredDocuments: current.length,
  reachableFromIndex: reachable.size,
  preservedSourceAnchors: baseline.reduce((total, doc) => total + doc.anchors.length, 0),
  retiredSourceAnchors: baseline.reduce((total, doc) => total + doc.retiredAnchors.length, 0),
  localImages: files(path.join(share, base)).filter(file => file.endsWith('.png')).length,
  importedImages: media.length,
  externalLinks: [...externalLinks],
  failures,
};
fs.writeFileSync(path.join(output, 'verification.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
process.exitCode = failures.length ? 1 : 0;
