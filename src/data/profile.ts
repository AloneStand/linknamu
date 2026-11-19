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
  bio: "세계 최강 바이브코더",
  avatarUrl: "/avatar.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "blog", title: "Blog", url: "https://velog.io" },
  ],
};

export const linkIds = new Set(profile.links.map((link) => link.id));
