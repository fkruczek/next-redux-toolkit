import AppLink from "@/components/AppLink";
import Providers from "@/components/Provider";
import AppToast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata = {
  title: "User App",
  description: "Next.js + RTK Query + Zod + Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-auto mt-10 flex flex-col max-w-4xl gap-4 bg-amber-50 h-full">
        <Providers>
          <AppLink href="/">Home</AppLink>
          <main className="bg-slate-100 p-4">{children}</main>
          <AppToast />
        </Providers>
      </body>
    </html>
  );
}
