const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const documentFragment = document.createDocumentFragment();

const objectsByElements = new Map;

const setObjectByDomElements = (element, object) => {
  objectsByElements.set(element, object);
};

const getObjectsByDomElements = () => objectsByElements;

const printPictures = (posts, elementToRender) => {
  if (!(elementToRender instanceof Node)) {
    console.error('Параметр не является дом-элементом');
    return;
  }

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
};


export { printPictures, getObjectsByDomElements };
