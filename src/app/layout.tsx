import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { nunito } from "@/components/fonts";
import Navbar from "@/components/Navbar";
import TaskProvider from "@/context/taskProvider";
import FilterProvider from "@/context/filterProvider";

export const metadata: Metadata = {
  title: "TaskList — Tablero Kanban",
  description:
    "Tablero Kanban con listas, tarjetas, drag & drop, búsqueda y filtros por estado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`overflow-hidden ${nunito.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TaskProvider>
            <FilterProvider>
              <Navbar />
              {children}
            </FilterProvider>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
