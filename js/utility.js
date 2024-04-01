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

const showAlertSuccessSendData = () => {
  const successBlock = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successBlock);

  successBlock.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      successBlock.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      successBlock.remove();
    }
  });

  successBlock.querySelector('.success__button').addEventListener('click', () => {
    successBlock.remove();
  });
};

const showAlertErrorSendData = () => {
  const errorBlock = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorBlock);

  errorBlock.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      errorBlock.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      errorBlock.remove();
    }
  });

  errorBlock.querySelector('.error__button').addEventListener('click', () => {
    errorBlock.remove();
  });
};

export { isEscapeKey, showAlertErrorLoadData, showAlertSuccessSendData, showAlertErrorSendData };
