/* eslint-disable @next/next/no-img-element -- The GitHub Pages export uses direct static assets without a Next image server. */

const ACTIVITY_GUIDE_URL =
  "https://www.kfsp.or.kr/home/kor/contents.do?menuPos=2#none";
const SIMS_URL = "https://sims.kfsp.or.kr/";
const REPORT_URL = "https://sims.kfsp.or.kr/?pMENU_NO=265";
const FOUNDATION_URL = "https://www.kfsp.or.kr/";
const CONTEST_URL = "https://inec.or.kr/board/detail/1411";

const joinSteps = [
  {
    number: "01",
    title: "1365 회원가입",
    body: "봉사활동 실적 연계를 위해 1365 자원봉사포털 계정을 준비합니다.",
    tone: "yellow",
  },
  {
    number: "02",
    title: "SIMS 가입",
    body: "미디어 자살정보 모니터링 시스템에 가입하고 활동 준비를 마칩니다.",
    tone: "blue",
  },
  {
    number: "03",
    title: "교육 후 활동",
    body: "사전교육을 이수한 뒤 온라인 모니터링과 신고 활동을 시작합니다.",
    tone: "coral",
  },
] as const;

const activityCards = [
  {
    number: "A",
    title: "모니터링",
    body: "SNS·포털·커뮤니티 등 온라인 공간의 자살유발·유해정보를 살펴봅니다.",
  },
  {
    number: "B",
    title: "게시물 신고",
    body: "발견한 정보는 해당 매체의 신고 기능을 통해 조치 요청합니다.",
  },
  {
    number: "C",
    title: "SIMS 활동 입력",
    body: "활동 내용을 미디어 자살정보 모니터링 시스템에 기록합니다.",
  },
] as const;

const publicValues = [
  {
    index: "A",
    eyebrow: "시민이 함께할 수 있도록",
    title: "참여의 문",
    body: "만 19세 이상 국민 누구나 생명존중문화 확산에 참여할 수 있는 시민 활동 경로를 엽니다.",
  },
  {
    index: "B",
    eyebrow: "관심이 책임 있게 이어지도록",
    title: "교육된 실천",
    body: "1365·SIMS 가입과 사전교육을 거쳐 관심을 책임 있는 온라인 모니터링 활동으로 연결합니다.",
  },
  {
    index: "C",
    eyebrow: "발견이 공식 행동이 되도록",
    title: "공적 신고 체계",
    body: "게시물 신고와 활동 기록이 미디어 자살정보 모니터링 시스템 안에서 이어지게 합니다.",
  },
] as const;

