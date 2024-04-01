import { printPictures } from '/js/printPosts.js';
import '/js/postModal.js';
import '/js/loadPictureModal.js';
import { getData } from './api.js';
import { showAlertErrorLoadData } from './utility.js';

const pictures = document.querySelector('.pictures');

getData().then((posts) => printPictures(posts, pictures))
  .catch(() => showAlertErrorLoadData());
