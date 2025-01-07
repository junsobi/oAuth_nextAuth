import SignOutButton from "./_components/sign-out-button";
import UserAvatar from "./_components/user-avatar";
import { Session } from "next-auth";

interface UserInfoProps {
  session: Session;
}

export default function UserInfo({ session }: UserInfoProps) {
  const { user } = session;

  return (
    <article className="flex flex-col items-center">
      <h1 className="text-lg font-bold">Welcome, {user?.name || "User"}!</h1>
      <UserAvatar image={user?.image} name={user?.name} />
      <p className="text-gray-600 mt-2">{user?.email}</p>
      <SignOutButton />
    </article>
  );
}
