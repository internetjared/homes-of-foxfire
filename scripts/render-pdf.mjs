/* Render a built page to a print-quality PDF.
 *
 * Usage:  node scripts/render-pdf.mjs <route> <output-pdf>
 * Example: node scripts/render-pdf.mjs /flyer public/exports/hearing-flyer.pdf
 *
 * Assumes `npm run build` has already produced dist/. The script serves dist/
 * over a local HTTP port (so relative font URLs and CSS resolve), navigates
 * Puppeteer to the route, and prints letter portrait at full bleed.
 */
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = resolve(fileURLToPath(import.meta.url), '../..');
const DIST = join(ROOT, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.woff2': 'font/woff2',
};

function startServer() {
  const server = createServer(async (req, res) => {
    let url = req.url.split('?')[0];
    if (url.endsWith('/')) url += 'index.html';
    const filePath = join(DIST, url);
    if (!existsSync(filePath)) {
      res.writeHead(404).end('not found');
      return;
    }
    const data = await readFile(filePath);
    res.writeHead(200, { 'content-type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => resolveServer({
      server,
      port: server.address().port,
    }));
  });
}

async function main() {
  const route = process.argv[2] || '/flyer';
  const out = process.argv[3] || 'public/exports/flyer.pdf';

  if (!existsSync(DIST)) {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  const { server, port } = await startServer();
  const url = `http://127.0.0.1:${port}${route.endsWith('/') ? route : route + '/'}`;
  console.log(`serving ${DIST} on :${port}`);
  console.log(`rendering ${url}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });

  /* Wait a tick more so webfonts settle. networkidle0 covers most cases but
   * Google Fonts sometimes streams a swap that lands after idle. */
  await page.evaluateHandle('document.fonts.ready');

  await mkdir(join(ROOT, out, '..'), { recursive: true });
  await page.pdf({
    path: join(ROOT, out),
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  server.close();
  console.log(`wrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
