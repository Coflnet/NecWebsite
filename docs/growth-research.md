# NotEnoughCoins: grow qualified readers and tool referrals

Prioritize existing-guide improvements and creator demonstrations before building more generic flipping pages. Success means new readers who use a guide and follow its relevant tool link—not downloads of the discontinued paid mod.

## Evidence and audience

Research snapshot: 28 October 2026. Recommendations below are experiments, not traffic forecasts. Difficulty is a qualitative estimate from visible competing products, not measured keyword volume or Google positions.

**Evidence limits:** Google queries including [`NotEnoughCoins mod flipping`](https://www.google.com/search?q=NotEnoughCoins+mod+flipping) and [`skyblock bazaar flip calculator`](https://www.google.com/search?q=skyblock+bazaar+flip+calculator) exposed no result listings. [Reddit search](https://www.reddit.com/r/HypixelSkyblock/search/?q=bazaar%20flipping&restrict_sr=1&sort=relevance&t=year) returned 403; TikTok exposed only a landing page. No readable Discord discussions or AI-assistant answers were observed. Therefore ranking, recommendation frequency, backlinks and community demand remain unverified; the table explains competitive strengths, not proven ranking causes. Validate these surfaces manually before committing a larger budget.

- **Product boundary:** the [homepage source](../src/pages/index.astro) describes NEC as an active guide hub and the paid mod as discontinued. It links to SkyCofl auction, bazaar, craft, historical-sale and alert workflows. These are linked services, not NEC-owned datasets or newly verified integrations.
- **Existing coverage:** [guide library](../src/content/guides/) already covers first 50M, bazaar, AH, crafts, BIN sniping, passive orders, market risk, farming, mining and tool comparisons. Update the relevant owner instead of publishing another broad guide.
- **Pain → audience:** choosing a first method → low-bankroll beginners; evaluating spreads and exits → occasional traders; comparing item variants → AH flippers; avoiding stale advice → returning players. Adjacent acquisition hypotheses: farmers/miners selling their output, recipe crafters, and creators answering repeated price questions. Test these segments separately.

| Observed surface | Competitive strength; opening to test |
|---|---|
| [BazaarTracker](https://bazaartracker.com/) displays smart flips, margins, demand, crafts, item search and explanatory sections; advertises twice-minute updates | Matches both “find an item” and “learn how” intent. NEC needs a useful decision beside a live-tool link, not another static best-items list. No refresh accuracy independently verified. |
| [Skyblock.bz](https://skyblock.bz/) offers flip/craft/NPC lists and a guided start advertising stable, high-volume picks | Low-friction next action. Differentiate through documented rejected trades and actual outcomes; do not claim competitors lack risk guidance. |
| [BazaarPro features](https://pro.skyblock.bz/features) advertises risk scores, historical auctions, manipulation insights, alerts and public calculators | Broad tool depth raises difficulty for “flip calculator.” A generic calculator alone is insufficient; test a worked session and explicit invalidation rules. |
| [SkyCofl flipper](https://sky.coflnet.com/flipper) exposes filters, estimated profit, item attributes and volume; [item page](https://sky.coflnet.com/item/ENCHANTED_DIAMOND) exposes price FAQs | Contextual deep links can move readers from explanation to inspection. Estimates are not realized earnings; verify data access and reuse terms before proposing exports. |
| YouTube discovery returned zCas’s [“I Learned How to Bazaar Flip”](https://www.youtube.com/watch?v=Ad5-2g7V2uk), ItsWoli’s [bazaar tutorial](https://www.youtube.com/watch?v=I3YfsKVR4HE), and HellCastle & Tylerrrr’s [AI-learning format](https://www.youtube.com/watch?v=AANz7mcTmTU) | Titles show tutorial and experiment packaging. These are discovery metadata observations, not verified video claims, recommendation positions or evidence of audience size. Test visible decisions and outcomes rather than unsupported earnings hooks. |

## Search opportunities, ranked by expected qualified users per effort

Effort estimates are planning assumptions: S = 1–2 editorial days; M = 3–5 days; L = engineering/data work requiring separate scoping. Ranking favors existing assets and relevant visitors, not the largest theoretical audience.

| Priority / exact query | Intent; difficulty / opportunity | Exact proposed title and outline; destination |
|---|---|---|
| 1. `why are my bazaar orders not filling` | Troubleshooting; medium / strong fit with demand tables above; S | **Why Are My Bazaar Orders Not Filling?** Add to existing passive-orders guide: diagnose price position → inspect demand → cap exposure → cancellation decision → timestamped outcome. |
| 2. `skyblock flipping margin vs volume` | Avoid a bad trade; medium / decision gap; S | **Margin vs Volume: Which Flip Would You Reject?** Refresh market-literacy guide: compare two candidates → record rejection → follow exit → show loss as well as gain. Link directly to matching live views. |
| 3. `hypixel skyblock flipping tools` | Tool selection; high / qualified referral intent; S | **Which SkyBlock Flipping Tool Fits Your Task?** Refresh comparison: task → public/paid access → supported filters → example → dated verification. Compete on selection clarity, not untested superiority claims. |
| 4. `skyblock auction flip not selling` | Exit troubleshooting; medium / narrower than AH flipping; M | **Why Is My Auction Flip Not Selling?** Expand AH guide: compare item attributes → historical-sale context → asking price versus sale evidence → re-evaluate. Use SkyCofl fields observed above. |
| 5. `skyblock money making with 1m coins` | Beginner progression; high / broad reach hypothesis; M | **Your First 50M: A 1M Starting-Budget Route** Add a section to first-50M guide: unlocks → budget allocation → measured session → failed attempts → next step. No promised return. |
| 6. `skyblock craft flip profit after costs` | Validate a recipe; medium–high / existing craft tools compete; M | **Does This Craft Flip Still Pay After Costs?** Refresh craft guide: dated ingredients → applicable fees → execution time → sale result → break-even. Verify mechanics with the current wiki and prices with `skyprice` before publishing. |

For every refresh: preserve its canonical owner, answer the query immediately, add one measured example and a “when this fails” section, and link from its closest related guide. Dates must reflect actual rechecking. Do not add year-only duplicates.

## Social and distribution experiments

| Channel | Concrete action and destination | Evidence / validation |
|---|---|---|
| YouTube creator partnership | Pitch zCas or ItsWoli **“Three attractive flips, one rejected: watch the decision.”** Offer a sourced worksheet and review copy, with disclosure for any payment. Description links to market-literacy guide. | Relevant tutorial titles above; manually verify creator fit and recent engagement before outreach. |
| YouTube Shorts; TikTok adaptation | Produce **“Good spread, no exit?”**: show candidate → demand check → reject/accept → later result. Pin the passive-orders guide; use a channel-specific landing link where supported. | Derived from competing demand/risk interfaces; TikTok distribution is unverified. Pilot three clips, including a failed trade. |
| r/HypixelSkyblock; Hypixel SkyBlock Community Help forum | After checking current rules, answer an actual order-fill question with a small diagnostic checklist. Include a link only when allowed and useful; disclose affiliation. | Target communities to validate, not observed thread demand. Collect repeated questions before creating a recurring series. |
| SkyCofl Discord support; creator Discords | Ask moderators about a **“Why did this flip fail?”** clinic using anonymized, voluntarily supplied trades. Publish the useful answer publicly and link it in an approved resource channel. | Existing linked tool workflow supports the fit; server access, rules and demand still need verification. No unsolicited DMs. |

## Higher-effort bets and measurement

- **Embeddable decision card:** pilot a timestamped “margin / volume / why rejected” card with one tutorial creator. BazaarTracker’s tables and BazaarPro’s risk tools establish the format; shareability and referral gains remain hypotheses. Require approved data reuse, attribution and stale-data handling.
- **Programmatic pages:** trial five item-specific decision explanations only after confirming lawful data access. SkyCofl already has item-price FAQs; avoid cloning them. Each page needs unique analysis, sourced mechanics, dated inputs and a clear maintenance owner. Stop expansion if pages add no distinct value.
- **Integration/listing:** propose a guide deep link alongside an appropriate SkyCofl help surface. Validate a moderator-approved resource listing before generic launch sites; the current product is a guide hub, not a new downloadable mod.
- **Measure:** establish a baseline, then compare matched 28-day periods: non-brand search clicks, engaged guide visits, outbound tool clicks and returning readers. Tag creator/channel links; coordinate downstream attribution with the destination owner. Scale experiments that improve qualified referrals per production hour; revise those generating views without useful actions.

## Top 10 actions

1. Verify missing search/community evidence and record exact queries, result URLs and observation dates.
2. Establish guide-to-tool referral measurement and a baseline.
3. Refresh passive orders around order-fill diagnosis.
4. Add a measured accept/reject comparison to market literacy.
5. Recheck and simplify the existing tool comparison by user task.
6. Add auction-exit troubleshooting to the AH guide.
7. Pitch one verified tutorial creator a decision-demo collaboration.
8. Test three Shorts; adapt the strongest to TikTok.
9. Validate community rules and answer five relevant questions before proposing a clinic.
10. Review referral efficiency; fund one embed/data-page pilot only after demand and data access are confirmed.
