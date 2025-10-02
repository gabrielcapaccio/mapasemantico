
# Semantic Heatmap App (Next.js)

App de ejemplo lista para **Deploy con Vercel** o **Docker**.

## 1) Variables de entorno
Crea `.env` con:
```
ANTHROPIC_API_KEY=tu_api_key
CLAUDE_MODEL=claude-3-5-sonnet-20240620
```

## 2) Desarrollo local
```bash
npm i
npm run dev
```

## 3) Deploy en Vercel
- Importa este repo en Vercel y añade las variables de entorno anteriores.
- Build & Deploy automático.

## 4) Deploy con Docker
```bash
docker build -t semantic-heatmap .
docker run -d -p 3000:3000 --env-file .env semantic-heatmap
```

