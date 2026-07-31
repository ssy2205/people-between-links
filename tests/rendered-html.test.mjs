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

test("server-renders the life-respect campaign landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /사람 사이의 링크/);
  assert.match(html, /관심이,.*도움에 닿도록/);
  assert.match(html, /한국생명존중희망재단/);
  assert.match(html, /생명지킴이 교육/);
  assert.match(html, /지역기반 예방사업/);
  assert.match(html, /300 × 250/);
  assert.match(html, /제출 준비도/);
  assert.match(html, /https:\/\/inec\.or\.kr\/board\/detail\/1411/);
  assert.match(html, /docs\.google\.com\/forms\/d\/e\/1FAIpQLScGjt6biVGbIZaC9OKqkJP2biDVoEzMVgnh8sF52P68t_c5pw/);
  assert.match(html, /https:\/\/www\.kfsp\.or\.kr\//);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("keeps site metadata and assets production-ready", async () => {
  const [layout, page, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /generateMetadata/);
  assert.match(layout, /og\.png/);
  assert.match(layout, /lang="ko"/);
  assert.match(page, /drawBanner/);
  assert.match(page, /생명존중의 연결망 보기/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
