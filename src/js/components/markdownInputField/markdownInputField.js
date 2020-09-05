import * as state from '../../states/index.js';
import {setSlidesFromRawText, setActiveSlideFromTextIdx, setCurrentTextIdx} from '../../states/actions/index.js';
import {STOP_KEYS, OFFSET_HEIGHT} from '../../constants.js';

const markdownInputField = document.querySelector('.markdown-input-field');

const handleMarkdownInputChange = ({target, keyCode}) => {
  if (STOP_KEYS.includes(keyCode)) return;
  setSlidesFromRawText(target.value);
  const textIdx = target.selectionStart;
  setActiveSlideFromTextIdx(textIdx);
};

export const attachInputFieldChangeHandler = () => {
  markdownInputField.addEventListener('keyup', handleMarkdownInputChange);
  markdownInputField.value = "";
  markdownInputField.dispatchEvent(new Event('keyup'));
  markdownInputField.focus();
};

const handleTextAreaClick = ({currentTarget}) => {
  const selectionIdx = currentTarget.selectionStart;
  setActiveSlideFromTextIdx(selectionIdx);
};

export const attachInputFieldClickHandler = () => {
  markdownInputField.addEventListener('click', handleTextAreaClick);
};

// 상태 변화에 따른 화면 변화 렌더링
export const attachSlidesStateObserver = () => {
  state.slides.observe(({slides: prevSlides}, {slides, markdown}) => {
    if (markdownInputField.value !== markdown) markdownInputField.value = markdown;
    if (prevSlides.length === slides.length) return;
    // 슬라이드 개수가 변경되었을 경우 동기화 작업 진행
    setCurrentTextIdx(markdownInputField.selectionStart);
  });
};

const calcInputScrollTop = (targetScrollHeight, parentClientHeight) => {
  if (targetScrollHeight <= parentClientHeight) return 0;
  const targetScrollHeightCenter = targetScrollHeight - parentClientHeight / 2 + OFFSET_HEIGHT;
  return targetScrollHeightCenter;
};

// textarea 내 특정 slide 와 관련있는 text 의 index 값에 맞는 스크롤 높이를 구해야 한다.
// 해당 인덱스까지의 텍스트까지의 substring 을 가졌을 때 높이를 구하기 위해 임시적으로 textarea 의 값을 변경했다가
// 다시 복구하는 꼼수를 이용했다.
const syncInputScroll = textEndsIdx => {
  const {
    value: originalText,
    scrollTop: originalScrollPosition,
    clientHeight: markdownInputFieldHeight,
  } = markdownInputField;
  markdownInputField.value = originalText.substring(0, textEndsIdx);
  const targetScrollHeight = markdownInputField.scrollHeight;
  markdownInputField.value = originalText;
  markdownInputField.scrollTop = originalScrollPosition;
  const targetScrollTop = calcInputScrollTop(targetScrollHeight, markdownInputFieldHeight);
  markdownInputField.scrollTo({
    top: targetScrollTop,
    behavior: 'smooth',
  });
};

export const attachActiveSlideStateObserver = () => {
  state.activeSlide.observe((_, {index, isFromSlideClick, textRange: [textEndsIdx]}) => {
    if (index === -1) return;
    if (isFromSlideClick) {
      syncInputScroll(textEndsIdx);
    }
  });
};
