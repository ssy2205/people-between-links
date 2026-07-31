"use client";

import { useEffect, useMemo, useState } from "react";

type BannerFormat = "square" | "tower";

const OFFICIAL_CONTEST_URL = "https://inec.or.kr/board/detail/1411";
const FOUNDATION_URL = "https://www.kfsp.or.kr/";
const FOUNDATION_MISSION_URL =
  "https://www.kfsp.or.kr/home/kor/contents.do?menuPos=95";

const routeSteps = [
  {
    number: "01",
    title: "신호 알아차리기",
    body: "혼자 추측하거나 단정하지 않고, 평소와 다른 신호를 차분히 살핍니다.",
    tone: "yellow",
  },
  {
    number: "02",
    title: "지속적으로 관심 갖기",
    body: "한 번의 안부를 만능 해답으로 만들지 않고, 곁을 지키는 관심을 이어갑니다.",
    tone: "blue",
  },
  {
    number: "03",
    title: "전문 서비스로 연결하기",
    body: "개인의 선의에서 멈추지 않고, 정확한 정보와 전문적인 도움으로 이어집니다.",
    tone: "coral",
  },
] as const;

const foundationRoles = [
  {
    index: "A",
    eyebrow: "알아차릴 수 있도록",
    title: "생명지킴이 교육",
    body: "생명존중과 자살예방을 이해하고, 현장에서 필요한 역할을 익힐 수 있도록 교육을 개발하고 보급합니다.",
    tag: "교육 · 역량",
  },
  {
    index: "B",
    eyebrow: "바르게 이해할 수 있도록",
    title: "생명존중문화 조성",
    body: "생명을 존중하는 언어와 문화를 넓히고, 정확한 정보가 사회에 닿도록 캠페인과 홍보를 이어갑니다.",
    tag: "문화 · 정보",
  },
  {
    index: "C",
    eyebrow: "지역에서 이어지도록",
    title: "지역기반 예방사업",
    body: "지역사회가 스스로 예방 체계를 만들고 운영할 수 있도록 기획과 평가, 현장 사업을 지원합니다.",
    tag: "지역 · 현장",
  },
] as const;

