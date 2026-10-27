import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, type Connect, type Plugin } from 'vite'

// The Simmer demo (public/simmer-demo/, built by `npm run demo:sync`) is its
// own single-page app. Its routes, e.g. /simmer-demo/ or
// /simmer-demo/recipes/3, have to load the demo's index.html, not the
// portfolio's. Files that exist (its JS, CSS, icons) are left alone. This
// covers `npm run dev` and `npm run preview`; public/_redirects does the
// same on the deployed site.
function simmerDemoFallback(): Plugin {
  const rewrite: Connect.NextHandleFunction = (req, _res, next) => {
    const url = req.url ?? ''
    if (/^\/simmer-demo(\/[^.]*)?(\?.*)?$/.test(url)) req.url = '/simmer-demo/index.html'
    next()
  }
  return {
    name: 'simmer-demo-fallback',
    configureServer: (server) => void server.middlewares.use(rewrite),
    configurePreviewServer: (server) => void server.middlewares.use(rewrite),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [simmerDemoFallback(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
