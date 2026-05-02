// Updates blog data + helpers.
//
// Source of truth at runtime is the Sanity CMS (document type `update`,
// publishStatus = "published"). The hardcoded `localUpdates` array below
// is a permanent fallback so the site never goes blank if Sanity is empty
// or unreachable at build time. When Sanity has a post with the same slug
// as a local entry, Sanity wins.
//
// Editors create/publish posts in Sanity Studio (https://foxfire-coalition.sanity.studio).
// A Sanity → Vercel webhook rebuilds the site on publish.

import { sanity, QUERY_UPDATES_PUBLISHED, type SanityUpdate } from '../lib/sanity';
import { toHTML } from '@portabletext/to-html';

export interface LocalUpdate {
  id: string;                // url slug
  title: string;
  publishDate: string;       // ISO date for sort
  publishDateLabel: string;  // human-friendly for display
  category: string;
  excerpt: string;           // 1-2 sentence summary for the index card
  thumbnailUrl?: string;     // optional override; YouTube auto-derives if missing
  ogImageWidth?: number;     // px — used for og:image:width and JSON-LD ImageObject
  ogImageHeight?: number;    // px — used for og:image:height and JSON-LD ImageObject
  videoUrl?: string;         // local MP4 path or YouTube URL
  videoPoster?: string;      // optional poster image for the <video> element
  videoTitle?: string;
  bodyHtml: string;
  draft?: boolean;            // true = generates the slug page but hidden from public index
  featured?: boolean;         // true = pinned as featured post on the homepage
}

/**
 * Permanent local fallback. Sanity content takes precedence at build time.
 * Add entries here only if a post needs to ship before it can be authored
 * in Studio. All migrated posts live in Sanity — do not re-add them here.
 */
/**
 * Permanent local fallback. Sanity content takes precedence at build time.
 * Add entries here only if a post needs to ship before it can be authored
 * in Studio. All migrated posts live in Sanity — do not re-add them here.
 */
