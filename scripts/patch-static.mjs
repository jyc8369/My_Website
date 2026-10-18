import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { addPageMetadata } from "./transforms/metadata.mjs";
import { updatePageNavigation } from "./transforms/navigation.mjs";
import { secureExternalLinks } from "./transforms/external-links.mjs";

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(target));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

export async function patchStaticPages({ outputDir = "dist" } = {}) {
  for (const file of await htmlFiles(outputDir)) {
    const relative = path.relative(outputDir, file).replaceAll("\\", "/");
    if (!/^(ko|en|ja)\//.test(relative)) continue;

    const source = await readFile(file, "utf8");
    const withNavigation = updatePageNavigation(source, relative);
    const withMetadata = addPageMetadata(withNavigation, relative);
    await writeFile(file, secureExternalLinks(withMetadata), "utf8");
  }
}
