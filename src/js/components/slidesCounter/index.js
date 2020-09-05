import {attachSlidesStateObserver, attachActiveSlideStateObserver} from './slidesCounter.js';

export const initSlidesCounter = () => {
  attachSlidesStateObserver();
  attachActiveSlideStateObserver();
};
