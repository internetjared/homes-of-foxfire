import { defineField, defineType } from 'sanity';

// Homepage content. SINGLETON — only one document of this type should ever exist.
// Edited in the Studio at /desk/homePage. Renders at the site root.

const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    // --- Hero ---
    defineField({
      name: 'heroKicker',
      title: 'Hero kicker',
      type: 'string',
      group: 'hero',
      description: 'Small uppercase label above the headline. e.g., "Foxfire Community"',
    }),
    defineField({
      name: 'heroLine1',
      title: 'Hero headline line 1',
      type: 'string',
      group: 'hero',
      description: 'First line of the three-line headline. e.g., "Giant data centers."',
    }),
    defineField({
      name: 'heroLine2',
      title: 'Hero headline line 2',
      type: 'string',
      group: 'hero',
      description: 'Second line. e.g., "Nearly 267 acres."',
    }),
    defineField({
      name: 'heroLine3',
      title: 'Hero headline line 3 (accent color)',
      type: 'string',
      group: 'hero',
      description: 'Third line, displayed in accent color. e.g., "Your new neighbor."',
    }),
    defineField({
      name: 'heroLede',
      title: 'Hero subtext',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: 'Paragraph below the headline.',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero CTA button label',
      type: 'string',
      group: 'hero',
      description: 'Text inside the primary call-to-action button. e.g., "Take action"',
    }),

    // --- Action panel: signup ---
    defineField({
      name: 'signupKicker',
      title: 'Signup kicker',
      type: 'string',
      group: 'signup',
    }),
    defineField({
      name: 'signupTitle',
      title: 'Signup title',
      type: 'string',
      group: 'signup',
    }),
    defineField({
      name: 'signupLede',
      title: 'Signup subtext',
      type: 'text',
      rows: 3,
      group: 'signup',
    }),
    defineField({
      name: 'signupSuccessMessage',
      title: 'Signup success message',
      type: 'text',
      rows: 2,
      group: 'signup',
      description: 'Message shown after a visitor submits the signup form.',
    }),

    // --- Next meeting box ---
    defineField({
      name: 'meetingKicker',
      title: 'Meeting kicker',
      type: 'string',
      group: 'meeting',
      description: 'e.g., "Next council meeting"',
    }),
    defineField({
      name: 'meetingAgendaTag',
      title: 'Meeting agenda tag',
      type: 'string',
      group: 'meeting',
      description: 'e.g., "On the agenda"',
    }),
    defineField({
      name: 'meetingAgendaText',
      title: 'Meeting agenda one-liner',
      type: 'string',
      group: 'meeting',
      description: 'e.g., "Third reading of the 18-month data center moratorium."',
    }),
    defineField({
      name: 'meetingBody',
      title: 'Meeting body paragraph',
      type: 'text',
      rows: 4,
      group: 'meeting',
    }),
    defineField({
      name: 'meetingAddress',
      title: 'Meeting address',
      type: 'string',
      group: 'meeting',
    }),
    defineField({
      name: 'meetingTime',
      title: 'Meeting time',
      type: 'string',
      group: 'meeting',
    }),
    defineField({
      name: 'meetingPublicComment',
      title: 'Public comment instructions',
      type: 'string',
      group: 'meeting',
    }),

    // --- Petition card ---
    defineField({
      name: 'petitionKicker',
      title: 'Petition kicker',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'petitionTitle',
      title: 'Petition card title',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'petitionBody',
      title: 'Petition card body',
      type: 'text',
      rows: 3,
      group: 'cta',
    }),
    defineField({
      name: 'petitionCtaLabel',
      title: 'Petition CTA button label',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'petitionUrl',
      title: 'Petition URL',
      type: 'url',
      group: 'cta',
    }),

    // --- Donate card ---
    defineField({
      name: 'donateKicker',
      title: 'Donate kicker',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'donateTitle',
      title: 'Donate card title',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'donateBody',
      title: 'Donate card body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'cta',
      description: 'Rich text. Use bold for emphasis on key phrases.',
    }),
    defineField({
      name: 'donateCtaLabel',
      title: 'Donate CTA button label',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'donateUrl',
      title: 'Donate URL',
      type: 'url',
      group: 'cta',
    }),

    // --- Story section ("What happened") ---
    defineField({
      name: 'storyKicker',
      title: 'Story kicker',
      type: 'string',
      group: 'story',
    }),
    defineField({
      name: 'storyTitle',
      title: 'Story title',
      type: 'text',
      rows: 2,
      group: 'story',
    }),
    defineField({
      name: 'storyBody',
      title: 'Story body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'story',
      description: 'Three to four paragraphs explaining what happened. Use links to ordinances and meetings.',
    }),
    defineField({
      name: 'storyTimelineLinkLabel',
      title: 'Timeline link label',
      type: 'string',
      group: 'story',
      description: 'e.g., "Read the full timeline"',
    }),

    // --- Pre-footer ---
    defineField({
      name: 'preFooterKicker',
      title: 'Pre-footer kicker',
      type: 'string',
      group: 'preFooter',
    }),
    defineField({
      name: 'preFooterTitleLine1',
      title: 'Pre-footer title line 1',
      type: 'string',
      group: 'preFooter',
      description: 'e.g., "Our neighborhood."',
    }),
    defineField({
      name: 'preFooterTitleLine2',
      title: 'Pre-footer title line 2',
      type: 'string',
      group: 'preFooter',
      description: 'e.g., "Our families."',
    }),
    defineField({
      name: 'preFooterTitleLine3',
      title: 'Pre-footer title line 3',
      type: 'string',
      group: 'preFooter',
      description: 'e.g., "Our future here."',
    }),
    defineField({
      name: 'preFooterBody',
      title: 'Pre-footer body',
      type: 'text',
      rows: 4,
      group: 'preFooter',
    }),
    defineField({
      name: 'preFooterCtaLabel',
      title: 'Pre-footer CTA label',
      type: 'string',
      group: 'preFooter',
      description: 'e.g., "Help protect Foxfire"',
    }),
    defineField({
      name: 'preFooterCtaUrl',
      title: 'Pre-footer CTA URL',
      type: 'string',
      group: 'preFooter',
      description: 'Default /take-action',
    }),
  ],
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'signup', title: 'Signup form' },
    { name: 'meeting', title: 'Next meeting' },
    { name: 'cta', title: 'Petition + Donate' },
    { name: 'story', title: 'Story section' },
    { name: 'preFooter', title: 'Pre-footer' },
  ],
  preview: {
    prepare() {
      return { title: 'Home page content (singleton)' };
    },
  },
});

export default homePage;
