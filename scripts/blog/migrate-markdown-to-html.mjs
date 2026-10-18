import { readdir, readFile, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { parseLegacyArticle } from "./generate.mjs";

const contentDir = path.resolve("src/content/blog");
const posts = [];
for (const year of await readdir(contentDir, { withFileTypes: true })) {
  if (!year.isDirectory()) continue;
  for (const month of await readdir(path.join(contentDir, year.name), { withFileTypes: true })) {
    if (!month.isDirectory()) continue;
    const monthPath = path.join(contentDir, year.name, month.name);
    for (const entry of await readdir(monthPath, { withFileTypes: true })) {
      if (!entry.isFile() || !entry.name.endsWith(".md") || entry.name.toLowerCase() === "readme.md") continue;
      const sourcePath = path.join(monthPath, entry.name);
      const post = parseLegacyArticle(await readFile(sourcePath, "utf8"), sourcePath, contentDir);
      posts.push({ sourcePath, monthPath, ...post });
    }
  }
}

for (const post of posts) {
  const destination = path.join(post.monthPath, post.slug);
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, "meta.json"), `${JSON.stringify(post.metadata, null, 2)}\n`, "utf8");
  for (const [locale, html] of Object.entries(post.bodies)) await writeFile(path.join(destination, `${locale}.html`), `${html.trim()}\n`, "utf8");
}

// Delete the Markdown sources only after every replacement folder is complete.
for (const post of posts) await rm(post.sourcePath);
console.log(`[blog migration] Converted ${posts.length} posts into JSON metadata and 3 localized HTML bodies.`);
