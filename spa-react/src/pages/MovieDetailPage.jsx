import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovieDetails, getPosterUrl } from '../api/tmdb'
import StatusMessage from '../components/StatusMessage'

const FALLBACK_POSTER = 'https://via.placeholder.com/500x750?text=Sin+poster'

function MovieDetailPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadMovie() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getMovieDetails(id)

        if (isMounted) {
          setMovie(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'No se pudo recuperar el detalle de la película.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadMovie()

    return () => {
      isMounted = false
    }
  }, [id])

  if (isLoading) {
    return <StatusMessage title="Cargando" description="Recuperando detalle de la película..." />
  }

  if (error || !movie) {
    return <StatusMessage title="Error" description={error || 'Película no encontrada.'} />
  }

  return (
    <article className="movie-detail">
      <img
        className="movie-detail__poster"
        src={getPosterUrl(movie.poster_path) ?? FALLBACK_POSTER}
        alt={`Poster de ${movie.title}`}
      />

      <div className="movie-detail__content">
        <h1>{movie.title}</h1>
        <p>
          <strong>Fecha de estreno:</strong>{' '}
          {movie.release_date ? new Date(movie.release_date).toLocaleDateString('es-ES') : 'No disponible'}
        </p>
        <p>
          <strong>Calificación:</strong> {movie.vote_average?.toFixed(1) ?? 'N/A'} / 10
        </p>
        <p>
          <strong>Duración:</strong> {movie.runtime ? `${movie.runtime} min` : 'No disponible'}
        </p>
        <p>
          <strong>Géneros:</strong>{' '}
          {movie.genres?.length ? movie.genres.map((genre) => genre.name).join(', ') : 'No disponibles'}
        </p>

        <h2>Sinopsis</h2>
        <p>{movie.overview || 'Sin sinopsis disponible.'}</p>

        <Link className="movie-card__link" to="/">
          Volver al inicio
        </Link>
      </div>
    </article>
  )
}

export default MovieDetailPage

