export const metadata = { title: "Live metrics" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", margin: "2rem auto", maxWidth: "40rem", color: "#172033" }}>
        {children}
      </body>
    </html>
  );
}
