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
      className="block w-full rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900"
    >
      {link.title}
    </a>
  );
}
