import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs-auth(passkey)",
  description: "Next.js Auth Example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kor">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