export const localUpdates: LocalUpdate[] = [
  // DRAFT — not yet published. Remove once pushed to Sanity as published.
  {
    id: 'special-meeting-before-may-8',
    title: "We're Asking Council to Hold a Special Meeting Before May 8",
    publishDate: '2026-05-02',
    publishDateLabel: 'May 2, 2026',
    category: 'Public records',
    excerpt: "Residents are asking Commercial Point Council to publicly address procedural questions surrounding Ordinance 2024-07 before the procedural challenge deadline approaches.",
    draft: true,
    thumbnailUrl: '/special-meeting-before-may-8.jpg',
    ogImageWidth: 1200,
    ogImageHeight: 675,
    bodyHtml: `
<p>Yesterday, we shared a detailed breakdown of a procedural question we believe Commercial Point needs to answer publicly regarding <strong>Ordinance 2024-07</strong>, the ordinance passed on May 20, 2024 that rezoned roughly <strong>267 acres behind Foxfire</strong> for Planned Industrial use.</p>

<p>You can read that full source-backed breakdown here:</p>

<p><a href="/updates/ordinance-2024-07-procedural-review">Read the Ordinance 2024-07 Procedural Review →</a></p>

<p>Today, we are taking the next step.</p>

<p>Members of the Foxfire Coalition are sending emails to the Mayor, Council, Fiscal Officer, Village Solicitor, and other Village officials requesting a <strong>special meeting before May 8, 2026</strong> to discuss this issue publicly.</p>

<p>We are also sharing an email template below that residents can use if they want to make the same request.</p>

<h2>Why we are asking for a special meeting</h2>

<p>This is not something that should be handled quietly through private emails or vague statements.</p>

<p>Ordinance 2024-07 is one of the most significant zoning decisions Commercial Point has made in recent years. It helped move forward the proposed industrial/data center project tied to K-Nova and the land behind our neighborhood.</p>

<p>For more context on K-Nova leadership and the public comments made by Bill Scala in March 2026, you can read our post here:</p>

<p><a href="/updates/bill-scala-comments-march-2026">Read our post on Bill Scala's March 2026 comments →</a></p>

<p>The issue we are raising now is straightforward:</p>

<p class="update-pull">Residents deserve to know whether the required legal process was followed when Ordinance 2024-07 was adopted.</p>

<p>Based on the public records reviewed so far, the ordinance was on <strong>first reading</strong> when Council voted to suspend the three-reading requirement and adopt it that same night. There was also a council vacancy at the time due to Laura Wolfe's resignation earlier that month.</p>

<p>That raises an important vote-threshold question that should be answered publicly by the Village Solicitor and Council.</p>

<p>We are not asking residents to become legal experts. We are not asking people to guess what the courts would do. We are asking the Village to explain, on the record, whether Council believes the vote was valid and why.</p>

<h2>Why this matters now</h2>

<p>There appears to be a limited window to raise certain procedural challenges to zoning ordinances. Ordinance 2024-07 was adopted on <strong>May 20, 2024</strong>, which means the two-year mark is approaching.</p>

<p>That is why we are asking for a special meeting before <strong>May 8, 2026</strong>.</p>

<p>This should not be pushed off until the last minute. Residents should not be left wondering whether the Village intends to review this, ignore it, defend it, correct it, or seek guidance from a court.</p>

<p>If the Village believes everything was handled correctly, it should explain that publicly.</p>

<p>If the Village believes there may be a procedural issue, residents should hear what options exist before time runs out.</p>

<p>Either way, the answer should happen in front of the community.</p>

<h2>This is a chance to rebuild trust</h2>

<p>A lot of residents feel like they are only now learning how far this project moved before many of us fully understood what was happening.</p>

<p>That has created frustration. It has created confusion. And honestly, it has damaged trust.</p>

<p>A special meeting would give the current Council an opportunity to start rebuilding some of that trust.</p>

<p>This is not about attacking every current official. Some of this was done by a prior Council. But the current Council still has a responsibility to address the public record, answer residents' questions, and deal with any issues that may have been left behind.</p>

<p>Transparency matters most when the issue is uncomfortable.</p>

<p>If there is nothing wrong, explain it.</p>

<p>If something needs to be fixed, say that.</p>

<p>If there are legal options available to the Village, residents deserve to hear what they are.</p>

<h2>What we are asking Council to do</h2>

<p>We are asking the Village to:</p>

<ol>
  <li>Call a special meeting before <strong>May 8, 2026</strong>.</li>
  <li>Place the Ordinance 2024-07 vote-threshold issue on the agenda.</li>
  <li>Have the Village Solicitor explain the Village's position publicly.</li>
  <li>Answer whether the vote to suspend the readings was legally sufficient.</li>
  <li>Explain what options, if any, the Village has to address the issue.</li>
  <li>Preserve all records related to Ordinance 2024-07, including meeting records, legal opinions, zoning records, communications, and records related to the vote threshold.</li>
  <li>Provide residents with a clear written response before the procedural deadline.</li>
</ol>

<p>This is a reasonable request.</p>

<p>A zoning decision of this size should not move forward under a cloud of unanswered procedural questions.</p>

<h2>How residents can help</h2>

<p>If you live in Commercial Point, Foxfire, Southern Point, or near the proposed data center site, we encourage you to email the Village and ask for this issue to be addressed in a public special meeting.</p>

<p>You do not need to write a long legal argument.</p>

<p>The point is simple: residents want transparency. Residents want this discussed publicly. Residents want to know whether the proper process was followed.</p>

<p>Below is a template you can copy, personalize, and send.</p>

<h2>Who to contact</h2>

<div class="update-contacts">
  <p class="update-contacts-intro">Send your email to the following Village officials. You can click any address to copy it, or copy all addresses at once to paste into the To: field.</p>
  <div class="update-contacts-grid">
    <div class="update-contact-item">
      <span class="update-contact-role">Mayor</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:n.geiger@commercialpointohio.gov">n.geiger@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="n.geiger@commercialpointohio.gov" aria-label="Copy email address for Nancy Geiger"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Nancy Geiger</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Fiscal Officer</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:w.hastings@commercialpointohio.gov">w.hastings@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="w.hastings@commercialpointohio.gov" aria-label="Copy email address for Wendy Hastings"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Wendy Hastings</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Village Solicitor</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:bill.mattes@dinsmore.com">bill.mattes@dinsmore.com</a>
        <button class="update-contact-copy" type="button" data-email="bill.mattes@dinsmore.com" aria-label="Copy email address for William M. Mattes"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">William M. Mattes — Dinsmore &amp; Shohl LLP</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Council</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:d.fox@commercialpointohio.gov">d.fox@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="d.fox@commercialpointohio.gov" aria-label="Copy email address for Dustyn Fox"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Dustyn Fox</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Council</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:p.anderson@commercialpointohio.gov">p.anderson@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="p.anderson@commercialpointohio.gov" aria-label="Copy email address for Patricia Anderson"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Patricia Anderson</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Council</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:e.miller@commercialpointohio.gov">e.miller@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="e.miller@commercialpointohio.gov" aria-label="Copy email address for Ezekiel Miller"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Ezekiel Miller</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Council</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:c.denton@commercialpointohio.gov">c.denton@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="c.denton@commercialpointohio.gov" aria-label="Copy email address for Courtney Denton"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Courtney Denton</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Council</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:j.weaver@commercialpointohio.gov">j.weaver@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="j.weaver@commercialpointohio.gov" aria-label="Copy email address for Jay Weaver"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Jay Weaver</span>
    </div>
    <div class="update-contact-item">
      <span class="update-contact-role">Council</span>
      <span class="update-contact-email-row">
        <a class="update-contact-email" href="mailto:e.nungester@commercialpointohio.gov">e.nungester@commercialpointohio.gov</a>
        <button class="update-contact-copy" type="button" data-email="e.nungester@commercialpointohio.gov" aria-label="Copy email address for Eric Nungester"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
      </span>
      <span class="update-contact-name">Eric Nungester</span>
    </div>
  </div>
  <button class="update-contacts-copy-all" data-emails="n.geiger@commercialpointohio.gov, w.hastings@commercialpointohio.gov, d.fox@commercialpointohio.gov, p.anderson@commercialpointohio.gov, e.miller@commercialpointohio.gov, c.denton@commercialpointohio.gov, j.weaver@commercialpointohio.gov, e.nungester@commercialpointohio.gov, bill.mattes@dinsmore.com">
    Copy all email addresses
  </button>
</div>

<h2>Resident email template</h2>

<div class="update-email-template">
  <div class="update-email-template-head">
    <p class="update-email-subject"><strong>Subject:</strong> Request for Special Meeting Before May 8 on Ordinance 2024-07</p>
    <button class="update-email-copy-btn" data-template="true">Copy email</button>
  </div>
  <div class="update-email-body" id="email-template-body">
    <p>Dear Mayor, Council Members, Fiscal Officer, and Village Solicitor,</p>
    <p>I am writing as a resident to ask the Village to call a special meeting before May 8, 2026 to publicly address the procedural questions surrounding Ordinance 2024-07, which was adopted on May 20, 2024.</p>
    <p>This is urgent because Ohio law appears to place a two-year deadline on certain procedural challenges to zoning ordinances. Since Ordinance 2024-07 was adopted on May 20, 2024, that deadline may be approaching quickly.</p>
    <p>Based on the public records being shared, Ordinance 2024-07 was on first reading when Council voted 4-1 to suspend the three-reading requirement and adopt it that same night.</p>
    <p>Because Laura Wolfe had resigned, there was a vacant council seat. However, a vacancy does not appear to mean Commercial Point became a five-member council. If Commercial Point remained a six-seat council, then Ohio law appears to require five affirmative votes to suspend the readings.</p>
    <p>Residents deserve a clear, public answer to the following:</p>
    <p>Was Commercial Point still legally a six-seat council on May 20, 2024?</p>
    <p>Did Laura Wolfe's resignation reduce the vote threshold, or did it simply create a vacant sixth seat?</p>
    <p>Did suspending the readings for Ordinance 2024-07 require five affirmative votes?</p>
    <p>Was Ordinance 2024-07 validly adopted after only four members voted to suspend the readings?</p>
    <p>Will the Village Solicitor issue a written legal opinion before the procedural challenge deadline?</p>
    <p>Please call a special meeting before May 8, 2026 and place this issue on the agenda for public discussion. This is one of the most important zoning decisions affecting our community, and residents deserve transparency, urgency, and a clear answer before the deadline passes.</p>
    <p>Thank you,</p>
    <p>[Your Name]<br>[Commercial Point / Foxfire / Southern Point Resident]</p>
  </div>
</div>

<script>
(function () {
  var toastEl = null;
  var toastTimer = null;

  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'update-copy-toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('is-visible');
    }, 2000);
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
  }

  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg || 'Copied.');
      }).catch(function () {
        fallbackCopy(text);
        showToast(successMsg || 'Copied.');
      });
    } else {
      fallbackCopy(text);
      showToast(successMsg || 'Copied.');
    }
  }

  function initCopyButtons() {
    // Guard against double-init
    if (document.querySelector('.update-contacts-copy-all[data-copy-init]')) return;

    // Copy all emails button
    document.querySelectorAll('.update-contacts-copy-all').forEach(function (btn) {
      btn.setAttribute('data-copy-init', 'true');
      btn.addEventListener('click', function () {
        copyText(btn.getAttribute('data-emails'), 'All addresses copied.');
      });
    });

    // Per-contact copy buttons
    document.querySelectorAll('.update-contact-copy').forEach(function (btn) {
      btn.setAttribute('data-copy-init', 'true');
      btn.addEventListener('click', function () {
        copyText(btn.getAttribute('data-email'), 'Address copied.');
      });
    });

    // Copy email template button
    document.querySelectorAll('.update-email-copy-btn').forEach(function (btn) {
      btn.setAttribute('data-copy-init', 'true');
      btn.addEventListener('click', function () {
        var body = document.getElementById('email-template-body');
        if (!body) return;
        var text = Array.from(body.querySelectorAll('p')).map(function (p) {
          return p.innerText;
        }).join('\\n\\n');
        copyText(text, 'Email copied.');
      });
    });
  }

  document.addEventListener('astro:page-load', initCopyButtons);
  if (document.readyState !== 'loading') { initCopyButtons(); } else { document.addEventListener('DOMContentLoaded', initCopyButtons); }
})();
</script>

<h2>A final note</h2>

<p>We know this data center issue is exhausting.</p>

<p>People have jobs, kids, school, sports, family responsibilities, and normal life to deal with. Nobody wants to spend their evenings reading meeting minutes and zoning laws.</p>

<p>But this matters.</p>

<p>When a major zoning decision affects hundreds of acres near existing homes, the process has to be clean. If there are serious questions about whether that process was followed, the Village should answer them publicly and quickly.</p>

<p>Right now, we are asking for something simple: a special meeting, a clear explanation, and a public answer before the deadline passes.</p>

<p>Residents deserve that.</p>
`,
  },
];


