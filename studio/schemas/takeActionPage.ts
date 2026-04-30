import { defineField, defineType } from 'sanity';

// Take-action page content. SINGLETON.

const takeActionPage = defineType({
  name: 'takeActionPage',
  title: 'Take action page',
  type: 'document',
  fields: [
    // --- Hero ---
    defineField({ name: 'heroKicker', title: 'Hero kicker', type: 'string', group: 'hero' }),
    defineField({ name: 'heroTitle', title: 'Hero title', type: 'string', group: 'hero' }),
    defineField({ name: 'heroLede', title: 'Hero subtext', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroPetitionCtaLabel', title: 'Hero petition CTA label', type: 'string', group: 'hero' }),
    defineField({ name: 'heroEmailCtaLabel', title: 'Hero email-council CTA label', type: 'string', group: 'hero' }),

    // --- Step 1: Sign up ---
    defineField({ name: 'signupTitle', title: 'Sign-up title', type: 'string', group: 'signup' }),
    defineField({ name: 'signupLede', title: 'Sign-up subtext', type: 'text', rows: 3, group: 'signup' }),
    defineField({ name: 'signupSuccessMessage', title: 'Sign-up success message', type: 'text', rows: 2, group: 'signup' }),

    // --- Step 2: Email the council ---
    defineField({ name: 'emailTitle', title: 'Email title', type: 'string', group: 'email' }),
    defineField({ name: 'emailLede', title: 'Email subtext', type: 'text', rows: 3, group: 'email' }),
    defineField({
      name: 'emailTemplates',
      title: 'Email templates',
      type: 'array',
      group: 'email',
      description: 'Tabbed email templates the resident can copy. Order matters; first item is the default tab.',
      of: [
        {
          type: 'object',
          name: 'emailTemplate',
          fields: [
            defineField({
              name: 'id',
              title: 'Template ID (slug)',
              type: 'string',
              description: 'Used in URLs and tab IDs. Lowercase, no spaces. e.g., "transparency", "moratorium".',
              validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/, { name: 'lowercase-and-hyphens' }),
            }),
            defineField({
              name: 'label',
              title: 'Tab label',
              type: 'string',
              description: 'Short tab label. e.g., "Request transparency"',
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: 'subject',
              title: 'Email subject line',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Email body',
              type: 'text',
              rows: 14,
              description: 'Plain text. Paragraph breaks preserved. No markdown.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { label: 'label', subject: 'subject' },
            prepare({ label, subject }) {
              return { title: label, subtitle: subject };
            },
          },
        },
      ],
    }),
    defineField({ name: 'emailSendToKicker', title: '"Send to" kicker', type: 'string', group: 'email' }),
    defineField({ name: 'emailRosterFooter', title: 'Roster footer text', type: 'text', rows: 2, group: 'email', description: 'Sentence under the council roster, e.g., "Roster sourced from the Village..."' }),

    // --- Step 3: Attend ---
    defineField({ name: 'attendTitle', title: 'Attend title', type: 'string', group: 'attend' }),
    defineField({ name: 'attendLede', title: 'Attend subtext', type: 'text', rows: 3, group: 'attend' }),
    defineField({ name: 'attendAgendaTag', title: '"On the agenda" tag', type: 'string', group: 'attend' }),
    defineField({ name: 'attendAgendaText', title: 'Agenda one-liner', type: 'string', group: 'attend' }),
    defineField({ name: 'attendBody', title: 'Body paragraph', type: 'text', rows: 5, group: 'attend' }),
    defineField({ name: 'attendAddress', title: 'Address', type: 'string', group: 'attend' }),
    defineField({ name: 'attendTime', title: 'Time', type: 'string', group: 'attend' }),
    defineField({ name: 'attendPublicComment', title: 'Public comment instructions', type: 'string', group: 'attend' }),

    // --- Step 4: Media ---
    defineField({ name: 'mediaTitle', title: 'Media title', type: 'string', group: 'media' }),
    defineField({ name: 'mediaLede', title: 'Media subtext', type: 'text', rows: 4, group: 'media' }),
    defineField({
      name: 'mediaOutlets',
      title: 'Media outlets',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          name: 'mediaOutlet',
          fields: [
            defineField({ name: 'name', title: 'Outlet name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'url', title: 'Contact URL', type: 'url', validation: (r) => r.required() }),
            defineField({ name: 'handle', title: 'Display handle', type: 'string', description: 'Short URL display, e.g., "dispatch.com/contact/staff"', validation: (r) => r.required() }),
          ],
          preview: { select: { name: 'name', handle: 'handle' }, prepare: ({ name, handle }) => ({ title: name, subtitle: handle }) },
        },
      ],
    }),

    // --- Step 5: Share ---
    defineField({ name: 'shareTitle', title: 'Share title', type: 'string', group: 'share' }),
    defineField({ name: 'shareLede', title: 'Share subtext', type: 'text', rows: 3, group: 'share' }),
    defineField({
      name: 'shareSuggestions',
      title: 'Share suggestions',
      type: 'array',
      group: 'share',
      of: [{ type: 'string' }],
      description: 'List items shown under the share section. One suggestion per line.',
    }),
    defineField({ name: 'shareFootLinkLabel', title: 'Share-section foot link label', type: 'string', group: 'share', description: 'e.g., "Sign and share the petition"' }),

    // --- Pre-footer ---
    defineField({ name: 'preFooterKicker', title: 'Pre-footer kicker', type: 'string', group: 'preFooter' }),
    defineField({ name: 'preFooterTitleLine1', title: 'Pre-footer title line 1', type: 'string', group: 'preFooter' }),
    defineField({ name: 'preFooterTitleLine2', title: 'Pre-footer title line 2', type: 'string', group: 'preFooter' }),
    defineField({ name: 'preFooterTitleLine3', title: 'Pre-footer title line 3', type: 'string', group: 'preFooter' }),
    defineField({ name: 'preFooterBody', title: 'Pre-footer body', type: 'text', rows: 4, group: 'preFooter' }),
    defineField({ name: 'preFooterPetitionCtaLabel', title: 'Pre-footer petition CTA label', type: 'string', group: 'preFooter' }),
    defineField({ name: 'preFooterDonateCtaLabel', title: 'Pre-footer donate CTA label', type: 'string', group: 'preFooter' }),
    defineField({ name: 'preFooterDonateUrl', title: 'Pre-footer donate URL', type: 'url', group: 'preFooter' }),
  ],
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'signup', title: 'Step 1: Sign up' },
    { name: 'email', title: 'Step 2: Email council' },
    { name: 'attend', title: 'Step 3: Attend meeting' },
    { name: 'media', title: 'Step 4: Media' },
    { name: 'share', title: 'Step 5: Share' },
    { name: 'preFooter', title: 'Pre-footer' },
  ],
  preview: { prepare: () => ({ title: 'Take action page content (singleton)' }) },
});

export default takeActionPage;
