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
    title: "사람 사이의 링크 — 도움은 연결될 때 가까워집니다.",
    description:
      "2026 전국 대학생 생명존중 광고공모전 출품작 《사람 사이의 링크》. 관심과 도움을 한 가닥의 실로 연결합니다.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "사람 사이의 링크 — 도움은 연결될 때 가까워집니다.",
      description:
        "관심은 출발점입니다. 도움은 연결될 때 가까워집니다.",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "사람 사이의 링크 — 도움은 연결될 때 가까워집니다.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "사람 사이의 링크 — 도움은 연결될 때 가까워집니다.",
      description: "관심과 도움을 실제 금빛 실로 잇는 생명존중 캠페인입니다.",
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
