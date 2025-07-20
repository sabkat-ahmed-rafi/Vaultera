import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { Toaster } from 'react-hot-toast';

import "./globals.css";
import "@radix-ui/themes/styles.css";

import ReduxProvider from "@/redux/ReduxProvider";

export const metadata: Metadata = {
  title: "Vaultera",
  description: "Vaultera is an end-to-end encrypted password manager",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReduxProvider>
              <Theme appearance="dark" grayColor="sage" accentColor="blue">
                {children}
                <Toaster position="bottom-right" />
              </Theme>
        </ReduxProvider>
      </body>
    </html>
  );
}
