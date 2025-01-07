"use client";

import { signIn } from "next-auth/react";

export default function SignInPrompt() {
  const handleLogin = async () => {
    await signIn("google");
  };

  return (
    <article className="flex flex-col items-center justify-center">
      <h1 className="text-lg font-bold">Please Sign In</h1>
      <button
        onClick={handleLogin}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign In with Google
      </button>
    </article>
  );
}
