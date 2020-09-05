import {startPresentation, addOrRemoveFullscreenController} from './fullscreen.js';

const handleFullscreenModeChange = () => {
  addOrRemoveFullscreenController();
};

const handleSlideShowBtnClick = async () => {
  await startPresentation();
};

export const attachSlideShowStartHandler = () => {
  const slideshowBtn = document.querySelector('.slideshow-btn');
  slideshowBtn.addEventListener('click', handleSlideShowBtnClick);
  document.addEventListener('fullscreenchange', handleFullscreenModeChange);
};
