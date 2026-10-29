# ReplayLabb Website (Frontend)

The official landing and product website for [ReplayLabb](https://github.com/Flying-Tea-Squad/ReplayLabb) — a local-first API traffic capture, sanitization, and deterministic replay studio.

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Bundler & Dev Server:** Vite 6
- **Testing:** Vitest + React Testing Library + jsdom
- **Linting:** ESLint + TypeScript ESLint

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally in Development

```bash
npm run dev
```

The site will be available at [http://localhost:5173/](http://localhost:5173/).

### 3. Run Test Suite

```bash
npm test
```

### 4. Build for Production

```bash
npm run build
```

Production-ready static files are generated in `dist/`.

To test the production build locally:

```bash
npm run preview
```

---

## Hosting & Deployment

This project builds as a completely static Single Page Application and can be hosted seamlessly on any static web host.

### Vercel (Recommended)

1. Import this repository into Vercel.
2. Build Settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
3. Click **Deploy**.

### Cloudflare Pages

1. In Cloudflare Dashboard, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select `Replay-frontend`.
3. Build Settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**.

### GitHub Pages

A standard GitHub Actions workflow (`.github/workflows/deploy.yml`) can build and deploy the `dist/` directory directly to GitHub Pages on every push to `main`.

---

## License

MIT / Apache 2.0
