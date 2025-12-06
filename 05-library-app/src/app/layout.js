import "./globals.css";

export const metadata = {
  title: "Library App",
  description: "Aplikacja do zarządzania biblioteką",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="toast-root"></div>
      </body>
    </html>
  );
}
