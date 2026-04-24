function SearchForm({ initialQuery = '' }) {
  return (
    <form className="search-form" action="/search" method="get" role="search">
      <label className="sr-only" htmlFor="movie-query-ssr">
        Buscar películas por título
      </label>
      <input
        id="movie-query-ssr"
        className="search-form__input"
        type="search"
        name="q"
        defaultValue={initialQuery}
        placeholder="Buscar película..."
      />
      <button className="search-form__button" type="submit">
        Buscar
      </button>
    </form>
  )
}

export default SearchForm

