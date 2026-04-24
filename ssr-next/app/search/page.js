import MovieCard from '../../components/MovieCard'
import SearchForm from '../../components/SearchForm'
import StatusBox from '../../components/StatusBox'
import { searchMovies } from '../../lib/tmdb'

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const query = typeof resolvedSearchParams?.q === 'string' ? resolvedSearchParams.q.trim() : ''

  if (!query) {
    return (
      <section>
        <h1 className="page-title">Búsqueda de Películas (SSR)</h1>
        <p className="page-subtitle">Introduce un título para consultar resultados.</p>
        <div className="search-page-form">
          <SearchForm initialQuery={query} />
        </div>
        <StatusBox title="Empieza una búsqueda" description="Aún no has indicado un término de búsqueda." />
      </section>
    )
  }

  try {
    const movies = await searchMovies(query)

    return (
      <section>
        <h1 className="page-title">Búsqueda de Películas (SSR)</h1>
        <p className="page-subtitle">Resultados para: {query}</p>
        <div className="search-page-form">
          <SearchForm initialQuery={query} />
        </div>

        {movies.length === 0 ? (
          <StatusBox
            title="Sin resultados"
            description={`No hay resultados para "${query}". Prueba con otra búsqueda.`}
          />
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    )
  } catch (error) {
    return (
      <section>
        <h1 className="page-title">Búsqueda de Películas (SSR)</h1>
        <div className="search-page-form">
          <SearchForm initialQuery={query} />
        </div>
        <StatusBox title="Error" description={error.message} />
      </section>
    )
  }
}

