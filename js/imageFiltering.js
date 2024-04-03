// import { debounce } from './utility.js';

// const RENDER_DELAY = 500;

const filtersForm = document.querySelector('.img-filters__form');

const setFilter = (renderPostsCallback) => {
  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
      filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      const filter = evt.target;
      filter.classList.add('img-filters__button--active');
      // debounce(() => renderPostsCallback(filter.id.replace('filter-', '')), RENDER_DELAY)();
      renderPostsCallback(filter.id.replace('filter-', ''));
    }
  });
};

const randomSort = (posts) => {
  let currentIndex = posts.length;

  while(currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [posts[currentIndex], posts[randomIndex]] = [posts[randomIndex], posts[currentIndex]];
  }
  return posts.slice(0, 10);
};

const mostPopularSort = (posts) => {
  posts.sort((postA, postB) => postB.comments.length - postA.comments.length);
  return posts;
};

export { setFilter, randomSort, mostPopularSort };
