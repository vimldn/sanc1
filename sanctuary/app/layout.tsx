import type { Metadata } from 'next'
import '@/styles/globals.css'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: {
    default: 'The London Sanctuary — Premium Day-Use Rooms',
    template: '%s | The London Sanctuary',
  },
  description:
    'Book London hotel rooms by the hour for deep work, micro-wellness, and event refresh. Sanctuary Direct pricing — no aggregator commission.',
  metadataBase: new URL('https://london-sanctuary.co.uk'),
  openGraph: {
    siteName: 'The London Sanctuary',
    locale: 'en_GB',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
