import Link from 'next/link'
import { notFound } from 'next/navigation'
import StatusBox from '../../../components/StatusBox'
import { getMovieDetails, getPosterUrl } from '../../../lib/tmdb'

const FALLBACK_POSTER = 'https://via.placeholder.com/500x750?text=Sin+poster'

export default async function MovieDetailPage({ params }) {
  const resolvedParams = await params

  try {
    const movie = await getMovieDetails(resolvedParams.id)

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
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString('es-ES')
              : 'No disponible'}
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

          <Link className="movie-card__link" href="/">
            Volver al inicio
          </Link>
        </div>
      </article>
    )
  } catch (error) {
    if (error.status === 404) {
      notFound()
    }

    return <StatusBox title="Error" description={error.message} />
  }
}

