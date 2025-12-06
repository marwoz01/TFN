import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        {children}
        <div id="toast-root"></div>
      </body>
    </html>
  );
}
