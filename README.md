# 사람 사이의 링크

2026 전국 대학생 생명존중 광고공모전의 `한국생명존중희망재단의 역할과 공공적 가치 확산 광고` 출품용 랜딩페이지입니다.

메인 카피는 **“지켜보는 사람에서, 지켜주는 사람으로.”**이며, 한국생명존중희망재단의 미션과 핵심가치(존중·공감·협력·전문성)를 시민의 관심과 지켜줌인 활동 참여로 연결합니다.

## 공개 페이지

<https://ssy2205.github.io/people-between-links/>

GitHub Pages는 `main` 브랜치의 `/docs` 폴더를 배포합니다.

## 주요 산출물

- `public/campaign-banner-300.png` — 300×250 제출용 광고 배너
- `public/campaign-banner-approved.png` — 사용자가 승인한 최종 배너 원본
- `docs/` — GitHub Pages용 정적 랜딩페이지
- `scripts/build_final_banner.py` — 승인된 최종 배너를 제출·배포 위치로 복제하는 빌더
- `scripts/export_github_pages.mjs` — 앱 빌드 결과를 `/docs`로 내보내는 정적 익스포터
- `scripts/render_landing_pdf.mjs` — 랜딩 전체를 1200px 단일 스크롤 PDF로 출력

## 실행과 검증

```bash
npm install
npm run dev
npm test
npm run lint
npm run pages:export
npm run pdf:render
```

공개 페이지에는 제작 체크리스트나 광고 시안 편집 UI를 포함하지 않습니다. 제출 체크리스트와 광고기획서 문안은 상위 작업 폴더의 `outputs/`에 별도로 정리되어 있습니다.
