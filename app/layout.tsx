import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://people-between-links.influmatics.chatgpt.site"),
  title: "지켜보는 사람에서, 지켜주는 사람으로 — 사람 사이의 링크",
  description:
    "한국생명존중희망재단의 미션과 핵심가치, 지켜줌인 활동을 소개하고 시민의 관심을 생명존중의 공공 행동으로 연결하는 캠페인입니다.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "지켜보는 사람에서, 지켜주는 사람으로",
    description:
      "존중·공감·협력·전문성이라는 재단의 가치와 지켜줌인 참여를 연결하는 생명존중 공익 캠페인",
    type: "website",
    images: [
      {
        url: "/campaign-banner-300.png",
        width: 300,
        height: 250,
        alt: "지켜보는 사람에서, 지켜주는 사람으로",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "지켜보는 사람에서, 지켜주는 사람으로",
    description: "재단의 가치가 시민의 관심과 예방 행동으로 이어지도록 지켜줌인에 참여해 주세요.",
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
