import {
  attachInputFieldChangeHandler,
  attachInputFieldClickHandler,
  attachSlidesStateObserver,
  attachActiveSlideStateObserver
} from './markdownInputField.js';

export const initMarkdownInputField = () => {
  attachInputFieldChangeHandler();
  attachInputFieldClickHandler();
  attachSlidesStateObserver();
  attachActiveSlideStateObserver();
};
