# Goldmine

Goldmine is a UI-first landing page for a viral social monetization PDF product.

- Public domain target: `goldmine.signalizeai.org`
- Current Pages deployment: `https://8d36c498.goldmine-5ul.pages.dev`
- V1 scope: static page + free PDF download + $1 full PDF positioning
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
- The paid CTA currently opens an email intent for the $1 PDF.
- The next version should replace the paid CTA with a payment link and connect generation workflows through `n8n.agentpostmortem.com`.
