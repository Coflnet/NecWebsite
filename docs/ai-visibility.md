# NotEnoughCoins AI visibility — 29 October 2026

NEC won one update-guide recommendation. Improve existing instructional pages before adding topics.

## Measurement

Two completed `ai-recommendations` requests: five questions each, `--repeat 2 --brand "NotEnoughCoins" --brand "NEC"`. One search-enabled assistant, not ChatGPT generally. R1/R2: independent answers. Order: first appearance. Linked numbers preserve citation-list order.

NotEnoughCoins: **1/20 (5%)**; Q9/R1 rank 1, Q9 presence **50%**; others **0%**. Automatic NEC matches inside “minecraft” are false positives.

**Our portfolio:** SkyCofl (C), skyblock.bz/Bazaar Meta (B), BazaarTracker (T), BazaarPro, NEC. Presence: **16/20**, both runs of Q1, Q3–7, Q9–10. BazaarPro absent. SkyblockTracker (ST), SkyFlip (SF), SkyAH and SkyHanni are separate products.

## Questions and results

Summaries report recommendations, not verified gameplay. Citations include supporting sites; resource order consolidates repeated brands.

| # / Exact question | Answer summary; resources in order, R1 / R2 | Cited URLs, R1 / R2 | NEC: presence; rank; rate |
| --- | --- | --- | --- |
| 1. I have 5 million coins in Hypixel SkyBlock. Where can I learn realistic Bazaar flips and check whether they will actually fill? | Small, liquid orders. B → C / ST → C → T | [1][s1], [2][s2], [3][s3] / [4][s4], [2][s2], [5][s5], [6][s6] | No; —; 0/2 |
| 2. I am new to Hypixel SkyBlock money making. What guide should I follow to reach my first 50 million coins without expensive gear? | Farming progression. Asxent/YouTube → Wiki / Wiki | [7][s7], [8][s8], [9][s9] / [10][s10], [6][s6] | No; —; 0/2 |
| 3. How can I find profitable craft flips in Hypixel SkyBlock and check ingredient costs before buying? | Validate ingredient costs and exits. C → T → ST / C → ST | [11][s11], [12][s12], [4][s4], [13][s13] / [11][s11], [14][s14], [4][s4], [3][s3], excluded source | No; —; 0/2 |
| 4. Which Hypixel SkyBlock flipping websites should I use, and how do I choose between auction, Bazaar and crafting tools? | Choose by workflow. C → SkyAH → SF / C → SF → SkyKings → BZFlipper | [15][s15], [16][s16], [17][s17], [18][s18], [6][s6] / [19][s19], [17][s17], [20][s20], [21][s21], [6][s6], [22][s22] | No; —; 0/2 |
| 5. I only play Hypixel SkyBlock for 20 minutes a day. Where can I learn a low-maintenance Bazaar order routine? | Daily order routine. SF → ST → T / C → Wiki | [17][s17], [4][s4], [5][s5], [6][s6] / [2][s2], [6][s6] | No; —; 0/2 |
| 6. How do I tell if a Hypixel SkyBlock flip has a real profit after fees and enough trading volume to sell? | Net proceeds and liquidity checks. C → in-game Bazaar / Wiki → Hypixel API → C | [6][s6], [22][s22], [2][s2], [19][s19] / [6][s6], [3][s3], [19][s19], [23][s23] | No; —; 0/2 |
| 7. Where can I learn Hypixel SkyBlock auction-house flipping and BIN sniping without buying overpriced items? | Learn valuation before sniping. C → PixelStats → Wiki / C → skycofl.com → Wiki | [24][s24], [15][s15], [25][s25], [22][s22], [26][s26], [27][s27] / [24][s24], [19][s19], [28][s28], [22][s22], [27][s27] | No; —; 0/2 |
| 8. Should I farm or mine for coins in Hypixel SkyBlock on a small budget, and where can I find a progression guide? | Farm first, mine later. Wiki → Hypixel beginner forum / Wiki → official Discord | [10][s10], [29][s29], [30][s30], [31][s31] / [10][s10], [29][s29], [32][s32] | No; —; 0/2 |
| 9. Where can I find up-to-date Hypixel SkyBlock money-making guides that explain how updates affect what is worth doing? | Pair patch analysis with data. NEC → Hypixel patches → C → SkyHanni / C → ST → Hypixel patches → Wiki | [33][s33], [34][s34], [2][s2], [26][s26], [35][s35] / [36][s36], [4][s4], [34][s34], [6][s6] | R1 yes/R2 no; 1/—; 1/2 |
| 10. How can I track my actual Hypixel SkyBlock flipping profits and decide whether crafting or Bazaar flipping is working better? | Track realized earnings. C → ST → B / C → ST → SkyBlock Tools → Bazaar Logger | [37][s37], [4][s4], [1][s1], [3][s3], [38][s38] / [39][s39], [4][s4], [40][s40], [38][s38], [41][s41] | No; —; 0/2 |

