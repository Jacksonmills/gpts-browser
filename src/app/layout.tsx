import "@/styles/globals.css";

import { cookies } from "next/headers";
import { GeistMono } from "geist/font/mono";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

import { ThemeProvider } from "./_components/ThemeProvider";
import { ThemeToggle } from "./_components/ThemeToggle";
import { AddGPTPopover } from "./_components/AddGPTPopover";

export const metadata = {
  title: "GPT Browser",
  description: "Browse community-built GPTs.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={GeistMono.className} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider cookies={cookies().toString()}>
              <header className="w-full flex items-center p-6 gap-4">
                <UserButton />
                <span className="ml-auto">
                  <AddGPTPopover />
                </span>
              </header>
              <main className="min-h-screen">
                {children}
              </main>
              <footer className="flex items-center p-6 gap-4">
                <span className="mr-auto">A project by{' '}<a className="text-[#ff0051] dark:text-[#a6ff00] hover:underline" href="https://github.com/Jacksonmills">JEM</a>.</span>
                <ThemeToggle />
              </footer>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
