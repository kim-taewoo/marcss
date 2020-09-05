import * as state from '../index.js';
import {SET_ACTIVE_SLIDE, SET_CURRENT_TEXT_IDX} from '../types/activeSlideTypes.js';
import {getTargetSlideStyle} from './index.js';

const getMatchingSlideIdx = textIdx => {
  const {slides} = state.slides.getState();
  const selectedSlideIdx = slides.findIndex(({endIdx}) => textIdx <= endIdx);

  return selectedSlideIdx;
};

export const setActiveSlide = (index, isFromSlideClick = true) => {
  const {slides} = state.slides.getState();
  if (!slides[+index]) return;
  const {startIdx, endIdx} = slides[+index];
  const slideStyle = getTargetSlideStyle(+index + 1);

  state.activeSlide.dispatch({
    type: SET_ACTIVE_SLIDE,
    payload: {
      index,
      isFromSlideClick,
      slideStyle,
      textRange: [startIdx, endIdx],
    },
  });
};

export const setActiveSlideAsGlobal = () => {
  const slideStyle = getTargetSlideStyle('all');
  state.activeSlide.dispatch({
    type: SET_ACTIVE_SLIDE,
    payload: {
      index: -1,
      isFromSlideClick: false,
      slideStyle,
      textRange: [],
    },
  });
};

export const setActiveSlideFromTextIdx = textIdx => {
  const selectedSlideIdx = getMatchingSlideIdx(textIdx);
  // `---` 부분을 클릭했을 때는 슬라이드 외 부분이라 인덱스를 찾을 수 없음
  selectedSlideIdx !== -1 && setActiveSlide(selectedSlideIdx, false);
};

export const setCurrentTextIdx = textIdx => {
  state.activeSlide.dispatch({
    type: SET_CURRENT_TEXT_IDX,
    payload: textIdx,
  });
};