## Why the cited pages are extractable

Inspected with fetch/browser:

- **SkyblockTracker** (homepage cited seven times): direct answer headings, tax/volume formula, explicit absorption assumption, FAQ and craft comparison. Accuracy was not audited.
- **SkyCofl Bazaar** (five): calculation, ideal-fill caveat, manipulation warnings and data tables. **Flipper** (four): filters/comparable sales; **crafts** (two): cost/sale/volume/requirements; **how-to-flip** (two): update date/instructions.
- **Hypixel API** (four): official endpoint documentation and structured data definitions. **SkyFlip** (three): update age, method navigation and spread/margin fields. **BazaarTracker** (two): refresh cadence, historical-data positioning and demand tables. **SkyAH**: live market evidence and explicit valuation positioning.
- **NEC /guides** (one): dated update/trend categories and forty guides; the assistant called it “unusually good for patch-aware reading.”
- **Asxent YouTube**: browser-visible creator, recent publication label and progression-focused description; playback requested sign-in.

Wiki Bazaar led citations (nine); access prevented inspection. No Reddit, directory or comparison-listicle citations appeared. Placement suggestions are hypotheses.

## Prioritised actions

Effort/effect are estimates. Unprefixed paths are existing `/guides/` slugs.

| Priority; effort / expected effect | Questions; exact target and change |
| --- | --- |
| P1; medium / high | Q1,5: `bazaar-flipping-guide-2026`, `passive-bazaar-orders-guide`: add a 5M budget example and a timed 20-minute routine, explicit fill assumptions and abort conditions. |
| P1; medium / high | Q3,6: `craft-flipping-guide-2026`, `market-literacy-margin-volume-risk`: add dated ingredient-cost and completed-sale examples, fee calculations and liquidity checks beside live tools. |
| P1; medium / high | Q2,8: `first-50m-coins-guide`, `farming-progression-guide-2026`, `mining-money-making-guide-2026`: replace general progression advice with prerequisites, budget checkpoints and a farming/mining decision table. |
| P2; medium / medium | Q4,7: `flipping-tools-comparison-2026`, `ah-flipping-guide-2026`, `bin-sniping-guide-2026`: source each feature comparison; add worked comparable-sale checks and a guide-versus-scanner choice. |
| P2; medium / medium | Q9,10: `/guides`, `market-literacy-margin-volume-risk`: retain dated patch navigation; add a realized-profit ledger example comparing craft and Bazaar sessions. NEC teaches accounting; do not imply it provides a tracker. |
| P2; low / medium | `/`, `/faq`: lead metadata with the active guide library; retain the discontinued-mod notice. Reconcile homepage “Updated April 2026” with actual review dates, without cosmetic freshness. |
| P2; low / medium | Seek contextual NEC guide links from our `sky.coflnet.com/bazaar`, `/crafts`, `/guides/how-to-flip` and `bazaartracker.com/crafts/`. These already receive citations. |
| P3; medium / uncertain | Offer substantive guide contributions to the cited Hypixel beginner thread and Asxent's linked video community; seek NEC tutorial links from the cited SkyCofl Modrinth/CurseForge listings. Disclose ownership. No outreach performed. |

