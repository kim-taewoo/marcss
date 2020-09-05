export const SLIDE_DIVIDE_REGEXP = /^---$/gm;
export const TITLE_REGEXP = /^\r?[\r\n]?(#{1,6}) (.+)$/gm;
export const IMG_REGEXP = /!\[(.*?)\](?:\r?[\r\n])?\((.*?)\)/gm;
export const LINK_REGEXP = /[^!]\[(.*?)\](?:\r?[\r\n])?\((.*?)\)/gm;
export const LIST_REGEXP = /^([^\S\r\n]*)(\*|-|\d+\.) ([^](?!(^<\w+>|^\s*[\wㄱ-힣]{2,})))+/gm;
export const LI_REGEXP = /^([^\S\r\n]*)(\*|-|\d+\.) (.+)$/gm;
export const PARAGRAPH_REGEXP = /^([^<]+)$/gm;
export const LINEBREAK_REGEXP = /\r?[\r\n]/g;
export const QUOTE_REGEXP = /^> (.+)$/gm;
export const DOUBLE_LINEBREAK_REGEXP = /\r?[\r\n]\r?[\r\n]/;

export const TEXT_BOLD_REGEXP = /\*\*(.+?)\*\*/gm;
export const TEXT_ITALIC_REGEXP = /\*(.+?)\*/gm;
export const TEXT_LINETHROUGH_REGEXP = /~~(.+?)~~/gm;
export const TEXT_INLINE_CODE_REGEXP = /`(.+?)`/gm;
export const TEXT_UNDERLINE_REGEXP = /__(.+?)__/gm;

export const DIVIDER_LENGTH = 4;
