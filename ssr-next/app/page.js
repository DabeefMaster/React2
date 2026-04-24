import MovieCard from '../components/MovieCard'
import StatusBox from '../components/StatusBox'
import { getPopularMovies } from '../lib/tmdb'

export default async function HomePage() {
  try {
    const movies = await getPopularMovies()

    return (
      <section>
        <h1 className="page-title">Películas Populares (SSR)</h1>
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    )
  } catch (error) {
    return <StatusBox title="Error" description={error.message} />
  }
}

