"use client";

import type { LinkItem } from "@/data/profile";

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

export default function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(link.id)}
      className="block w-full rounded-3xl border border-white/70 bg-white/45 px-6 py-[1.1rem] text-center text-[0.95rem] font-semibold shadow-[0_8px_24px_-10px_rgba(150,85,40,0.25),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-150 transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_12px_28px_-10px_rgba(150,85,40,0.32),inset_0_1px_0_rgba(255,255,255,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] dark:hover:bg-white/10"
    >
      {link.title}
    </a>
  );
}
