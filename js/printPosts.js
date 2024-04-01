// import { getPosts } from './post.js';
import { getData } from './api.js';
import { showAlertErrorLoadData } from './utility.js';

// const MAX_POST_LENGTH = 25;
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// const posts = getPosts(MAX_POST_LENGTH);
// const posts = getData().then((data) => data);
// console.log(posts);

const documentFragment = document.createDocumentFragment();

const objectsByElements = new Map;

const setObjectByDomElements = (element, object) => {
  objectsByElements.set(element, object);
};

const getObjectsByDomElements = () => objectsByElements;

// const printPictures = (elementToRenedder) => {
//   if (!(elementToRenedder instanceof Node)) {
//     console.error('Параметр не является дом-элементом');
//     return false;
//   }

//   posts.forEach(({ url, description, likes, coments }) => {
//     const picture = pictureTemplate.cloneNode(true);
//     const postImage = picture.querySelector('.picture__img');
//     postImage.src = url;
//     postImage.alt = description;
//     picture.querySelector('.picture__likes').textContent = likes;
//     picture.querySelector('.picture__comments').textContent = coments.length;
//     documentFragment.append(picture);
//   });

const printPictures = (elementToRender) => {
  if (!(elementToRender instanceof Node)) {
    console.error('Параметр не является дом-элементом');
    return;
  }

  getData().then((posts) => {
    posts.forEach((post) => {
      const picture = pictureTemplate.cloneNode(true);
      const postImage = picture.querySelector('.picture__img');
      postImage.src = post.url;
      postImage.alt = post.description;
      picture.querySelector('.picture__likes').textContent = post.likes;
      picture.querySelector('.picture__comments').textContent = post.comments.length;
      documentFragment.append(picture);

      setObjectByDomElements(picture, post);
    });

    elementToRender.append(documentFragment);
  })
    .catch(() => showAlertErrorLoadData());
};

export { printPictures, getObjectsByDomElements };
