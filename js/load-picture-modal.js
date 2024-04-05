import { isEscapeKey, showAlertSuccessSendData, showAlertErrorSendData } from './utility.js';
import { validateInicial } from './validate-upload-image-form.js';
import { scaleImage, editPicture } from './edit-picture-modal.js';
import { resetFilter } from './slider.js';
import { sendData } from './api.js';

const FIELS_EXTENSIONS = ['.jpeg', '.jpg', '.png'];

const formLoadPicture = document.querySelector('#upload-select-image');
const buttonLoad = formLoadPicture.querySelector('#upload-file');
const modalEditPicture = formLoadPicture.querySelector('.img-upload__overlay');
const closeFormButton = modalEditPicture.querySelector('#upload-cancel');
const textHashtags = modalEditPicture.querySelector('.text__hashtags');
const textComment = modalEditPicture.querySelector('.text__description');
const submitButton = modalEditPicture.querySelector('#upload-submit');
const scaleText = modalEditPicture.querySelector('.scale__control--value');
const range = modalEditPicture.querySelector('.effect-level__slider');
const effectsList = modalEditPicture.querySelector('.effects__list');
const uploadImage = modalEditPicture.querySelector('.img-upload__preview img');
const sliderContainer = modalEditPicture.querySelector('.img-upload__effect-level');
const originalEffect = effectsList.querySelector('#effect-none');
const effectLevel = modalEditPicture.querySelector('.effect-level__value');

const imageUploadScale = modalEditPicture.querySelector('.img-upload__scale');

const onImageUploadScaleChange = scaleImage(scaleText, uploadImage);

imageUploadScale.addEventListener('click', onImageUploadScaleChange);

const onSliderChange = editPicture(range, uploadImage, sliderContainer, effectLevel);
let pristine;

const unlockButton = () => {
  submitButton.disabled = false;
};

const closeModal = () => {
  modalEditPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFilter(uploadImage, originalEffect);

  formLoadPicture.reset();
  pristine.destroy();

  effectsList.removeEventListener('change', onSliderChange);
};

const onModalEditPictureKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (!document.querySelector('.error')) {
      closeModal();
      document.removeEventListener('keydown', onModalEditPictureKeydown);
    }
  }
};

const openModal = () => {
  const validateForm = validateInicial(formLoadPicture, textHashtags, textComment);
  pristine = validateForm();
  modalEditPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderContainer.classList.add('hidden');

  document.addEventListener('keydown', onModalEditPictureKeydown);
  effectsList.addEventListener('change', onSliderChange);

  const loadedFile = URL.createObjectURL(buttonLoad.files[0]);
  uploadImage.src = loadedFile;
  modalEditPicture.querySelectorAll('.effects__preview').forEach((filterImage) => {
    filterImage.style.backgroundImage = `url(${loadedFile}`;
  });
};

buttonLoad.addEventListener('change', () => {
  if (FIELS_EXTENSIONS.some((extinsion) => buttonLoad.files[0].name.toLowerCase().endsWith(extinsion))) {
    if(buttonLoad.files[0].size < 2e+8) {
      openModal();
    } else {
      showAlertErrorSendData('Файл превышает 200 МБ');
      formLoadPicture.reset();
    }
  }
});

closeFormButton.addEventListener('click', () => {
  closeModal();
  document.removeEventListener('keydown', onModalEditPictureKeydown);
});

formLoadPicture.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    submitButton.setAttribute('disabled', 'disabled');
    sendData(formData)
      .then(closeModal)
      .then(showAlertSuccessSendData)
      .catch(() => showAlertErrorSendData())
      .finally(unlockButton);
    pristine.destroy();
  }
});

textHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

textComment.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
