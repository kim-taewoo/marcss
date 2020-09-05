import * as state from '../../states/index.js';
import {
  ALERT_MESSAGE_FIRST_SLIDE,
  ALERT_MESSAGE_LAST_SLIDE,
  ALERT_UNABLE_FULLSCREEN,
  ARROW_LEFT_KEY,
  ARROW_RIGHT_KEY,
  TO_NEXT_SLIDE,
  TO_PREV_SLIDE
} from '../../constants.js';

const presentationBase = document.querySelector('.presentation-base');
const presentationController = document.querySelector('.presentation-controller-field');
const presentationInfo = presentationController.querySelector('.presentation-info');

const showState = {
  slides: [],
  currentSlideIdx: 0,
  slidesRoot: null,
};

const updatePresentationInfo = () => {
  presentationInfo.textContent = `${showState.currentSlideIdx + 1}/${showState.slides.length}`;
};

const moveSlide = idx => {
  if (idx > showState.slides.length - 1) {
    alert(ALERT_MESSAGE_LAST_SLIDE);
    return;
  }

  if (idx < 0) {
    alert(ALERT_MESSAGE_FIRST_SLIDE);
    return;
  }

  const targetSlide = showState.slidesRoot.children[idx];
  targetSlide.classList.remove('prev');
  targetSlide.classList.remove('next');
  targetSlide.classList.add('current');

  if (idx < showState.slides.length - 1) showState.slidesRoot.children[idx + 1].classList.add('next');
  if (idx > 0) showState.slidesRoot.children[idx - 1].classList.add('prev');
  updatePresentationInfo();
};

const moveToNextSlide = () => {
  showState.currentSlideIdx++;
  moveSlide(showState.currentSlideIdx);
};

const moveToPrevSlide = () => {
  showState.currentSlideIdx--;
  moveSlide(showState.currentSlideIdx);
};

const handleKeyPressInFullscreenMode = ({key}) => {
  if (key === ARROW_RIGHT_KEY) {
    moveToNextSlide();
  } else if (key === ARROW_LEFT_KEY) {
    moveToPrevSlide();
  }
};

const handlePresentationControllerMouseOver = ({currentTarget}) => {
  currentTarget.firstElementChild.style.display = 'flex';
};

const hideController = () => {
  presentationController.firstElementChild.style.display = 'none';
};

const handlePresentationControllerClick = ({
  target: {
    dataset: {control},
  },
}) => (
  control === TO_NEXT_SLIDE
    ? moveToNextSlide()
    : control === TO_PREV_SLIDE
      ? moveToPrevSlide()
      : hideController()
);


const cleanupPresentationshowState = () => {
  presentationBase.removeChild(showState.slidesRoot);
  presentationBase.style.display = 'none';
  showState.slidesRoot = null;
  showState.currentSlideIdx = 0;
};

const attachPresentationControllers = () => {
  document.addEventListener('keyup', handleKeyPressInFullscreenMode);
  presentationController.addEventListener('mouseover', handlePresentationControllerMouseOver);
  presentationController.addEventListener('click', handlePresentationControllerClick);
};

const detachPresentationControllers = () => {
  document.removeEventListener('keyup', handleKeyPressInFullscreenMode);
  presentationController.removeEventListener('mouseover', handlePresentationControllerMouseOver);
  presentationController.removeEventListener('click', handlePresentationControllerClick);
};

export const addOrRemoveFullscreenController = () => {
  if (document.fullscreenElement) {
    attachPresentationControllers();
    return;
  }
  detachPresentationControllers();
  cleanupPresentationshowState();
};

const setPresentationShowState = () => {
  showState.slidesRoot = document.createElement('div');
  showState.slidesRoot.classList.add('slides-root');
  showState.slides = state.slides.getState().slides;
  showState.slidesRoot.innerHTML = showState.slides.map(({htmlString}) => htmlString).join('');
  presentationBase.appendChild(showState.slidesRoot);
  moveSlide(0);
  updatePresentationInfo();
  presentationBase.style.display = 'block';
};

export const startPresentation = async () => {
  setPresentationShowState();
  await presentationBase.requestFullscreen().catch(_ => alert(ALERT_UNABLE_FULLSCREEN));
};
