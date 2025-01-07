import NextAuth, { AuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { NextApiHandler } from "next";

// NextAuth 옵션 정의
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: { session: DefaultSession; token: JWT }) {
      return session;
    },
  },
};

// NextAuth 핸들러 설정
const handler: NextApiHandler = NextAuth(authOptions);

// GET, POST 요청 모두 핸들러에 매핑
export { handler as GET, handler as POST };
