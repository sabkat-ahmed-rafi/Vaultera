import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

import "./globals.css";
import "@radix-ui/themes/styles.css";



export const metadata: Metadata = {
  title: "Vaultera",
  description: "Vaultera is an end-to-end encrypted password manager",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Theme appearance="dark" grayColor="sage" accentColor="blue">
          {children}
        </Theme>
      </body>
    </html>
  );
}
