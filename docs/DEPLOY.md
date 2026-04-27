# Deploy

Hosting, build, and deployment for the Homes of Foxfire Coalition site. Decisions about where to host live here so the choice is documented, not folklore.

## Build

The site is a static Astro v5 build. There is no server, no database, no API.

```sh
npm install     # once, after a fresh clone
npm run build   # static output to dist/
```

`dist/` is the deployable artifact. Anything that can serve a folder of static files can host this site.

## Recommended hosting

For Phase 1, the recommendation is **Netlify free tier**. The reasons are documented and intentional, not preference.

- Free for our scale, with HTTPS, custom domain, and automatic GitHub deploys included.
- Built-in form handler that works as a fallback if our newsletter platform is ever down.
- Atomic deploys with instant rollback if a release breaks.
- Branch deploy previews for content review before merge.

Alternatives that are equally fine technically: Cloudflare Pages, Vercel. Avoid GitHub Pages for this project because the form-handler fallback is not available there.

## Domain

Primary: `foxfirecoalition.org`. The `.org` signal matters for civic credibility. The `.com` should be registered as a redirect to the `.org` to avoid impersonation.

Registration is held in the coalition's name with the coalition Gmail (`foxfirehomescoalition@gmail.com`) as the registrar contact. Personal email addresses must not be used as the registrar contact.

DNS is managed at the registrar. Records:

- `A` and `AAAA` (or `CNAME` `www` to apex behavior): pointed to the host.
- `MX`: not configured. Mail is handled by the coalition Gmail and not on the registered domain unless and until a separate decision is made.
- `TXT`: SPF and DMARC records added if and when the domain begins sending email.

## CI and deploy flow

Push to `main` triggers a production deploy on the host. Push to any other branch triggers a deploy preview at a unique URL. The preview URL is the right place to review content changes before merge.

A pull request that touches `src/data/*.json` should always be reviewed against the live preview before merge, because data shape errors do not always surface in dev.

## Pre-deploy checklist

Before pushing changes to `main`:

1. `npm run build` completes without errors.
2. Every new fact added on the page or in data has a working source URL. See `docs/SOURCES.md`.
3. Every new ordinance number, parcel number, date, or vote count has been spot-checked against its source.
4. The voice-and-microcopy rules in `docs/VOICE.md` were applied. No em dashes, no exclamation points, no loaded adjectives.
5. The footer's last-updated stamp has been updated for any page that changed.

## Analytics

Use **Plausible** or **Cloudflare Web Analytics**. Both are privacy-respecting and cookie-free, which is consistent with the brand's transparency posture.

Do not install Google Analytics, Meta Pixel, TikTok Pixel, or any third-party tracker that drops persistent identifiers. The coalition's argument is built on transparency. The site cannot be a tracker.

## Forms and email

Phase 1 newsletter is intended to run on **Buttondown** with an embed form on the homepage. Netlify's built-in form handler is the fallback if Buttondown is ever unavailable.

If a contact form is added, route submissions through the host's form handler (Netlify Forms, Cloudflare Pages Functions, etc.). Do not embed third-party form widgets that load tracking scripts.

## Secrets

There are no required secrets for the static build. If a future feature introduces a secret (Buttondown API key, Plausible site ID), it is added as a host environment variable, never committed to the repo, and named clearly:

- `BUTTONDOWN_API_KEY`
- `PLAUSIBLE_SITE_ID`

The repo's `.gitignore` already excludes `.env`, `.env.local`, and `.env.production`.

## Rollback

If a deploy breaks production:

1. On Netlify: open Deploys, select the last known-good deploy, click "Publish deploy."
2. Open a `revert` PR against `main` so git history matches the live state.
3. Document what broke in a short post-mortem in the coalition Drive's `Operations / Postmortems` folder. Repo issues are not the right place for this.

## Performance baseline

The site should ship under 100 KB on the homepage on first paint, exclusive of fonts. Targets:

- Lighthouse Performance: 95+ on mobile.
- Lighthouse Accessibility: 100. AA contrast pairs are documented in `docs/BRAND.md`.
- Total page weight on the homepage: under 300 KB including fonts.

If a change adds more than 50 KB to the homepage payload, it gets called out in the PR description.
