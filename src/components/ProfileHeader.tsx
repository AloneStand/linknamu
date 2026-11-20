import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  avatarUrl: string;
};

export default function ProfileHeader({ name, bio, avatarUrl }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={avatarUrl}
        alt={`${name} 프로필 사진`}
        width={144}
        height={144}
        priority
        className="size-28 rounded-full object-cover ring-4 ring-white/80 shadow-[0_18px_40px_-12px_rgba(150,85,40,0.45),0_4px_10px_-4px_rgba(150,85,40,0.25)] sm:size-36 dark:ring-white/15 dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
      />
      <h1 className="mt-7 text-2xl font-bold tracking-tight sm:text-[1.75rem]">{name}</h1>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{bio}</p>
    </header>
  );
}