// True if a videoUrl points to a self-hosted file (lives in /public).
export const isLocalVideo = (url?: string): boolean =>
  Boolean(url && (url.startsWith('/') || url.startsWith('./')) && !url.startsWith('//'));

// Extract a YouTube video ID from any standard URL form.
export const youtubeId = (url?: string): string | null => {
  if (!url) return null;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return shortMatch[1];
  const liveMatch = url.match(/youtube\.com\/live\/([^?&/]+)/);
  if (liveMatch) return liveMatch[1];
  const embedMatch = url.match(/\/embed\/([^?&/]+)/);
  if (embedMatch) return embedMatch[1];
  return null;
};

// Convert any YouTube URL into an embed URL (preserving any ?t= start time).
export const toEmbedUrl = (url?: string): string | null => {
  const id = youtubeId(url);
  if (!id) return null;
  const timeMatch = url ? url.match(/[?&]t=(\d+)/) : null;
  const query = timeMatch ? `?start=${timeMatch[1]}` : '';
  return `https://www.youtube.com/embed/${id}${query}`;
};

// Derive a YouTube thumbnail URL. `hqdefault` (480x360) always exists and
// loads fast — perfect for in-page cards. `maxresdefault` (1280x720) gives
// proper social-preview sizing but only exists for videos uploaded above 720p;
// older/low-res uploads return 404.
export const youtubeThumbnail = (url?: string): string | null => {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export const youtubeOgThumbnail = (url?: string): string | null => {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
};

// In-page card thumbnail: explicit override → fast YouTube hqdefault → null.
export const cardThumbnail = (u: LocalUpdate): string | null =>
  u.thumbnailUrl ?? youtubeThumbnail(u.videoUrl);

// Social-preview / OG image: explicit override → big YouTube maxresdefault → null.
// Use the larger thumbnail here so Twitter/Facebook previews are full-size,
// while the in-page card stays on the lighter hqdefault asset.
export const ogImageForUpdate = (u: LocalUpdate): string | null =>
  u.thumbnailUrl ?? youtubeOgThumbnail(u.videoUrl);

// ─────────────────────────────────────────────────────────────────────────────
// Sanity → LocalUpdate normalization
// ─────────────────────────────────────────────────────────────────────────────

// Format an ISO date as "May 2, 2026" without a runtime timezone surprise.
function formatPublishDateLabel(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// Strip an ISO datetime back to just the YYYY-MM-DD portion used for sorting.
function isoDateOnly(iso: string): string {
  return (iso || '').slice(0, 10);
}

/**
 * Convert a Sanity `update` document into the LocalUpdate shape used by
 * the rest of the site. Falls back to portable-text → HTML when no
 * `bodyHtml` was supplied. Throws on documents missing required fields.
 */
function sanityToLocalUpdate(doc: SanityUpdate): LocalUpdate {
  const bodyHtml =
    (doc.bodyHtml && doc.bodyHtml.trim().length > 0)
      ? doc.bodyHtml
      : (Array.isArray(doc.body) && doc.body.length > 0
          ? toHTML(doc.body as any)
          : '');

  return {
    id: doc.slug,
    title: doc.title,
    publishDate: isoDateOnly(doc.publishDate),
    publishDateLabel: formatPublishDateLabel(doc.publishDate),
    category: doc.category,
    excerpt: doc.excerpt,
    thumbnailUrl: doc.thumbnailUrl,
    ogImageWidth: doc.ogImageWidth,
    ogImageHeight: doc.ogImageHeight,
    videoUrl: doc.videoUrl,
    videoPoster: doc.videoPoster,
    videoTitle: doc.videoTitle,
    bodyHtml,
    featured: doc.featured ?? false,
    // Sanity has no `draft` flag; non-"published" status filters them out
    // upstream in the GROQ query, so anything that arrives here is live.
    draft: false,
  };
}

/**
 * Build-time fetch of all published updates, merged with the local fallback.
 * Sanity wins on slug collision. Result is sorted publishDate desc.
 *
 * Errors from Sanity are swallowed and logged; the build still ships the
 * local fallback rather than failing.
 */
export async function getAllUpdates(): Promise<LocalUpdate[]> {
  let fromSanity: LocalUpdate[] = [];
  try {
    const docs = await sanity.fetch<SanityUpdate[]>(QUERY_UPDATES_PUBLISHED);
    if (Array.isArray(docs)) {
      fromSanity = docs.map(sanityToLocalUpdate);
    }
  } catch (err) {
    console.warn('[updates] Sanity fetch failed; using local fallback only:', err);
  }

  const sanitySlugs = new Set(fromSanity.map((u) => u.id));
  const merged: LocalUpdate[] = [
    ...fromSanity,
    ...localUpdates.filter((u) => !sanitySlugs.has(u.id)),
  ];

  return merged.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

/**
 * Backwards-compatible export. Importers that previously did
 * `import { updates } from '...'` keep working by reading the local
 * fallback synchronously. New code should use `getAllUpdates()` so it
 * picks up Sanity content.
 */
export const updates = localUpdates;
