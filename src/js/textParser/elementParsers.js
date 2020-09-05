import {
  LI_REGEXP,
  DOUBLE_LINEBREAK_REGEXP,
  TEXT_UNDERLINE_REGEXP,
  TEXT_INLINE_CODE_REGEXP,
  TEXT_LINETHROUGH_REGEXP,
  TEXT_ITALIC_REGEXP,
  TEXT_BOLD_REGEXP
} from './constants.js';

const parseInlineTextStyling = text => {
  const parsedText = text
    .replace(TEXT_BOLD_REGEXP, (_, match) => `<span class="priority-bold">${match}</span>`)
    .replace(TEXT_ITALIC_REGEXP, (_, match) => `<span class="priority-italic">${match}</span>`)
    .replace(TEXT_LINETHROUGH_REGEXP, (_, match) => `<span class="marked-deleted">${match}</span>`)
    .replace(TEXT_INLINE_CODE_REGEXP, (_, match) => `<code class="inline-code">${match}</code>`)
    .replace(TEXT_UNDERLINE_REGEXP, (_, match) => `<span class="priority-underline">${match}</span>`);
  return parsedText;
};

export const parseTitle = (_, {length}, content) => `<h${length}>${parseInlineTextStyling(content)}</h${length}>\n`;

export const parseImg = (_, alt, src) => `<img alt="${alt}x" src="${src}" />\n`;

export const parseLink = (_, linkName, src) => `<a href="${src}" target="_blank">${linkName}</a>\n`;

export const parseQuote = (_, quote) => `<blockquote><p>${quote}</p></blockquote>`;

export const parseParagraph = (_, content) => content
  .split(DOUBLE_LINEBREAK_REGEXP)
  .map(paragraph => `<p>${parseInlineTextStyling(paragraph)}</p>\n`)
  .join('');

export const parseList = matchedRange => {
  const parsedListItems = matchedRange.replace(LI_REGEXP, (_, {length}, listStyle, content) => {
    const depth = Math.floor(length / 2);
    const marker = listStyle === '-' ? '•' : listStyle === '*' ? '◦' : listStyle;
    return `<li>${'  '.repeat(depth)}${marker} ${parseInlineTextStyling(content)}</li>\n`;
  });

  return `<ul>${parsedListItems}</ul>\n`;
};
