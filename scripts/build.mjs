import { cp, mkdir, rm } from "node:fs/promises";
import { generateBlog } from "./blog/generate.mjs";
import { generateLocalizedPages } from "./localization/generate.mjs";
import { readFile, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("site", "dist", { recursive: true });
await generateLocalizedPages({ outputDir: "dist" });
const blog = await generateBlog({ contentDir: "src/content/blog", outputDir: "dist" });
await import("./patch-static.mjs");
if (!blog.generated) {
  for (const locale of ["ko", "en", "ja"]) {
    const homePath = `dist/${locale}/index.html`;
    const homeHtml = await readFile(homePath, "utf8");
    await writeFile(homePath, homeHtml.replace(/<span\b[^>]*class="explore-status"[^>]*>[\s\S]*?<\/span>/gi, ""), "utf8");
  }
}
for (const locale of ["ko", "en", "ja"]) {
  const blogPath = `dist/${locale}/blog/index.html`;
  const blogHtml = await readFile(blogPath, "utf8");
  if (!blog.generated && !blogHtml.includes('name="robots" content="noindex"')) await writeFile(blogPath, blogHtml.replace("<head>", '<head>\n  <meta name="robots" content="noindex">'), "utf8");
}
console.log(`Static site copied to dist/; generated ${blog.generated} blog post(s), skipped ${blog.skipped} invalid file(s).`);
