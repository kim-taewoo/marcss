import {SET_GLOBAL_SLIDE_STYLE, ADD_SLIDE_STYLE, SYNC_STYLE_STATE, IMPORT_STYLES, RESET_STYLES} from '../types/slidesStyleTypes.js';

export default (state, action) => {
  switch (action.type) {
    case SET_GLOBAL_SLIDE_STYLE:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_SLIDE_STYLE:
      return {
        ...state,
        slidesStyle: {...state.slidesStyle, ...action.payload.parsed},
        slidesStyleRaw: {...state.slidesStyleRaw, ...action.payload.raw},
      };
    case SYNC_STYLE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case IMPORT_STYLES:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_STYLES:
      return {
        globalStyle: '',
        globalStyleRaw: '',
        slidesStyle: {},
        slidesStyleRaw: {},
      };
    default:
      return state;
  }
};
