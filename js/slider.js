const generateSlider = (range) => {
  noUiSlider.create(range, {
    range: {
      'min': 0,
      'max': 1
    },
    step: 0.1,
    start: 1,
    format: {
      to: (value) => value,
      from: (value) => parseFloat(value)
    }
  });
};

const updateSliderRange = (sliderElement, minRange, maxRange, step, start) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minRange,
      max: maxRange
    },
    step: step,
    start: start
  });
};

const resetFilter = (uploadImageElement, originalEffectElement) => {
  uploadImageElement.style.transform = `scale(${1})`;
  originalEffectElement.setAttribute('checked', 'checked');
  uploadImageElement.style.filter = '';
};

export { generateSlider, updateSliderRange, resetFilter };
