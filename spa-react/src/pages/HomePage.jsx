import { useEffect, useState } from 'react'
import { getPopularMovies } from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import StatusMessage from '../components/StatusMessage'

function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadPopularMovies() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getPopularMovies()

        if (isMounted) {
          setMovies(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'No se pudieron cargar las películas populares.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadPopularMovies()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return <StatusMessage title="Cargando" description="Obteniendo películas populares..." />
  }

  if (error) {
    return <StatusMessage title="Error" description={error} />
  }

  return (
    <section>
      <h1 className="page-title">Películas Populares</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default HomePage

