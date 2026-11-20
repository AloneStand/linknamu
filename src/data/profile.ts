export type LinkItem = {
  /** 클릭 수 집계에 쓰이는 고유 ID (바꾸면 해당 링크의 집계가 새로 시작됩니다) */
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로 또는 이미지 URL */
  avatarUrl: string;
  links: LinkItem[];
};

// TODO: 보여 주기용 더미 값입니다. 실제 내용으로 교체하세요.
export const profile: Profile = {
  name: "김시윤",
  bio: "학생 | 요즘에는 AI 에 관심이 많아요",
  avatarUrl: "https://placehold.co/224x224/orange/white.png",
  links: [
    { id: "github", title: "🐙 깃허브", url: "https://github.com/AloneStand" },
    { id: "blog", title: "📝 블로그", url: "https://blog.naver.com/gmprime" },
    { id: "email", title: "📧 이메일", url: "mailto:talonestand@gmail.com" },
  ],
};

export const linkIds = new Set(profile.links.map((link) => link.id));
