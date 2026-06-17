import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'Doctor Flow - Healthcare Marketplace',
  description: 'Connect with healthcare facilities. Work when you want, where you want.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Doctor Flow',
  },
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  keywords: ['doctor', 'healthcare', 'marketplace', 'jobs', 'medical'],
  authors: [{ name: 'Flow Insight', url: 'https://flowinsight.app' }],
  creator: 'Flow Insight',
  publisher: 'Flow Insight',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://doctor.flowinsight.app',
    title: 'Doctor Flow - Healthcare Marketplace',
    description: 'Connect with healthcare facilities. Work when you want, where you want.',
    siteName: 'Doctor Flow',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Doctor Flow Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doctor Flow - Healthcare Marketplace',
    description: 'Connect with healthcare facilities. Work when you want, where you want.',
    creator: '@flowinsight',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Doctor Flow" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}