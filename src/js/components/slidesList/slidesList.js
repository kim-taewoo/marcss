import * as state from '../../states/index.js';
import {setActiveSlide} from '../../states/actions/index.js';

const slidesList = document.querySelector('.slides-list');

const syncOutputScroll = (prevIndex, index) => {
  const prevActiveSlide = slidesList.children[prevIndex];
  const activeSlide = slidesList.children[index];
  if (!prevActiveSlide || !activeSlide) return;
  prevActiveSlide.classList.remove('active');
  activeSlide.classList.add('active');

  const {offsetTop, clientHeight} = activeSlide;
  const parentClidentHeight = slidesList.clientHeight;
  const slideMiddle = offsetTop - parentClidentHeight / 2 + clientHeight / 2;
  const targetScrollTop = slideMiddle > 0 ? slideMiddle : 0;

  slidesList.scrollTo({
    top: targetScrollTop,
    behavior: 'smooth',
  });
};

const handleSlidesClick = ({target}) => {
  // 클릭된 슬라이드 인덱스 찾기.
  let el = target;
  while (!el.dataset.slideIndex) {
    el = el.parentNode;
    // 슬라이드가 아닌 부분을 클릭한 경우 종료
    if (el.nodeName === 'BODY') return;
  }
  const selectedSlideIdx = el.dataset.slideIndex;
  setActiveSlide(selectedSlideIdx);
};

export const attachSlidesClickHandler = () => {
  slidesList.addEventListener('click', handleSlidesClick);
};

export const attachSlidesStateObserver = () => {
  state.slides.observe((_, {slides}) => {
    slidesList.innerHTML = slides.map(({htmlString}) => htmlString).join('');
  });
};

export const attachActiveSlideStateObserver = () => {
  state.activeSlide.observe(({index: prevIndex}, {index}) => {
    // index 가 -1 인 경우는 global slides 스타일을 지정하려는 때입니다. 스크롤 맞출 필요가 없으니 종료합니다.
    if (index === -1) return;
    syncOutputScroll(prevIndex, index);
  });
};
