"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Button onClick={handleLogout} variant="destructive" className="w-full">
      로그아웃
    </Button>
  );
}
