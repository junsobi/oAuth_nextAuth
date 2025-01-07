import Image from "next/image";

interface UserAvatarProps {
  image?: string | null;
  name?: string | null;
}

export default function UserAvatar({ image, name }: UserAvatarProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={`${name || "User"}'s profile`}
        width={96}
        height={96}
        className="rounded-full mt-4"
      />
    );
  }

  return (
    <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center mt-4">
      <span className="text-xl font-bold">
        {name?.charAt(0).toUpperCase() || "?"}
      </span>
    </div>
  );
}
