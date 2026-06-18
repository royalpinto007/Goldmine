import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const docsDir = resolve(root, "docs");
const publicDir = resolve(root, "public");
const chrome = "/usr/bin/google-chrome";

const asset = (name) => `../public/assets/${name}`;

const freeIdeas = [
  {
    title: "Player debate carousel",
    angle: "Turn a loud debate into 5 clean slides.",
    hook: "The better question is not who is greater. It is who changed games faster.",
    steps: ["Pick one debate fans already argue about.", "Make 5 slides: claim, stat, context, counterpoint, question.", "End with a poll or comment prompt."],
    earn: "Send engaged fans to a newsletter, creator tool, or small guide after trust builds.",
  },
  {
    title: "Match explainer reel",
    angle: "Explain one moment people saw but did not fully understand.",
    hook: "This goal started 18 seconds before the shot.",
    steps: ["Choose one tactic, substitution, or pressing trigger.", "Use AI to draft a 35-second script.", "Record voiceover over diagrams or simple stock-style visuals."],
    earn: "Build a niche page, then add affiliate links for training gear, apps, or learning resources.",
  },
  {
    title: "Fantasy watchlist post",
    angle: "Help fans decide who to watch before the game.",
    hook: "Three players casual fans are sleeping on this week.",
    steps: ["Pick one fixture or group.", "List 3 players with one reason each.", "Add risk level: safe, punt, avoid."],
    earn: "Promote research templates, paid communities, newsletters, or affiliate tools later.",
  },
  {
    title: "Fan product roundup",
    angle: "Make useful buying lists around match days.",
    hook: "If you are hosting a watch party, start with these 5 things.",
    steps: ["Pick a fan scenario: watch party, training, travel, gifting.", "Create a short checklist post.", "Route links through affiliate products only where they are actually relevant."],
    earn: "Affiliate income from gear, creator tools, subscriptions, or digital downloads.",
  },
  {
    title: "AI content remix page",
    angle: "Use AI to turn one topic into many formats.",
    hook: "One football idea can become a reel, carousel, poll, and newsletter.",
    steps: ["Pick one football topic.", "Generate 4 formats from the same core point.", "Post the strongest format first and keep the rest ready."],
    earn: "Sell prompt packs, templates, content calendars, or done-for-you setup once proof exists.",
  },
];

const paidIdeas = [
  ["Debate carousel engine", "Turn ongoing player debates into clean carousel posts.", "Greatest-of-era comparisons, current form arguments, comeback stories.", "Ask AI for 3 claims, 3 counterpoints, and 5 slide titles.", "Newsletter signups, digital guides, creator tool affiliates."],
  ["Short tactical explainer", "Explain a game pattern in plain English for casual fans.", "Pressing traps, inverted fullbacks, late substitutions, set pieces.", "Draft a 40-second voiceover and generate a diagram checklist.", "Sponsorships, coaching tools, sports education products."],
  ["Fan poll account", "Run daily polls around simple football questions.", "Who starts, who sits, best XI, score predictions, transfer choices.", "Use AI to generate 7 poll prompts and follow-up captions.", "Affiliate links, community subscriptions, prediction templates."],
  ["Watch party product list", "Turn match-day excitement into practical shopping lists.", "Snacks, projectors, jerseys, streaming tools, room setup.", "Generate a buyer checklist and short social captions.", "Affiliate commissions and bundle pages."],
  ["Fantasy football watchlist", "Help fans choose players by fixture, form, and role.", "Budget picks, risky captains, differential players, injury swaps.", "Ask AI to format picks into safe, upside, avoid.", "Paid spreadsheets, newsletters, communities."],
  ["Football newsletter digest", "Curate what happened and why it matters in 5 minutes.", "Morning-after recaps, weekend previews, transfer summaries.", "Use AI to outline sections, then add your judgment.", "Sponsorships, paid archive, tool affiliates."],
  ["Training micro-tip page", "Convert pro moments into simple training advice.", "First touch, scanning, weak foot, pressing, positioning.", "Generate one drill from one match moment.", "Training app affiliates, coaching leads, paid PDF drills."],
  ["Football history shorts", "Tell short stories about iconic moments and forgotten players.", "World Cup moments, club eras, tactical revolutions.", "Ask AI for story beats, then fact-check names and dates.", "YouTube revenue, sponsorships, history guides."],
  ["Transfer rumor sanity check", "Explain rumors without pretending they are confirmed.", "Likelihood, fit, money, squad need, source quality.", "Use AI to create a rumor scorecard template.", "Newsletter, membership, sports data tools."],
  ["Underdog story account", "Spot compelling lesser-known teams and players.", "Small nations, academy graduates, comeback seasons.", "Generate a 5-part human story structure.", "Brand partnerships and long-form YouTube."],
  ["Football memes with context", "Make memes that also teach or summarize a moment.", "VAR drama, missed chances, manager reactions, fan pain.", "Use AI to generate caption variants and timing windows.", "Merch, paid community, sponsorships."],
  ["AI match poster shop", "Design tasteful match posters and digital wallpapers.", "Fixture posters, score recap cards, player-neutral visuals.", "Use AI for layout prompts, not copyrighted player likenesses.", "Digital downloads, print-on-demand, bundles."],
  ["Beginner tactics dictionary", "Explain football terms for new fans.", "Low block, overload, xG, half-space, rest defense.", "Ask AI for plain examples and test them with real clips you can describe.", "Mini-course, glossary PDF, sponsorships."],
  ["Stats without spreadsheets", "Turn one stat into a short human insight.", "Shots, xG, pressures, carries, progressive passes.", "Ask AI to translate stats into a fan-friendly sentence.", "Data tool affiliates, newsletters."],
  ["Match thread summaries", "Summarize live fan conversation after a match.", "Top complaints, praise, tactical questions, meme angles.", "Use AI to cluster comments, then rewrite responsibly.", "Community growth, sponsorships."],
  ["Football creator prompts", "Sell prompts that help other creators make football content.", "Hook prompts, carousel outlines, reel scripts, newsletter sections.", "Package 25 prompts by use case and show examples.", "Prompt pack sales, Gumroad-style products."],
  ["Club culture guide", "Help global fans understand a club's identity.", "Rivalries, chants, legends, style, fan expectations.", "Use AI for structure, then verify with reliable sources.", "Guides, newsletter, affiliate fan products."],
  ["What to watch today", "Daily post telling busy fans which games matter.", "Best fixture, hidden fixture, player to watch, story angle.", "Generate a daily card template and fill it manually.", "Newsletter and sports app affiliates."],
  ["Football job board content", "Create content around football careers and creator gigs.", "Analyst roles, video editor gigs, sports marketing openings.", "Use AI to summarize opportunities and skills needed.", "Job board sponsorships, resume templates."],
  ["AI commentary voiceover", "Create original commentary-style explainers without using match audio.", "Tactical moments, historic stories, fan reactions.", "Generate a script, record voiceover, use diagrams or licensed assets.", "YouTube, sponsorships, voiceover services."],
  ["Football fitness content", "Bridge fan interest into athletic training.", "Speed, stamina, mobility, recovery, warmups.", "Generate a 7-day beginner routine and safety notes.", "Fitness app affiliates and coaching leads."],
  ["Kit design concept page", "Make original concept kits without copying official designs.", "Retro concepts, color palettes, fictional tournament kits.", "Use AI for palette prompts and design notes.", "Print-on-demand and design commissions."],
  ["Referee decision explainer", "Explain controversial decisions calmly.", "VAR, offside, handball, red cards, penalties.", "Use AI to create a neutral breakdown template.", "Trust-building account, sponsorships."],
  ["Football language page", "Teach football vocabulary in multiple languages.", "Spanish, Portuguese, French, Arabic football phrases.", "Generate phrase cards and pronunciation notes.", "Language app affiliates, digital phrasebooks."],
  ["Stadium travel micro-guides", "Create short guides for fans visiting stadiums.", "Transport, food, seating, chants, local etiquette.", "Ask AI for structure, then verify with maps and official pages.", "Travel affiliates and city guide sales."],
  ["Women football spotlight", "Cover rising teams, players, and stories with respect.", "Tournament previews, player profiles, club growth.", "Use AI to outline profiles, then fact-check thoroughly.", "Sponsorships, newsletters, community."],
  ["Youth academy tracker", "Track young players and explain their roles.", "Breakout prospects, loan moves, minutes, style.", "Generate scouting-card copy from verified notes.", "Newsletter, premium watchlist, data affiliates."],
  ["Manager decision board", "Analyze one manager decision per post.", "Lineup changes, pressing style, substitutions, rotations.", "Ask AI for pros, cons, and what to watch next.", "Paid analysis, sponsorships."],
  ["Football business explainer", "Explain money behind clubs and tournaments.", "Transfers, wages, sponsorships, TV rights, ownership.", "Use AI to simplify concepts and create visual analogies.", "Finance newsletter, course affiliates."],
  ["AI fan quiz account", "Create quizzes around matches, history, and players.", "Guess the player, lineup memory, club trivia.", "Generate quiz options and explanations.", "Lead magnets, ad revenue, quiz packs."],
  ["Weekly content calendar product", "Sell simple football content calendars to creators.", "Hooks, dates, match themes, post formats.", "Use AI to generate a calendar, then curate manually.", "Digital product sales and subscriptions."],
  ["Football betting education only", "Explain probability and risk without giving gambling promises.", "Odds, variance, bankroll risk, bookmaker margin.", "Use AI for educational examples and clear disclaimers.", "Safer education content, tools if compliant."],
  ["Post-match quote breakdown", "Explain what managers and players actually implied.", "Press conferences, interviews, tactical comments.", "Use AI to extract themes and write neutral summaries.", "Newsletter, sponsorships."],
  ["Football creator audit service", "Audit football pages for hooks, thumbnails, bios, and consistency.", "Accounts posting often but not converting.", "Use AI to create an audit checklist and sample report.", "Service revenue, upsells to templates."],
  ["Niche fan community starter", "Build around one club, league, or player type.", "Underrated leagues, tactical fans, fantasy players.", "Use AI to create onboarding posts and weekly rituals.", "Paid community, sponsorships."],
  ["AI reel script packs", "Sell batches of short reel scripts to busy creators.", "Match previews, player stories, debate hooks.", "Generate drafts, then edit for voice and accuracy.", "Script packs, retainers."],
  ["Football explain-it-like-I-am-new", "Make the sport easier for new fans.", "Rules, formations, competitions, transfer windows.", "Ask AI to rewrite complex ideas for a beginner.", "Beginner guides, YouTube, affiliates."],
  ["Creator affiliate hub", "Curate tools football creators actually use.", "Editing apps, design tools, microphones, scheduling tools.", "Use AI to compare tools and write honest summaries.", "Recurring affiliate income."],
  ["Football data template shop", "Create spreadsheet templates for fans and creators.", "Fixture tracker, content tracker, fantasy tracker.", "Ask AI for columns, formulas, and dashboard sections.", "Template sales."],
  ["AI thumbnail testing board", "Create thumbnail/caption variants for football videos.", "Derby previews, reaction videos, explainers.", "Generate 10 variants, test small, keep winners.", "Service offers and template packs."],
];

