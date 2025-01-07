import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import UserInfo from "@/components/user-info/user-info";
import SignInPrompt from "@/components/sign-in-prompt/sign-in-prompt";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {session ? <UserInfo session={session} /> : <SignInPrompt />}
    </main>
  );
}
