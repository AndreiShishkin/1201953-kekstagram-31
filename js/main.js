import { printPictures } from './print-posts.js';
import './post-modal.js';
import './load-picture-modal.js';
import { getData } from './api.js';
import { showAlertErrorLoadData, showFilters, debounce } from './utility.js';
import { showFilter } from './image-filtering.js';

const RENDER_DELAY = 500;

const pictures = document.querySelector('.pictures');

getData()
  .then((posts) => {
    printPictures(posts, pictures);
    showFilter(debounce((typeFilter) => printPictures(posts, pictures, typeFilter), RENDER_DELAY));
  })
  .then(showFilters)
  .catch(() => showAlertErrorLoadData());
