import { getObjectsByDomElements } from './print-posts.js';
import { isEscapeKey } from '/js/utility.js';
import { createComment } from './create-elements';

const objectsByElements = getObjectsByDomElements();

const pictures = document.querySelector('.pictures');
const popup = document.querySelector('.big-picture');
const closeButton = popup.querySelector('#picture-cancel');
const buttonLoadComments = popup.querySelector('.comments-loader');
const commentsBlock = popup.querySelector('.social__comments');

let commentsFragment = document.createDocumentFragment();
const commentsToPrint = document.createDocumentFragment();

const checkingComments = () => {
  if(commentsFragment.children.length === 0) {
    buttonLoadComments.classList.add('hidden');
  } else {
    buttonLoadComments.classList.remove('hidden');
  }
};

const addCommentsToDomElement = () => {
  const commentsFragmentChilds = commentsFragment.childNodes;
  let counter = 0;
  for(let i = commentsFragmentChilds.length - 1; i >= 0 && counter < 5; i--) {
    commentsToPrint.append(commentsFragmentChilds[i]);
    counter++;
  }
  commentsBlock.append(commentsToPrint);
  popup.querySelector('.social__comment-shown-count').textContent = commentsBlock.children.length;
  checkingComments();
};

const onButtonLoadCommentsClick = () => {
  addCommentsToDomElement();
};

const closeModalPost = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsFragment = document.createDocumentFragment();
};

const onKeydownClosePopupPost = (evt) => {
  if (isEscapeKey(evt)) {
    closeModalPost();

    document.removeEventListener('keydown', onKeydownClosePopupPost);
    buttonLoadComments.removeEventListener('click', onButtonLoadCommentsClick);
  }
};

closeButton.addEventListener('click', () => {
  closeModalPost();
  document.removeEventListener('keydown', onKeydownClosePopupPost);
  buttonLoadComments.removeEventListener('click', onButtonLoadCommentsClick);
});

const showComments = (comments) => {
  comments.forEach((comment) => commentsFragment.append(createComment(comment)));
  addCommentsToDomElement();
  popup.querySelector('.social__comment-total-count').textContent = comments.length;
};

const printModalPost = (post) => {
  const { url, description, likes, comments } = objectsByElements.get(post);
  popup.querySelector('.big-picture__img img').src = url;
  popup.querySelector('.likes-count').textContent = likes;
  popup.querySelector('.social__comments').innerHTML = '';
  popup.querySelector('.social__caption').textContent = description;
  showComments(comments);

  popup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onKeydownClosePopupPost);
  buttonLoadComments.addEventListener('click', onButtonLoadCommentsClick);
};

const onPicturesClick = (evt) => {
  const post = evt.target.closest('.picture');
  if (post) {
    evt.preventDefault();
    printModalPost(post);
  }
};

pictures.addEventListener('click', onPicturesClick);
