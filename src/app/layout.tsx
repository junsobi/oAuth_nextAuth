import type { Metadata } from "next";

import SessionProvider from "@/components/session-provider/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs-auth",
  description: "Next.js Auth Example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
