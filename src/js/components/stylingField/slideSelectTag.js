import * as state from '../../states/index.js';
import {setActiveSlide, setActiveSlideAsGlobal} from '../../states/actions/index.js';

const slideSelectTag = document.querySelector('#slide-select');

const syncStylingSelectTagOptions = slidesLength => {
  slideSelectTag.innerHTML = '';
  for (let index = 1; index <= slidesLength; index++) {
    const option = `<option value="${index}">${index}</option>`;
    slideSelectTag.insertAdjacentHTML('beforeend', option);
  }
  slideSelectTag.insertAdjacentHTML('afterbegin', '<option value="all">전체</option>');
  slideSelectTag.selectedIndex = 0;
};

const handleSlideSelectTagChange = ({target: {value}}) => {
  value === 'all' ? setActiveSlideAsGlobal() : setActiveSlide(+value - 1);
};

export const attachSlideSelectChangeHandler = () => {
  slideSelectTag.addEventListener('change', handleSlideSelectTagChange);
};

export const attachSlidesStateObserverForTag = () => {
  state.slides.observe(({slides: prevSlides}, {slides}) => {
    if (prevSlides.length === slides.length) return;
    // 슬라이드 개수가 변경되었을 경우 동기화 작업 진행
    syncStylingSelectTagOptions(slides.length);
  });
};

export const attachActiveSlideStateObserver = () => {
  state.activeSlide.observe((_, {index}) => {
    slideSelectTag.selectedIndex = +index + 1;
  });
};
