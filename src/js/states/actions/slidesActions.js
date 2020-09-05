import * as state from '../index.js';
import {SET_SLIDES} from '../types/slidesTypes.js';
import {parseRawText} from '../../textParser/index.js';

export const setSlidesFromRawText = rawtext => {
  const slides = parseRawText(rawtext);

  state.slides.dispatch({
    type: SET_SLIDES,
    payload: {slides, markdown: rawtext},
  });
};
