import {setSlidesFromRawText, setStylesFromJSON, resetStyles} from '../../states/actions/index.js';
import {FILE_TYPES, ALERT_UPLOAD_PROBLEM} from '../../constants.js';

const setStatesFromUploadedFile = (uploadedText, uploadType) => {
  switch (uploadType) {
    case FILE_TYPES.MARCSS:
      {
        const {markdown, ...styles} = JSON.parse(uploadedText);
        setSlidesFromRawText(markdown);
        setStylesFromJSON(styles);
      }
      break;
    case FILE_TYPES.MARKDOWN:
      setSlidesFromRawText(uploadedText);
      resetStyles();
      break;
    case FILE_TYPES.STYLE:
      setStylesFromJSON(JSON.parse(uploadedText));
      break;
    default:
      break;
  }
};

const importFile = (target, uploadType) => {
  const fileReader = new FileReader();
  fileReader.onload = () => {
    setStatesFromUploadedFile(fileReader.result, uploadType);
    target.value = null;
  };
  fileReader.readAsText(target.files[0]);
};

const handleUploadFile = ({currentTarget}) => {
  if (!window.confirm(ALERT_UPLOAD_PROBLEM)) {
    currentTarget.value = null;
    return;
  }
  const {uploadType} = currentTarget.dataset;
  if (currentTarget.files[0]) importFile(currentTarget, uploadType);
};

export const attachFileUploadHandler = () => {
  const uploadFileMarcss = document.querySelector('#upload-marcss');
  const uploadFileMarkdown = document.querySelector('#upload-markdown');
  const uploadFileStyle = document.querySelector('#upload-style');

  uploadFileMarcss.addEventListener('change', handleUploadFile);
  uploadFileMarkdown.addEventListener('change', handleUploadFile);
  uploadFileStyle.addEventListener('change', handleUploadFile);
};
