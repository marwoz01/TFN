import "./globals.css";

export const metadata = {
  title: "Library App",
  description: "Aplikacja do zarządzania biblioteką w Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="min-h-screen bg-neutral-950 text-neutral-100">
        <header className="w-full bg-neutral-900 text-center border-b border-neutral-800 py-4 px-6 shadow-md">
          <h1 className="text-2xl font-bold tracking-wide text-rose-500">
            Library App
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
