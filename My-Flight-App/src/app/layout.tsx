import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import "maplibre-gl/dist/maplibre-gl.css";

export const metadata: Metadata = {
  title: "Flight Tracker Dashboard",
  description: "Real-time flight tracking dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}