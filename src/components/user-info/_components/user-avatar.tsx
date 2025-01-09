"use client";

import Image from "next/image";

interface UserAvatarProps {
  image?: string | null;
  name?: string | null;
}

export default function UserAvatar({ image, name }: UserAvatarProps) {
  return image ? <UseAvatar image={image} /> : <UnAvatar name={name} />;
}

const UseAvatar = ({ image }: UserAvatarProps) => {
  return (
    <Image
      src={image || "/default-image.png"}
      alt="User's profile"
      width={48}
      height={48}
      className="rounded-full border border-gray-300"
    />
  );
};

const UnAvatar = ({ name }: UserAvatarProps) => {
  return (
    <div className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center">
      <span className="text-xl font-bold">
        {name?.charAt(0).toUpperCase() || "?"}
      </span>
    </div>
  );
};
