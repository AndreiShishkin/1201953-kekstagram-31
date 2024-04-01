const generateId = () => {
  let id = 0;

  return function() {
    id++;
    return id;
  };
};

const SHOW_ERROR_TIME = 5000;


const getRandomNumberFromRange = (min, max) =>
  Math.round(min + (max - min) * Math.random());

const getRandomArrayElement = (array) => array[getRandomNumberFromRange(0, array.length - 1)];

const getUnicueIdentifierFromRange = (min, max) => {
  const createdIdentifiers = [];

  return function() {
    let randomValue = getRandomNumberFromRange(min, max);

    if(createdIdentifiers.length >= (max - min + 1)) {
      console.error(`Идентификаторы в диапазоне от ${min} до ${max} созданы`);
      return;
    }

    while(createdIdentifiers.includes(randomValue)) {
      randomValue = getRandomNumberFromRange(min, max);
    }

    createdIdentifiers.push(randomValue);
    return randomValue;
  };
};

const getStringFromArray = (elements) => {
  function getElement() {
    const element = getRandomArrayElement(elements);
    return element;
  }

  return getElement;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const errorBlock = document.querySelector('#data-error').content.querySelector('.data-error');
  if(message) {
    errorBlock.querySelector('h2').textContent = message;
  }
  document.body.insertAdjacentElement('beforeend', errorBlock);
  setTimeout(() => {
    errorBlock.remove();
  }, SHOW_ERROR_TIME);
};


export {generateId, getUnicueIdentifierFromRange, getStringFromArray, getRandomArrayElement, getRandomNumberFromRange, isEscapeKey, showAlert};
