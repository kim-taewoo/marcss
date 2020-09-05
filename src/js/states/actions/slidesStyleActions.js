import * as state from '../index.js';
import {
  SET_GLOBAL_SLIDE_STYLE,
  ADD_SLIDE_STYLE,
  SYNC_STYLE_STATE,
  IMPORT_STYLES,
  RESET_STYLES
} from '../types/slidesStyleTypes.js';

const CSS_REGEXP = /(?<selector>.*?)\{(?<rule>.*?)\}/gs;

export const getTargetSlideStyle = idx => {
  const {globalStyleRaw, slidesStyleRaw} = state.styles.getState();
  const targetStyle = idx === 'all' ? globalStyleRaw : slidesStyleRaw[+idx];
  return targetStyle;
};

export const setStylesFromJSON = jsonObj => {
  state.styles.dispatch({
    type: IMPORT_STYLES,
    payload: jsonObj,
  });
};

export const resetStyles = () => {
  state.styles.dispatch({
    type: RESET_STYLES,
  });
};

const parseSelector = (selector, targetIdx, isAnimation) => {
  if (isAnimation) {
    return targetIdx
      ? `.presentation-base .slide-wrapper:nth-child(${targetIdx}).${selector.substr(1)} `
      : `.presentation-base .slide-wrapper.${selector.substr(1)} `;
  }

  return targetIdx
    ? `.slide-wrapper:nth-child(${targetIdx}) .slide ${selector} `
    : `.slide-wrapper .slide ${selector} `;
};

const parseRule = (rule, isAnimation) => {
  const trimmedRule = rule.trim();
  const replacedRule = trimmedRule.replace('absolute', 'fixed').replace('margin', 'padding');
  if (isAnimation) {
    return `{ transform: none;${replacedRule}; }`;
  }
  return `{${replacedRule}}`;
};

const parseCSSText = (rawText, targetIdx = null) => {
  const cssStringArray = [...rawText.matchAll(CSS_REGEXP)];
  const validCSSString = cssStringArray
    .map(({groups: {selector, rule}}) => {
      const trimmedSelector = selector.trim();
      const isAnimation = trimmedSelector[0] === '@';
      const validSelector = parseSelector(trimmedSelector, targetIdx, isAnimation);
      const validRule = parseRule(rule, isAnimation);
      const validCSS = validSelector + validRule;
      return validCSS;
    })
    .join('');
  return validCSSString;
};

export const setGlobalSlideStyle = rawText => {
  const validCSSString = parseCSSText(rawText);
  state.styles.dispatch({
    type: SET_GLOBAL_SLIDE_STYLE,
    payload: {globalStyle: validCSSString, globalStyleRaw: rawText},
  });
};

export const addSlideStyle = (slideIdx, rawText) => {
  const validCSSString = parseCSSText(rawText, slideIdx);
  state.styles.dispatch({
    type: ADD_SLIDE_STYLE,
    payload: {
      parsed: {[slideIdx]: validCSSString},
      raw: {[slideIdx]: rawText},
    },
  });
};

const updateStyles = (styleObject, closestNextSlideIdx, startIdxToUpdate, lengthDiff) => {
  const rawStylePairsArray = Object.entries(styleObject)
    .filter(([idx, _]) => +idx < closestNextSlideIdx || +idx + lengthDiff >= closestNextSlideIdx)
    .map(([idx, style]) => {
      const updatedPair = +idx >= startIdxToUpdate ? [+idx + lengthDiff, style] : [+idx, style];
      return updatedPair;
    });
  const parsedStylePairsArray = rawStylePairsArray.map(([idx, style]) => [idx, parseCSSText(style, idx)]);
  const updatedStylesRaw = Object.fromEntries(rawStylePairsArray);
  const updatedStyles = Object.fromEntries(parsedStylePairsArray);
  return {
    slidesStyle: updatedStyles,
    slidesStyleRaw: updatedStylesRaw,
  };
};

export const syncStyleState = lengthDiff => {
  const {currentTextIdx} = state.activeSlide.getState();
  const {slides} = state.slides.getState();
  const closestNextSlide = slides.find(({endIdx}) => currentTextIdx < endIdx);
  // 정상적으로 맨 끝에 슬라이드가 추가된 경우 종료
  if (closestNextSlide.idx + 1 === slides.length) return;
  // slidesStyle 에서 사용하는 인덱스는 1부터 시작하는 인덱스이기에
  // 슬라이드 기준 인덱스에 1을 더해주어야 한다.
  const startIdxToUpdate = closestNextSlide.idx - lengthDiff + 1;
  const {slidesStyleRaw} = state.styles.getState();
  const updatedStyles = updateStyles(slidesStyleRaw, closestNextSlide.idx + 1, startIdxToUpdate, lengthDiff);
  state.styles.dispatch({
    type: SYNC_STYLE_STATE,
    payload: updatedStyles,
  });
};
