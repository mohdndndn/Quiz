import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NuPatch — Personalized GLP-1 Quiz',
  description: 'Discover your personalized GLP-1 restoration plan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
