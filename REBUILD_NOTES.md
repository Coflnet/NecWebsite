# NotEnoughCoins guide rebuild — follow-up notes

This is a snapshot of decisions and outstanding work after the April 2026 deep-link/SEO rebuild.

## Decisions applied

### Brand
- "Archive" wording removed across all pages. The brand is "NotEnoughCoins"; the mod is discontinued, the guide library lives on.
- Per-guide "Release N of 21" numbering removed. Each guide stands on its own.

### YouTube video links — decision: NO inline embeds or outbound video links
The guides already attribute creators by name in the prose and source-video sidebar
(e.g. dotakimu, lace, Xentyl, Kuvdra, Candypat, Upher, FarmerWarden, Nitroze).
Adding outbound YouTube `<a>` links or embeds was evaluated against:
  - SEO upside: marginal. Citations to creators are already an E-E-A-T signal.
    YouTube embeds add page weight and can hurt CWV.
  - UX downside: every embed/link is a click-out reducing dwell time, which is
    a measured ranking signal. Embeds also pull `youtube.com` cookies.
  - Editorial accuracy: video URLs rot (deleted, renamed, monetisation strikes).
    Plain creator citations age more gracefully.
Conclusion: keep creator-name citations, do not link videos. Revisit only for
guides where the source video is the unique evidence (none currently).

### Tool-link strategy — applied
All 21 guides + index + faq + flipping-tools-comparison now link directly to the
relevant feature surface instead of homepages:
  - sky.coflnet.com: /flipper, /flips, /bazaar, /premiumBazaar, /subscriptions,
    /topMovers, /lowSupply, /recentFlips, /crafts, /forge, /fusion, /bookFlips,
    /npc, /bazaar/npcresell, /profitLeaderboard
  - pro.skyblock.bz: /features and /features/{bazaar-flipping, auction-flips,
    craft-forge-flips, npc-mayor-flips, market-trends, converters,
    money-making-tasks}
  - skyblock.bz: /flips, /crafts, /npc, /reverse_npc, /manipulate, /crash
  - bazaartracker.com: /smart, /margin, /demand, /crafts, /npc, /auctions
SEO vocabulary integrated across guides: real-time, lowest BIN, median price,
spread, modifier-aware, manipulation detection, crash risk, fire-sale alerts,
ROI, coins/hour, instant buy/sell, deal feed, rule-based filters.

### Competitor SEO text — now incorporated
Landing-page language from `skytools.app` and `skyah.net` has now been folded
into the NEC homepage, FAQ and tool-comparison page.

Observed SkyTools phrases worth absorbing:
  - free Hypixel SkyBlock tools
  - real-time bazaar prices
  - fire-sale alerts
  - networth calculator
  - craft engine
  - profit simulator
  - market tools / player tools / strategy tools

Observed SkyAH phrases worth absorbing:
  - AH scanner
  - flip finder
  - sold data
  - historical sale context
  - modifier-aware pricing
  - focused filtering
  - fast feed delivery
  - alerts / flip tracker

These phrases are now used in NEC copy where they match real functionality,
especially on the home page quick-answer blocks and the flipping-tools
comparison page.

### AI answer optimization — applied
- Replaced the weak repeated header slogan "Weekly SkyBlock money-making guide
  series" with a clearer site-wide description focused on guides, FAQs and live
  tool links.
- Added question-first answer cards to the homepage.
- Added FAQPage structured data to `faq.html`.
- Expanded FAQ entries to answer common retrieval-style queries directly:
  AH scanner, flip finder, bazaar prices, crafts, historical sale context and
  alerts.

## Outstanding work

### bazaartracker.com — feature gap vs competitors
Source repo: `../bazaartracker-site` (Express + EJS).
Currently has: `/`, `/smart`, `/npc`, `/crafts`, `/demand`, `/margin`,
`/auctions`, `/product/:product`, `/auction/:uuid`, `/search`.
Missing vs SkyCofl + Skyblock.bz + BazaarPro:
  - `/reverse-npc` (player→NPC routes) — high-leverage, simple add
  - `/manipulation` and `/crash` (suspicious-price feeds) — needs scoring logic
  - `/movers` (top 24h movers) and `/low-supply` (rare AH finds)
  - Price chart on `/product/:product` detail page
  - Attribute / book / forge / fusion flip type filters
  - Profit leaderboard, recent flips feed
  - Notifier subscriptions (Discord/email)
  - Guides/wiki content (cross-link to NEC + hypixel-react /guides)
Recommendation: ship `/reverse-npc` + `/movers` + `/low-supply` first as they
reuse existing data sources. Manipulation/crash detection wants its own ticket
because it needs a price-history watcher service.

### hypixel-react cross-link — DONE
Added an "External Money-Making Guide Library" section to
`app/guides/page.tsx` with deep links to the 6 highest-value NEC guides.

### Future polish
- Run a polish pass on guide copy after the next round of Skyblock features
  (SkyCofl `/trade` and BazaarPro pricing-tier changes).
- Consider adding a pro.skyblock.bz "BazaarPro" badge to the sitemap and OG cards.
