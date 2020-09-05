import {attachFileDownloadHandler} from './downloadDropdown.js';
import {attachFileUploadHandler} from './uploadDropdown.js';
import {attachSlideShowStartHandler} from './slideShowBtn.js';

export const initNavbar = () => {
  attachFileDownloadHandler();
  attachFileUploadHandler();
  attachSlideShowStartHandler();
};
