"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 링크 ID → 클릭 수. 받아 오기 전에는 비어 있어 모든 카드가 0회로 표시됨
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => {
        // 응답이 늦게 와도 그 사이 누른 클릭이 사라지지 않도록 더 큰 값을 유지
        setCounts((prev) => {
          const merged = { ...data };
          for (const [id, n] of Object.entries(prev)) merged[id] = Math.max(merged[id] ?? 0, n);
          return merged;
        });
      })
      .catch(() => {}); // 실패하면 0회 표시를 유지
    return () => controller.abort();
  }, []);

  const handleClick = (linkId: string) => {
    setCounts((prev) => ({ ...prev, [linkId]: (prev[linkId] ?? 0) + 1 }));
  };

  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts[link.id] ?? 0} onClick={handleClick} />
        </li>
      ))}
    </ul>
  );
}
