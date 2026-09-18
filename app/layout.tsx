import Providers from "./providers";
import Alert from "@/components/Alert";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {/* <ConditionalLayout>{children}</ConditionalLayout> */}
          {children}
          <Alert />
        </Providers>
      </body>
    </html>
  );
}
