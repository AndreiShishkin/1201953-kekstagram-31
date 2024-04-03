import { printPictures } from '/js/printPosts.js';
import '/js/postModal.js';
import '/js/loadPictureModal.js';
import { getData } from './api.js';
import { showAlertErrorLoadData, showFilters, debounce } from './utility.js';
import { setFilter } from './imageFiltering.js';

const pictures = document.querySelector('.pictures');

getData()
  .then((posts) => {
    printPictures(posts, pictures);
    setFilter(debounce((typeFilter) => printPictures(posts, pictures, typeFilter), 500));
  })
  .then(showFilters)
  .catch(() => showAlertErrorLoadData());
