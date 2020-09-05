import {attachSlidesClickHandler, attachSlidesStateObserver, attachActiveSlideStateObserver} from './slidesList.js';

export const initSlidesList = () => {
  attachSlidesClickHandler();
  attachSlidesStateObserver();
  attachActiveSlideStateObserver();
};
