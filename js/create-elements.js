const createDomElement = (tag, className, text) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (text) {
    element.textContent = text;
  }

  return element;
};

const createComment = ({ avatar, message, name }) => {
  const comment = createDomElement('li', 'social__comment');
  const img = createDomElement('img', 'social__picture');
  img.src = avatar;
  img.alt = name;
  img.style.width = `${35}px`;
  img.style.heigth = `${35}px`;

  const commentText = createDomElement('p', 'social__text', message);

  comment.append(img);
  comment.append(commentText);
  return comment;
};

export {createComment, createDomElement};
