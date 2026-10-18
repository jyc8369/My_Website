import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { generateLocalizedPages } from "./generate.mjs";

test("generates localized pages into the requested output directory", async (t) => {
  const outputDir = await mkdtemp(path.join(os.tmpdir(), "jyc8369-localized-"));
  t.after(() => rm(outputDir, { recursive: true, force: true }));

  await generateLocalizedPages({ outputDir });

  const home = await readFile(path.join(outputDir, "ja", "index.html"), "utf8");
  const lab = await readFile(path.join(outputDir, "ja", "lab", "index.html"), "utf8");
  const privacy = await readFile(path.join(outputDir, "en", "privacy", "index.html"), "utf8");
  const notFound = await readFile(path.join(outputDir, "404.html"), "utf8");

  assert.match(home, /<html lang="ja">/);
  assert.match(home, /href="\/en\/"/);
  assert.match(lab, /href="\/ja\/lab\/regular-icosahedron\/"/);
  assert.match(privacy, /Privacy information for jyc8369\.dev/);
  assert.match(notFound, /Page not found\./);
});
