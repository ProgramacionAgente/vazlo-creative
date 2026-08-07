import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const nonEmpty = z.string().min(1);
const link = z.object({ label: nonEmpty, href: nonEmpty });
const heroBase = z.object({
  title: nonEmpty,
  heroHeading: nonEmpty,
  heroHighlight: z.string(),
  heroImage: nonEmpty,
  heroImageAlt: nonEmpty,
}).passthrough();

const services = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/services' }),
  schema: z.object({
    title: nonEmpty,
    order: z.number().int().positive(),
    icon: nonEmpty,
    heroHeading: nonEmpty,
    heroHighlight: z.string(),
    heroSub: nonEmpty,
    heroCtaLabel: nonEmpty,
    image: nonEmpty,
    imageAlt: nonEmpty,
    features: z.array(z.object({ icon: nonEmpty, title: nonEmpty, desc: nonEmpty })).min(1),
    plans: z.array(z.object({
      name: nonEmpty,
      sub: nonEmpty,
      price: nonEmpty,
      featured: z.boolean(),
      features: z.array(nonEmpty).min(1),
    })).min(1),
    ctaHeading: nonEmpty,
    ctaText: nonEmpty,
    ctaButtonLabel: nonEmpty,
    ctaButtonIcon: nonEmpty,
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: heroBase,
});

const customServices = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/services-custom' }),
  schema: z.object({
    title: nonEmpty,
    heroHeading: nonEmpty,
    heroHighlight: z.string(),
    heroSub: nonEmpty,
    image: nonEmpty,
    imageAlt: nonEmpty,
  }).passthrough(),
});

const settings = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/settings' }),
  schema: z.object({
    brand: nonEmpty,
    siteUrl: z.string().url(),
    language: nonEmpty,
    ctaLabel: nonEmpty,
    nav: z.array(link).min(1),
    contact: z.object({
      phone: nonEmpty,
      email: z.string().email(),
      location: nonEmpty,
      formEndpoint: z.union([z.literal(''), z.string().url()]),
    }),
    socialLinks: z.array(z.object({ label: nonEmpty, href: z.string().url(), icon: z.string() })),
    analytics: z.object({ plausibleDomain: z.string() }),
    footerTagline: nonEmpty,
    footerPages: z.array(link),
    footerLinks: z.array(link),
    footerBottomLinks: z.array(link),
    copyright: nonEmpty,
  }),
});

export const collections = { services, pages, customServices, settings };
