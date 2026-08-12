import type { Metadata } from "next";

import GlobalHeader from "@/components/layout/GlobalHeader";
import TransitionProvider from "@/components/transitions/TransitionProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "American Modernism Archive",
    template:
      "%s | American Modernism Archive",
  },

  description:
    "An interactive editorial exploration of American modernist architecture and influential architects.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <GlobalHeader />

        <TransitionProvider>
          <main className="route-content">
            {children}
          </main>
        </TransitionProvider>
      </body>
    </html>
  );
}