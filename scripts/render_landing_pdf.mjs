import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = resolve(project, "..");
const runtimeModules =
  "/Users/shiftyellow/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const require = createRequire(`${runtimeModules}/`);
const { chromium } = require("playwright");

const pdfOutput = resolve(
  workspace,
  "output/pdf/사람사이의링크_랜딩페이지_최종.pdf",
);
const submissionOutput = resolve(
  workspace,
  "outputs/생명존중_제출물/사람사이의링크_랜딩페이지_최종.pdf",
);

await mkdir(dirname(pdfOutput), { recursive: true });
await mkdir(dirname(submissionOutput), { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 1,
  });
  await page.emulateMedia({ media: "screen" });
  await page.goto(pathToFileURL(resolve(project, "docs/index.html")).href, {
    waitUntil: "networkidle",
  });
  await page.addStyleTag({
    content: `
      .site-header { position: relative !important; }
      .skip-link { display: none !important; }
      .mobile-cta { display: none !important; }
      .step-card, .value-card, .activity-card, .report-panel,
      .quote-card, .fact-bar, .support-note { break-inside: avoid; }
    `,
  });

  await page.evaluate(() => document.fonts.ready);
  const documentHeight = await page.evaluate(() =>
    Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    ),
  );
  // Chrome can create a blank overflow page when a custom-height PDF lands
  // exactly on a fractional layout boundary. The footer has breathing room,
  // so trim a few CSS pixels from the canvas to keep this a true one-sheet
  // long-scroll submission PDF.
  const pdfHeight = Math.max(1, documentHeight - 8);

  await page.pdf({
    path: pdfOutput,
    width: "1200px",
    // The contest asks for the scroll landing page as a PDF. A single long
    // canvas preserves the intended section rhythm without accidental page
    // breaks or a mostly empty final sheet.
    height: `${pdfHeight}px`,
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
} finally {
  await browser.close();
}

await copyFile(pdfOutput, submissionOutput);
console.log(pdfOutput);
console.log(submissionOutput);
