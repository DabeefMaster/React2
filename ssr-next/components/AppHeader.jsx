import Link from 'next/link'
import SearchForm from './SearchForm'

function AppHeader() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="brand" href="/">
          CineScope SSR
        </Link>

        <nav className="main-nav" aria-label="Navegación principal">
          <Link className="main-nav__link" href="/">
            Inicio
          </Link>
          <Link className="main-nav__link" href="/search">
            Búsqueda
          </Link>
        </nav>

        <SearchForm />
      </div>
    </header>
  )
}

export default AppHeader

