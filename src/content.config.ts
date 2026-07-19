import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Individual guides authored as MDX. Frontmatter carries everything the layout
// needs to build the page shell + all SEO (canonical, OG, BlogPosting +
// BreadcrumbList JSON-LD, visible breadcrumb, "last verified" line), so the MDX
// body is nothing but readable content + rich-content components.
const linkList = z.array(z.object({ label: z.string(), href: z.string() }));

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Small kicker above the H1, e.g. "Update Watch" or "Money-Making". */
    kicker: z.string().default('Guide'),
    /** One-sentence intro rendered as the styled lede under the H1. */
    lede: z.string(),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    /** Optional game patch this guide was verified against, e.g. "0.25". */
    patch: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().default('https://notenoughcoins.net/static/NEC.png'),
    schemaType: z.enum(['BlogPosting', 'Article']).default('BlogPosting'),
    /** Aside: "Best paired tools" deep links. */
    tools: linkList.default([]),
    /** Aside: short "Best for" audience note. */
    bestFor: z.string().optional(),
    /** Aside: "Source videos" / provenance note. */
    sourceNote: z.string().optional(),
    /** "Read next" related-guide links. */
    related: linkList.default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guides };
