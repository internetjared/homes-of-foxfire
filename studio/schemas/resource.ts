import { defineField, defineType } from 'sanity';

// Educational resources that appear on /learn (data center education hub).

const resource = defineType({
  name: 'resource',
  title: 'Learn resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'sourceOrganization',
      title: 'Source organization',
      type: 'string',
      description: 'Publisher of the resource. e.g., World Resources Institute, Lawrence Berkeley National Lab, Virginia JLARC.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Start here', value: 'start-here' },
          { title: 'Energy', value: 'energy' },
          { title: 'Water', value: 'water' },
          { title: 'Air quality', value: 'air-quality' },
          { title: 'Noise', value: 'noise' },
          { title: 'Stormwater', value: 'stormwater' },
          { title: 'Health', value: 'health' },
          { title: 'Tax and incentives', value: 'tax-and-incentives' },
          { title: 'Local coverage', value: 'local-coverage' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Plain-English overview of what the resource covers.',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'credibilityType',
      title: 'Credibility type',
      type: 'string',
      options: {
        list: [
          { title: 'Policy research', value: 'policy-research' },
          { title: 'Government report', value: 'government-report' },
          { title: 'Academic / peer-reviewed', value: 'academic' },
          { title: 'Trade press', value: 'trade-press' },
          { title: 'News reporting', value: 'news-reporting' },
          { title: 'Statute or regulation', value: 'statute' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'keyTakeaway',
      title: 'Key takeaway',
      type: 'text',
      rows: 2,
      description: 'One sentence in body register. Plain language.',
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first within the category.',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'title', org: 'sourceOrganization', category: 'category' },
    prepare({ title, org, category }) {
      return { title, subtitle: `${org} — ${category}` };
    },
  },
  orderings: [
    {
      title: 'Category, then order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});

export default resource;
