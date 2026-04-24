const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
const TVMAZE_BASE_URL = 'https://api.tvmaze.com'

const apiKey = process.env.TMDB_API_KEY
const hasTmdbKey = Boolean(apiKey && apiKey.trim())

function stripHtml(value = '') {
  return value.replace(/<[^>]+>/g, '').trim()
}

function mapTvMazeShow(show) {
  return {
    id: show.id,
    title: show.name ?? 'Sin título',
    overview: stripHtml(show.summary ?? ''),
    vote_average: show.rating?.average ?? null,
    poster_path: show.image?.original ?? show.image?.medium ?? null,
    release_date: show.premiered ?? '',
    runtime: show.runtime ?? null,
    genres: (show.genres ?? []).map((name) => ({ name })),
  }
}

function buildUrl(path, params = {}) {
  const query = new URLSearchParams({
    api_key: apiKey || '',
    language: 'es-ES',
    ...params,
  })

  return `${TMDB_BASE_URL}${path}?${query.toString()}`
}

async function tmdbFetch(path, { params = {}, revalidate = 3600, noStore = false } = {}) {
  const response = await fetch(
    buildUrl(path, params),
    noStore ? { cache: 'no-store' } : { next: { revalidate } },
  )

  if (!response.ok) {
    const error = new Error(`Error ${response.status}: no se pudo obtener la información de TMDB`)
    error.status = response.status
    throw error
  }

  return response.json()
}

export async function getPopularMovies() {
  if (hasTmdbKey) {
    const data = await tmdbFetch('/movie/popular')
    return data.results ?? []
  }

  const response = await fetch(`${TVMAZE_BASE_URL}/shows?page=1`, { next: { revalidate: 3600 } })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo obtener la información pública`)
  }

  const shows = await response.json()
  return (shows ?? [])
    .map(mapTvMazeShow)
    .sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0))
    .slice(0, 30)
}

export async function searchMovies(query) {
  const trimmedQuery = query.trim()

  if (!trimmedQuery) {
    return []
  }

  if (hasTmdbKey) {
    const data = await tmdbFetch('/search/movie', {
      params: {
        query: trimmedQuery,
        include_adult: false,
        page: 1,
      },
      noStore: true,
    })

    return data.results ?? []
  }

  const response = await fetch(
    `${TVMAZE_BASE_URL}/search/shows?q=${encodeURIComponent(trimmedQuery)}`,
    { cache: 'no-store' },
  )
  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo completar la búsqueda`)
  }

  const data = await response.json()
  return (data ?? []).map((item) => mapTvMazeShow(item.show))
}

export async function getMovieDetails(id) {
  if (hasTmdbKey) {
    return tmdbFetch(`/movie/${id}`)
  }

  const response = await fetch(`${TVMAZE_BASE_URL}/shows/${encodeURIComponent(id)}`, {
    next: { revalidate: 3600 },
  })

  if (!response.ok) {
    const error = new Error(`Error ${response.status}: no se pudo obtener el detalle`)
    error.status = response.status
    throw error
  }

  const show = await response.json()
  return mapTvMazeShow(show)
}

export function getPosterUrl(path) {
  if (!path) {
    return null
  }

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `${TMDB_IMAGE_BASE_URL}${path}`
}
