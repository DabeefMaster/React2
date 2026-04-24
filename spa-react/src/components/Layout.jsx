import { NavLink } from 'react-router-dom'
import SearchForm from './SearchForm'

function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar__inner">
          <NavLink className="brand" to="/">
            CineScope
          </NavLink>

          <nav className="main-nav" aria-label="Navegación principal">
            <NavLink className={({ isActive }) => `main-nav__link ${isActive ? 'active' : ''}`} to="/">
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) => `main-nav__link ${isActive ? 'active' : ''}`}
              to="/search"
            >
              Búsqueda
            </NavLink>
          </nav>

          <SearchForm />
        </div>
      </header>

      <main className="page-container">{children}</main>
    </div>
  )
}

export default Layout

