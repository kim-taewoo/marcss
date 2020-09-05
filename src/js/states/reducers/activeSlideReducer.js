import {SET_ACTIVE_SLIDE, SET_CURRENT_TEXT_IDX} from '../types/activeSlideTypes.js';

export default (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_SLIDE:
      return {
        ...state,
        ...action.payload,
      };
    case SET_CURRENT_TEXT_IDX:
      return {
        ...state,
        currentTextIdx: action.payload,
      };
    default:
      return state;
  }
};
