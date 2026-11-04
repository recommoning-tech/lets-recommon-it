// Content collections read straight from the repo's content folders.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LEVELS } from './lib/site.mjs';

const list = z.array(z.string()).nullish().transform((v) => v ?? []);
const optionalText = z.any().optional(); // empty YAML values (date:) parse as null

const piece = z.object({
  title: z.string(),
  date: optionalText,
  updated: optionalText,
  threads: z.array(z.string()).min(1),
  sources: list,
  patterns: list,
  patterns_applied: list,
  difficulty: z.string().optional(),
  status: z.string(),
});

const md = (dir: string) => glob({ pattern: ['*.md', '!README.md'], base: `../${dir}` });

export const collections = {
  theory: defineCollection({ loader: md('theory'), schema: piece }),
  guides: defineCollection({ loader: md('guides'), schema: piece }),
  governance: defineCollection({ loader: md('governance'), schema: piece }),
  patterns: defineCollection({
    loader: md('wiki/patterns'),
    schema: z.object({
      title: z.string(),
      number: z.number().int(),
      introduction: z.string(),
      image: z.string().nullish(),
      thread: z.string(),
      level: z.enum(LEVELS as [string, ...string[]]),
      introduced_in: z.string().nullish(),
      applied_in: list,
      larger_patterns: list,
      smaller_patterns: list,
      status: z.string(),
    }),
  }),
  bibliography: defineCollection({
    loader: md('bibliography'),
    schema: z.object({
      title: z.string(),
      authors: list,
      year: z.union([z.number(), z.string()]).nullish(),
      publisher: z.string().nullish(),
      type: z.string().nullish(),
      url: z.string().nullish(),
      threads: list,
      status: z.string().nullish(),
    }),
  }),
};
