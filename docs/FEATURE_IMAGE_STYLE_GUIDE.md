# NotEnoughCoins SkyBlock feature-image guide

This guide records the art direction, source hierarchy, prompt structure, and rejected patterns for SkyBlock article images. It is intentionally strict about game accuracy: a visually polished image is not acceptable if the location, menu geometry, or item category is wrong.

## Default direction

Use one of two related styles:

1. **Minecraft animation frame — chosen default.** Use a cinematic character scene that retains standard Minecraft cuboid anatomy, verified SkyBlock architecture, pixel textures, and exact resource-pack item references. Prefer a physical action over generated UI.
2. **Current-client composite — exact-UI exception.** Use a real, recognizable current SkyBlock location with moderate background blur and an official flat game UI composited in the foreground. Only use this when the actual UI capture can be preserved exactly.

Do not return to generic glossy voxel concept art. The image should read as Minecraft/SkyBlock before it reads as fantasy artwork.

Do not add a decorative taskbar, hotbar, inventory, tooltip, or menu to an animation-frame image. Generated UI was the main accuracy failure in the first Loadouts sample. If UI is not essential to the story, omit it entirely.

## Sources of truth

Use sources in this order:

1. The current official Hypixel SkyBlock resource pack cached by the game client.
2. Official Hypixel update screenshots/GIFs for the exact feature being illustrated.
3. Official Hypixel screenshots of the current location.
4. In-game screenshots from the current client, when available.

Relevant official references for the 0.26 image set:

