# World Cup Web

React frontend za ligu tipova FIFA Svetskog prvenstva 2026.

## Pokretanje

```bash
cp .env.example .env
npm install
npm run dev
```

Aplikacija: http://localhost:5173

U `.env` postavi URL tvog API-ja:

```
VITE_API_URL=http://localhost:3001
```

## Deploy na Render

1. Prvo deployuj `worldcup-api` (Blueprint iz `render.yaml`)
2. Pushuj ovaj repo na GitHub
3. Render → **New** → **Blueprint** (ili Static Site)
4. Build: `npm install && npm run build`
5. Publish directory: `dist`
6. Env: `VITE_API_URL=https://worldcup-api.onrender.com` (URL tvog API servisa)
7. Na API-ju postavi `CORS_ORIGIN` na URL ovog sajta

## Stranice

- **Utakmice** — unos prognoza
- **Tabela** — rang lista takmičara
- **Grupe** — zvanične tabele grupa
- **Profil** — statistika i istorija tipova
