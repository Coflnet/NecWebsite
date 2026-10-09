# Hypixel SkyBlock sourcing

- Use only the current Hypixel SkyBlock Wiki (`hypixelskyblock.minecraft.wiki`) or directly relevant YouTube videos for factual research and editorial citations.
- Do not use or cite the Fandom wiki.
- If the allowed sources are missing, stale, or contradictory, stop and ask the user to verify the information directly instead of inferring a definitive answer.
- Describe provenance neutrally in published copy. Do not mention that a source or detail came from the user's prompt or request.

# Adding a guide

- A feature image is mandatory for every new guide in `src/content/guides`, and `npm run build` enforces it: `scripts/verify-guide-featured-images.mjs` fails the build unless `featuredImage` declares `src`, `alt`, `width`, and `height`, the master exists under `public/static/guides`, and the declared dimensions match the file.
- Create the image with `generate-post-images`, `ask-images`, and `npm run image:feature`; see `docs/FEATURE_IMAGE_STYLE_GUIDE.md`.
- Never add a slug to `scripts/legacy-guides-without-featured-image.mjs`. That allowlist covers guides that predate the check and may only shrink.
