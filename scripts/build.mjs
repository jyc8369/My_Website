import { cp, mkdir, rm } from "node:fs/promises";
import { generateBlog } from "./blog/generate.mjs";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("site", "dist", { recursive: true });
const blog = await generateBlog({ contentDir: "src/content/blog", outputDir: "dist" });
console.log(`Static site copied to dist/; generated ${blog.generated} blog post(s), skipped ${blog.skipped} invalid file(s).`);
