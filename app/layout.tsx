import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const gloock = localFont({
  src: "./fonts/Gloock-Regular.ttf",
  variable: "--font-default",
});

const oldStandard = localFont({
  src: [
    {
      path: "./fonts/OldStandardTT-Regular.ttf",
      style: "regular",
    },
    {
      path: "./fonts/OldStandardTT-Bold.ttf",
      style: "bold",
    },
    {
      path: "./fonts/OldStandardTT-Italic.ttf",
      style: "italic",
    },
  ],
  variable: "--font-subtext",
});

export const metadata: Metadata = {
  title: "Library Management System",
  description: "Manage, search, issue or return books from library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${gloock.variable} ${oldStandard.variable}`}>
        {children}
      </body>
    </html>
  );
}
