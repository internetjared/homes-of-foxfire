import { defineField, defineType } from 'sanity';

// FAQ items that appear in the five-bucket FAQ.

const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'Phrase as a resident would actually ask, not as an attorney would.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'bucket',
      title: 'Bucket',
      type: 'string',
      options: {
        list: [
          { title: 'Zoning and process', value: 'zoning-and-process' },
          { title: 'Site plan', value: 'site-plan' },
          { title: 'Utilities and infrastructure', value: 'utilities-and-infrastructure' },
          { title: 'Neighborhood impact', value: 'neighborhood-impact' },
          { title: 'Transparency', value: 'transparency' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      description: 'Plain prose. No accusations. Cite sources via the Sources field below if used.',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'object',
      description: 'Optional. Use when a public-record source supports the answer.',
      fields: [
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display order within bucket',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { question: 'question', bucket: 'bucket' },
    prepare({ question, bucket }) {
      return { title: question, subtitle: bucket };
    },
  },
  orderings: [
    {
      title: 'Bucket, then order',
      name: 'bucketOrder',
      by: [
        { field: 'bucket', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});

export default faqItem;
