import { defineField, defineType } from 'sanity';

// Glossary terms. Two-line maximum per definition. Plain language.

const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary term',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'definition',
      title: 'Definition',
      type: 'text',
      rows: 2,
      description: 'Two lines maximum. Plain language.',
      validation: (rule) => rule.required().max(280),
    }),
  ],
  preview: {
    select: { term: 'term', definition: 'definition' },
    prepare({ term, definition }) {
      return { title: term, subtitle: definition };
    },
  },
  orderings: [
    {
      title: 'Term A→Z',
      name: 'termAsc',
      by: [{ field: 'term', direction: 'asc' }],
    },
  ],
});

export default glossaryTerm;
