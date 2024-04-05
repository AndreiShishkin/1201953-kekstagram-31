import { generateSlider, updateSliderRange } from './slider.js';

const scaleImage = (scaleValueInput, uploadImagePreviewImput) => function (evt) {
  if (evt.target.nodeName === 'BUTTON') {
    let scaleValue = parseInt(scaleValueInput.value, 10);
    if (evt.target.classList.contains('scale__control--smaller')) {
      if (scaleValue > 25) {
        scaleValue -= 25;
      }
    } else {
      if (scaleValue < 100) {
        scaleValue += 25;
      }
    }
    scaleValueInput.value = `${scaleValue}%`;
    uploadImagePreviewImput.style.transform = `scale(${scaleValue / 100})`;
  }
};

const editPicture = (range, uploadPicture, sliderContainer, effectLevel) => {
  let effectValue;
  generateSlider(range);

  const onSliderChange = (evt) => {
    effectValue = evt.target.value;

    if(effectValue === 'none') {
      sliderContainer.classList.add('hidden');

    } else {
      sliderContainer.classList.remove('hidden');
    }

    switch (effectValue) {
      case 'none':
        uploadPicture.style.filter = '';
        effectLevel.value = '';
        break;

      case 'chrome':
        updateSliderRange(range, 0, 1, 0.1, 1);
        break;

      case 'sepia':
        updateSliderRange(range, 0, 1, 0.1, 1);
        break;

      case 'marvin':
        updateSliderRange(range, 0, 100, 1, 100);
        break;

      case 'phobos':
        updateSliderRange(range, 0, 3, 0.1, 3);
        break;

      case 'heat':
        updateSliderRange(range, 1, 3, 0.1, 3);
        break;
    }
  };

  range.noUiSlider.on('update', (value) => {
    switch (effectValue) {
      case 'chrome':
        uploadPicture.style.filter = `grayscale(${value})`;
        break;

      case 'sepia':
        uploadPicture.style.filter = `sepia(${value})`;
        break;

      case 'marvin':
        uploadPicture.style.filter = `invert(${value}%)`;
        break;

      case 'phobos':
        uploadPicture.style.filter = `blur(${value}px)`;
        break;

      case 'heat':
        uploadPicture.style.filter = `brightness(${value})`;
        break;
    }

    effectLevel.value = value;
  });

  return onSliderChange;
};

export { scaleImage, editPicture };