- [0.26 release post: resource pack and Loadouts](https://hypixel.net/threads/hypixel-skyblock-0-26-skyblock-resource-pack-loadouts-security-quest-and-more.6117801/)
- [January 30, 2026 Hub Revamp Alpha](https://hypixel.net/threads/january-30-hub-revamp-alpha.6053863/)
- [July 15, 2026 0.26.1 Release Candidate](https://hypixel.net/threads/july-15-0-26-1-release-candidate.6114430/)
- [May 14, 2026 Harvest Feast changes](https://hypixel.net/threads/may-14-harvest-feast-changes.6096831/)
- [Hypixel SkyBlock 0.25 — Lotus Atoll](https://hypixel.net/threads/hypixel-skyblock-0-25-lotus-atoll.6100264/)
- [SkyBlock 0.22 — Backwater Bayou, ships, rod parts, and hotspots](https://wiki.hypixel.net/SkyBlock_Version/5863219)
- [Official Fishing Outpost location reference](https://wiki.hypixel.net/Fishing_Outpost)
- [Official Backwater Bayou location reference](https://wiki.hypixel.net/Backwater_Bayou)
- [Official Bazaar Agent reference](https://wiki.hypixel.net/Bazaar_Agent)
- [Official Bazaar Alley reference](https://wiki.hypixel.net/Bazaar_Alley)
- [Official Garden release reference](https://wiki.hypixel.net/SkyBlock_Version/5273460)
- Official 2026 Hub attachment: `new_hub_1-jpg.3538095`
- Official Loadouts animation: `loadouts-gif.3589204`
- Official Edit Loadout image: `edit-loadout-png.3589229`
- Official resource-pack sprite gallery: `gallery-png.3589242`

For Prism Launcher, find the latest downloaded pack by reading:

```text
~/.local/share/PrismLauncher/instances/<instance>/minecraft/downloads/log.json
```

Choose the newest `resourcepacks.hypixel.net/SkyBlock/...` entry and inspect that archive. Do not hardcode a content hash into future automation because Hypixel updates the pack frequently.

The pack's bundled `LICENSE` allows Hypixel-related websites, guides, screenshots, thumbnails, and similar creator content to show the pack. Do not imply Hypixel endorsement or sell access to the assets.

## Non-negotiable accuracy rules

- **Current Hub only.** The 2020 Hub renders are not valid references for 2026 articles. For this series, use the January 2026 skill-district Hub with the purple fountain, copper roofs, cyan skill emblem, and modern blocks.
- **Inventory geometry must be exact.** The Loadouts interface is a standard nine-column by six-row chest menu: 54 square slots. Never generate a five-column, seven-column, or freeform equipment grid.
- **Loadouts do not save weapons.** They save four armor pieces, four equipment pieces, pet, accessory power, tuning, Heart of the Mountain, and Heart of the Forest. Weapon/tool sprites may appear in a separate hotbar or resource-pack strip, never as saved Loadout slots.
- **Do not invent pack-native armor or pets.** Hypixel's 0.26 release notes explicitly say custom armor and pet textures are planned for the future. Use the armor/equipment shown in the official Loadouts screenshots until the pack actually gains those assets.
- **Never use `pack.png` as editorial art.** The framed floating-island landscape is only the pack selector icon. It is non-representative and must not appear as a painting, wall decoration, tile, portal, or dominant feature.
- **Use exact pack sprites as references.** Preserve 16-pixel silhouettes, palette placement, and hard nearest-neighbor edges. Do not turn the sprites into generic high-detail fantasy weapons.
- **Keep article-specific wardrobes isolated.** The half-green/half-cyan armor transition belongs only to the selected Loadouts hero. Never reuse that outfit, its magenta gem accents, or its split palette as a general style cue. Outside the Loadouts article, specify practical clothing or article-accurate armor explicitly. If the Loadouts hero is used to calibrate lighting or materials, state that it is not an outfit reference and reject any inherited transition armor.
- **No generic locations.** Wardrobe rooms, castles, dungeons, or abstract voids are not acceptable unless the article is specifically about that location.
- **No old-Hub substitutions.** If a current location cannot be verified, use a neutral blurred Minecraft background and keep the UI dominant instead of guessing.

## Composition system

- Canvas: `1672 × 941` or another true 16:9 landscape size.
- Safe area: keep the main UI/character within the central 80% so responsive crops retain the subject.
- Background: recognizable current SkyBlock location, moderately blurred for menu-led images.
- Foreground: one clear story—normally one UI panel or one armor-swap action.
- Pixel treatment: nearest-neighbor edges for sprites and UI; no smoothing or vector redraw.
- Lighting: inherit the location's natural lighting. Animation variants may add restrained cinematic light but must not obscure block textures.
- Text: prefer exact text copied from an official UI reference. Do not ask the model to invent labels or stats.
- Effects: subtle enchantment glint is acceptable; neon holograms, excessive bloom, and particle clutter are not.

## Selected live set

- `/static/guides/hypixel-skyblock-0-26-0-update.webp`: Loadouts; a UI-free green-to-cyan armor transformation in the 2026 Hub.
- `/static/guides/hypixel-skyblock-combat-trends-july-2026.webp`: Combat Trends; coordinated Hyperion/Terminator combat in Kuudra's Hollow.
- `/static/guides/hypixel-skyblock-0-26-1-alpha.webp`: 0.26.1 update; the four-set Farmhand, Haymaker, Sprout, and Tater progression on armor stands in the Garden.
- `/static/guides/hypixel-skyblock-farming-trends-july-2026.webp`: Farming Trends; the selected pest-plus-Feast farming loop in the Garden.
- `/static/guides/post-lotus-atoll-economy-recap.webp`: Post-Lotus economy; four Trophy Frog rarity medallions beside the Lotus pond.
- `/static/guides/new-fishing-island-guide-2026.webp`: New Fishing Island; a fishing ship moored at the vine-covered Backwater Bayou below its red chimney towers.
- `/static/guides/hypixel-skyblock-trends-june-2026.webp`: June Trends; the approved Fishing Outpost ship-repair scene supplied as the preferred replacement.

All sample directories were removed from the project after selection. Historical candidates are rejected references only. In particular, never reuse generated taskbars, inaccurate inventory grids, generic islands, the `pack.png` painting, or the Loadouts-only split cyan/green armor outside the Loadouts article.

## Generation workflow

1. Verify the article's date, feature, and current location.
2. Extract current official pack sprites; never use `pack.png` as a content reference.
3. Download official feature UI/screenshots and label each input role explicitly.
4. Use the built-in image generator with one call per distinct style.
5. Validate the output against the hard rules above.
6. For exact UI work, composite the official UI capture after generation if the model changes slot count, spacing, or text.
7. Keep unapproved generator output outside `public/static/guides`; do not replace a live asset during candidate review.
8. After approval, run `npm run image:feature -- /absolute/path/to/generated-image.png article-slug`. Add `--force` only when intentionally replacing an existing approved image.
9. Verify the generated master, update the article frontmatter, then run `npm run build`; the build creates and verifies all responsive derivatives.

### Compression and responsive-output contract

The `image:feature` command is the only supported promotion path from generated artwork to a live feature image. It performs the following steps consistently:

- auto-rotates the input and uses attention-aware cropping to normalize it to the required `1672 × 941` composition;
- flattens transparency against the site's dark background so the encoder does not retain an unnecessary alpha channel;
- writes the social/Discord master as `<article-slug>.webp` at WebP quality 75 with encoder effort 6;
- refuses to overwrite an approved image unless `--force` is supplied;
- rejects inputs below `1280 × 720`, preventing low-resolution generator output from being upscaled silently.

Only the compressed master is committed. The development and production prebuild step runs `scripts/generate-responsive-images.mjs`, producing ignored `640`, `960`, and `1280` pixel derivatives at WebP quality 65 with encoder effort 6. These output widths must stay synchronized with the `srcset` widths in `src/layouts/GuideLayout.astro`. The full-size master remains the Open Graph image; browsers select the generated variants for the visible article image.

Guide images use ordinary Git rather than Git LFS, avoiding a GitHub bandwidth dependency in Cloudflare Pages. The reproducible derivatives are excluded from Git and rebuilt from the seven masters on every deployment. The `prebuild` image-signature check stops deployment if any generated output is invalid.

## Recorded prompts

The following prompts produced the current three candidates. Keep the accuracy clauses intact when adapting the subject.

### 01 — current-client composite

```text
Use case: compositing
Asset type: revised 16:9 blog feature-image style sample
Input images: Image 1 is the edit-target background and is the official January 2026 Hypixel SkyBlock Hub; Image 2 is the official July 2026 Loadouts screen; Image 3 is the official 9-column by 6-row Edit Loadout screen; Image 4 is the official resource-pack sprite gallery. Do not use or invent any other reference image.
Primary request: Create an authentic current-client SkyBlock screenshot composition: preserve the recognizable architecture and sunset colors of Image 1, apply a moderate depth-of-field blur to the Hub only, then place the Loadouts interface from Images 2 and 3 flat and front-facing in the foreground as if the player opened it in-game.
Inventory accuracy: the interface must remain a standard 9-column by 6-row Minecraft chest inventory. Preserve the official slot count, square slot proportions, row spacing, item placement logic, pixel font, and armor/equipment appearance from Images 2 and 3. Do not add weapon slots because Loadouts do not save weapons.
Resource-pack treatment: use Image 4 only for a small accurate hotbar/item-sprite accent outside the Loadout menu; keep the official 16x sprite silhouettes and nearest-neighbor pixel edges.
Composition/framing: wide 16:9, familiar 2026 Hub visible around the blurred edges, large readable interface centered within the safe area.
Constraints: no framed landscape image, no floating-island painting, no resource-pack cover art, no generic room, no invented UI, no extra armor design, no watermark.
Avoid: old 2020 Hub, fantasy voxel concept art, rounded blocks, neon holograms, fake inventory dimensions, smooth vector icons.
```

### 02 — Minecraft animation frame

```text
Use case: stylized-concept
Asset type: revised 16:9 blog feature-image style sample
Input images: Image 1 is the official January 2026 Hypixel SkyBlock Hub and must anchor the location; Images 2 and 3 show the official July 2026 Loadouts UI and its real armor/equipment; Image 4 is the official resource-pack sprite gallery. Do not use or invent any other reference image.
Primary request: Create a polished Minecraft animation frame set unmistakably in the 2026 SkyBlock Hub from Image 1. A standard-proportioned blocky player changes between two saved armor sets beside the purple Hub fountain while a faithful flat Loadouts panel appears beside them.
Style/medium: premium Minecraft animation style—strict cuboid character anatomy, pixel-textured blocks and equipment, clean cinematic posing, soft animation-film lighting, not generic voxel concept art.
Armor accuracy: armor and equipment must be based on the actual Divan/Fermento-style icons and colors visible in Images 2 and 3. Hypixel's current pack has no custom armor textures, so do not invent pack-native armor or redesign armor from weapon sprites.
Inventory accuracy: any visible menu is a flat, front-facing 9-column by 6-row chest UI based on Images 2 and 3; keep it secondary and do not distort its grid.
Resource-pack treatment: faithfully use a few weapon/tool sprites from Image 4 as separate hotbar accents, never as armor and never as saved Loadout slots.
Composition/framing: wide 16:9, player and fountain central, recognizable Hub roofs and cyan skill emblem behind, essential subjects in central safe area.
Constraints: no framed landscape image, no floating-island painting, no resource-pack cover art, no generic wardrobe room, no text added beyond faithfully copied UI, no watermark.
Avoid: old 2020 Hub, freeform voxel sculpture, plastic toy look, neon sci-fi, invented armor, fake slot counts.
```

### 03 — pixel editorial

```text
Use case: compositing
Asset type: revised 16:9 blog feature-image style sample
Input images: Image 1 is the official January 2026 Hypixel SkyBlock Hub; Image 2 is the official July 2026 Loadouts screen; Image 3 is the official 9-column by 6-row Edit Loadout screen; Image 4 is the official resource-pack sprite gallery. Do not use or invent any other reference image.
Primary request: Build a crisp 2D Minecraft pixel-editorial composition: a strongly blurred and darkened crop of the familiar 2026 Hub from Image 1 forms the backdrop; the exact flat Loadouts menu from Images 2 and 3 is the dominant foreground element; a restrained row of official resource-pack item sprites from Image 4 shows the pack update as a separate supporting feature.
Style/medium: authentic Minecraft pixel UI and 16x sprite art enlarged with nearest-neighbor edges, editorial hierarchy through spacing and contrast only.
Inventory accuracy: preserve the standard 9-column by 6-row chest menu exactly; square slots, six rows, nine columns, accurate armor/equipment positions and official UI proportions. Loadouts do not contain weapons; keep resource-pack sprites in their own separate strip.
Composition/framing: wide 16:9, menu centered slightly left, item-sprite strip low and separate, enough Hub architecture visible to identify the 2026 Village.
Color palette: use the actual gray UI, navy tooltip, colored rarity accents and warm 2026 Hub sunset.
Constraints: no framed landscape image, no floating-island painting, no resource-pack cover art, no invented words, no anti-aliased sprites, no watermark.
Avoid: fake dashboard UI, glassmorphism, 3D inventory panels, generic fantasy art, old 2020 Hub, distorted grid dimensions.
```

## Selected Loadouts image prompt

The live Loadouts image deliberately removes the inaccurate taskbar and tells the story through the armor transition alone.

~~~text
Use case: stylized-concept
Asset type: 16:9 editorial blog feature image
Input images: Image 1 is the chosen visual-style and character-rendering anchor; Image 2 is the exact January 2026 Hypixel SkyBlock Hub location reference; Image 3 is an equipment/loadout-content reference only; Image 4 is the official resource-pack item-sprite palette reference only.
Primary request: Create a fresh derivative of Image 1 in the same polished cinematic Minecraft animation-frame style. This is a new composition, not a literal edit.
Scene/backdrop: the recognizable 2026 Hypixel SkyBlock Hub plaza, with its stone plaza, purple crystal fountain, copper-orange roofs, timber buildings, and cyan skill emblem. Preserve these landmark cues from Image 2, with gentle depth-of-field blur but enough geometry to remain recognizable.
Style/medium: premium Minecraft animation frame; square pixels, crisp block textures, cinematic soft shadows and bloom, physically coherent block lighting. Standard Minecraft cuboid anatomy only: rectangular head, torso, arms, legs, square hands and feet. No rounded toy-like voxel anatomy.
Color palette: purple crystal glow, warm copper roofs, gray stone, cyan accents, dusk sky.
Materials/textures: faithful pixel-textured blocks and equipment; use Image 3 only to guide plausible armor/equipment colors and Image 4 only for small pack-style item accents.
Composition/framing: wide 16:9 header, subject matter inside the central 80% safe area, readable at thumbnail size.
Constraints: prioritize a clear loadout-switching story over exact in-game UI. No UI, taskbar, hotbar, inventory, text, logos, labels, watermark, arrows, or captions. Do not place resource-pack item sprites onto worn armor. No weapon-saving implication.
Subject: one centered blocky player caught mid-loadout swap in a dynamic but physically readable pose. Green armor pieces are transitioning into cyan-blue armor as separated cuboid helmet, chestplate, leggings, and boots orbit in a clean semicircle around the player. Show only armor and a tiny pet/equipment charm as the changing loadout elements; no weapons.
Composition/framing: medium full-body symmetrical composition in front of the purple fountain; use the orbiting equipment to form a clear circular motion, with no arrows and no UI.
Lighting/mood: energetic magical transition, restrained purple and cyan particles, cinematic dusk, crisp subject silhouette.
Avoid: any framed picture, landscape painting, floating-island painting, or the resource-pack cover; any large inventory grid; malformed slot grids; generic indoor room; old Hub architecture; neon sci-fi; rounded/plastic voxel forms.
~~~

## Combat candidate prompt set

All four combat candidates used the following shared base. Append exactly one variant block to create a derivative while preserving the house style.

~~~text
Use case: stylized-concept
Asset type: 16:9 editorial blog feature image for a Hypixel SkyBlock combat-trends report
Input images: Image 1 is the chosen visual-style anchor; Image 2 is the official resource-pack Hyperion sprite and exact weapon-color/silhouette reference; Image 3 is the official resource-pack Terminator sprite and exact weapon-color/silhouette reference; Image 4 is the official resource-pack Midas Sword sprite and exact weapon-color/silhouette reference.
Primary request: Create a fresh combat-update feature-image candidate in the same premium cinematic Minecraft animation-frame style as Image 1.
Style/medium: high-end Minecraft animation frame, crisp pixel textures, cinematic soft shadows, restrained bloom, square pixels, physically coherent block lighting. Every player must use standard Minecraft cuboid anatomy: rectangular head, torso, arms, legs, square hands and feet; no fingers, curves, or rounded toy-like voxel forms.
Composition/framing: wide 16:9 blog header; all important subjects inside the central 80% safe area; one clear focal story readable at thumbnail size; no text.
Weapon fidelity: Hyperion must retain Image 2's compact cyan-and-black pixel-sword silhouette; Terminator must retain Image 3's compact dark violet/black shortbow silhouette; Midas Sword must retain Image 4's small gold pixel-sword silhouette. Do not inflate any weapon into a giant fantasy prop.
Constraints: no UI, taskbar, hotbar, inventory, charts, labels, logos, watermark, floating panels, or readable text. No framed picture, landscape painting, floating-island painting, or resource-pack cover. No generic sci-fi room, photoreal humans, rounded plastic voxel style, malformed anatomy, giant decorative dragon, or unrelated items.
~~~

### Combat 01 — the big two

~~~text
Variant concept — The big two:
Scene/backdrop: a recognizable dark Catacombs stone chamber with block arches, cracked stone-brick floor, subtle wither-blue particles, and a distant red boss doorway.
Subject: two blocky endgame players advancing as a coordinated duo. The nearer player activates a compact Hyperion with a short cyan spatial burst and protective circular shield; the second player aims a compact Terminator and fires exactly three thin violet arrows toward distant blocky dungeon mobs.
Composition/framing: dynamic low three-quarter camera, both full figures visible, Hyperion and Terminator equally legible, clear diagonal action but uncluttered.
Lighting/mood: cool cyan and violet ability light against warm dungeon torches; confident, enduring-meta hero image.
~~~

### Combat 02 — Golden Dragon rework

~~~text
Variant concept — Golden Dragon rework:
Scene/backdrop: the 2026 SkyBlock Hub plaza from Image 1 at dusk, including the purple fountain and copper-roof buildings, softly blurred but recognizable.
Subject: one blocky player in refined dark armor holds the small official-style Midas Sword from Image 4. A small cube-headed Golden Dragon combat pet, only about one third the player's height, floats beside the player's shoulder with tiny block wings. On two low stone plinths behind them rest the compact Hyperion and Terminator, showing that the established pair remains present.
Composition/framing: medium-wide centered editorial portrait; player and small pet are the focus, the two background weapons are secondary and not oversized.
Lighting/mood: restrained warm gold aura around pet and Midas Sword, cyan and violet accents behind; thoughtful balance-update atmosphere, not a battle.
Constraints addition: the Golden Dragon is a small companion pet, never a huge dragon or scenery element.
~~~

### Combat 03 — Kuudra money meta

~~~text
Variant concept — Kuudra money meta:
Scene/backdrop: Kuudra's Hollow, a circular blackstone-and-quartz combat platform surrounded by orange lava, block-built ballista in the middle distance, red cavern walls, smoke and embers. A huge red magma-cube-like lava kraken rises partially from the lava with several clearly cuboid tentacles; keep the boss in the background.
Subject: a coordinated pair of blocky players in crimson-and-black armor fighting from the platform. One fires exactly three violet shots from the compact Terminator; the other uses the compact cyan Hyperion to create a short-range cyan implosion shield. A small reward chest sits closed near the platform edge.
Composition/framing: wide action shot from platform level, players foreground, boss and ballista readable behind, strong depth without clutter.
Lighting/mood: intense lava orange contrasted by cyan and violet weapon effects; cinematic team execution.
~~~

### Combat 04 — meta crossroads

~~~text
Variant concept — Meta crossroads:
Scene/backdrop: a textless split-environment created as one coherent Minecraft world: dark Catacombs arches on one side and the lava-lit Kuudra Hollow on the other, joined by a cracked stone bridge.
Subject: one blocky veteran stands centered on the bridge with the compact Hyperion in one hand and compact Terminator in the other, both held low and readable rather than exaggerated. A small Golden Dragon pet floats behind one shoulder. Faint silhouettes of dungeon mobs occupy the Catacombs side and a single cuboid Kuudra tentacle rises far in the lava side.
Composition/framing: symmetrical full-body hero shot, central subject within safe area, environments clearly differentiated but secondary.
Lighting/mood: cyan-violet cool light from the dungeon side, orange-gold light from Kuudra side, polished cinematic animation finish.
Constraints addition: the Golden Dragon remains a small cube-headed companion pet about one third player height; no giant dragon.
~~~

## Selected 0.26.1 farming-progression prompt

The second regenerated farming candidate was selected. It represents the live update's renamed farming-armor progression and deliberately isolates each set into one coherent palette.

~~~text
Use case: stylized-concept
Asset type: 16:9 editorial blog feature image for the Hypixel SkyBlock 0.26.1 update article.
Input images: Image 1 is a rendering-quality anchor only; Image 2 is the official Garden location reference; Image 3 is the official resource-pack Rookie Hoe sprite and exact compact tool-silhouette reference.
Primary request: Create a premium Minecraft animation frame showing the exact Farming Armor progression rebuild.
Scene/backdrop: a recognizable SkyBlock Garden path beside the central barn and four crop beds, rebuilt entirely from crisp Minecraft blocks under warm morning light.
Subject: exactly one curator-farmer wearing a cream shirt and brown vest stands beside exactly four separate standard Minecraft armor stands. The stands show, from left to right: Farmhand in muted gray-brown; Haymaker in wheat-gold with a literal cube hay-bale helmet; Sprout in solid leaf green; and Tater in solid earthy potato-brown. The curator holds the compact Rookie Hoe.
Critical wardrobe rule: every armor set uses one solid, distinct material palette. No cyan, no split colors, no merged-color armor, no magenta gems, no glowing armor, and no armor on the living curator.
Style/medium: premium cinematic Minecraft animation frame, strict cuboid anatomy, square pixel textures, coherent block lighting, restrained bloom.
Composition/framing: wide 16:9 header; curator and all four stands visible inside the central 80% safe area; clear at thumbnail size.
Constraints: no UI, taskbar, hotbar, inventory, tooltip, text, labels, logo, watermark, `pack.png`, floating-island painting, Loadouts armor, fantasy equipment, extra people, or extra armor stands.
~~~

## Farming Trends selected prompt

Candidate 01 was selected and is live. The prompt below includes the new wardrobe-isolation clause so future derivatives preserve the chosen scene without copying the Loadouts costume.

~~~text
Use case: stylized-concept
Asset type: 16:9 editorial blog feature image for “Latest Hypixel SkyBlock Farming Trends (July 2026)”
Input images: Image 1 is the approved Minecraft-animation lighting, pixel-material, and rendering-quality anchor only; it is not an outfit or armor reference. Image 2 is Hypixel’s official Garden panorama and is a location/set-dressing reference only. Image 3 is the official Hypixel resource-pack InfiniVacuum Hooverius sprite and the exact compact tool-color/silhouette reference. Rebuild the Garden from Minecraft blocks; do not copy Image 2’s illustrated people or title lettering.
Primary request: Create a fresh feature-image candidate in the established premium cinematic Minecraft animation-frame style.
Scene/backdrop: the recognizable SkyBlock Garden central barn and crop plots, rebuilt with crisp Minecraft blocks: warm timber barn, stone paths, irrigated wheat and carrot rows, hay bales, hedges, and open blue sky.
Subject: one standard-proportioned blocky farmer in cohesive practical farm clothes strides through a wheat row while using the compact red-gray InfiniVacuum to pull exactly one small cube-bodied field-mouse pest out of the crops. The defeated pest releases a restrained handful of bright rare-crop drops and ordinary crop drops into the same short arc, visually showing two reward streams from one action. Keep every reward as a small 16x-style pixel item.
Style/medium: high-end Minecraft animation frame; crisp square pixel textures, cinematic soft shadows, restrained bloom, physically coherent block lighting. Standard Minecraft cuboid anatomy only: rectangular head, torso, arms and legs, square hands and feet.
Composition/framing: wide 16:9 blog header, dynamic low three-quarter camera along the crop row, farmer central, barn softly recognizable behind, all important subjects inside the central 80% safe area.
Lighting/mood: energetic golden morning, fresh green and wheat-gold palette, restrained magenta-green rare-crop sparkles.
Constraints: no half-green/half-cyan armor, transition armor, magenta armor gems, UI, taskbar, hotbar, inventory, tooltip, chart, labels, text, logos, watermark, arrows, captions, painting, resource-pack cover, giant props, extra characters, or unrelated items. Do not turn the compact vacuum into a gun or oversized machine.
~~~

## Post-Lotus Economy candidate prompt set

All four candidates use the following base. The first generation inherited the Loadouts transition armor; the production files therefore received the clothing-only correction recorded below.

~~~text
Use case: stylized-concept
Asset type: 16:9 editorial blog feature image for “Post-Lotus Atoll Economy Recap: What Settled and What Didn’t”
Primary request: Create a fresh feature-image candidate in the established premium cinematic Minecraft animation-frame style.
Style/medium: high-end Minecraft animation frame; crisp square pixel textures, cinematic soft shadows, restrained bloom, physically coherent block lighting. Every person uses standard Minecraft cuboid anatomy: rectangular head, torso, arms and legs, square hands and feet.
Composition/framing: wide 16:9 blog header, all important subjects inside the central 80% safe area, one clear focal story readable at thumbnail size.
Wardrobe isolation: use cohesive practical fishing clothes chosen for this scene. The Loadouts hero is a lighting/material-quality reference only. Do not reuse its half-green/half-cyan armor, magenta gem accents, split palette, or transition motif.
Constraints: no UI, taskbar, hotbar, inventory, tooltip, chart, labels, readable text, logos, watermark, arrows, captions, floating panels, market graph, framed picture, floating-island painting, resource-pack cover, generic tropical island, sci-fi structures, rounded plastic voxels, malformed anatomy, giant fantasy props, or unrelated items.
~~~

### Post-Lotus 01 — after the hype

~~~text
Input images: Image 1 is a rendering-quality anchor only; Image 2 is Hypixel’s official Lotus Atoll location reference and must anchor the pink-blossom cliff architecture; Image 3 is the official Diamond Common Frog sprite; Image 4 is the official Lotus sprite; Image 5 is the official Rod of the Sea sprite.
Scene/backdrop: the unmistakable Lotus Atoll at calm sunset, with steep pale-stone cliffs, hanging green vines, enormous pink blossom trees, reflective water, lily pads, and a small weathered fishing dock.
Subject: one blocky veteran fisher in a weathered dark-brown leather jacket, muted navy waders, tan boots, and a plain brown cap sits at the dock. The compact teal-black rod rests beside them. A palm-sized frog medallion and small lotus item lie next to a closed modest catch basket; no treasure pile.
Composition/framing: quiet medium-wide side view, fisher central, Atoll cliffs and blossoms filling the depth.
Lighting/mood: warm post-hype calm, soft pink reflections, settled and contemplative.
~~~

### Post-Lotus 02 — Trophy Frog equilibrium

~~~text
Input images: Image 1 is a rendering-quality anchor only; Image 2 is Hypixel’s official Lotus Atoll lily-pad location reference; Images 3 and 4 are the official Diamond Common Frog and Gold Exploding Frog sprites; Image 5 is Hypixel’s official Trophy Frogs item screenshot. Reproduce no tooltip or text.
Scene/backdrop: a sheltered Lotus Atoll pond with giant green lily pads, luminous pink lotus blossoms, pale stone banks, vines, and blossom trees.
Subject: one blocky field researcher in a muted olive canvas jacket, charcoal trousers, brown waterproof boots, and plain tan fishing hat kneels at the water. Exactly four palm-sized Trophy Frog medallions—bronze, silver, gold, diamond—rest naturally on four separate stepping stones. A tiny living cube frog watches from one lily pad.
Composition/framing: intimate low-angle editorial close-up with the pond and blossoms layered behind.
Lighting/mood: tranquil dawn with restrained gold and cyan highlights.
Constraints addition: exactly four small medallions; no prices, charts, pedestals, treasure pile, or giant frog.
~~~

### Post-Lotus 03 — ship-parts aftermath

~~~text
Input images: Image 1 is a rendering-quality anchor only; Image 2 is Hypixel’s official Lotus Atoll location reference; Images 3–5 are the official Bronze Ship Engine, Bronze Ship Hull, and Bronze Ship Helm sprites.
Scene/backdrop: a Lotus Atoll dock beneath pink blossom cliffs at late dusk, with a small intact block-built fishing ship moored in calm water.
Subject: one blocky dock worker in a rust-brown canvas coat, cream shirt, dark slate trousers, sturdy brown boots, and plain charcoal knit cap looks at exactly three palm-sized bronze ship-upgrade items laid on a wooden crate: engine, hull, and helm. A second empty crate is open and only a few small gold coin items have spilled beside it.
Composition/framing: cinematic medium-wide dock scene, player and crate central, moored ship and Atoll architecture behind.
Lighting/mood: reflective violet dusk with warm lantern light; aftermath, not disaster.
Constraints addition: no broken boat, fire, graph, falling arrow, bazaar stall, signage, or giant engine.
~~~

### Post-Lotus 04 — second fishing wave

~~~text
Input images: Image 1 is a rendering-quality anchor only; Image 2 is Hypixel’s official Lotus Atoll location reference; Image 3 is the official Rod of the Sea sprite; Image 4 is the official Bronze Ship Engine sprite; Image 5 is the official Diamond Common Frog sprite.
Scene/backdrop: a broad Lotus Atoll inlet at bright morning, with pale cliffs, hanging vines, huge pink blossom trees, lily pads, and a timber dock. A modest bronze-upgraded block-built fishing boat is arriving.
Subject: one blocky veteran in a dark navy fishing jacket, brown waders, tan boots, and plain navy cap walks toward camera with the compact rod and one palm-sized diamond frog medallion. Behind, exactly two newcomers step off the boat in distinct rust/charcoal and gray-blue/brown fishing clothes with ordinary compact rods.
Composition/framing: energetic wide three-quarter shot, veteran central foreground, newcomers and boat layered behind.
Lighting/mood: clear optimistic morning; sustainable second-wave momentum rather than launch-day chaos.
Constraints addition: exactly three people; no crowd, giant frog, giant rods, market stall, currency, or Guardian boss.
~~~

### Post-Lotus clothing-only correction

When a otherwise successful derivative inherits an unrelated outfit, use this edit pattern rather than regenerating the scene:

~~~text
Use case: precise-object-edit
Input images: Image 1 is the edit target.
Primary request: Change only the character clothing. Replace any half-green/half-cyan armor, magenta gem accents, and transition motif with the candidate’s specified cohesive practical fishing outfit, rendered as crisp Minecraft pixel textures with standard cuboid anatomy.
Invariants: preserve identities, poses, scale, body geometry, expressions, hands, held items, camera, crop, lighting, shadows, depth of field, location architecture, water, plants, props, and every other object unchanged. Add or remove nothing.
Constraints: no split clothing, transition armor, magenta armor accents, gemstones on hats, fantasy armor, UI, text, logos, or watermark.
~~~

## Selected New Fishing Island prompt

The fourth evidence-based Backwater Bayou candidate was selected. Gameplay frames were used to confirm the island's dense vines, pink-gray terrain, dock path, red chimney towers, and the ship's relationship to the island.

~~~text
Use case: stylized-concept
Asset type: 16:9 editorial blog feature image for the New Fishing Island Guide.
Input images: Image 1 is a rendering-quality anchor only; Image 2 is a clean official whole-island Backwater Bayou render; Image 3 is a real gameplay arrival frame; Image 4 is the official resource-pack Rusty Ship Engine sprite.
Primary request: Create a premium Minecraft animation frame showing the Backwater Bayou arrival and ship-progression story.
Location fidelity: unmistakably Backwater Bayou—dense hanging vines, huge trees, rough plank paths, shallow water with lily pads, pink-gray mudstone, and the two tall rust-red chimney towers. Absolutely no teal-roof Fishing Outpost, current Hub, generic tropical island, or invented castle.
Scene: a broad three-quarter view of one modest white-gray block-built fishing ship moored at the actual Bayou shoreline. Exactly one mechanic in cohesive dark-brown practical clothing checks a compact rusty engine at the stern before stepping onto the island path.
Style/medium: premium cinematic Minecraft animation frame; strict cuboid anatomy, crisp square pixel textures, coherent block lighting, restrained bloom, atmospheric depth.
Composition/framing: wide 16:9 header; the island remains the dominant recognizable subject, with ship and mechanic inside the central 80% safe area.
Wardrobe isolation: no armor, half-green/half-cyan clothing, merged colors, magenta gems, or Loadouts transition motif.
Constraints: no HUD, video overlays, hotbar, taskbar, inventory, tooltip, text, logo, watermark, `pack.png`, floating-island painting, giant ship parts, extra people, or extra ships.
~~~

## June Trends selected-image note

No generated June Trends candidate was suitable. The live image reuses the user-approved ship-repair frame: a Minecraft-style mechanic installing a ship engine beside three fishing components at the Fishing Outpost. Treat it as a selected visual reference, not as a prompt claiming to summarize every June trend. Future replacements should be based on a concrete article theme rather than generic trend symbolism.

## Review checklist

- Is the location verifiably current for the article date?
- Is the menu exactly 9×6 where a Loadout chest UI is shown?
- Are weapons/tools separate from Loadout slots?
- Is armor based on official UI evidence rather than invented pack art?
- Is the `pack.png` painting completely absent?
- Are pixel edges crisp and item silhouettes faithful?
- Does the crop survive at mobile width?
- Is Hypixel attribution clear in surrounding article context without implying endorsement?
