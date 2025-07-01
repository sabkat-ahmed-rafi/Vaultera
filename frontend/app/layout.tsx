import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Vaultera",
  description: "Vaultera is an end-to-end encrypted password manager",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