const workflowPages = [
  ["Script to short video", "Topic -> hook -> 35-second script -> voiceover -> soft visual scene -> caption -> post.", "Use this when you want repeatable reels without relying on copyrighted footage."],
  ["Carousel workflow", "Claim -> slide titles -> supporting points -> counterpoint -> final question -> caption.", "Use this for debate posts, stat explainers, and beginner education."],
  ["Newsletter workflow", "Trend scan -> 3 bullets -> 1 deeper insight -> useful link -> next issue teaser.", "Use this when you want an owned audience instead of only platform reach."],
  ["Affiliate workflow", "Fan problem -> useful product -> honest note -> link page -> follow-up post.", "Use this for watch-party gear, creator tools, training products, and digital templates."],
  ["Digital product workflow", "Repeated question -> template -> example output -> simple landing page -> $1 to $9 offer.", "Use this when your audience keeps asking for the same checklist or prompt pack."],
];

const ctaUrl = "https://goldmine.signalizeai.org/full-pack/";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function htmlDocument(title, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      @page { size: A4; margin: 0; }
      * { box-sizing: border-box; }
      html, body {
        margin: 0;
        padding: 0;
        background: #efe4cf;
        color: #1d2518;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.42;
      }
      body { counter-reset: page; }
      .page {
        position: relative;
        width: 210mm;
        height: 297mm;
        margin: 0 auto;
        padding: 14mm;
        overflow: hidden;
        break-after: page;
        page-break-after: always;
        background:
          radial-gradient(circle at 8% 5%, rgba(217, 173, 69, 0.2), transparent 44mm),
          radial-gradient(circle at 92% 12%, rgba(168, 184, 134, 0.18), transparent 42mm),
          linear-gradient(135deg, #fff9ec 0%, #fbf4e6 48%, #f1dfbf 100%);
        counter-increment: page;
      }
      .page:last-child { break-after: auto; page-break-after: auto; }
      .page::before {
        position: absolute;
        inset: 7mm;
        border: 1px solid rgba(94, 98, 72, 0.15);
        border-radius: 15mm;
        content: "";
        pointer-events: none;
      }
      .page::after {
        position: absolute;
        right: 14mm;
        bottom: 7mm;
        color: rgba(90, 71, 24, 0.55);
        content: counter(page);
        font-size: 9px;
        font-weight: 800;
      }
      .inner {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 9mm;
        color: #5a4718;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .brand strong {
        color: #1d2518;
        font-size: 16px;
        letter-spacing: -0.04em;
        text-transform: none;
      }
      .badge, .chip {
        display: inline-flex;
        width: fit-content;
        align-items: center;
        border-radius: 999px;
        font-weight: 900;
        text-transform: uppercase;
      }
      .badge {
        margin-bottom: 7mm;
        padding: 6px 10px;
        border: 1px solid rgba(217, 173, 69, 0.38);
        color: #8d6a16;
        background: rgba(255, 236, 180, 0.74);
        font-size: 9px;
        letter-spacing: 0.13em;
      }
      .chip {
        padding: 4px 7px;
        color: #2c2411;
        background: #ffe29a;
        font-size: 8px;
        letter-spacing: 0.08em;
      }
      h1, h2, h3, p { margin-top: 0; }
      h1 {
        max-width: 155mm;
        margin: 0 0 5mm;
        font-size: 49px;
        line-height: 0.91;
        letter-spacing: -0.075em;
      }
      h2 {
        margin: 0 0 4mm;
        font-size: 30px;
        line-height: 0.98;
        letter-spacing: -0.06em;
      }
      h3 {
        margin: 0 0 2mm;
        font-size: 17px;
        line-height: 1.05;
        letter-spacing: -0.035em;
      }
      p {
        margin: 0;
        color: #5e6654;
        font-size: 12px;
        line-height: 1.47;
      }
      ul, ol {
        margin: 3mm 0 0;
        padding-left: 15px;
        color: #4f5848;
        font-size: 10.8px;
        line-height: 1.36;
      }
      li { margin: 1.2mm 0; }
      .hero-image, .wide-image {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(94, 98, 72, 0.15);
        border-radius: 8mm;
        background: rgba(255, 253, 247, 0.72);
        box-shadow: 0 18px 46px rgba(84, 65, 30, 0.11);
      }
      .hero-image { height: 102mm; margin-top: auto; }
      .wide-image { height: 78mm; margin: 6mm 0; }
      .hero-image img:not(.cover-art), .wide-image img:not(.cover-art) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .hero-image::after, .wide-image::after {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 46%, rgba(255, 249, 236, 0.62));
        content: "";
      }
      .hero-image .cover-art, .wide-image .cover-art {
        position: absolute;
        right: 10mm;
        bottom: 8mm;
        width: 36mm;
        height: auto;
        border-radius: 5mm;
        box-shadow: 0 16px 34px rgba(84, 65, 30, 0.22);
      }
      .caption {
        position: absolute;
        left: 9mm;
        right: 55mm;
        bottom: 9mm;
        z-index: 2;
        color: #38412f;
        font-size: 11px;
        font-weight: 800;
      }
      .grid-2, .grid-3, .grid-4 {
        display: grid;
        gap: 4mm;
      }
      .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .card, .panel, .idea, .metric {
        border: 1px solid rgba(94, 98, 72, 0.15);
        border-radius: 6mm;
        background: rgba(255, 253, 247, 0.78);
        box-shadow: 0 12px 30px rgba(84, 65, 30, 0.07);
      }
      .card, .panel, .idea { padding: 5mm; }
      .metric { padding: 4mm; }
      .metric strong {
        display: block;
        color: #9b7218;
        font-size: 22px;
        line-height: 1;
        letter-spacing: -0.05em;
      }
      .metric span {
        display: block;
        margin-top: 2mm;
        color: #65705c;
        font-size: 9.5px;
      }
      .idea {
        display: grid;
        min-height: 88mm;
      }
      .idea h3 { font-size: 19px; }
      .idea .meta {
        display: flex;
        flex-wrap: wrap;
        gap: 2mm;
        margin: 4mm 0;
      }
      .mini {
        color: #6f5a20;
        font-size: 9.5px;
        font-weight: 800;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      .quote {
        padding: 5mm;
        border-left: 4px solid #d9ad45;
        border-radius: 4mm;
        color: #27301f;
        background: rgba(255, 236, 180, 0.52);
        font-size: 14px;
        font-weight: 850;
        line-height: 1.35;
      }
      .footer-note {
        margin-top: auto;
        color: rgba(90, 71, 24, 0.66);
        font-size: 9.4px;
        font-weight: 700;
      }
      .cover-page {
        color: #fff8df;
        background:
          radial-gradient(circle at 82% 10%, rgba(217, 173, 69, 0.34), transparent 44mm),
          radial-gradient(circle at 8% 82%, rgba(168, 184, 134, 0.24), transparent 48mm),
          linear-gradient(135deg, #1d2518 0%, #0d0e09 58%, #5d4314 100%);
      }
      .cover-page::before { border-color: rgba(255, 226, 154, 0.24); }
      .cover-page::after { color: rgba(255, 248, 223, 0.68); }
      .cover-page h1 { color: #fff8df; }
      .cover-page p { color: rgba(255, 248, 223, 0.82); }
      .cover-page .brand { color: rgba(255, 248, 223, 0.74); }
      .cover-page .brand strong { color: #fff8df; }
      .cover-page .badge { color: #ffe7a7; background: rgba(255, 226, 154, 0.11); border-color: rgba(255, 226, 154, 0.3); }
      .toc-row {
        display: grid;
        grid-template-columns: 20mm 1fr;
        gap: 5mm;
        align-items: start;
        padding: 3.5mm 0;
        border-bottom: 1px solid rgba(94, 98, 72, 0.12);
      }
      .toc-row strong {
        color: #9b7218;
        font-size: 20px;
        line-height: 1;
      }
      .two-col {
        columns: 2;
        column-gap: 8mm;
      }
      .two-col li { break-inside: avoid; }
      .playbook-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 4mm;
        margin-top: 5mm;
      }
      .playbook-grid .panel {
        min-height: 38mm;
      }
      .hook-line {
        margin-top: 5mm;
        padding: 4mm 5mm;
        border-radius: 5mm;
        background: rgba(255, 226, 154, 0.5);
        color: #2a331f;
        font-size: 13px;
        font-weight: 850;
        line-height: 1.35;
      }
      .layout-split {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) 70mm;
        gap: 6mm;
        align-items: stretch;
      }
      .layout-split.reverse {
        grid-template-columns: 68mm minmax(0, 1fr);
      }
      .tall-visual, .visual-card {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(94, 98, 72, 0.16);
        border-radius: 8mm;
        background: #f8edd8;
        box-shadow: 0 16px 38px rgba(84, 65, 30, 0.11);
      }
      .tall-visual { min-height: 168mm; }
      .visual-card { height: 62mm; }
      .tall-visual img, .visual-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .tall-visual::after, .visual-card::after {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 45%, rgba(24, 31, 19, 0.66));
        content: "";
      }
      .visual-label {
        position: absolute;
        left: 5mm;
        right: 5mm;
        bottom: 5mm;
        z-index: 1;
        color: #fff8df;
        font-size: 12px;
        font-weight: 900;
        line-height: 1.25;
      }
      .big-play-number {
        color: rgba(155, 114, 24, 0.17);
        font-size: 84px;
        font-weight: 950;
        letter-spacing: -0.08em;
        line-height: 0.78;
      }
      .route-strip {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 3mm;
        margin-top: 5mm;
      }
      .route-step {
        min-height: 28mm;
        padding: 4mm;
        border: 1px solid rgba(94, 98, 72, 0.14);
        border-radius: 5mm;
        background: rgba(255, 253, 247, 0.75);
      }
      .route-step strong {
        display: block;
        margin-bottom: 2mm;
        color: #9b7218;
        font-size: 10px;
        letter-spacing: 0.09em;
        text-transform: uppercase;
      }
      .route-step span {
        color: #4f5848;
        font-size: 10.5px;
        line-height: 1.35;
      }
      .bottom-band {
        display: grid;
        grid-template-columns: 34mm repeat(3, minmax(0, 1fr));
        gap: 3mm;
        align-items: stretch;
        min-height: 34mm;
        margin-top: auto;
        padding: 4mm;
        border: 1px solid rgba(94, 98, 72, 0.14);
        border-radius: 7mm;
        background:
          linear-gradient(135deg, rgba(255, 253, 247, 0.9), rgba(255, 226, 154, 0.35));
        box-shadow: 0 14px 30px rgba(84, 65, 30, 0.07);
      }
      .bottom-mark {
        display: grid;
        place-items: center;
        border-radius: 5mm;
        color: #9b7218;
        background: rgba(255, 226, 154, 0.55);
        font-size: 31px;
        font-weight: 950;
        letter-spacing: -0.08em;
      }
      .bottom-step {
        padding: 2mm 0;
      }
      .bottom-step strong {
        display: block;
        margin-bottom: 1.5mm;
        color: #2a331f;
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .bottom-step span {
        color: #606b57;
        font-size: 10px;
        line-height: 1.32;
      }
      .sticky-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 4mm;
        margin-top: 5mm;
      }
      .sticky-note {
        min-height: 35mm;
        padding: 5mm;
        border-radius: 5mm 8mm 5mm 8mm;
        background: #fff1b8;
        box-shadow: 0 14px 26px rgba(92, 73, 30, 0.08);
        transform: rotate(-0.8deg);
      }
      .sticky-note:nth-child(2n) {
        background: #e8f0d1;
        transform: rotate(0.7deg);
      }
      .sticky-note strong {
        display: block;
        margin-bottom: 2mm;
        color: #7a5b13;
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .sticky-note span {
        color: #27301f;
        font-size: 12px;
        font-weight: 820;
        line-height: 1.28;
      }
      .score-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 3mm;
        margin: 5mm 0;
      }
      .score-card {
        padding: 4mm;
        border: 1px solid rgba(94, 98, 72, 0.14);
        border-radius: 5mm;
        background: rgba(255, 253, 247, 0.78);
      }
      .score-card strong {
        display: block;
        color: #9b7218;
        font-size: 20px;
        letter-spacing: -0.04em;
        line-height: 1;
      }
      .score-card span {
        display: block;
        margin-top: 2mm;
        color: #606b57;
        font-size: 9.5px;
      }
      .play-image {
        background:
          radial-gradient(circle at 88% 8%, rgba(217, 173, 69, 0.2), transparent 38mm),
          linear-gradient(135deg, #fffdf6 0%, #f7ecd7 52%, #e8d1a7 100%);
      }
      .play-score {
        background:
          linear-gradient(90deg, rgba(255, 246, 222, 0.92) 0%, rgba(255, 246, 222, 0.92) 54%, rgba(231, 210, 167, 0.82) 54%, rgba(231, 210, 167, 0.82) 100%),
          radial-gradient(circle at 92% 16%, rgba(155, 114, 24, 0.14), transparent 38mm);
      }
      .play-sticky {
        background:
          radial-gradient(circle at 12% 13%, rgba(168, 184, 134, 0.25), transparent 40mm),
          linear-gradient(135deg, #fff8e7 0%, #f6ead0 100%);
      }
      .play-dark {
        color: #fff8df;
        background:
          radial-gradient(circle at 82% 16%, rgba(217, 173, 69, 0.24), transparent 42mm),
          radial-gradient(circle at 11% 84%, rgba(168, 184, 134, 0.18), transparent 38mm),
          linear-gradient(135deg, #1d2518 0%, #10140d 63%, #47320e 100%);
      }
      .play-dark::before { border-color: rgba(255, 226, 154, 0.2); }
      .play-dark::after { color: rgba(255, 248, 223, 0.58); }
      .play-dark .brand { color: rgba(255, 248, 223, 0.68); }
      .play-dark .brand strong,
      .play-dark h2,
      .play-dark h3,
      .play-dark .sticky-note span { color: #fff8df; }
      .play-dark p,
      .play-dark li,
      .play-dark .route-step span { color: rgba(255, 248, 223, 0.78); }
      .play-dark .badge {
        color: #ffe7a7;
        background: rgba(255, 226, 154, 0.11);
        border-color: rgba(255, 226, 154, 0.3);
      }
      .play-dark .chip,
      .play-dark .route-step,
      .play-dark .panel,
      .play-dark .score-card {
        border-color: rgba(255, 226, 154, 0.17);
        background: rgba(255, 248, 223, 0.08);
        box-shadow: none;
      }
      .play-dark .mini,
      .play-dark .route-step strong,
      .play-dark .score-card strong { color: #ffe29a; }
      .play-dark .score-card span { color: rgba(255, 248, 223, 0.68); }
      .play-dark .hook-line {
        color: #1d2518;
        background: #ffe29a;
      }
      .play-dark .bottom-band {
        border-color: rgba(255, 226, 154, 0.18);
        background: rgba(255, 248, 223, 0.08);
        box-shadow: none;
      }
      .play-dark .bottom-mark {
        color: #1d2518;
        background: #ffe29a;
      }
      .play-dark .bottom-step strong { color: #ffe29a; }
      .play-dark .bottom-step span { color: rgba(255, 248, 223, 0.72); }
      .playbook-page {
        background:
          radial-gradient(circle at 88% 7%, rgba(217, 173, 69, 0.12), transparent 42mm),
          linear-gradient(135deg, #fffaf0 0%, #f8edd8 100%);
      }
      .playbook-page .brand { margin-bottom: 7mm; }
      .playbook-page h2 {
        max-width: 150mm;
        margin-bottom: 3mm;
      }
      .lead {
        max-width: 168mm;
        color: #4f5848;
        font-size: 13px;
        line-height: 1.45;
      }
      .thin-rule {
        height: 1px;
        margin: 5mm 0;
        background: rgba(94, 98, 72, 0.16);
      }
      .content-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 5mm 8mm;
      }
      .plain-section {
        padding-top: 4mm;
        border-top: 1px solid rgba(94, 98, 72, 0.18);
      }
      .plain-section h3 {
        margin-bottom: 2mm;
        color: #222a1c;
        font-size: 15px;
      }
      .plain-section p,
      .plain-section li {
        color: #4f5848;
        font-size: 11.2px;
        line-height: 1.38;
      }
      .plain-section ol,
      .plain-section ul {
        margin-top: 2mm;
      }
      .example-block {
        margin-top: 5mm;
        padding-top: 4mm;
        border-top: 1px solid rgba(94, 98, 72, 0.18);
      }
      .example-block h3 {
        margin-bottom: 2mm;
        font-size: 16px;
      }
      .example-block p,
      .example-block li {
        color: #4f5848;
        font-size: 11.2px;
        line-height: 1.38;
      }
      .example-block strong {
        color: #27301f;
      }
      .simple-note {
        margin-top: 5mm;
        padding: 4mm 0 0;
        border-top: 2px solid rgba(217, 173, 69, 0.45);
        color: #5a4718;
        font-size: 11px;
        font-weight: 800;
        line-height: 1.35;
      }
      .one-line-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 3mm;
        margin: 4mm 0 1mm;
        color: #6f5a20;
        font-size: 9.5px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
    </style>
  </head>
  <body>${body}</body>
</html>`;
}

function page(className, content) {
  return `<section class="page ${className}"><div class="inner">${content}</div></section>`;
}

function brand(label = "Goldmine") {
  return `<div class="brand"><strong>Goldmine</strong><span>${escapeHtml(label)}</span></div>`;
}

function freeHtml() {
  const pages = [
    page("cover-page", `
      ${brand("Free football starter")}
      <span class="badge">5-page starter PDF</span>
      <h1>Start with one football idea people already care about.</h1>
      <p>Goldmine helps you turn football attention into posts, fan pages, newsletters, affiliate angles, and small digital products. AI helps you move faster, but the idea still has to be useful, specific, and safe to publish.</p>
      <div class="hero-image">
        <img src="${asset("goldmine-hero-soft-v2.jpg")}" alt="Goldmine football idea desk" />
        <img class="cover-art" src="${asset("goldmine-starter-cover-soft-v2.svg")}" alt="Goldmine Starter cover" />
        <div class="caption">No fake income promises. No player endorsement tricks. Just practical football-first ideas you can test.</div>
      </div>
      <div class="grid-3" style="margin-top: 7mm;">
        <div class="metric"><strong>5</strong><span>starter pages</span></div>
        <div class="metric"><strong>5</strong><span>testable ideas</span></div>
        <div class="metric"><strong>7</strong><span>day starter path</span></div>
      </div>
    `),
    page("", `
      ${brand("Page 2")}
      <span class="badge">Pick your lane</span>
      <h2>Your quick idea map.</h2>
      <p>Do not start by asking, "What can I post?" Start by choosing the type of fan problem you want to solve.</p>
      <div class="wide-image">
        <img src="${asset("goldmine-system-soft-v2.jpg")}" alt="Goldmine idea system" />
        <div class="caption">One football topic can become a reel, carousel, poll, newsletter, or product link.</div>
      </div>
      <div class="grid-2">
        <div class="card">
          <h3>If you like analysis</h3>
          ${list(["Use match explainers, player comparisons, and tactical breakdowns.", "Best platforms: X, Instagram carousels, YouTube Shorts, newsletters."])}
        </div>
        <div class="card">
          <h3>If you like fast trends</h3>
          ${list(["Use polls, memes with context, hot takes, and daily watchlists.", "Best platforms: TikTok, Reels, X, Threads, community pages."])}
        </div>
      </div>
      <div class="quote" style="margin-top: 6mm;">The first win is not money. The first win is proof that strangers care about one repeatable angle.</div>
    `),
    page("playbook-page", `
      ${brand("Page 3")}
      <span class="badge">5 starter ideas</span>
      <h2>Pick one, not all five.</h2>
      <p class="lead">The free starter is not a giant list. It is a quick way to choose one football content lane and test it for a week.</p>
      <div class="thin-rule"></div>
      <div class="content-grid">
        ${freeIdeas.slice(0, 4).map((idea) => `
          <div class="plain-section">
            <h3>${escapeHtml(idea.title)}</h3>
            <p><strong>Angle:</strong> ${escapeHtml(idea.angle)}</p>
            <p><strong>Hook:</strong> ${escapeHtml(idea.hook)}</p>
            <p><strong>First step:</strong> ${escapeHtml(idea.steps[0])}</p>
          </div>
        `).join("")}
      </div>
      <div class="example-block">
        <h3>${escapeHtml(freeIdeas[4].title)}</h3>
        <p><strong>Angle:</strong> ${escapeHtml(freeIdeas[4].angle)}</p>
        <p><strong>Hook:</strong> ${escapeHtml(freeIdeas[4].hook)}</p>
        <p><strong>First step:</strong> ${escapeHtml(freeIdeas[4].steps[0])}</p>
      </div>
      <div class="content-grid" style="margin-top: 5mm;">
        <div class="plain-section">
          <h3>Choose by strength</h3>
          ${numberedList(["Pick analysis if you enjoy explaining.", "Pick trends if you move fast.", "Pick product roundups if you like useful lists."])}
        </div>
        <div class="plain-section">
          <h3>Choose by proof</h3>
          ${numberedList(["Can you post it three times this week?", "Can people save or share it?", "Can it lead to a checklist, link page, or template?"])}
        </div>
      </div>
      <div class="simple-note">Choose the one you could post for 7 days without getting bored. The best idea is usually the one you can repeat calmly, not the one that sounds the fanciest.</div>
    `),
    page("playbook-page", `
      ${brand("Page 4")}
      <span class="badge">One simple AI workflow</span>
      <h2>Turn one topic into four assets.</h2>
      <p class="lead">Use this before buying tools or building automation. The goal is one useful post, then one useful remix, then one small next step.</p>
      <div class="thin-rule"></div>
      <div class="content-grid">
        <div class="plain-section">
          <h3>Input</h3>
          ${list(["Topic: a player debate, match question, or fan problem.", "Audience: casual fans, fantasy players, training fans, or creators.", "Format: reel, carousel, poll, or newsletter."])}
        </div>
        <div class="plain-section">
          <h3>Prompt</h3>
          <p>Give me 5 football content angles for [topic]. For each angle, include a hook, a 30-second script, one visual idea, one caption, and one safe monetization path. Avoid copyrighted clips and fake income claims.</p>
        </div>
        <div class="plain-section">
          <h3>Example output</h3>
          ${numberedList(["Hook: This goal started 18 seconds before the shot.", "Short script: explain the build-up in plain English.", "Carousel: show claim, example, takeaway, counterpoint, question.", "CTA: Want the checklist I used for this breakdown?"])}
        </div>
        <div class="plain-section">
          <h3>Publishing checklist</h3>
          ${numberedList(["Use your own wording.", "Fact-check the claim.", "Avoid copyrighted footage.", "Track saves, replies, shares, and profile clicks."])}
        </div>
      </div>
      <div class="example-block">
        <h3>One topic becomes four assets</h3>
        ${numberedList(["Reel: one 35-second explanation.", "Carousel: one 5-slide breakdown.", "Poll: one question to collect comments.", "Newsletter note: one paragraph with the useful takeaway."])}
      </div>
      <div class="content-grid" style="margin-top: 5mm;">
        <div class="plain-section">
          <h3>Copy prompt to start</h3>
          <p>Create a football content pack about [topic]. Give me a hook, a short video script, a carousel outline, a poll question, a newsletter paragraph, and one soft CTA. Keep it factual and avoid income promises.</p>
        </div>
        <div class="plain-section">
          <h3>CTA examples</h3>
          ${numberedList(["Want the checklist I used?", "Should I make a template for this?", "Comment a player or match and I will make a version."])}
        </div>
      </div>
      <div class="simple-note">If the hook feels generic, the post will feel generic. Make the angle specific before making it pretty.</div>
    `),
    page("", `
      ${brand("Page 5")}
      <span class="badge">7-day starter path</span>
      <h2>Your first test week.</h2>
      <div class="grid-2">
        <div class="panel">
          <h3>Days 1 to 3</h3>
          ${list(["Pick one idea lane.", "Write 10 hooks.", "Publish 3 simple posts in the same format.", "Save comments and questions."])}
        </div>
        <div class="panel">
          <h3>Days 4 to 7</h3>
          ${list(["Turn the best post into a second format.", "Create one useful link destination.", "Add a small CTA.", "Decide whether to repeat, refine, or stop."])}
        </div>
      </div>
      <div class="wide-image" style="height: 84mm;">
        <img src="${asset("goldmine-pack-soft-v2.jpg")}" alt="Goldmine full pack preview" />
        <img class="cover-art" src="${asset("goldmine-full-pack-cover-soft-v2.svg")}" alt="Goldmine Full Pack cover" />
        <div class="caption">The $1 Full Pack expands this into 50 pages of ideas, workflows, hooks, and a 7-day sprint.</div>
      </div>
      <div class="quote">Next step: ${escapeHtml(ctaUrl)}</div>
      <p class="footer-note">Reminder: no guaranteed income. Use this as a testing map, not a promise machine.</p>
    `),
  ];

  return htmlDocument("Goldmine Football Starter", pages.join(""));
}

function numberedList(items) {
  return `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
}

function ideaHooks(title, promise, niches) {
  const firstNiche = niches.split(",")[0].toLowerCase();
  return [
    `The useful angle today: ${promise}`,
    `Most fans are talking about ${firstNiche}. Here is the cleaner, more useful breakdown.`,
    "Before the next match, turn one fan argument into one clear takeaway.",
    "If this helps you, I can turn it into a checklist, template, or weekly series.",
  ];
}

function firstPost(index, title) {
  const lowerTitle = title.toLowerCase();
  const formats = [
    {
      name: "5-slide carousel",
      steps: [
        `Slide 1: bold claim about ${lowerTitle}.`,
        "Slide 2: one simple reason the audience already feels.",
        "Slide 3: one fact, example, or match moment that supports it.",
        "Slide 4: one counterpoint so the post feels honest.",
        "Slide 5: question prompt that invites comments.",
      ],
    },
    {
      name: "35-second short video",
      steps: [
        "0-3s: start with the strongest hook.",
        "4-15s: explain the situation in plain language.",
        "16-27s: show the useful takeaway or mistake people miss.",
        "28-35s: end with a save/comment CTA.",
      ],
    },
    {
      name: "X or Threads mini-thread",
      steps: [
        `Post 1: name the ${lowerTitle} angle clearly.`,
        "Post 2: give one example and why it matters.",
        "Post 3: add one practical takeaway for fans or creators.",
        "Post 4: ask what people want broken down next.",
      ],
    },
    {
      name: "Newsletter section",
      steps: [
        "Subject line: use the simplest debate or question.",
        "Opening: say why this matters now.",
        "Middle: give three bullets with your judgment.",
        "End: link to one useful resource or related post.",
      ],
    },
  ];

  return formats[(index - 1) % formats.length];
}

function platformPath(index) {
  const paths = [
    "Instagram carousel first, then remix into Reels.",
    "Shorts/Reels first, then turn comments into a second post.",
    "X or Threads first, then expand the strongest reply into a carousel.",
    "Newsletter first, then clip the strongest point into a short post.",
  ];

  return paths[(index - 1) % paths.length];
}

function ideaPage(index, idea) {
  const [title, promise, niches, aiStep, monetization] = idea;
  const hooks = ideaHooks(title, promise, niches);
  const post = firstPost(index, title);
  const platform = platformPath(index);
  const copyPrompt = `Create a ${post.name} about "${title}" for football fans. Audience: ${niches}. Include a sharp hook, a simple structure, one useful example, a soft CTA, and one realistic monetization path. Keep it factual, avoid copyrighted clips, and do not make income promises.`;
  const ctas = [
    "Want the checklist I used to make this?",
    "Should I turn this into a full template?",
    "Comment your club/player and I will make a version for that angle.",
  ];
  const why = `This works when the idea is tied to a moment fans already care about, but presented in a cleaner way than the noisy timeline. The goal is not to sound like an expert immediately. The goal is to make one useful point clearly enough that people save it, reply to it, or ask for the next breakdown.`;
  const validation = [
    "Day 1: research 5 live examples and write 10 hooks before designing anything.",
    "Day 2: publish the first simple version on one platform only.",
    "Day 3: reply to every useful comment and collect repeated questions.",
    "Day 4: remix the strongest point into a second format.",
    "Day 5: add one soft CTA to a checklist, link page, newsletter, or template.",
    "Day 6: compare saves, shares, replies, and profile clicks.",
    "Day 7: repeat only if there is a visible signal from strangers.",
  ];

  return page("playbook-page", `
    ${brand(`Play ${String(index).padStart(2, "0")}`)}
    <span class="badge">Football social money idea</span>
    <h2>${escapeHtml(title)}</h2>
    <p class="lead"><strong>Core idea:</strong> ${escapeHtml(promise)} Best fit: ${escapeHtml(niches)}</p>
    <div class="one-line-meta">
      <span>AI-content first</span>
      <span>${escapeHtml(platform)}</span>
      <span>7-day validation</span>
    </div>
    <div class="thin-rule"></div>
    <div class="content-grid">
      <div class="plain-section">
        <h3>Why this can work</h3>
        <p>${escapeHtml(why)}</p>
      </div>
      <div class="plain-section">
        <h3>What to avoid</h3>
        <p>Avoid pretending the result is guaranteed, copying copyrighted match clips, using unauthorized player likenesses as product endorsements, or posting generic AI text without fact-checking and taste.</p>
      </div>
      <div class="plain-section">
        <h3>AI workflow</h3>
        <p>${escapeHtml(aiStep)} Then rewrite the output in your own voice and verify names, dates, stats, and claims before publishing.</p>
      </div>
      <div class="plain-section">
        <h3>Money path</h3>
        <p>${escapeHtml(monetization)} Keep the first CTA soft: "Want the checklist/template/version I used?"</p>
      </div>
    </div>
    <div class="example-block">
      <h3>Example hooks you can adapt</h3>
      ${numberedList(hooks)}
    </div>
    <div class="content-grid" style="margin-top: 5mm;">
      <div class="plain-section">
        <h3>Example first post</h3>
        <p><strong>Format:</strong> ${escapeHtml(post.name)}</p>
        ${numberedList(post.steps)}
      </div>
      <div class="plain-section">
        <h3>7-day validation plan</h3>
        ${numberedList(validation)}
      </div>
    </div>
    <div class="content-grid" style="margin-top: 5mm;">
      <div class="plain-section">
        <h3>Copy prompt to start</h3>
        <p>${escapeHtml(copyPrompt)}</p>
      </div>
      <div class="plain-section">
        <h3>CTA examples</h3>
        ${numberedList(ctas)}
      </div>
    </div>
  `);
}

function workflowPage(index, title, flow, when) {
  const steps = flow.split("->").map((step) => step.trim());
  const prompt = `Build a ${title.toLowerCase()} workflow for a football creator. Use this flow: ${flow}. Give me the input fields, the exact output format, a publishing checklist, a quality check, and one safe monetization path.`;
  const outputs = [
    "One finished post or asset, not ten unfinished drafts.",
    "One caption with a soft CTA.",
    "One quality checklist before publishing.",
    "One note on what to track after posting.",
  ];
  const checks = [
    "Check names, dates, stats, and context before publishing.",
    "Avoid copyrighted clips, fake screenshots, and player endorsement claims.",
    "Keep the creator's point of view in the final edit.",
    "Publish one version first, then improve after real audience signal.",
  ];

  return page("playbook-page", `
    ${brand(`Workflow ${index + 1}`)}
    <span class="badge">AI workflow recipe</span>
    <h2>${escapeHtml(title)}</h2>
    <p class="lead"><strong>Use this when:</strong> ${escapeHtml(when)}</p>
    <div class="one-line-meta">
      <span>Repeatable process</span>
      <span>Human judgment required</span>
      <span>Safe publishing</span>
    </div>
    <div class="thin-rule"></div>
    <div class="content-grid">
      <div class="plain-section">
        <h3>Workflow steps</h3>
        ${numberedList(steps)}
      </div>
      <div class="plain-section">
        <h3>What the output should include</h3>
        ${numberedList(outputs)}
      </div>
      <div class="plain-section">
        <h3>Copy prompt to start</h3>
        <p>${escapeHtml(prompt)}</p>
      </div>
      <div class="plain-section">
        <h3>Quality checks</h3>
        ${numberedList(checks)}
      </div>
    </div>
    <div class="example-block">
      <h3>Example use case</h3>
      <p>Pick one live football topic, run it through this workflow, and publish the smallest useful version. For example: a match preview, a player debate, a watch-party checklist, a fan poll, or a short tactical explanation.</p>
    </div>
    <div class="content-grid" style="margin-top: 5mm;">
      <div class="plain-section">
        <h3>Monetization bridge</h3>
        <p>After a post gets signal, route people to a simple next step: a checklist, template, newsletter, link page, prompt pack, or service offer. Keep it optional and useful.</p>
      </div>
      <div class="plain-section">
        <h3>Do not automate too early</h3>
        <p>Do the first few runs manually. Automation comes after the format proves people care. Otherwise the workflow only helps you create more ignored content faster.</p>
      </div>
    </div>
  `);
}

function paidHtml() {
  const pages = [];

  pages.push(page("cover-page", `
    ${brand("$1 Full Pack")}
    <span class="badge">50-page football idea pack</span>
    <h1>Football ideas, AI workflows, and monetization paths you can actually test.</h1>
    <p>This pack is football-first and AI-content-first. Use it to build viral social posts, fan pages, newsletters, affiliate pages, digital products, or creator services without relying on fake promises.</p>
    <div class="hero-image">
      <img src="${asset("goldmine-pack-soft-v2.jpg")}" alt="Goldmine full pack preview" />
      <img class="cover-art" src="${asset("goldmine-full-pack-cover-soft-v2.svg")}" alt="Goldmine Full Pack cover" />
      <div class="caption">40 playbooks, 5 workflows, a 7-day sprint, and a simple decision system.</div>
    </div>
  `));

  pages.push(page("playbook-page", `
    ${brand("How to use this")}
    <span class="badge">Read this first</span>
    <h2>Do not try all 40 ideas.</h2>
    <p class="lead">Goldmine works best when you choose one lane, test it for one week, and only then decide whether to repeat or switch.</p>
    <div class="one-line-meta">
      <span>40 playbooks</span>
      <span>5 workflows</span>
      <span>1 weekly test system</span>
    </div>
    <div class="thin-rule"></div>
    <div class="content-grid">
      <div class="plain-section"><h3>Use the pack in this order</h3>${numberedList(["Read the lane map.", "Choose one playbook.", "Copy the prompt.", "Publish the smallest useful version.", "Track signal for 7 days."])}</div>
      <div class="plain-section"><h3>Pick by energy</h3>${numberedList(["Analysis if you like thinking.", "Trends if you like speed.", "Products if you like selling.", "Services if you like helping other creators."])}</div>
      <div class="plain-section"><h3>Pick by platform</h3>${numberedList(["Reels and Shorts for fast testing.", "X and Threads for opinions.", "Newsletter for owned audience.", "Landing page for product tests."])}</div>
      <div class="plain-section"><h3>Score each idea quickly</h3>${numberedList(["Can I make 3 posts from this?", "Would a stranger save this?", "Can it lead to a useful checklist, template, link, or service?", "Can I do this without copyrighted material?"])}</div>
    </div>
    <div class="example-block">
      <h3>The rule</h3>
      <p>You are not looking for the perfect idea. You are looking for a repeatable signal: saves, replies, shares, profile clicks, email signups, or people asking for the next version.</p>
    </div>
    <div class="content-grid" style="margin-top: 5mm;">
      <div class="plain-section"><h3>Do not buy tools first</h3><p>Use AI chat, a notes app, and one platform first. Buy tools only after a format gets signal.</p></div>
      <div class="plain-section"><h3>Do not automate first</h3><p>Manual taste comes before automation. If the manual version is ignored, automation will only create ignored content faster.</p></div>
    </div>
    <div class="example-block">
      <h3>Example first run</h3>
      ${numberedList(["Pick Play 02 if you like explaining tactics.", "Write 10 hooks around one match moment.", "Publish one carousel or 35-second reel.", "Track whether people save, reply, or ask for another breakdown."])}
    </div>
  `));

  pages.push(page("playbook-page", `
    ${brand("Idea map")}
    <span class="badge">Where the ideas fit</span>
    <h2>The Goldmine map.</h2>
    <p class="lead">Every idea in the pack sits inside one of four lanes. Pick the lane that fits your energy, not the one that sounds most impressive.</p>
    <div class="thin-rule"></div>
    <div class="content-grid">
      <div class="plain-section"><h3>Analysis</h3><p>Use this if you enjoy explaining matches, players, tactics, decisions, and stats in simple language.</p>${numberedList(["Best formats: carousels, short explainers, newsletters.", "Money path: guides, sponsorships, education products."])}</div>
      <div class="plain-section"><h3>Trends</h3><p>Use this if you move fast and can turn live football moments into useful posts before everyone else.</p>${numberedList(["Best formats: polls, memes with context, daily watchlists.", "Money path: affiliate pages, communities, newsletters."])}</div>
      <div class="plain-section"><h3>Products</h3><p>Use this if you like creating checklists, templates, prompts, calendars, posters, or digital downloads.</p>${numberedList(["Best formats: product demos, examples, before/after posts.", "Money path: $1 to $9 digital products and bundles."])}</div>
      <div class="plain-section"><h3>Services</h3><p>Use this if you want to help creators, fan pages, clubs, or small brands make better football content.</p>${numberedList(["Best formats: audits, sample work, teardown posts.", "Money path: retainers, setup fees, done-for-you content."])}</div>
    </div>
    <div class="example-block">
      <h3>Simple route</h3>
      <p>Fan attention -> useful content format -> soft CTA -> checklist/template/link/newsletter/service. Keep the route useful before trying to make it profitable.</p>
    </div>
    <div class="content-grid" style="margin-top: 5mm;">
      <div class="plain-section"><h3>60-second choice test</h3>${numberedList(["Can I explain this idea to a friend quickly?", "Can I make one example today?", "Can I repeat it three times without copying myself?"])}</div>
      <div class="plain-section"><h3>Common mistake</h3><p>Do not choose the lane with the biggest income fantasy. Choose the lane where you can make useful examples consistently.</p></div>
    </div>
  `));

  pages.push(page("", `
    ${brand("Table of contents")}
    <span class="badge">40 playbooks</span>
    <h2>Choose your starting lane.</h2>
    <ol class="two-col">
      ${paidIdeas.map((idea, index) => `<li>${String(index + 1).padStart(2, "0")} - ${escapeHtml(idea[0])}</li>`).join("")}
    </ol>
    <div class="content-grid" style="margin-top: 8mm;">
      <div class="plain-section"><h3>Fastest starting points</h3>${numberedList(["If you want content speed: start with polls, memes with context, or what to watch today.", "If you want product ideas: start with prompts, templates, calendars, or data trackers.", "If you want services: start with creator audits or reel script packs."])}</div>
      <div class="plain-section"><h3>Best first rule</h3><p>Pick the playbook that makes you want to post today. Execution beats picking the smartest-sounding idea and never publishing it.</p></div>
    </div>
    <div class="example-block">
      <h3>If you feel stuck</h3>
      <p>Start with Play 02, Play 03, Play 16, or Play 34. They are easiest to test because they turn into a clear post, a clear prompt, or a clear service offer quickly.</p>
    </div>
  `));

  paidIdeas.forEach((idea, index) => pages.push(ideaPage(index + 1, idea)));

  workflowPages.forEach(([title, flow, when], index) => {
    pages.push(workflowPage(index, title, flow, when));
  });

  pages.push(page("playbook-page", `
    ${brand("Final page")}
    <span class="badge">7-day sprint and rules</span>
    <h2>Run this before overbuilding.</h2>
    <p class="lead">Use the pack like a test system. Pick one playbook, publish a small version, watch the signal, then decide whether to repeat, refine, or stop.</p>
    <div class="thin-rule"></div>
    <div class="content-grid">
      <div class="plain-section"><h3>Days 1 to 3</h3>${numberedList(["Choose one playbook.", "Write 10 hooks.", "Publish 3 posts in one format.", "Track saves, comments, shares, and profile clicks."])}</div>
      <div class="plain-section"><h3>Days 4 to 7</h3>${numberedList(["Remix the best post into a second format.", "Create one useful link destination.", "Test one CTA.", "Write down what strangers actually responded to."])}</div>
      <div class="plain-section"><h3>Repeat if</h3>${numberedList(["People save the post.", "People ask for examples or templates.", "The same question appears more than once.", "Profile clicks or email signups increase."])}</div>
      <div class="plain-section"><h3>Stop if</h3>${numberedList(["The topic only gets empty likes.", "You cannot explain the value clearly.", "It needs copyrighted material to work.", "You are forcing the monetization path."])}</div>
    </div>
    <div class="example-block">
      <h3>Good next offers</h3>
      ${numberedList(["Affiliate links to genuinely useful tools or products.", "Small digital products like prompt packs, calendars, templates, and guides.", "Services for creators or fan pages after showing proof.", "Newsletters and community offers once trust exists."])}
    </div>
    <div class="content-grid" style="margin-top: 5mm;">
      <div class="plain-section"><h3>Avoid</h3>${numberedList(["Fake income screenshots.", "Unauthorized player images or copyrighted match clips.", "Pretending players endorse your product.", "Selling generic AI slop with no taste or verification."])}</div>
      <div class="plain-section"><h3>Simple tracking table</h3>${numberedList(["Post title.", "Format.", "Saves.", "Shares.", "Replies.", "Profile clicks.", "Next action."])}</div>
    </div>
    <div class="simple-note">A good idea is specific enough to post today, useful enough to save, and honest enough to build trust. Goldmine is a testing map, not a guarantee.</div>
  `));

  return htmlDocument("Goldmine Full Pack", pages.join(""));
}

function printPdf(inputHtml, outputPdf) {
  const result = spawnSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--allow-file-access-from-files",
    "--no-pdf-header-footer",
    `--print-to-pdf=${outputPdf}`,
    pathToFileURL(inputHtml).href,
  ], {
    cwd: root,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(`Chrome PDF generation failed for ${inputHtml}\n${result.stderr}\n${result.stdout}`);
  }
}

mkdirSync(docsDir, { recursive: true });

const freeHtmlPath = resolve(docsDir, "free-goldmine-starter.html");
const paidHtmlPath = resolve(docsDir, "goldmine-full-pack.html");
const freePdfPath = resolve(publicDir, "free-goldmine-starter.pdf");
const paidPdfPath = resolve(docsDir, "goldmine-full-pack.pdf");

writeFileSync(freeHtmlPath, freeHtml().replace(/[ \t]+$/gm, ""), "utf8");
writeFileSync(paidHtmlPath, paidHtml().replace(/[ \t]+$/gm, ""), "utf8");
printPdf(freeHtmlPath, freePdfPath);
printPdf(paidHtmlPath, paidPdfPath);

console.log(`Generated ${freeHtmlPath}`);
console.log(`Generated ${freePdfPath}`);
console.log(`Generated ${paidHtmlPath}`);
console.log(`Generated ${paidPdfPath}`);
