# SSR Next.js App Router - CineScope

Aplicación SSR para explorar películas usando Next.js App Router.

## Rutas

- `/` -> `app/page.js`
- `/movie/:id` -> `app/movie/[id]/page.js`
- `/search` -> `app/search/page.js`

## Configuración

Crea un archivo `.env.local`:

```bash
TMDB_API_KEY=tu_api_key_de_tmdb
```

## Ejecutar

```bash
npm install
npm run dev
```

## Validar

```bash
npm run lint
npm run build
```

