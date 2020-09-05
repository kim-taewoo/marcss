import * as state from '../../states/index.js';
import {FILE_TYPES} from '../../constants.js';

const startDownload = (targetState, downloadType, fileType = 'json') => {
  const data = fileType === 'json' ? JSON.stringify(targetState) : targetState;
  const dataType = fileType === 'json' ? 'application/json' : 'text/plain';
  const dataUri = `data:${dataType};charset=utf-8,${encodeURIComponent(data)}`;
  const fileName = `marcss_${downloadType}.${fileType}`;
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', fileName);
  linkElement.click();
};

export const exportFile = downloadType => {
  const slidesState = state.slides.getState();
  const stylesState = state.styles.getState();
  switch (downloadType) {
    case FILE_TYPES.MARCSS:
      {
        const targetState = {...slidesState, ...stylesState};
        startDownload(targetState, downloadType);
      }
      break;
    case FILE_TYPES.MARKDOWN:
      {
        const markdown = slidesState[downloadType];
        startDownload(markdown, downloadType, 'md');
      }
      break;
    case FILE_TYPES.STYLE:
      startDownload(stylesState, downloadType);
      break;
    default:
      break;
  }
};

const handleDownloadBtnClick = ({
  target: {
    dataset: {downloadType},
  },
}) => {
  exportFile(downloadType);
};

export const attachFileDownloadHandler = () => {
  const downloadOptions = document.querySelector('.download');
  downloadOptions.addEventListener('click', handleDownloadBtnClick);
};
