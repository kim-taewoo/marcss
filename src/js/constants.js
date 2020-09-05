const SHIFT = 16;
const CTRL = 17;
const ALT = 18;
const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const SLEEP = 95;

export const STOP_KEYS = [
  SHIFT,
  CTRL,
  ALT,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
  DOWN_ARROW,
  SLEEP,
];

export const DEFALUT_SAVE_BTN_TEXT = '저장';
export const SUCCESS_MESSAGE = '저장되었습니다';
export const SUCCESS_MESSAGE_SHOWING_TIME = 2500;

export const ALERT_UPLOAD_PROBLEM = '파일 업로드는 현재 작업중인 내용을 덮어씌웁니다. 계속 진행할까요?';

// file I/O
const MARCSS = 'marcss';
const STYLE = 'style';
const MARKDOWN = 'markdown';
export const FILE_TYPES = {
  MARCSS, STYLE, MARKDOWN,
};

// syncScroll
export const OFFSET_HEIGHT = 100;

// fullscreen Mode
export const ALERT_MESSAGE_LAST_SLIDE = '마지막 슬라이드입니다!';
export const ALERT_MESSAGE_FIRST_SLIDE = '첫번째 슬라이드입니다!';
export const ALERT_UNABLE_FULLSCREEN = '발표모드로 변경에 실패했습니다. 접속환경이 크롬 브라우저, 데스크탑이 맞는지 확인해주세요!';

export const ARROW_RIGHT_KEY = 'ArrowRight';
export const ARROW_LEFT_KEY = 'ArrowLeft';

export const TO_PREV_SLIDE = 'toPrev';
export const TO_NEXT_SLIDE = 'toNext';
