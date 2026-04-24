import './globals.css'
import AppHeader from '../components/AppHeader'

export const metadata = {
  title: 'CineScope SSR',
  description: 'Explorador de películas con Next.js App Router y SSR',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AppHeader />
        <main className="page-container">{children}</main>
      </body>
    </html>
  )
}

