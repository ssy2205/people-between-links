import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
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
}

test("server-renders the submission-ready People Between Links campaign", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /지나치지 않는.*사람,.*지켜줌인/);
  assert.match(html, /한국생명존중희망재단의 공공적 가치/);
  assert.match(html, /참여의 문/);
  assert.match(html, /교육된 실천/);
  assert.match(html, /공적 신고 체계/);
  assert.match(html, /1365 회원가입/);
  assert.match(html, /SIMS 가입/);
  assert.match(html, /교육 후 활동/);
  assert.match(html, /자살유발정보 신고하기/);
  assert.match(html, /24시간 자살예방상담전화 109/);
  assert.match(
    html,
    /https:\/\/www\.kfsp\.or\.kr\/home\/kor\/contents\.do\?menuPos=2#none/,
  );
  assert.match(html, /https:\/\/sims\.kfsp\.or\.kr\/\?pMENU_NO=265/);
  assert.doesNotMatch(html, /제출 준비도|실제 광고 시안|한 가닥의 실은/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps metadata, fonts, artwork, and GitHub Pages source production-ready", async () => {
  const [layout, page, css, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /export const metadata/);
  assert.match(layout, /campaign-banner-300\.png/);
  assert.match(layout, /lang="ko"/);
  assert.match(page, /life-thread-oil-v2\.png/);
  assert.match(page, /kfsp-ci\.png/);
  assert.match(page, /line-d/);
  assert.match(css, /NanumGothic-Regular\.woff2/);
  assert.match(css, /\.node-four[\s\S]*color: var\(--paper\)/);
  assert.doesNotMatch(page, /drawBanner|checklist|실제 광고 시안/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("../public/campaign-banner-300.png", import.meta.url)),
    access(new URL("../public/kfsp-ci.png", import.meta.url)),
    access(new URL("../public/life-thread-oil-v2.png", import.meta.url)),
    access(new URL("../public/fonts/NanumGothic-Regular.ttf", import.meta.url)),
    access(new URL("../public/fonts/NanumGothic-Bold.ttf", import.meta.url)),
    access(new URL("../public/fonts/NanumGothic-ExtraBold.ttf", import.meta.url)),
    access(new URL("../public/fonts/NanumGothic-Regular.woff2", import.meta.url)),
    access(new URL("../public/fonts/NanumGothic-Bold.woff2", import.meta.url)),
    access(new URL("../public/fonts/NanumGothic-ExtraBold.woff2", import.meta.url)),
  ]);

  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("exports a self-contained GitHub Pages site", async () => {
  const docsUrl = new URL("../docs/", import.meta.url);
  const [html, robots, sitemap] = await Promise.all([
    readFile(new URL("index.html", docsUrl), "utf8"),
    readFile(new URL("robots.txt", docsUrl), "utf8"),
    readFile(new URL("sitemap.xml", docsUrl), "utf8"),
  ]);

  assert.match(html, /https:\/\/ssy2205\.github\.io\/people-between-links\//);
  assert.match(html, /src="\.\/assets\/kfsp-ci\.png"/);
  assert.match(html, /src="\.\/assets\/life-thread-oil-v2\.png"/);
  assert.match(html, /href="\.\/styles\.css"/);
  assert.doesNotMatch(html, /src="\//);
  assert.match(robots, /Sitemap: https:\/\/ssy2205\.github\.io\/people-between-links\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/ssy2205\.github\.io\/people-between-links\/<\/loc>/);

  const relativeResources = [
    ...html.matchAll(/(?:href|src)="(\.\/[^"#?]+)"/g),
  ].map((match) => match[1].slice(2));
  await Promise.all(
    [...new Set(relativeResources)].map((path) => access(new URL(path, docsUrl))),
  );
  await access(new URL(".nojekyll", docsUrl));
});