export default function Home() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#main-content">
        본문 바로가기
      </a>

      <div className="campaign-bar" aria-label="캠페인 안내">
        <div className="container campaign-bar-inner">
          <span className="campaign-dot" aria-hidden="true" />
          <span>한국생명존중희망재단 가치 확산 캠페인</span>
          <span className="campaign-bar-note">관심을 신고와 참여로 연결합니다</span>
        </div>
      </div>

      <header className="site-header">
        <nav className="container nav" aria-label="주요 메뉴">
          <a
            className="foundation-brand"
            href={FOUNDATION_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="한국생명존중희망재단 공식 사이트 새 창 열기"
          >
            <img src="/kfsp-ci.png" alt="한국생명존중희망재단" />
          </a>
          <div className="nav-links">
            <a href="#about">지켜줌인이란</a>
            <a href="#foundation">재단의 역할</a>
            <a href="#join">참여 방법</a>
          </div>
          <a
            className="nav-cta"
            href={REPORT_URL}
            target="_blank"
            rel="noreferrer"
          >
            자살유발정보 신고하기 <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="main-content" aria-labelledby="hero-title">
        <div className="hero-wash" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span>LINK 01</span> 사람 사이의 링크
            </p>
            <h1 id="hero-title">
              지나치지 않는
              <br />
              사람,
              <br />
              <em>지켜줌인.</em>
            </h1>
            <p className="hero-lede">
              온라인에서 마주친 자살유발정보를 보고 지나치지 않는 사람.
              모니터링과 신고로 생명존중의 연결망을 넓혀 주세요.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={ACTIVITY_GUIDE_URL}
                target="_blank"
                rel="noreferrer"
              >
                지켜줌인 활동 참여하기 <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button button-secondary"
                href={REPORT_URL}
                target="_blank"
                rel="noreferrer"
              >
                바로 신고하기 <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="hero-micro">
              만 19세 이상 국민 누구나 참여할 수 있습니다.
            </p>
          </div>

          <div
            className="hero-visual"
            role="img"
            aria-label="두 손 사이의 금빛 실이 관심과 신고를 연결하는 캠페인 이미지"
          >
            <img
              className="hero-visual-image"
              src="/life-thread-oil-v2.png"
              alt=""
            />
            <div className="hero-visual-shade" aria-hidden="true" />
            <span className="visual-chip">사람 사이의 링크</span>
            <div className="visual-node visual-node-left">
              <small>발견한 순간</small>
              <strong>관심</strong>
            </div>
            <span className="visual-thread" aria-hidden="true" />
            <div className="visual-node visual-node-right">
              <small>이어지는 행동</small>
              <strong>신고</strong>
            </div>
            <p className="visual-caption">
              보고,
              <br />
              연결하고,
              <br />
              지키는 일.
            </p>
          </div>
        </div>

        <div className="container fact-bar" aria-label="지켜줌인 참여 핵심 정보">
          <div>
            <span>참여 대상</span>
            <strong>만 19세 이상 누구나</strong>
          </div>
          <div>
            <span>활동 공간</span>
            <strong>온라인 전반</strong>
          </div>
          <div>
            <span>활동 시작</span>
            <strong>1365 회원가입</strong>
          </div>
        </div>
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="section-number" aria-hidden="true">
            01
          </div>
          <div className="about-copy">
            <p className="eyebrow">지켜줌인(人)이란?</p>
            <h2 id="about-title">
              발견한 순간,
              <br />
              <em>연결은 시작됩니다.</em>
            </h2>
            <p className="section-lede">
              지켜줌인은 생명존중문화 확산을 위해 온라인 자살유발정보를
              자발적으로 모니터링하는 자원봉사자입니다. 한 번의 관심을
              실제 신고와 기록으로 이어 온라인 환경을 함께 지킵니다.
            </p>
            <a
              className="text-link"
              href={ACTIVITY_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
            >
              재단 공식 활동 안내 확인하기 <span aria-hidden="true">↗</span>
            </a>
          </div>
          <aside className="quote-card" aria-label="캠페인 핵심 문장">
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <p>
              지나치지 않은 관심을,
              <br />
              <strong>지켜내는 행동으로.</strong>
            </p>
            <span className="quote-rule" aria-hidden="true" />
            <small>관심에서 신고까지, 사람 사이의 링크</small>
          </aside>
        </div>
      </section>

      <section
        className="public-value section"
        id="foundation"
        aria-labelledby="foundation-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span>02</span> 한국생명존중희망재단의 공공적 가치
              </p>
              <h2 id="foundation-title">
                관심을 참여로,
                <br />
                <em>참여를 안전망으로.</em>
              </h2>
            </div>
            <p>
              재단은 시민의 관심이 일회성 선의에 머물지 않도록 참여 기회와
              교육, 공식 신고 시스템을 하나의 활동 경로로 연결합니다.
            </p>
          </div>

          <div className="value-grid">
            {publicValues.map((value) => (
              <article className="value-card" key={value.index}>
                <div className="value-card-top">
                  <span>{value.index}</span>
                  <i aria-hidden="true" />
                </div>
                <div>
                  <p>{value.eyebrow}</p>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="value-summary">
            <span aria-hidden="true" />
            <p>
              지켜줌인은 재단의 역할을 가장 가까운 시민 행동으로 경험하게
              하는 참여 경로입니다.
            </p>
            <a
              className="text-link"
              href={ACTIVITY_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
            >
              공식 근거 확인하기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="join section section-dark" id="join" aria-labelledby="join-title">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div>
              <p className="eyebrow eyebrow-light">
                <span>03</span> 참여 방법
              </p>
              <h2 id="join-title">
                관심이 행동이 되는
                <br />
                <em>세 단계.</em>
              </h2>
            </div>
            <p>
              공식 안내에 따라 계정을 준비하고 사전교육을 마치면,
              온라인 모니터링과 신고 활동을 시작할 수 있습니다.
            </p>
          </div>

          <div className="step-line" aria-hidden="true" />
          <div className="step-grid">
            {joinSteps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className={`step-number ${step.tone}`}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          <div className="join-action">
            <p>
              준비되셨나요? 정확한 가입 절차와 최신 활동 조건은 재단 공식
              안내에서 확인하세요.
            </p>
            <a
              className="button button-primary"
              href={ACTIVITY_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
            >
              지켜줌인 활동 안내 보기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section
        className="activity section"
        id="activity"
        aria-labelledby="activity-title"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span>04</span> 활동 내용
              </p>
              <h2 id="activity-title">
                보고, 신고하고,
                <br />
                <em>기록합니다.</em>
              </h2>
            </div>
            <p>
              복잡한 설명보다 실제 활동을 한눈에 이해할 수 있도록 공식
              안내의 핵심만 세 가지로 정리했습니다.
            </p>
          </div>

          <div className="activity-grid">
            {activityCards.map((card) => (
              <article className="activity-card" key={card.number}>
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <div className="report-panel">
            <div>
              <p className="report-kicker">이미 신고할 정보가 있나요?</p>
              <h3>지금, 공식 신고 화면으로 연결합니다.</h3>
              <p>
                신고 접수와 확인은 한국생명존중희망재단의 미디어 자살정보
                모니터링 시스템에서 진행됩니다.
              </p>
            </div>
            <a
              className="button button-light"
              href={REPORT_URL}
              target="_blank"
              rel="noreferrer"
            >
              자살유발정보 신고하기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="network section section-yellow" aria-labelledby="network-title">
        <div className="container network-grid">
          <div className="network-copy">
            <p className="eyebrow">
              <span>05</span> 연결망의 확장
            </p>
            <h2 id="network-title">
              한 사람의 관심이
              <br />
              <em>혼자 남지 않도록.</em>
            </h2>
            <p>
              지켜줌인은 개인의 관심을 교육과 정보, 현장의 실천으로 잇는
              재단의 참여 경로입니다. 연결된 행동이 생명존중문화를
              넓힙니다.
            </p>
            <a
              className="button button-dark"
              href={SIMS_URL}
              target="_blank"
              rel="noreferrer"
            >
              SIMS에서 활동 시작하기 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div
            className="network-visual"
            role="img"
            aria-label="관심, 교육, 정보, 현장이 모두 도움으로 연결된 생명존중 연결망"
          >
            <span className="network-ring ring-one" aria-hidden="true" />
            <span className="network-ring ring-two" aria-hidden="true" />
            <span className="network-ring ring-three" aria-hidden="true" />
            <span className="network-line line-a" aria-hidden="true" />
            <span className="network-line line-b" aria-hidden="true" />
            <span className="network-line line-c" aria-hidden="true" />
            <span className="network-line line-d" aria-hidden="true" />
            <span className="network-node node-one">관심</span>
            <span className="network-node node-two">교육</span>
            <span className="network-node node-three">정보</span>
            <span className="network-node node-four">현장</span>
            <span className="network-center">도움</span>
          </div>
        </div>
      </section>

      <section className="final-cta section" aria-labelledby="final-title">
        <div className="container final-cta-inner">
          <div>
            <p className="eyebrow eyebrow-light">사람 사이의 링크</p>
            <h2 id="final-title">
              지켜보는 사람에서,
              <br />
              <em>지켜주는 사람으로.</em>
            </h2>
            <p>
              당신의 관심을 지켜줌인 활동과 신고로 연결해 주세요.
            </p>
          </div>
          <div className="final-actions">
            <a
              className="button button-primary"
              href={ACTIVITY_GUIDE_URL}
              target="_blank"
              rel="noreferrer"
            >
              지켜줌인 활동 참여하기 <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-outline-light"
              href={REPORT_URL}
              target="_blank"
              rel="noreferrer"
            >
              자살유발정보 신고하기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-main">
          <div>
            <a
              className="footer-logo"
              href={FOUNDATION_URL}
              target="_blank"
              rel="noreferrer"
            >
              <img src="/kfsp-ci.png" alt="한국생명존중희망재단" />
            </a>
            <p>
              본 페이지는 2026 전국 대학생 생명존중 광고공모전 출품을 위해
              제작된 공익 캠페인 랜딩페이지입니다. 참여와 신고는 공식
              사이트에서 진행됩니다.
            </p>
          </div>
          <div className="footer-links">
            <a href={ACTIVITY_GUIDE_URL} target="_blank" rel="noreferrer">
              지켜줌인 활동 안내 ↗
            </a>
            <a href={REPORT_URL} target="_blank" rel="noreferrer">
              자살유발정보 신고 ↗
            </a>
            <a href={FOUNDATION_URL} target="_blank" rel="noreferrer">
              재단 공식 사이트 ↗
            </a>
            <a href={CONTEST_URL} target="_blank" rel="noreferrer">
              공모전 안내 ↗
            </a>
          </div>
        </div>
        <div className="container support-note">
          <span>지금 마음이 힘들거나 즉각적인 도움이 필요하다면</span>
          <a href="tel:109">24시간 자살예방상담전화 109</a>
        </div>
        <div className="container footer-bottom">
          <span>사람 사이의 링크 · 2026</span>
          <span>도움은 연결될 때 가까워집니다.</span>
        </div>
      </footer>

      <a
        className="mobile-cta"
        href={ACTIVITY_GUIDE_URL}
        target="_blank"
        rel="noreferrer"
      >
        지켜줌인 참여하기 <span aria-hidden="true">↗</span>
      </a>
    </main>
  );
}
