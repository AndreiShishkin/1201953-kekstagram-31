const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}/i;

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ').filter((element) => element !== '');
  const duplicates = hashtags.filter((element, indexCurrentElement, hashtagsArray) => hashtagsArray.indexOf(element) !== indexCurrentElement);
  const isValidHashtags = hashtags.every((hashtag) => hashtagRegex.exec(hashtag) ? hashtagRegex.exec(hashtag)[0] === hashtag : false);
  if (duplicates.length === 0 && hashtags.length <= MAX_COUNT_HASHTAGS && isValidHashtags) {
    return true;
  }
  return false;
};

const validateInicial = (validateForm, hashtagsInput, commentInput) => () => {
  const pristine = new Pristine(validateForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
  },
  false);

  const getErrorHashtags = () => {
    const hashtags = hashtagsInput.value.toLowerCase().split(' ').filter((element) => element !== '');
    const duplicates = hashtags.filter((element, indexCurrentElement, hashtagsArray) => hashtagsArray.indexOf(element) !== indexCurrentElement);
    if (hashtags.length > MAX_COUNT_HASHTAGS) {
      return 'превышено количество хэштегов';
    }

    if (duplicates.length > 0) {
      return 'хэштеги повторяются';
    }
    const invalidHashtags = [];
    hashtags.forEach((hashtag) => {
      if (hashtagRegex.exec(hashtag) ? hashtagRegex.exec(hashtag)[0] !== hashtag : true) {
        invalidHashtags.push(hashtag);
      }
    });

    if (invalidHashtags !== 0) {
      return invalidHashtags.length > 1 ? `введены невалидные хэштеги: ${invalidHashtags.join(', ')}` : `введен невалидный хэштег: ${invalidHashtags.join()}`;
    }
  };

  pristine.addValidator(hashtagsInput, validateHashtags, getErrorHashtags);
  pristine.addValidator(commentInput, validateComment, 'длина комментария больше 140 символов');
  return pristine;
};

export { validateInicial };