const checklist = [
  {
    id: "banner",
    label: "300×250 배너 PNG",
    detail: "실제 크기에서 [광고]·메인 카피·CTA를 한 번에 읽을 수 있는지 확인",
  },
  {
    id: "landing",
    label: "스크롤형 랜딩페이지",
    detail: "배너의 관심—전문 도움 연결이 랜딩의 6개 패널로 이어지는지 확인",
  },
  {
    id: "brief",
    label: "1페이지 광고기획서",
    detail: "기획 의도와 작품 설명을 한 페이지에 정리하고 공식 표기만 최종 반영",
  },
  {
    id: "rights",
    label: "권리·표기 확인",
    detail: "로고·기관명·외부 링크는 승인본으로 교체하고, 광고 표시를 유지",
  },
  {
    id: "submit",
    label: "공식 접수",
    detail: "공식 공모전 페이지의 최신 구글폼과 제출 안내를 최종 확인",
  },
] as const;

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function drawBanner(format: BannerFormat) {
  const width = format === "square" ? 300 : 160;
  const height = format === "square" ? 250 : 600;
  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext("2d");

  if (!context) return;
  context.scale(scale, scale);
  context.fillStyle = "#f8f2e8";
  context.fillRect(0, 0, width, height);

  const pad = format === "square" ? 18 : 14;
  const small = format === "square" ? 10 : 9;
  const title = format === "square" ? 22 : 18;
  const lineY = format === "square" ? 105 : 220;

  context.fillStyle = "#15233f";
  context.font = `700 ${small}px Arial, sans-serif`;
  context.fillText("[광고]", pad, pad + 2);

  context.fillStyle = "#d7b34d";
  context.beginPath();
  context.arc(width - pad - 10, pad - 2, 9, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#15233f";
  context.font = `700 ${small}px Arial, sans-serif`;
  context.fillText("생명", width - pad - 27, pad + 2);

  const cardWidth = format === "square" ? 82 : width - pad * 2;
  const cardHeight = format === "square" ? 47 : 48;
  const leftX = format === "square" ? pad : pad;
  const rightX = format === "square" ? width - pad - cardWidth : pad;
  const cardY = format === "square" ? 52 : 91;

  context.lineWidth = 1.8;
  context.strokeStyle = "#15233f";
  context.fillStyle = "#fffdf8";
  drawRoundedRect(context, leftX, cardY, cardWidth, cardHeight, 12);
  context.fill();
  context.stroke();
  if (format === "square") {
    drawRoundedRect(context, rightX, cardY, cardWidth, cardHeight, 12);
    context.fill();
    context.stroke();
  }

  context.fillStyle = "#15233f";
  context.font = `700 ${format === "square" ? 16 : 14}px Arial, sans-serif`;
  context.fillText("관심", leftX + 26, cardY + 30);
  if (format === "square") {
    context.fillText("전문 도움", rightX + 12, cardY + 30);
  } else {
    context.fillText("전문 도움", leftX + 22, cardY + 30);
  }

  context.strokeStyle = "#d7b34d";
  context.lineWidth = 3;
  context.beginPath();
  if (format === "square") {
    context.moveTo(leftX + cardWidth, cardY + cardHeight / 2);
    context.bezierCurveTo(
      width / 2 - 13,
      cardY - 4,
      width / 2 + 13,
      cardY + cardHeight + 4,
      rightX,
      cardY + cardHeight / 2,
    );
  } else {
    context.moveTo(width / 2, cardY + cardHeight);
    context.bezierCurveTo(
      width / 2 - 18,
      cardY + cardHeight + 30,
      width / 2 + 18,
      cardY + cardHeight + 34,
      width / 2,
      cardY + cardHeight + 56,
    );
  }
  context.stroke();

  context.fillStyle = "#15233f";
  context.font = `700 ${title}px Arial, sans-serif`;
  if (format === "square") {
    context.fillText("관심이,", pad, lineY + 28);
    context.fillText("도움에 닿도록.", pad, lineY + 57);
  } else {
    context.fillText("관심이,", pad, lineY + 26);
    context.fillText("도움에", pad, lineY + 53);
    context.fillText("닿도록.", pad, lineY + 80);
  }

  context.fillStyle = "#d7b34d";
  drawRoundedRect(
    context,
    pad,
    height - (format === "square" ? 44 : 76),
    width - pad * 2,
    format === "square" ? 26 : 34,
    13,
  );
  context.fill();
  context.fillStyle = "#15233f";
  context.font = `700 ${format === "square" ? 10 : 9}px Arial, sans-serif`;
  context.fillText(
    "생명존중의 연결망 보기 →",
    pad + (format === "square" ? 23 : 13),
    height - (format === "square" ? 27 : 54),
  );

  const link = document.createElement("a");
  link.download = `사람-사이의-링크-${width}x${height}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export default function LifeRespectPage() {
  const [format, setFormat] = useState<BannerFormat>("square");
  const [completed, setCompleted] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const observed = Array.from(document.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    observed.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const progress = useMemo(
    () => Math.round((completed.length / checklist.length) * 100),
    [completed.length],
  );

  function toggleChecklist(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function announce(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  return (
    <main className="site-shell">
      <div className="topline" aria-label="공모전 상태">
        <div className="container topline-inner">
          <span className="topline-dot" aria-hidden="true" />
          <span>2026 전국 대학생 생명존중 광고공모전</span>
          <span className="topline-separator">·</span>
          <strong>접수 진행 중</strong>
          <span className="topline-end">마감 08.10 18:00</span>
        </div>
      </div>

      <nav className="nav container" aria-label="페이지 탐색">
        <a className="brand" href="#top" aria-label="사람 사이의 링크 처음으로">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>사람 사이의 링크</span>
        </a>
        <div className="nav-links">
          <a href="#why">캠페인</a>
          <a href="#roles">재단의 역할</a>
          <a href="#submit">제출 준비</a>
        </div>
        <a className="nav-cta" href="#banner">
          배너 보기 <span aria-hidden="true">↘</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-wash" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow"><span>02</span> 한국생명존중희망재단 가치 확산 광고</p>
            <h1>
              관심이,
              <br />
              <em>도움에 닿도록.</em>
            </h1>
            <p className="hero-lede">
              한 번 더 묻는 일은 시작입니다. 그 관심이 교육과 정확한 정보,
              지역의 전문적인 도움까지 이어질 때 사회의 연결망이 됩니다.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#why">
                연결의 흐름 보기 <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-quiet" href={OFFICIAL_CONTEST_URL} target="_blank" rel="noreferrer">
                공식 공모전 안내 <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-note">
              <span className="note-line" aria-hidden="true" />
              캠페인 본편 그래픽은 한글·기관명·CTA를 직접 조판해 편집 가능하게 설계했습니다.
            </div>
          </div>

          <div className="hero-art" data-reveal aria-label="관심과 전문 도움을 잇는 노란 실 그래픽">
            <div className="art-meta"><span>[광고]</span><span>LINK / 01</span></div>
            <div className="art-stage">
              <div className="art-card art-card-interest"><span className="card-kicker">START</span><strong>관심</strong><span>한 번 더 묻는 일</span></div>
              <div className="thread-thread" aria-hidden="true"><i /><i /><i /></div>
              <div className="art-card art-card-help"><span className="card-kicker">NEXT</span><strong>전문 도움</strong><span>사회가 이어 주는 곳</span></div>
              <div className="art-caption"><span>사람</span><span>사이의</span><span>링크</span></div>
            </div>
            <div className="art-foot"><span>관심은 출발점</span><span>도움은 연결될 때 가까워집니다</span></div>
          </div>
        </div>
        <a className="scroll-cue" href="#why"><span>scroll to connect</span><i aria-hidden="true" /></a>
      </section>

      <section className="intro section" id="why">
        <div className="container intro-grid">
          <div className="section-index" data-reveal><span>01</span><i /></div>
          <div data-reveal>
            <p className="eyebrow">개인의 관심에서 사회의 안전망으로</p>
            <h2>한 번 더 묻는 일은<br /><em>시작</em>입니다.</h2>
            <p className="section-lede">하지만 한 사람의 선의만으로는 충분하지 않습니다. 관심이 신호를 알아차리는 교육, 바르게 이해하는 정보, 지역에서 이어지는 예방사업으로 연결될 때 혼자 감당하지 않아도 되는 사회에 가까워집니다.</p>
          </div>
          <div className="pull-quote" data-reveal>
            <span className="quote-mark">“</span>
            <p>관심이<br /><strong>도움에 닿도록.</strong></p>
            <span className="quote-rule" />
            <small>사람과 사람 사이, 관심과 전문 도움 사이를 잇는 한 줄</small>
          </div>
        </div>
      </section>

      <section className="route section section-dark" aria-labelledby="route-heading">
        <div className="container">
          <div className="section-header" data-reveal>
            <div><p className="eyebrow eyebrow-light"><span>02</span> 연결이 이어지는 방식</p><h2 id="route-heading">한 가닥의 실은<br /><em>세 번</em> 이어집니다.</h2></div>
            <p className="section-side-copy">관심을 개인의 책임으로 남겨 두지 않고, 교육·정보·현장으로 확장하는 흐름을 한 줄의 실로 표현했습니다.</p>
          </div>
          <div className="route-line" aria-hidden="true" />
          <div className="route-grid">
            {routeSteps.map((step) => (
              <article className="route-card" key={step.number} data-reveal>
                <span className={`route-number ${step.tone}`}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="route-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="roles section" id="roles" aria-labelledby="roles-heading">
        <div className="container">
          <div className="section-header roles-heading" data-reveal>
            <div><p className="eyebrow"><span>03</span> 한국생명존중희망재단</p><h2 id="roles-heading">관심이 멈추지 않게<br /><em>사회가 할 일</em>을 만듭니다.</h2></div>
            <a className="text-link" href={FOUNDATION_MISSION_URL} target="_blank" rel="noreferrer">재단 미션 확인하기 <span aria-hidden="true">↗</span></a>
          </div>
          <div className="roles-grid">
            {foundationRoles.map((role) => (
              <article className="role-card" key={role.index} data-reveal>
                <div className="role-card-top"><span className="role-index">{role.index}</span><span className="role-tag">{role.tag}</span></div>
                <div><p className="role-eyebrow">{role.eyebrow}</p><h3>{role.title}</h3><p className="role-body">{role.body}</p></div>
                <span className="role-link" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          <div className="roles-foot" data-reveal><span className="roles-foot-line" /><p>한국생명존중희망재단은 국민의 소중한 생명을 보호하고 생명존중문화를 조성하기 위해 자살예방체계 구축·운영 지원, 자살예방 교육·홍보, 지역사회 사업 등을 수행합니다.</p></div>
        </div>
      </section>

      <section className="network section section-yellow" aria-labelledby="network-heading">
        <div className="container network-grid">
          <div className="network-copy" data-reveal><p className="eyebrow"><span>04</span> 연결망의 확장</p><h2 id="network-heading">한 사람이 혼자<br /><em>감당하지 않도록.</em></h2><p>마음의 상태를 한 번의 행동으로 단정하지 않습니다. 대신 사람과 정보, 교육과 현장을 이어 두어 도움이 필요한 순간에 다음 연결이 존재하도록 만듭니다.</p><a className="button button-dark" href={FOUNDATION_URL} target="_blank" rel="noreferrer">재단 공식 사이트 <span aria-hidden="true">↗</span></a></div>
          <div className="network-visual" data-reveal aria-hidden="true"><div className="network-ring ring-one" /><div className="network-ring ring-two" /><div className="network-ring ring-three" /><span className="network-node node-one">관심</span><span className="network-node node-two">교육</span><span className="network-node node-three">정보</span><span className="network-node node-four">현장</span><span className="network-center">도움</span><div className="network-thread thread-a" /><div className="network-thread thread-b" /><div className="network-thread thread-c" /></div>
        </div>
      </section>

      <section className="banner-section section" id="banner" aria-labelledby="banner-heading">
        <div className="container banner-grid">
          <div className="banner-copy" data-reveal><p className="eyebrow"><span>05</span> 실제 광고 시안</p><h2 id="banner-heading">작은 배너에도<br /><em>연결은 보이게.</em></h2><p>300×250 한 칸 안에서 광고 표기, 관심과 전문 도움, 메인 카피, 랜딩 CTA가 바로 읽히도록 압축했습니다. 아래 버튼으로 제출용 PNG를 즉시 내려받을 수 있습니다.</p><div className="format-switch" role="group" aria-label="배너 규격 선택"><button className={format === "square" ? "active" : ""} onClick={() => setFormat("square")} type="button">300 × 250</button><button className={format === "tower" ? "active" : ""} onClick={() => setFormat("tower")} type="button">160 × 600</button></div><button className="button button-primary download-button" type="button" onClick={() => { drawBanner(format); announce("배너 PNG 다운로드를 시작했습니다."); }}>현재 규격 PNG 다운로드 <span aria-hidden="true">↓</span></button><p className="micro-note">※ 기관 로고는 주최 측 승인본을 받는 즉시 교체합니다.</p></div>
          <div className="banner-display" data-reveal><div className={`banner-frame ${format}`}><div className="banner-label">[광고]</div><div className="banner-logo-placeholder" aria-label="기관 로고 교체 자리">기관 로고<br /><small>승인본 교체</small></div><div className="banner-cards"><div className="mini-card">관심</div><span className="mini-thread" aria-hidden="true" /><div className="mini-card">전문 도움</div></div><h3>관심이,<br /><strong>도움에 닿도록.</strong></h3><button type="button" onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}>생명존중의 연결망 보기 <span aria-hidden="true">→</span></button></div><div className="banner-size-note"><span>LIVE MOCKUP</span><span>{format === "square" ? "300 × 250 px" : "160 × 600 px"}</span></div></div>
        </div>
      </section>

      <section className="submit section section-paper" id="submit" aria-labelledby="submit-heading">
        <div className="container submit-grid">
          <div data-reveal><p className="eyebrow"><span>06</span> 나중에 할 일은 여기만 확인</p><h2 id="submit-heading">제작은 끝났고,<br /><em>확인만 남았습니다.</em></h2><p className="section-lede">페이지와 배너는 지금 바로 사용할 수 있게 구성했습니다. 제출 직전에 아래 항목을 체크하고, 공식 공고의 최신 양식·기관 표기·링크만 반영하면 됩니다.</p><div className="progress-card"><div className="progress-head"><span>제출 준비도</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><small>{completed.length} / {checklist.length} 항목 완료</small></div></div>
          <div className="checklist" data-reveal>{checklist.map((item) => { const isDone = completed.includes(item.id); return <button key={item.id} type="button" className={`check-row ${isDone ? "done" : ""}`} onClick={() => toggleChecklist(item.id)} aria-pressed={isDone}><span className="check-box" aria-hidden="true">{isDone ? "✓" : ""}</span><span className="check-copy"><strong>{item.label}</strong><small>{item.detail}</small></span><span className="check-arrow" aria-hidden="true">↗</span></button>; })}<div className="check-actions"><a className="button button-dark" href={OFFICIAL_CONTEST_URL} target="_blank" rel="noreferrer">공식 접수 안내 열기 <span aria-hidden="true">↗</span></a><a className="text-link" href="#top">처음으로 <span aria-hidden="true">↑</span></a></div></div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /><span /></span><span>사람 사이의 링크</span></a><p>2026 전국 대학생 생명존중 광고공모전<br />한국생명존중희망재단 가치 확산 광고 부문</p></div><div className="footer-links"><a href={OFFICIAL_CONTEST_URL} target="_blank" rel="noreferrer">공식 공모전 안내 ↗</a><a href={FOUNDATION_URL} target="_blank" rel="noreferrer">재단 공식 사이트 ↗</a><span>캠페인 시안 · 2026</span></div></div>
        <div className="container footer-bottom"><span>관심이, 도움에 닿도록.</span><span>기관 로고·공식 연결 정보는 승인본으로 최종 교체</span></div>
      </footer>

      <div className="sr-only" aria-live="polite">{notice}</div>
    </main>
  );
}
