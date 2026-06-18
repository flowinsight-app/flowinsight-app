import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Doctor Flow - Connect with Healthcare Facilities',
  description: 'Connect with healthcare facilities in real-time. Accept medical assignments instantly and earn flexibly.',
  applicationName: 'Doctor Flow',
  keywords: ['doctor', 'healthcare', 'medical', 'assignments', 'hospital'],
  authors: [{ name: 'Ezhuthola edTech Private Limited' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Doctor Flow',
  },
  openGraph: {
    title: 'Doctor Flow',
    description: 'Connect with healthcare facilities in real-time',
    url: 'https://doctorflow.flowinsight.app',
    type: 'website',
    locale: 'en_IN',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1A237E',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Doctor Flow" />
        <meta name="theme-color" content="#1A237E" />
      </head>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}