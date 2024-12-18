import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Letrinhas",
  description:
    "Crie o máximo de palavras possíveis com as letrinhas e ganhe pontos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
