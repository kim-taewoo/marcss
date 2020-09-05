import {
  SLIDE_DIVIDE_REGEXP,
  TITLE_REGEXP,
  IMG_REGEXP,
  PARAGRAPH_REGEXP,
  LINK_REGEXP,
  LIST_REGEXP,
  LINEBREAK_REGEXP,
  QUOTE_REGEXP,
  DIVIDER_LENGTH
} from './constants.js';
import {parseImg, parseParagraph, parseList, parseTitle, parseLink, parseQuote} from './elementParsers.js';

const wrapInSlideWrapper = (parsedSlideString, idx) => `<section class="slide-wrapper" tabindex="0" data-slide-index="${idx}">
    <svg class="slide-svg-wrapper" viewBox="0 0 1600 900">
      <foreignObject width="1600" height="900">
        <div class="slide">
          <pre>${parsedSlideString}</pre>
        </div>
      </foreignObejct>
    </svg>
  </section>`;

const parseSlideString = (slideString = '') => slideString
  .replace(TITLE_REGEXP, parseTitle)
  .replace(LIST_REGEXP, parseList)
  .replace(QUOTE_REGEXP, parseQuote)
  .replace(IMG_REGEXP, parseImg)
  .replace(PARAGRAPH_REGEXP, parseParagraph)
  .replace(LINK_REGEXP, parseLink)
  .replace(LINEBREAK_REGEXP, '');

export const parseRawText = rawText => {
  // 배열의 첫번째 요소는 첫 슬라이드를 위한 보정값
  const slideDividers = [{index: -DIVIDER_LENGTH}, ...rawText.matchAll(SLIDE_DIVIDE_REGEXP)];

  const slides = slideDividers.map((divider, idx, dividers) => {
    const slideStartIndex = divider.index + DIVIDER_LENGTH;
    const slideEndIndexTemp = dividers[idx + 1] ? dividers[idx + 1].index - 1 : rawText.length + 1;
    const slideEndIndex = Math.max(slideEndIndexTemp, slideStartIndex);
    const slideRawTextRange = rawText.slice(slideStartIndex, slideEndIndex);
    const parsedSlideString = parseSlideString(slideRawTextRange);
    const slideHTMLString = wrapInSlideWrapper(parsedSlideString, idx);

    return {
      idx,
      startIdx: slideStartIndex,
      endIdx: slideEndIndex,
      htmlString: slideHTMLString,
    };
  });

  return slides;
};
