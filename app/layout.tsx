import type { Metadata } from "next";
import "./globals.css";
import { lineSeed } from "./fonts/lineSeed";

export const metadata: Metadata = {
  title: "Happy Birthday",
  description: "Create a stunning Happy Birthday card with fireworks & music!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="th">
      <body className={`${lineSeed.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
