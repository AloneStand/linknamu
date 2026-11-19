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
        width={224}
        height={224}
        priority
        className="size-44 rounded-full border-2 border-neutral-800 object-cover sm:size-56 dark:border-neutral-200"
      />
      <h1 className="mt-6 text-3xl font-bold">{name}</h1>
      <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">{bio}</p>
    </header>
  );
}
