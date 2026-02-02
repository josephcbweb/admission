import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Of Engineering, Cherthala",
  description: "Admission website of College Of Engineering, Cherthala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
