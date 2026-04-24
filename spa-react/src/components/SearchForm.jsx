import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function SearchForm({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  function onSubmit(event) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
      return
    }

    if (location.pathname !== '/search') {
      navigate('/search')
    }
  }

  return (
    <form className="search-form" onSubmit={onSubmit} role="search">
      <label className="sr-only" htmlFor="movie-query">
        Buscar películas por título
      </label>
      <input
        id="movie-query"
        className="search-form__input"
        type="search"
        placeholder="Buscar película..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button className="search-form__button" type="submit">
        Buscar
      </button>
    </form>
  )
}

export default SearchForm

