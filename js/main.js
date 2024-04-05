import { printPictures } from './print-posts.js';
import './post-modal.js';
import './load-picture-modal.js';
import { getData } from './api.js';
import { showAlertErrorLoadData, showFilters, debounce } from './utility.js';
import { registerFilterEvents } from './image-filtering.js';

const RENDER_DELAY = 500;

const pictures = document.querySelector('.pictures');

getData()
  .then((posts) => {
    printPictures(posts, pictures);
    registerFilterEvents(posts, debounce((postsArray) => printPictures(postsArray, pictures), RENDER_DELAY));
  })
  .then(showFilters)
  .catch(() => showAlertErrorLoadData());
