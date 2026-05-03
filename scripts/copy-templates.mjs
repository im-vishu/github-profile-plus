import { cp, mkdir, readdir, copyFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src", "templates");
const outDir = path.join(root, "dist", "templates");
const assetsDir = path.join(root, "src", "assets");
const assetsOutDir = path.join(root, "dist", "assets");

await mkdir(outDir, { recursive: true });

const files = await readdir(srcDir);
const ejsFiles = files.filter((f) => f.endsWith(".ejs"));

if (ejsFiles.length === 0) {
  console.warn(`[copy-templates] No .ejs files found in ${srcDir}`);
}

for (const f of ejsFiles) {
  await copyFile(path.join(srcDir, f), path.join(outDir, f));
  console.log(`[copy-templates] Copied ${f}`);
}

await cp(assetsDir, assetsOutDir, { recursive: true });
console.log("[copy-templates] Copied assets");
