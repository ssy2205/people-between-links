import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = resolve(project, "docs");
const assets = resolve(docs, "assets");
const pagesUrl =
  process.env.PAGES_URL ?? "https://ssy2205.github.io/people-between-links";

async function renderMain() {
  const workerUrl = pathToFileURL(resolve(project, "dist/server/index.js"));
  workerUrl.searchParams.set("export", `${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Landing page render failed: ${response.status}`);
  }

  const rendered = await response.text();
  const match = rendered.match(/<main class="site-shell">[\s\S]*<\/main>/);
  if (!match) {
    throw new Error("Could not find the landing page main element.");
  }

  return match[0].replaceAll('src="/', 'src="./assets/');
}

async function copyAsset(source, target) {
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
}

async function main() {
  const [mainMarkup, sourceCss] = await Promise.all([
    renderMain(),
    readFile(resolve(project, "app/globals.css"), "utf8"),
  ]);

  const css = sourceCss.replaceAll('url("/fonts/', 'url("./assets/fonts/');
  const html = `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#172641">
  <title>지나치지 않는 사람, 지켜줌인 — 사람 사이의 링크</title>
  <meta name="description" content="한국생명존중희망재단의 지켜줌인 활동을 소개하고 온라인 자살유발정보 모니터링과 신고 참여로 연결하는 생명존중 공익 캠페인입니다.">
  <link rel="canonical" href="${pagesUrl}/">
  <link rel="icon" href="./assets/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ko_KR">
  <meta property="og:title" content="지나치지 않는 사람, 지켜줌인">
  <meta property="og:description" content="시민의 관심을 교육과 공식 신고 시스템으로 연결하는 한국생명존중희망재단 가치 확산 캠페인">
  <meta property="og:url" content="${pagesUrl}/">
  <meta property="og:image" content="${pagesUrl}/assets/campaign-banner-300.png">
  <meta property="og:image:width" content="300">
  <meta property="og:image:height" content="250">
  <meta property="og:image:alt" content="지나치지 않는 사람, 지켜줌인">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
${mainMarkup}
</body>
</html>
`;

  await mkdir(resolve(assets, "fonts"), { recursive: true });
  await Promise.all([
    writeFile(resolve(docs, "index.html"), html),
    writeFile(resolve(docs, "404.html"), html),
    writeFile(resolve(docs, "styles.css"), css),
    writeFile(resolve(docs, ".nojekyll"), ""),
    writeFile(
      resolve(docs, "robots.txt"),
      `User-agent: *\nAllow: /\nSitemap: ${pagesUrl}/sitemap.xml\n`,
    ),
    writeFile(
      resolve(docs, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${pagesUrl}/</loc></url>
</urlset>
`,
    ),
    copyAsset(
      resolve(project, "public/kfsp-ci.png"),
      resolve(assets, "kfsp-ci.png"),
    ),
    copyAsset(
      resolve(project, "public/life-thread-oil-v2.png"),
      resolve(assets, "life-thread-oil-v2.png"),
    ),
    copyAsset(
      resolve(project, "public/campaign-banner-300.png"),
      resolve(assets, "campaign-banner-300.png"),
    ),
    copyAsset(
      resolve(project, "public/favicon.svg"),
      resolve(assets, "favicon.svg"),
    ),
    copyAsset(
      resolve(project, "public/fonts/NanumGothic-Regular.woff2"),
      resolve(assets, "fonts/NanumGothic-Regular.woff2"),
    ),
    copyAsset(
      resolve(project, "public/fonts/NanumGothic-Bold.woff2"),
      resolve(assets, "fonts/NanumGothic-Bold.woff2"),
    ),
    copyAsset(
      resolve(project, "public/fonts/NanumGothic-ExtraBold.woff2"),
      resolve(assets, "fonts/NanumGothic-ExtraBold.woff2"),
    ),
  ]);

  console.log(`GitHub Pages export complete: ${docs}`);
}

await main();
