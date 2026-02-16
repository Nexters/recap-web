import type { Metadata } from "next";

import ReactQueryProviders from "@/app/root/react-query-provider";
import GNB from "@/components/GNB";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "re-today",
  description: "re-today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="mx-auto max-w-7xl bg-gray-100">
        <ReactQueryProviders>
          <div className="mt-20 mb-35 flex flex-col gap-7">
            <GNB />
            {children}
          </div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
