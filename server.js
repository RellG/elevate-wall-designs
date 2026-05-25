/* Tiny static server for Render hosting (and local dev on port 2999). */
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 2999;
const ROOT = __dirname;

/* Security headers — same pattern used across tkprojects deploys */
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};
app.use((req, res, next) => {
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  next();
});

app.use(express.static(ROOT, {
  extensions: ['html'],
  maxAge: '1h',
  setHeaders(res, filePath) {
    if (/\.(?:css|js|json)$/.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

app.get('/healthz', (_req, res) => res.json({ ok: true, app: 'elevate-wall' }));

app.use((_req, res) => {
  Object.entries(SECURITY_HEADERS).forEach(([k, v]) => res.setHeader(k, v));
  res.status(404).sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Elevate Wall Designs — listening on http://localhost:${PORT}`);
});
