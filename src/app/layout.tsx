import type { Metadata } from "next";

import "./globals.css";
import ReduxProvider from "@/components/redux-provider";



export const metadata: Metadata = {
  title: "Admin",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`antialiased dark:text-white`}
      >
        <ReduxProvider>      
            {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
