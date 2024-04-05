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

  const onChangeSelectEffect = (evt) => {
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
        updateSliderRange(range, 1, 3, 0.1, 2);
        break;
    }
  };

  range.noUiSlider.on('update', (value) => {
    switch (effectValue) {
      case 'chrome':
        uploadPicture.style.filter = `grayscale(${1 - value})`;
        break;

      case 'sepia':
        uploadPicture.style.filter = `sepia(${1 - value})`;
        break;

      case 'marvin':
        uploadPicture.style.filter = `invert(${100 - value}%)`;
        break;

      case 'phobos':
        uploadPicture.style.filter = `blur(${3 - value}px)`;
        break;

      case 'heat':
        uploadPicture.style.filter = `brightness(${3 - value})`;
        break;
    }

    effectLevel.value = value;
  });

  return onChangeSelectEffect;
};

export { scaleImage, editPicture };
