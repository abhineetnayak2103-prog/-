# Lavalink (Railway-ready) — minimal Docker deployment

This repo contains a minimal Dockerized Lavalink setup you can deploy to Railway (or any Docker host).

## Environment variables (required)
- `LAVALINK_PASSWORD` — strong password for Lavalink node (required).
- `PORT` — optional, default 2333 (Railway usually provides this automatically).

## Build & run locally (quick test)
1. Build:
   ```
   docker build -t my-lavalink .
   ```
2. Run:
   ```
   docker run --rm -e LAVALINK_PASSWORD="STRONG_PASS" -p 2333:2333 my-lavalink
   ```
3. Check logs:
   ```
   docker logs -f <container-id>
   ```
   Look for startup messages confirming Lavalink initialized and listening on the port.

## Deploy to Railway (basic)
1. Create a new Railway project and connect this repository (or push files to a new repo and connect).
2. Railway will detect a Dockerfile — let it build.
3. In Railway project variables, set:
   - `LAVALINK_PASSWORD` = (your strong password)
   - (PORT is usually provided by Railway automatically)
4. Deploy and open logs. Confirm Lavalink startup lines appear.

## Bot configuration example (Riffy / lavalink client)
Place this in your bot's config (e.g., `config/music/lavalink.js`) and set environment variables in the bot host:

```javascript
export default {
  nodes: [
    {
      id: 'railway-1',
      host: process.env.LAVALINK_HOST || 'your-service.up.railway.app',
      port: Number(process.env.LAVALINK_PORT || 2333),
      password: process.env.LAVALINK_PASSWORD || 'YOUR_PASSWORD',
      secure: false
    }
  ],
  defaultSearchPlatform: 'youtube',
  restVersion: 'v3'
};
```
