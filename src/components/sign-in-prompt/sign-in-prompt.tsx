"use client";

import { signIn } from "next-auth/react";
import { signIn as passkeySignIn } from "next-auth/webauthn";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

export default function SignInPrompt() {
  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader className="text-lg font-bold">Please Sign In</CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <GoogleSignInButton />
        <PasskeySignInSection />
      </CardContent>
    </Card>
  );
}

function GoogleSignInButton() {
  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  return (
    <Button className="w-full" onClick={handleGoogleLogin}>
      Google 로그인
    </Button>
  );
}

function PasskeySignInSection() {
  const handlePasskeyLogin = async () => {
    await passkeySignIn("passkey");
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button className="w-full" onClick={handlePasskeyLogin}>
        Passkey 로그인
      </Button>
      <p className="text-sm text-gray-600">
        Passkey를 사용하려면 먼저 Google 계정으로 로그인 한 후 Passkey를
        등록해야 합니다.
      </p>
    </div>
  );
}
