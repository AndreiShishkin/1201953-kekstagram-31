const SHOW_ERROR_TIME = 5000;


const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlertErrorLoadData = (message) => {
  const errorBlock = document.querySelector('#data-error').content.querySelector('.data-error');
  if (message) {
    errorBlock.querySelector('h2').textContent = message;
  }
  document.body.insertAdjacentElement('beforeend', errorBlock);
  setTimeout(() => {
    errorBlock.remove();
  }, SHOW_ERROR_TIME);
};

const onClickCloseMessageBlock = (messageBlock) => {
  const handler = (evt) => {
    if (isEscapeKey(evt)) {
      messageBlock.remove();
      document.removeEventListener('keydown', handler);
    }
  };
  return handler;
};

const showAlertSuccessSendData = () => {
  const successBlock = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successBlock);

  successBlock.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      successBlock.remove();
    }
  });

  document.addEventListener('keydown', onClickCloseMessageBlock(successBlock));

  successBlock.querySelector('.success__button').addEventListener('click', () => {
    successBlock.remove();
  });
};

const showAlertErrorSendData = (text) => {
  const errorBlock = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  if(text) {
    errorBlock.querySelector('.error__title').innerHTML = text;
  }
  document.body.insertAdjacentElement('beforeend', errorBlock);

  errorBlock.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      errorBlock.remove();
    }
  });

  document.addEventListener('keydown', onClickCloseMessageBlock(errorBlock));

  errorBlock.querySelector('.error__button').addEventListener('click', () => {
    errorBlock.remove();
  });
};

const showFilters = () => {
  const imagesFilters = document.querySelector('.img-filters');
  imagesFilters.classList.remove('img-filters--inactive');
};


const debounce = (callback, delay) => {
  let timerId;

  return (...rest) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, rest), delay);
  };
};

export { isEscapeKey, showAlertErrorLoadData, showAlertSuccessSendData, showAlertErrorSendData, showFilters, debounce };
