import type { Metadata } from "next";
import { AppProvider } from "./context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "DateApp - Encuentra tu match perfecto",
  description: "Aplicación de citas estilo Tinder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
