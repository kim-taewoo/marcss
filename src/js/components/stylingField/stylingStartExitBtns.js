const stylingField = document.querySelector('.styling-field');
const stylingStartBtn = document.querySelector('.start-styling-btn');
const stylingExitBtn = stylingField.querySelector('.exit-btn');

export const attachStylingFieldOnOffHandler = () => {
  stylingStartBtn.addEventListener('click', () => {
    stylingField.style.display = 'block';
  });

  stylingExitBtn.addEventListener('click', () => {
    stylingField.style.display = 'none';
  });
};
