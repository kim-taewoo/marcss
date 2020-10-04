import {createStore} from '../modules/stateManager.js';
import slidesReducer from './reducers/slidesReducer.js';
import activeSlideReducer from './reducers/activeSlideReducer.js';
import slidesStyleReducer from './reducers/slidesStyleReducer.js';

const slidesInitialState = {
  slides: [],
  markdown: '',
};

const activeSlideInitialState = {
  index: 0,
  isFromSlideClick: false,
  slideStyle: '',
  textRange: [],
};

const slidesStyleInitialState = {
  globalStyle: '',
  globalStyleRaw: `{
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  color: #222;
  font-size: 32px;
  line-height: 1.2;
  padding: 0 40px;
}`,
  slidesStyle: {},
  slidesStyleRaw: {},
};

const slides = createStore(slidesInitialState, slidesReducer);
const activeSlide = createStore(activeSlideInitialState, activeSlideReducer);
const styles = createStore(slidesStyleInitialState, slidesStyleReducer);

export {slides, activeSlide, styles};
