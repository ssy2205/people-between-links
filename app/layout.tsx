import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : undefined;

  return {
    metadataBase: origin ? new URL(origin) : undefined,
    title: "사람 사이의 링크 — 관심이, 도움에 닿도록.",
    description:
      "2026 전국 대학생 생명존중 광고공모전 출품작 《사람 사이의 링크》. 개인의 관심이 교육·정보·지역의 전문적인 도움으로 이어지는 연결망을 보여 줍니다.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "사람 사이의 링크 — 관심이, 도움에 닿도록.",
      description:
        "한 번 더 묻는 일은 시작입니다. 그 관심이 전문적인 도움까지 닿도록.",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "사람 사이의 링크 — 관심이, 도움에 닿도록.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "사람 사이의 링크 — 관심이, 도움에 닿도록.",
      description: "관심이 전문적인 도움에 닿도록 사회의 연결망을 보여 줍니다.",
      images: ["/og.png"],
    },
  };
}

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