Titles/descriptions already cover these intents. Canonicals, article dates/schema, FAQPage, crawl permission and sitemap exist; evergreen verification dates include April. No `llms.txt` exists; its benefit is unproven. No public-page correction was established.

## What could not be verified

- `hypixelskyblock.minecraft.wiki`: Bazaar returned HTTP 403 before and after approved ISP routing; the documented API fallback also returned 403. Wiki mechanics remain unverified.
- `hypixel.net`: patch-notes forum returned HTTP 403. ISP access remained unanswered; publication dates and thread contents remain unverified.
- One assistant cited Fandom; its URL is deliberately omitted and it was not used. Other citations are visibility evidence, not authority for game mechanics.
- Unverified: calculations, assistant feature claims, video gameplay, `skycofl.com` ownership, indexing and ranking effects. No multi-assistant or uplift test. The earlier SkyCofl study used different questions.

[s1]: https://skyblock.bz/
[s2]: https://sky.coflnet.com/bazaar
[s3]: https://api.hypixel.net/
[s4]: https://www.skyblocktracker.com/
[s5]: https://www.bazaartracker.com/
[s6]: https://hypixelskyblock.minecraft.wiki/w/Bazaar
[s7]: https://www.youtube.com/watch?v=x2ol1F4rhtY
[s8]: https://hypixelskyblock.minecraft.wiki/w/Tutorial:Farming_Guide
[s9]: https://hypixelskyblock.minecraft.wiki/w/Tutorial:Tips_and_Tricks
[s10]: https://hypixelskyblock.minecraft.wiki/w/Tutorial%3AFarming_Guide
[s11]: https://sky.coflnet.com/crafts
[s12]: https://www.bazaartracker.com/crafts/
[s13]: https://api.hypixel.net/#tag/SkyBlock/operation/getSkyblockBazaar
[s14]: https://www.skyblocktracker.com/crafting
[s15]: https://sky.coflnet.com/
[s16]: https://skyah.net/
[s17]: https://skyflip.bz/
[s18]: https://sky.coflnet.com/wiki/flip-finders
[s19]: https://sky.coflnet.com/flipper
[s20]: https://skykings.net/tools
[s21]: https://bzflipper.com/
[s22]: https://hypixelskyblock.minecraft.wiki/w/Auction_House
[s23]: https://sky-commands.coflnet.com/guides/avoid-taxes-and-losses
[s24]: https://sky.coflnet.com/guides/how-to-flip
[s25]: https://www.pixelstats.net/prices
[s26]: https://sky.coflnet.com/wiki/mod
[s27]: https://support.hypixel.net/hc/en-us/articles/4508088842898-Hypixel-SkyBlock-Rules
[s28]: https://skycofl.com/home.html
[s29]: https://hypixelskyblock.minecraft.wiki/w/Tutorial%3AMining_Guide
[s30]: https://hypixel.net/threads/updated-hypixel-skyblock-beginner-guide-2026-%E2%80%93-level-0%E2%80%9315-qol-progression.6054057/
[s31]: https://hypixelskyblock.minecraft.wiki/w/Farming_Fortune
[s32]: https://support.hypixel.net/hc/en-us/articles/360019646539-How-to-Join-the-Official-Hypixel-Discord
[s33]: https://notenoughcoins.net/guides
[s34]: https://hypixel.net/forums/skyblock-patch-notes.158/
[s35]: https://modrinth.com/project/skyhanni
[s36]: https://sky.coflnet.com/guides/money-making-methods
[s37]: https://www.curseforge.com/minecraft/mc-mods/skycofl
[s38]: https://hypixelskyblock.minecraft.wiki/Bazaar
[s39]: https://modrinth.com/mod/skycofl
[s40]: https://skyblock.tools/bazaar/
[s41]: https://hypixel.net/threads/skyblock-bazaar-logger-keep-track-of-what-you-buy-and-sell-on-the-bazaar.5281361/
