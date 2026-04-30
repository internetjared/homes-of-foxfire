// Sanity client + GROQ queries for the Foxfire Coalition website.
//
// Read at build time from the Sanity dataset configured in the repo's .env.
// All schemas live in /studio/schemas/*. See docs/CMS.md for the editorial flow.

import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2024-10-01';
const token = import.meta.env.SANITY_READ_TOKEN; // optional; only needed for private datasets

if (!projectId) {
  // Fail loudly during build so we never ship a site silently missing CMS content.
  throw new Error(
    'Missing PUBLIC_SANITY_PROJECT_ID. Set it in .env (local) and Vercel project env vars.',
  );
}

export const sanity: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // build-time fetches benefit from CDN cache
  token: token || undefined,
});

// --- GROQ queries ---

export const QUERY_UPDATES_PUBLISHED = /* groq */ `
  *[_type == "update" && publishStatus == "published"]
    | order(publishDate desc) {
      _id,
      title,
      "slug": slug.current,
      publishDate,
      category,
      summary,
      whatHappened,
      whyItMatters,
      whatToDo,
      body,
      relatedLinks
    }
`;

export const QUERY_UPDATE_BY_SLUG = /* groq */ `
  *[_type == "update" && slug.current == $slug && publishStatus == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    publishDate,
    category,
    summary,
    whatHappened,
    whyItMatters,
    whatToDo,
    body,
    relatedLinks
  }
`;

export const QUERY_RESOURCES = /* groq */ `
  *[_type == "resource"] | order(category asc, order asc) {
    _id,
    title,
    sourceOrganization,
    category,
    url,
    summary,
    credibilityType,
    keyTakeaway,
    order
  }
`;

export const QUERY_FAQ_ITEMS = /* groq */ `
  *[_type == "faqItem"] | order(bucket asc, order asc) {
    _id,
    question,
    bucket,
    answer,
    source,
    order
  }
`;

export const QUERY_GLOSSARY_TERMS = /* groq */ `
  *[_type == "glossaryTerm"] | order(term asc) {
    _id,
    term,
    definition
  }
`;

// --- Type definitions matching the schemas ---

export interface SanityLink {
  label: string;
  url: string;
}

export interface SanityUpdate {
  _id: string;
  title: string;
  slug: string;
  publishDate: string;
  category: string;
  summary: string;
  whatHappened?: string;
  whyItMatters?: string;
  whatToDo?: string;
  body?: unknown[]; // portable text blocks
  relatedLinks?: SanityLink[];
}

export interface SanityResource {
  _id: string;
  title: string;
  sourceOrganization: string;
  category: string;
  url: string;
  summary: string;
  credibilityType: string;
  keyTakeaway: string;
  order: number;
}

export interface SanityFaqItem {
  _id: string;
  question: string;
  bucket: string;
  answer: unknown[]; // portable text blocks
  source?: SanityLink;
  order: number;
}

export interface SanityGlossaryTerm {
  _id: string;
  term: string;
  definition: string;
}
