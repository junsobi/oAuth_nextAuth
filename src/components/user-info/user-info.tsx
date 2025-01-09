"use client";

import UserAvatar from "./_components/user-avatar";
import SignOutButton from "./_components/sign-out-button";
import PasskeyManager from "./_components/passkey-manager";
import { Session } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface UserInfoProps {
  session: Session;
}

export default function UserInfo({ session }: UserInfoProps) {
  const { user } = session;

  return (
    <Card className="flex flex-col items-center w-full max-w-md p-6 space-y-4">
      <UserHeader user={user} />
      <UserContent user={user} />
    </Card>
  );
}

interface UserHeaderProps {
  user: Session["user"];
}

function UserHeader({ user }: UserHeaderProps) {
  return (
    <CardHeader className="flex flex-col items-center space-y-2">
      <UserAvatar image={user?.image} name={user?.name} />
      <CardTitle className="text-center text-lg font-bold">
        환영합니다, {user?.name || "사용자"}!
      </CardTitle>
    </CardHeader>
  );
}

interface UserContentProps {
  user: Session["user"];
}

function UserContent({ user }: UserContentProps) {
  return (
    <CardContent className="w-full text-center space-y-4">
      <p className="text-gray-600">{user?.email}</p>
      <SignOutButton />
      {user?.email && <PasskeyManager email={user.email} />}
    </CardContent>
  );
}
