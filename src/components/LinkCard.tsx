"use client";

import type { LinkItem } from "@/data/profile";
import BrandIcon from "./BrandIcon";

function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // 새 탭으로 이동해도 요청이 유실되지 않도록 sendBeacon 우선 사용
  const blob = new Blob([body], { type: "application/json" });
  if (navigator.sendBeacon?.("/api/clicks", blob)) return;

  fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

type LinkCardProps = {
  link: LinkItem;
  count: number;
  onClick?: (linkId: string) => void;
};

export default function LinkCard({ link, count, onClick }: LinkCardProps) {
  // mailto: 등 웹 주소가 아닌 링크는 새 탭을 열지 않음 (빈 탭이 남는 문제 방지)
  const isWebLink = /^https?:\/\//.test(link.url);

  return (
    <a
      href={link.url}
      {...(isWebLink && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={() => {
        recordClick(link.id);
        onClick?.(link.id);
      }}
      className="relative block w-full rounded-3xl border border-white/70 bg-white/45 px-16 py-[1.1rem] text-center text-[0.95rem] font-semibold shadow-[0_8px_24px_-10px_rgba(150,85,40,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-150 transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_12px_28px_-10px_rgba(150,85,40,0.32),inset_0_1px_0_rgba(255,255,255,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] dark:hover:bg-white/10"
    >
      <span className="inline-flex items-center justify-center gap-2">
        {link.icon && <BrandIcon name={link.icon} className="size-5 shrink-0" />}
        {link.title}
      </span>
      <span className="absolute top-1/2 right-5 -translate-y-1/2 text-xs font-normal tabular-nums opacity-60">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
