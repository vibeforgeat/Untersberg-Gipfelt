# Untersberg Gipfelt

Mobile-first Expo Router prototype for the Untersberg community portal.

## Local development

Use Node 20 for Expo SDK 52 (`.nvmrc` is included):

```bash
nvm use
```

```bash
npm install
npx expo start
```

Open the web target with `w`, or run `npm run web` directly. Native targets remain available through Expo Router.

## Docker / Portainer

Build and start locally:

```bash
docker compose up -d --build
```

The static web app is then available on port `8080`. In Portainer, create a Stack from this repository, keep the default port mapping, and deploy. The container uses an Nginx SPA fallback so Expo Router paths work on refresh.

For an external installation, forward a public HTTPS hostname to the server's port `8080` using your reverse proxy (for example, Nginx Proxy Manager, Traefik, or Caddy). Do not expose the plain HTTP port directly to the internet without HTTPS.

## iPhone homescreen

Open the deployed HTTPS URL in Safari, tap **Share**, then **Add to Home Screen**. The Kalkstein icon from `icon-b-kalkstein.svg` is configured as the favicon and the `apple-touch-icon`; the generated app uses the standalone PWA display mode.

## SSH deployment to a home server

From this project directory, with an SSH key already configured:

```bash
rsync -av --exclude node_modules --exclude dist --exclude .expo ./ USER@SERVER:/opt/untersberg-gipfelt/
ssh USER@SERVER
cd /opt/untersberg-gipfelt
docker compose up -d --build
```

In Portainer, the equivalent is a Stack using this directory or a Git repository and the included `docker-compose.yml`.

## GitHub Pages demo

GitHub Pages is enough for a public prototype. Push the project to a GitHub repository; the included workflow at `.github/workflows/deploy-pages.yml` builds the Expo web export and deploys it automatically on every push to `main` or `master`.

In the GitHub repository, open **Settings → Pages** and set **Source** to **GitHub Actions**. After the workflow finishes, the demo is available at:

```text
https://GITHUB-USERNAME.github.io/REPOSITORY-NAME/
```

The workflow handles the repository subpath, SPA fallback, and the iPhone homescreen icon automatically. For a custom domain, add it under **Settings → Pages → Custom domain** and configure the DNS record in Cloudflare.

## Native builds later

```bash
npx expo install
npx eas login
npx eas build:configure
npx eas build --platform ios
npx eas build --platform android
```

Use an Android `.aab` for Play Store delivery and an `.apk` for direct testing. iOS builds require the appropriate Apple Developer credentials.

## Included prototype flows

- Dashboard with height-meter and tree impact counters
- Regional summer season from 1 June to 31 August
- Wildlife protection gate: tracking and check-in only from 06:00 to 20:00
- Community feed with image posts, verification states, and interactive Bergheil kudos
- Route filters for Dopplersteig, Reitsteig, and Mittagskogel
- GPS check-in and anti-cheat simulation for four Untersberg waypoints
- Leaderboard and regional badge collection
- Grödig, Jägerverband, Alpenverein, Salzburg AG, and Stiegl sponsor campaigns
- Transparent impact for trees, wildlife information boards, and trail repairs
