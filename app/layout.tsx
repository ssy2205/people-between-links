import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://people-between-links.influmatics.chatgpt.site"),
  title: "지나치지 않는 사람, 지켜줌인 — 사람 사이의 링크",
  description:
    "한국생명존중희망재단의 지켜줌인 활동을 소개하고 온라인 자살유발정보 모니터링과 신고 참여로 연결하는 생명존중 공익 캠페인입니다.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "지나치지 않는 사람, 지켜줌인",
    description:
      "시민의 관심을 교육과 공식 신고 시스템으로 연결하는 한국생명존중희망재단 가치 확산 캠페인",
    type: "website",
    images: [
      {
        url: "/campaign-banner-300.png",
        width: 300,
        height: 250,
        alt: "지나치지 않는 사람, 지켜줌인",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "지나치지 않는 사람, 지켜줌인",
    description: "온라인 자살유발정보를 발견했다면 지켜줌인으로 연결해 주세요.",
    images: ["/campaign-banner-300.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
