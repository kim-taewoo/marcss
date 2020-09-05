import {SET_SLIDES} from '../types/slidesTypes.js';

export default (state, action) => {
  switch (action.type) {
    case SET_SLIDES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
