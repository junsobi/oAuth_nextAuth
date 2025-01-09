"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { signIn as passkeySignIn } from "next-auth/webauthn";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

export default function SignInPrompt() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } catch (error) {
      console.error("Google 로그인 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      setLoading(true);
      await passkeySignIn("passkey");
    } catch (error) {
      console.error("Passkey 로그인 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && <LoadingOverlay />}
      <Card className="flex flex-col items-center justify-center">
        <CardHeader className="text-lg font-bold">Please Sign In</CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <GoogleSignInButton onClick={handleGoogleLogin} />
          <PasskeySignInSection onClick={handlePasskeyLogin} />
        </CardContent>
      </Card>
    </div>
  );
}

function GoogleSignInButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className="w-full" onClick={onClick}>
      Google 로그인
    </Button>
  );
}

function PasskeySignInSection({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex flex-col space-y-2">
      <Button className="w-full" onClick={onClick}>
        Passkey 로그인
      </Button>
      <p className="text-sm text-gray-600">
        Passkey를 사용하려면 먼저 Google 계정으로 로그인 한 후 Passkey를
        등록해야 합니다.
      </p>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center rounded-md justify-center z-10">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white">로그인 중...</p>
      </div>
    </div>
  );
}
