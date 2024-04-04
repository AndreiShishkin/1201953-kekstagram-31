import { printPictures } from '/js/printPosts.js';
import '/js/postModal.js';
import '/js/loadPictureModal.js';
import { getData } from './api.js';
import { showAlertErrorLoadData, showFilters, debounce } from './utility.js';
import { showFilter } from './imageFiltering.js';

const RENDER_DELAY = 500;

const pictures = document.querySelector('.pictures');

getData()
  .then((posts) => {
    printPictures(posts, pictures);
    showFilter(debounce((typeFilter) => printPictures(posts, pictures, typeFilter), RENDER_DELAY));
  })
  .then(showFilters)
  .catch(() => showAlertErrorLoadData());
