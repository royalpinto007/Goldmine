# Goldmine

Goldmine is a UI-first football-season landing page for a viral social monetization PDF product.

- Public domain target: `goldmine.signalizeai.org`
- Live site: `https://goldmine.signalizeai.org`
- V1 scope: homepage + `/free/` page + `/full-pack/` page + free PDF download + $1 Lemon Squeezy checkout
- Future automation: `n8n.agentpostmortem.com`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Deploy the built `dist/` directory to Cloudflare Pages and attach the custom domain:

```bash
npm run build
npm run deploy
```

Then configure `goldmine.signalizeai.org` in Cloudflare Pages custom domains.
Wrangler does not expose custom-domain attachment in the Pages CLI used here, so attach it from
Cloudflare Dashboard → Workers & Pages → `goldmine` → Custom domains.

## V1 notes

- The free CTA downloads `public/free-goldmine-starter.pdf`.
- The free PDF source is `docs/free-goldmine-starter.html`.
- The paid CTA opens the Lemon Squeezy checkout for `Goldmine Full Pack`.
- The paid PDF source is `docs/goldmine-full-pack.html`.
- The rendered paid PDF for Lemon Squeezy upload is `docs/goldmine-full-pack.pdf`.
- The next version should connect personalized PDF generation workflows through `n8n.agentpostmortem.com`.
