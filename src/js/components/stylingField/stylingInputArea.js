import {setGlobalSlideStyle, addSlideStyle, syncStyleState} from '../../states/actions/index.js';
import * as state from '../../states/index.js';
import {SUCCESS_MESSAGE, SUCCESS_MESSAGE_SHOWING_TIME, DEFALUT_SAVE_BTN_TEXT} from '../../constants.js';

const stylingSaveBtn = document.querySelector('.save-styling-btn');
const slideCSSTextArea = document.querySelector('#slide-css');

export const handleStylingSaveBtnClick = () => {
  const targetSlideIdx = state.activeSlide.getState().index;
  if (!slideCSSTextArea.value) return;
  targetSlideIdx === -1
    ? setGlobalSlideStyle(slideCSSTextArea.value)
    : addSlideStyle(+targetSlideIdx + 1, slideCSSTextArea.value);

  stylingSaveBtn.innerText = SUCCESS_MESSAGE;
  setTimeout(() => {
    stylingSaveBtn.innerText = DEFALUT_SAVE_BTN_TEXT;
  }, SUCCESS_MESSAGE_SHOWING_TIME);
};

export const attachStylingSaveHandler = () => {
  stylingSaveBtn.addEventListener('click', handleStylingSaveBtnClick);
};

export const attachSlidesStyleStateObserver = () => {
  const customGlobalStyleTag = document.head.querySelector('.custom-style-global');
  const customStyleTag = document.head.querySelector('.custom-style');
  state.styles.observe((_, {globalStyle, slidesStyle}) => {
    customGlobalStyleTag.innerHTML = globalStyle;
    customStyleTag.innerHTML = Object.values(slidesStyle).join('');
  });
};

export const attachSlidesStateObserverForSyncState = () => {
  state.slides.observe(({slides: prevSlides}, {slides}) => {
    if (prevSlides.length === slides.length) return;
    // 슬라이드 개수가 변경된 경우 동기화 진행
    const lengthDiff = slides.length - prevSlides.length;
    syncStyleState(lengthDiff);
  });
};

export const attachActiveSlideStateObserverForSyncInput = () => {
  state.activeSlide.observe((_, {slideStyle}) => {
    slideCSSTextArea.value = slideStyle || '';
  });
};
