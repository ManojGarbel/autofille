import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Form Auto-Filler',
  description: 'Store your details once; auto-fill forms anywhere.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-30 backdrop-blur border-b border-white/40 bg-white/50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="inline-block h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-fuchsia-500" />
              <span className="font-semibold">Form Auto-Filler</span>
            </a>
            <nav className="hidden sm:flex items-center gap-3 text-sm">
              <a className="hover:underline" href="/dashboard">Dashboard</a>
              <a className="hover:underline" href="/profile">Profile</a>
              <a className="hover:underline" href="/how-to">How to</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-12 border-t border-white/40 bg-white/50">
          <div className="max-w-5xl mx-auto px-4 py-6 text-xs text-gray-500">
            Built for students to save time filling forms.
          </div>
        </footer>
      </body>
    </html>
  );
}
