import { auth } from "@/auth";
import UserInfo from "@/components/user-info/user-info";
import SignInPrompt from "@/components/sign-in-prompt/sign-in-prompt";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      {session ? <UserInfo session={session} /> : <SignInPrompt />}
    </main>
  );
}
