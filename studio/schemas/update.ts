import { defineField, defineType } from 'sanity';

// Updates posts that appear on /updates and (when featured) on the homepage.
// Voice: body register. Procedural, calm, specific. See docs/VOICE.md.
//
// publishStatus controls visibility:
//   - "draft" / "ready-for-review" / "approved" / "hold" / "retired" → not on the public site
//   - "published" → renders at /updates/<slug> and shows in /updates index

const update = defineType({
  name: 'update',
  title: 'Update',
  type: 'document',
  groups: [
    { name: 'main', title: 'Post', default: true },
    { name: 'media', title: 'Media' },
    { name: 'meta', title: 'SEO & meta' },
  ],
  fields: [
    // ── Core ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
      description: 'Short declarative sentence in body register. No exclamation points, no em dashes.',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'main',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish date',
      type: 'datetime',
      group: 'main',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'main',
      options: {
        list: [
          'Meeting recap',
          'Meeting reminder',
          'Public records',
          'Records request',
          'New document',
          'Timeline update',
          'Volunteer need',
          'Site update',
          'Analysis',
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'main',
      rows: 3,
      description: 'One or two sentence summary that appears in lists, social cards, and SEO descriptions. Aim for 140–200 characters.',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on homepage',
      type: 'boolean',
      group: 'main',
      description: 'Pin this post as the featured update on the homepage. Only one published post should be featured at a time. If none are featured, the most recent post is shown.',
      initialValue: false,
    }),

    // ── Body ──────────────────────────────────────────────────────────────
    defineField({
      name: 'bodyHtml',
      title: 'Body (raw HTML)',
      type: 'text',
      group: 'main',
      rows: 30,
      description: 'Optional. Raw HTML body for posts that need custom formatting (pull quotes, callouts, source lists). If filled, this overrides the structured body below. Allowed elements: p, h2, h3, ul, ol, li, strong, em, a, blockquote with class "update-pull" or "update-callout", div with class "update-sources".',
    }),
    defineField({
      name: 'body',
      title: 'Body (rich text)',
      type: 'array',
      group: 'main',
      description: 'Long-form body. Used only if Body (raw HTML) above is empty.',
      of: [{ type: 'block' }],
    }),

    // ── Media ─────────────────────────────────────────────────────────────
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'string',
      group: 'media',
      description: 'Optional. YouTube/Vimeo URL or local MP4 path (e.g. /clip.mp4).',
    }),
    defineField({
      name: 'videoTitle',
      title: 'Video caption',
      type: 'string',
      group: 'media',
      description: 'Optional. Caption shown below the embedded video.',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Video poster image',
      type: 'string',
      group: 'media',
      description: 'Optional. Path to a poster image for self-hosted MP4 videos.',
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Card thumbnail / OG image',
      type: 'string',
      group: 'media',
      description: 'Optional. Path to an image used for the post card and as the OG image. Use a path like /image.png for files under /public, or a full URL for external images. If empty and Video URL is a YouTube link, the YouTube thumbnail is used.',
    }),
    defineField({
      name: 'ogImageWidth',
      title: 'OG image width (px)',
      type: 'number',
      group: 'meta',
      description: 'Optional. Pixel width of the thumbnail image, used for og:image:width.',
    }),
    defineField({
      name: 'ogImageHeight',
      title: 'OG image height (px)',
      type: 'number',
      group: 'meta',
      description: 'Optional. Pixel height of the thumbnail image, used for og:image:height.',
    }),

    // ── Status ────────────────────────────────────────────────────────────
    defineField({
      name: 'publishStatus',
      title: 'Publish status',
      type: 'string',
      group: 'main',
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
    select: { title: 'title', publishDate: 'publishDate', publishStatus: 'publishStatus', featured: 'featured' },
    prepare({ title, publishDate, publishStatus, featured }) {
      const date = publishDate ? new Date(publishDate).toISOString().slice(0, 10) : 'no date';
      const status = publishStatus ? `[${publishStatus}]` : '';
      const star = featured ? '★ ' : '';
      return { title: `${star}${title}`, subtitle: `${date} ${status}`.trim() };
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
