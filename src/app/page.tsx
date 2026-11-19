import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

/**
 * 메인 페이지 (wireframe.png 기준)
 * - 상단: 원형 프로필 사진 → 이름 → 한 줄 소개
 * - 하단: 링크 카드 목록 (세로 배치)
 * 표시 내용은 src/data/profile.ts 에서 수정합니다.
 */
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center gap-10 px-4 py-12 sm:py-16">
      <ProfileHeader name={profile.name} bio={profile.bio} avatarUrl={profile.avatarUrl} />
      <LinkList links={profile.links} />
    </main>
  );
}
