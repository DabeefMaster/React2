# Práctica 2 React - SPA + SSR (TMDB)

Este repositorio contiene la práctica completa solicitada en el enunciado de **Desarrollo Front con Frameworks I**:

- Versión **SPA** con React + React Router DOM.
- Versión **SSR** con Next.js + App Router.

La aplicación en ambas versiones permite:

- Visualizar películas populares.
- Navegar al detalle de cada película.
- Buscar películas por título.
- Navegar entre secciones con rutas dedicadas.

## 1) Estructura del proyecto

```text
Entrega3/
+- spa-react/                 # Implementación SPA (React + React Router DOM)
¦  +- src/
¦  ¦  +- api/tmdb.js
¦  ¦  +- components/
¦  ¦  +- pages/
¦  ¦  +- App.jsx
¦  ¦  +- main.jsx
¦  +- .env.example
+- ssr-next/                  # Implementación SSR (Next.js App Router)
¦  +- app/
¦  ¦  +- page.js
¦  ¦  +- movie/[id]/page.js
¦  ¦  +- search/page.js
¦  +- components/
¦  +- lib/tmdb.js
¦  +- .env.example
+- ENTREGA_CAMPUS.md          # Plantilla para subir enlace(s) al Campus
```

## 2) Requisitos previos

- Node.js 20+ (recomendado LTS).
- Cuenta en [TMDB](https://www.themoviedb.org/) y API Key.

## 3) Variables de entorno

### SPA (`spa-react/.env`)

```bash
VITE_TMDB_API_KEY=tu_api_key_de_tmdb
```

### SSR (`ssr-next/.env.local`)

```bash
TMDB_API_KEY=tu_api_key_de_tmdb
```

## 4) Ejecución local

### SPA

```bash
cd spa-react
npm install
npm run dev
```

Rutas implementadas:

- `/` -> Home con populares
- `/movie/:id` -> Detalle de película
- `/search` -> Búsqueda (usa query param `q`)

### SSR (Next App Router)

```bash
cd ssr-next
npm install
npm run dev
```

Rutas implementadas:

- `app/page.js` -> `/`
- `app/movie/[id]/page.js` -> `/movie/:id`
- `app/search/page.js` -> `/search`

## 5) Pruebas y validación

Pruebas técnicas mínimas recomendadas:

```bash
# SPA
cd spa-react
npm run lint
npm run build

# SSR
cd ssr-next
npm run lint
npm run build
```

Pruebas funcionales manuales:

1. Home carga películas populares.
2. Click en película navega a detalle.
3. Búsqueda devuelve resultados.
4. Búsqueda sin resultados muestra estado vacío.
5. Navegación entre páginas funciona correctamente.

## 6) Mapeo del enunciado a implementación

- **Página de Inicio**: implementada en ambas versiones (`/`).
- **Detalle de Película**: implementado en ambas versiones (`/movie/:id`).
- **Búsqueda de Películas**: implementada en ambas versiones (`/search`).
- **Navegación fluida**: enlaces y navegación entre vistas en ambos proyectos.
- **SSR con App Router**: estructura de carpetas exactamente en `app/`.

## 7) Entrega al Campus

1. Subir este repositorio a GitHub/GitLab.
2. Si el repositorio es privado, añadir como colaborador a `@carlosazaustre`.
3. Copiar el contenido de `ENTREGA_CAMPUS.md` en el documento de entrega y completar enlaces.

## 8) Nota de entorno de esta máquina

Durante el desarrollo en esta máquina, hubo incidencias de instalación de paquetes (`npm` con errores de extracción), por lo que aquí no se pudo ejecutar `lint/build` de forma fiable. El código está preparado para ejecutarse correctamente en un entorno Node LTS estándar tras `npm install` limpio.

