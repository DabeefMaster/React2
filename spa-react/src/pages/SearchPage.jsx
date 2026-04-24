import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import SearchForm from '../components/SearchForm'
import StatusMessage from '../components/StatusMessage'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = useMemo(() => (searchParams.get('q') || '').trim(), [searchParams])

  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function runSearch() {
      if (!query) {
        setResults([])
        setError('')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const data = await searchMovies(query)

        if (isMounted) {
          setResults(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'No se pudieron recuperar resultados de búsqueda.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    runSearch()

    return () => {
      isMounted = false
    }
  }, [query])

  return (
    <section>
      <h1 className="page-title">Búsqueda de Películas</h1>
      <p className="page-subtitle">Busca una película por título para ver sus resultados.</p>

      <div className="search-page-form">
        <SearchForm initialQuery={query} />
      </div>

      {isLoading && <StatusMessage title="Buscando" description="Consultando resultados..." />}

      {!isLoading && error && <StatusMessage title="Error" description={error} />}

      {!isLoading && !error && !query && (
        <StatusMessage title="Empieza una búsqueda" description="Introduce un título para consultar películas." />
      )}

      {!isLoading && !error && query && results.length === 0 && (
        <StatusMessage
          title="Sin resultados"
          description={`No hay resultados para "${query}". Prueba con otro título.`}
        />
      )}

      {!isLoading && !error && results.length > 0 && (
        <>
          <p className="page-subtitle">Resultados para: {query}</p>
          <div className="movie-grid">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default SearchPage

