import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import { getChapters, getTemplates } from "@/lib/mdx";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ATO in Days, Not Years | Kubernetes Compliance Playbook",
  description: "The Kubernetes Playbook for Continuous Federal Compliance. Achieve ATO in 90 days with automated evidence collection, OSCAL documentation, and proven strategies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chapters = getChapters().map(c => ({
    ...c,
    href: `/${c.slug}`,
  }));

  const templates = getTemplates().map(t => ({
    ...t,
    href: `/templates/${t.slug}`,
  }));

  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white`}>
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="fixed inset-y-0 left-0 w-64">
              <Sidebar chapters={chapters} templates={templates} />
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNav chapters={chapters} templates={templates} />

          {/* Main content */}
          <main className="flex-1 lg:ml-64">
            <div className="pt-14 lg:pt-0">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
