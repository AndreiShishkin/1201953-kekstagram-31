import { randomSort, mostPopularSort } from './imageFiltering.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const documentFragment = document.createDocumentFragment();

const objectsByElements = new Map;

const Filters = {
  default: (posts) => posts,
  random: (posts) => randomSort(posts),
  discussed: (posts) => mostPopularSort(posts)
};

const setObjectByDomElements = (element, object) => {
  objectsByElements.set(element, object);
};

const getObjectsByDomElements = () => objectsByElements;

const printPictures = (posts, elementToRender, renderFilter = 'default') => {
  if (!(elementToRender instanceof Node)) {
    console.error('Параметр не является дом-элементом');
    return;
  }
  Filters[renderFilter](posts.slice())
    .forEach((post) => {
      const picture = pictureTemplate.cloneNode(true);
      const postImage = picture.querySelector('.picture__img');
      postImage.src = post.url;
      postImage.alt = post.description;
      picture.querySelector('.picture__likes').textContent = post.likes;
      picture.querySelector('.picture__comments').textContent = post.comments.length;
      documentFragment.append(picture);

      setObjectByDomElements(picture, post);
    });

  elementToRender.querySelectorAll('a').forEach((child) => elementToRender.removeChild(child));
  elementToRender.append(documentFragment);
};


export { printPictures, getObjectsByDomElements };
