import { defineField, defineType } from 'sanity';

// Updates posts that appear on /updates.
// Voice: body register. Procedural, calm, specific. See docs/VOICE.md.

const update = defineType({
  name: 'update',
  title: 'Update',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short declarative sentence in body register. No exclamation points, no em dashes.',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish date',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Records Request', value: 'records-request' },
          { title: 'Meeting Reminder', value: 'meeting-reminder' },
          { title: 'Meeting Recap', value: 'meeting-recap' },
          { title: 'New Document', value: 'new-document' },
          { title: 'Timeline Update', value: 'timeline-update' },
          { title: 'Volunteer Need', value: 'volunteer-need' },
          { title: 'Site Update', value: 'site-update' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentence summary that appears in lists and previews.',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'whatHappened',
      title: 'What happened',
      type: 'text',
      rows: 4,
      description: 'Plain factual description.',
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why it matters',
      type: 'text',
      rows: 3,
      description: 'One sentence in body register. What this entry means for the coalition or readers.',
    }),
    defineField({
      name: 'whatToDo',
      title: 'What to do',
      type: 'text',
      rows: 3,
      description: 'Optional. Concrete action a reader can take.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Long-form body if the post needs more than the structured fields above. Optional.',
      of: [
        { type: 'block' },
      ],
    }),
    defineField({
      name: 'relatedLinks',
      title: 'Related links',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() },
            { name: 'url', title: 'URL', type: 'url', validation: (r) => r.required() },
          ],
        }),
      ],
    }),
    defineField({
      name: 'publishStatus',
      title: 'Publish status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Ready for review', value: 'ready-for-review' },
          { title: 'Approved', value: 'approved' },
          { title: 'Published', value: 'published' },
          { title: 'Hold', value: 'hold' },
          { title: 'Retired', value: 'retired' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', publishDate: 'publishDate', publishStatus: 'publishStatus' },
    prepare({ title, publishDate, publishStatus }) {
      const date = publishDate ? new Date(publishDate).toISOString().slice(0, 10) : 'no date';
      const status = publishStatus ? `[${publishStatus}]` : '';
      return { title, subtitle: `${date} ${status}`.trim() };
    },
  },
  orderings: [
    {
      title: 'Publish date, newest first',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
});

export default update;
