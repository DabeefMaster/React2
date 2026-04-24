import { Link } from 'react-router-dom'
import { getPosterUrl } from '../api/tmdb'

const FALLBACK_POSTER = 'https://via.placeholder.com/500x750?text=Sin+poster'

function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img
        className="movie-card__poster"
        src={getPosterUrl(movie.poster_path) ?? FALLBACK_POSTER}
        alt={`Poster de ${movie.title}`}
        loading="lazy"
      />

      <div className="movie-card__content">
        <h2>{movie.title}</h2>
        <p className="movie-card__meta">
          {movie.release_date ? movie.release_date.slice(0, 4) : 'Fecha no disponible'} |{' '}
          {typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'N/A'} / 10
        </p>
        <p className="movie-card__overview">{movie.overview || 'Sin sinopsis disponible.'}</p>
        <Link className="movie-card__link" to={`/movie/${movie.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default MovieCard

