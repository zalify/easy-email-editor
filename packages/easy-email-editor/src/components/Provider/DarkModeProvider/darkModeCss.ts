const WHITE = '#ffffff';
const BLACK = '#000000';

export const LIGHT_TEXT_COLOR = BLACK;
export const DARK_TEXT_COLOR = WHITE;
export const LIGHT_BG_COLOR = WHITE;

export const DARK_PAGE_BG = '#585652';
export const DARK_BLOCK_BG = '#1e1e1e';
const DARK_LINK_COLOR = '#5b9bd5';
const DARK_BORDER_COLOR = '#444';

// MJML outputs lowercase hex (#ffffff) with a space after the colon.
const WHITE_HEX = '#ffffff';
const WHITE_RGB = 'rgb(255, 255, 255)';

function is(...parts: string[]) { return `:is(${parts.join(', ')})`; }

// Editor: white OR no background (safe inside class-scoped selectors)
const DEFAULT_BG = is(
  `:not([style*="background"]):not([bgcolor])`,
  `[style*="${WHITE_HEX}"]`,
  `[style*="${WHITE_RGB}"]`,
  `[bgcolor="${WHITE_HEX}"]`,
);

// Preview: only explicit white (no class guards, so unstyled elements are excluded)
const EXPLICIT_WHITE_BG = is(
  `[style*="background-color: ${WHITE_HEX}"]`,
  `[style*="background-color:${WHITE_HEX}"]`,
  `[style*="background-color: ${WHITE_RGB}"]`,
  `[style*="background: ${WHITE_HEX}"]`,
  `[style*="background:${WHITE_HEX}"]`,
  `[bgcolor="${WHITE_HEX}"]`,
);

const WRAPPER_BLOCKS = is('.node-type-wrapper', '.node-type-advanced_wrapper');
const HERO_BLOCKS    = is('.node-type-hero', '.node-type-advanced_hero');
const CONTAINER_BLOCKS = is(
  '.node-type-section', '.node-type-group', '.node-type-carousel',
  '.node-type-accordion', '.node-type-navbar', '.node-type-social', '.node-type-table',
  '.node-type-advanced_section', '.node-type-advanced_group', '.node-type-advanced_carousel',
  '.node-type-advanced_accordion', '.node-type-advanced_navbar', '.node-type-advanced_social',
  '.node-type-advanced_table',
);
const PREVIEW_ROOT = 'div[role="article"]';
const EDITOR_ROOT = '.node-type-page';
const EDITOR_DIRECT_SURFACE = 'div:not([id*="InteractivePrompt"])';

function joinSelectors(selectors: string[]) {
  return selectors.join(',\n');
}

function pageShellSelectors(root: string, firstSurface: string) {
  return joinSelectors([
    root,
    `${root} > ${firstSurface}`,
    `${root} > ${firstSurface} > table`,
    `${root} > ${firstSurface} > table > tbody`,
    `${root} > ${firstSurface} > table > tbody > tr`,
    `${root} > ${firstSurface} > table > tbody > tr > td`,
  ]);
}

function blockSurfaceSelectors(root: string, firstSurface: string, blocks: string) {
  return joinSelectors([
    `${root} ${blocks}.email-block${DEFAULT_BG}`,
    `${root} ${blocks}.email-block > ${firstSurface}${DEFAULT_BG}`,
    `${root} ${blocks}.email-block > table${DEFAULT_BG}`,
    `${root} ${blocks}.email-block > table > tbody${DEFAULT_BG}`,
    `${root} ${blocks}.email-block > table > tbody > tr${DEFAULT_BG}`,
    `${root} ${blocks}.email-block > table > tbody > tr > td${DEFAULT_BG}`,
  ]);
}

const DARK_EMAIL_CSS_RAW = `
:root { color-scheme: dark; }

${pageShellSelectors(PREVIEW_ROOT, 'div')} {
  background-color: ${DARK_PAGE_BG} !important;
  background: ${DARK_PAGE_BG} !important;
}
${PREVIEW_ROOT} { color: ${DARK_TEXT_COLOR} !important; }

${PREVIEW_ROOT} a:not([style*='color']),
${PREVIEW_ROOT} a span:not([style*='color']) {
  color: ${DARK_LINK_COLOR} !important;
}

${PREVIEW_ROOT} table, ${PREVIEW_ROOT} td,
${PREVIEW_ROOT} th, ${PREVIEW_ROOT} hr {
  border-color: ${DARK_BORDER_COLOR} !important;
}

${PREVIEW_ROOT} table${EXPLICIT_WHITE_BG},
${PREVIEW_ROOT} td${EXPLICIT_WHITE_BG},
${PREVIEW_ROOT} th${EXPLICIT_WHITE_BG},
${PREVIEW_ROOT} div${EXPLICIT_WHITE_BG} {
  background-color: ${DARK_BLOCK_BG} !important;
  background: ${DARK_BLOCK_BG} !important;
}

${PREVIEW_ROOT} img { opacity: 1 !important; }
`;

export const PREVIEW_BASE_CSS = '<style data-preview-base>div[role="article"]{padding-bottom:100px;box-sizing:border-box}</style>';

export const DARK_EMAIL_CSS = `<style data-dark-email>${DARK_EMAIL_CSS_RAW}</style>`;

export const DARK_EDITOR_CSS_RAW = `
${pageShellSelectors(EDITOR_ROOT, EDITOR_DIRECT_SURFACE)} {
  background-color: ${DARK_PAGE_BG} !important;
  background: ${DARK_PAGE_BG} !important;
}
${EDITOR_ROOT} { color: ${DARK_TEXT_COLOR} !important; }

${blockSurfaceSelectors(EDITOR_ROOT, EDITOR_DIRECT_SURFACE, WRAPPER_BLOCKS)} {
  background-color: ${DARK_PAGE_BG} !important;
  background: ${DARK_PAGE_BG} !important;
}
${blockSurfaceSelectors(EDITOR_ROOT, EDITOR_DIRECT_SURFACE, HERO_BLOCKS)} {
  background-color: ${DARK_BLOCK_BG} !important;
  background: ${DARK_BLOCK_BG} !important;
}
${blockSurfaceSelectors(EDITOR_ROOT, EDITOR_DIRECT_SURFACE, CONTAINER_BLOCKS)} {
  background-color: ${DARK_BLOCK_BG} !important;
  background: ${DARK_BLOCK_BG} !important;
}

[id*="InteractivePrompt"] {
  background-color: transparent !important;
  background: transparent !important;
}

${EDITOR_ROOT} a:not([style*='color']),
${EDITOR_ROOT} a span:not([style*='color']) {
  color: ${DARK_LINK_COLOR} !important;
}

${EDITOR_ROOT} table, ${EDITOR_ROOT} td,
${EDITOR_ROOT} th, ${EDITOR_ROOT} hr {
  border-color: ${DARK_BORDER_COLOR} !important;
}

${EDITOR_ROOT} img { opacity: 1 !important; }
`;
