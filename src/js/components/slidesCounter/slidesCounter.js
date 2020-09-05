import * as state from '../../states/index.js';

const slidesTotal = document.querySelector('.slides-total');
const currentSlideNum = document.querySelector('.current-slide-num');

export const attachSlidesStateObserver = () => {
  state.slides.observe(({slides: prevSlides}, {slides}) => {
    if (prevSlides.length === slides.length) return;
    slidesTotal.textContent = slides.length;
  });
};

export const attachActiveSlideStateObserver = () => {
  state.activeSlide.observe((_, {index}) => {
    currentSlideNum.textContent = +index + 1;
  });
};
