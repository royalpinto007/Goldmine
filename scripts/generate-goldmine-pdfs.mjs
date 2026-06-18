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
    page("", `
      ${brand("Page 3")}
      <span class="badge">5 starter ideas</span>
      <h2>Pick one, not all five.</h2>
      <div class="grid-2">
        ${freeIdeas.slice(0, 4).map((idea) => `
          <div class="card">
            <span class="chip">${escapeHtml(idea.title)}</span>
            <h3 style="margin-top: 3mm;">${escapeHtml(idea.angle)}</h3>
            <p>${escapeHtml(idea.hook)}</p>
          </div>
        `).join("")}
      </div>
      <div class="card" style="margin-top: 4mm;">
        <span class="chip">${escapeHtml(freeIdeas[4].title)}</span>
        <h3 style="margin-top: 3mm;">${escapeHtml(freeIdeas[4].angle)}</h3>
        <p>${escapeHtml(freeIdeas[4].hook)}</p>
      </div>
      <p class="footer-note">Choose the one you could post for 7 days without getting bored.</p>
    `),
    page("", `
      ${brand("Page 4")}
      <span class="badge">One simple AI workflow</span>
      <h2>Turn one topic into four assets.</h2>
      <p>This is the starter workflow to run before buying tools or building automation.</p>
      <div class="grid-2" style="margin-top: 6mm;">
        <div class="panel">
          <h3>Input</h3>
          ${list(["Topic: a player debate, match question, or fan problem.", "Audience: casual fans, fantasy players, training fans, or creators.", "Format: reel, carousel, poll, or newsletter."])}
        </div>
        <div class="panel">
          <h3>Prompt</h3>
          <p>Give me 5 football content angles for [topic]. For each angle, include a hook, a 30-second script, one visual idea, one caption, and one safe monetization path. Avoid copyrighted clips and fake income claims.</p>
        </div>
      </div>
      <div class="grid-4" style="margin-top: 6mm;">
        <div class="metric"><strong>1</strong><span>hook</span></div>
        <div class="metric"><strong>1</strong><span>short script</span></div>
        <div class="metric"><strong>1</strong><span>carousel outline</span></div>
        <div class="metric"><strong>1</strong><span>link idea</span></div>
      </div>
      <div class="quote" style="margin-top: 6mm;">If the hook feels generic, the post will feel generic. Make the angle specific before making it pretty.</div>
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

function ideaPage(index, idea) {
  const [title, promise, niches, aiStep, monetization] = idea;
  const lowerTitle = title.toLowerCase();
  const firstPosts = [
    `Post 1: explain the problem behind ${lowerTitle}.`,
    "Post 2: show one example and one counterpoint.",
    "Post 3: ask the audience what they want next.",
  ];
  const hooks = [
    `Most fans are missing this ${lowerTitle} angle.`,
    "Here is the 30-second version before the next match.",
    "Save this if you create football content this week.",
  ];
  return page("", `
    ${brand(`Play ${String(index).padStart(2, "0")}`)}
    <span class="badge">Football money idea</span>
    <h2>${escapeHtml(title)}</h2>
    <div class="idea">
      <span class="mini">What it is</span>
      <h3>${escapeHtml(promise)}</h3>
      <p>${escapeHtml(niches)}</p>
      <div class="meta">
        <span class="chip">AI-first</span>
        <span class="chip">Social content</span>
        <span class="chip">Testable</span>
      </div>
      <div class="playbook-grid">
        <div class="panel"><h3>Run this workflow</h3><p>${escapeHtml(aiStep)}</p></div>
        <div class="panel"><h3>Money path</h3><p>${escapeHtml(monetization)}</p></div>
        <div class="panel"><h3>First 3 posts</h3>${list(firstPosts)}</div>
        <div class="panel"><h3>Hook bank</h3>${list(hooks)}</div>
      </div>
      <div class="hook-line">CTA to test: "Want me to turn this into a template, checklist, or weekly page?"</div>
    </div>
    <div class="grid-3" style="margin-top: 5mm;">
      <div class="metric"><strong>1</strong><span>repeatable format</span></div>
      <div class="metric"><strong>3</strong><span>posts to test</span></div>
      <div class="metric"><strong>7</strong><span>days before judging</span></div>
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

  pages.push(page("", `
    ${brand("How to use this")}
    <span class="badge">Read this first</span>
    <h2>Do not try all 40 ideas.</h2>
    <p>Goldmine works best when you choose one lane, test it for one week, and only then decide whether to repeat or switch.</p>
    <div class="grid-3" style="margin-top: 8mm;">
      <div class="metric"><strong>40</strong><span>idea playbooks</span></div>
      <div class="metric"><strong>5</strong><span>AI workflows</span></div>
      <div class="metric"><strong>1</strong><span>weekly test system</span></div>
    </div>
    <div class="grid-2" style="margin-top: 8mm;">
      <div class="panel"><h3>Pick by energy</h3>${list(["Analysis if you like thinking.", "Trends if you like speed.", "Products if you like selling.", "Services if you like helping other creators."])}</div>
      <div class="panel"><h3>Pick by platform</h3>${list(["Reels and Shorts for fast testing.", "X and Threads for opinions.", "Newsletter for owned audience.", "Landing page for product tests."])}</div>
    </div>
    <div class="quote" style="margin-top: 7mm;">You are not looking for the perfect idea. You are looking for a repeatable signal.</div>
  `));

  pages.push(page("", `
    ${brand("Idea map")}
    <span class="badge">Where the ideas fit</span>
    <h2>The Goldmine map.</h2>
    <div class="wide-image">
      <img src="${asset("goldmine-system-soft-v2.jpg")}" alt="Goldmine content system" />
      <div class="caption">Start from fan attention, turn it into a format, then route it to a useful next step.</div>
    </div>
    <div class="grid-4">
      <div class="metric"><strong>A</strong><span>Analysis</span></div>
      <div class="metric"><strong>T</strong><span>Trends</span></div>
      <div class="metric"><strong>P</strong><span>Products</span></div>
      <div class="metric"><strong>S</strong><span>Services</span></div>
    </div>
  `));

  pages.push(page("", `
    ${brand("Table of contents")}
    <span class="badge">40 playbooks</span>
    <h2>Choose your starting lane.</h2>
    <ol class="two-col">
      ${paidIdeas.map((idea, index) => `<li>${String(index + 1).padStart(2, "0")} - ${escapeHtml(idea[0])}</li>`).join("")}
    </ol>
  `));

  paidIdeas.forEach((idea, index) => pages.push(ideaPage(index + 1, idea)));

  workflowPages.forEach(([title, flow, when], index) => {
    pages.push(page("", `
      ${brand(`Workflow ${index + 1}`)}
      <span class="badge">AI workflow recipe</span>
      <h2>${escapeHtml(title)}</h2>
      <div class="wide-image">
        <img src="${asset(index % 2 === 0 ? "goldmine-system-soft-v2.jpg" : "goldmine-pack-soft-v2.jpg")}" alt="Goldmine workflow visual" />
        <div class="caption">${escapeHtml(flow)}</div>
      </div>
      <div class="grid-2">
        <div class="panel"><h3>When to use it</h3><p>${escapeHtml(when)}</p></div>
        <div class="panel"><h3>Quality rule</h3><p>Use AI for structure and speed. Keep the judgment, fact-checking, and final taste human.</p></div>
      </div>
    `));
  });

  pages.push(page("", `
    ${brand("Final page")}
    <span class="badge">7-day sprint and rules</span>
    <h2>Run this before overbuilding.</h2>
    <div class="grid-2">
      <div class="panel"><h3>Days 1 to 3</h3>${list(["Choose one playbook.", "Write 10 hooks.", "Publish 3 posts in one format.", "Track saves, comments, shares, and profile clicks."])}</div>
      <div class="panel"><h3>Days 4 to 7</h3>${list(["Remix the best post into a second format.", "Create one useful link destination.", "Test one CTA.", "Write down what strangers actually responded to."])}</div>
    </div>
    <div class="grid-2" style="margin-top: 8mm;">
      <div class="panel"><h3>Good paths</h3>${list(["Affiliate links to genuinely useful tools or products.", "Small digital products like prompt packs, calendars, templates, and guides.", "Services for creators or fan pages after showing proof.", "Newsletters and community offers once trust exists."])}</div>
      <div class="panel"><h3>Avoid</h3>${list(["Fake income screenshots.", "Unauthorized player images or copyrighted match clips.", "Pretending players endorse your product.", "Selling generic AI slop with no taste or verification."])}</div>
    </div>
    <div class="quote" style="margin-top: 7mm;">A good idea is specific enough to post today, useful enough to save, and honest enough to build trust.</div>
    <p class="footer-note">Goldmine is a testing map, not a guarantee. Use it to move faster and think clearer.</p>
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
