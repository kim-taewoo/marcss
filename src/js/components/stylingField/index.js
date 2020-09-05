import {attachStylingFieldOnOffHandler} from './stylingStartExitBtns.js';
import {
  attachSlideSelectChangeHandler,
  attachSlidesStateObserverForTag,
  attachActiveSlideStateObserver
} from './slideSelectTag.js';
import {
  attachStylingSaveHandler,
  attachSlidesStyleStateObserver,
  attachSlidesStateObserverForSyncState,
  attachActiveSlideStateObserverForSyncInput
} from './stylingInputArea.js';

export const initStylingField = () => {
  attachStylingFieldOnOffHandler();
  attachSlideSelectChangeHandler();
  attachActiveSlideStateObserverForSyncInput();
  attachStylingSaveHandler();

  attachSlidesStateObserverForTag();
  attachActiveSlideStateObserver();
  attachSlidesStyleStateObserver();
  attachSlidesStateObserverForSyncState();
};
