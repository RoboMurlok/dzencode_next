import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata: Metadata = {
  title: "Dzencode Next",
  description: "Test Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
