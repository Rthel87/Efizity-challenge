// select elements
const headline = document.getElementById('news_headline');
const byline = document.getElementById('news_byline');
const pictureUrl = document.getElementById('news_picture_url');
const author = document.getElementById('news_author');
const body = document.getElementById('news_body');
const button = document.getElementsByClassName('is-primary')[0];

// errors
const headlineError = document.getElementById('headline_error');
const bylineError = document.getElementById('byline_error');
const pictureUrlError = document.getElementById('picture_url_error');
const authorError = document.getElementById('author_error');
const bodyError = document.getElementById('body_error');

const msgError = {
  headline: {
    empty: 'No se ha ingresado el titular de la noticia'
  },
  byline: {
    empty: 'No se ha ingresado la bajada de la noticia'
  },
  pictureUrl: {
    empty: 'No se ha ingresado el enlace de la imagen',
    link: 'El enlace ingresado no es válido'
  },
  author: {
    empty: 'No se ha ingresado el autor'
  },
  body: {
    empty: 'No se ha ingresado el cuerpo de la noticia'
  }
}

const isEmpty = (value) => {
  return value.trim().length === 0;
}

const addDangerClass = (input, inputError, msg) => {
  input.classList.add('is-danger');
  inputError.innerHTML = msg;
};

const removeDangerClass = (input, inputError) => {
  input.classList.remove('is-danger');
  inputError.innerHTML = '';
};


// validations

const isValidInput = (input, inputError, msg) => {
  if (isEmpty(input.value)) {
    addDangerClass(input, inputError, msg);
    return false;
  } else {
    removeDangerClass(input, inputError);
    return true;
  }
}

const isValidUrl = () => {
  cors = new Headers([['Access-Control-Allow-Origin', 'origin']]);
  fetch(pictureUrl.value, {headers: cors})
    .then(response => {
      if (!response.ok) {
        addDangerClass(pictureUrl, pictureUrlError, msgError.pictureUrl.link);
        return false;
      } else {
        removeDangerClass(pictureUrl, pictureUrlError);
        return true;
      }
    });
}

const isValidForm = () => {
  let valid = true;
  valid = valid && isValidInput(headline, headlineError, msgError.headline.empty);
  valid = valid && isValidInput(byline, bylineError, msgError.byline.empty);
  valid = valid && isValidInput(pictureUrl, pictureUrlError, msgError.pictureUrl.empty);
  // valid = valid && isValidUrl();
  valid = valid && isValidInput(author, authorError, msgError.author.empty);
  valid = valid && isValidInput(body, bodyError, msgError.body.empty);
  return valid;
}

// imput changes

headline.addEventListener('input', () => {
  if (isEmpty(headline.value)) {
    addDangerClass(headline, headlineError, msgError.headline.empty);
  } else {
    removeDangerClass(headline, headlineError);
    button.disabled = false;
  }
});

byline.addEventListener('input', () => {
  if (isEmpty(byline.value)) {
    addDangerClass(byline, bylineError, msgError.byline.empty);
  } else {
    removeDangerClass(byline, bylineError);
    button.disabled = false;
  }
});

pictureUrl.addEventListener('input', () => {
  if (isEmpty(pictureUrl.value)) {
    addDangerClass(pictureUrl, pictureUrlError, msgError.pictureUrl.empty);
  } else {
    removeDangerClass(pictureUrl, pictureUrlError);
    button.disabled = false;
  }
});

author.addEventListener('input', () => {
  if (isEmpty(author.value)) {
    addDangerClass(author, authorError, msgError.author.empty);
  } else {
    removeDangerClass(author, authorError);
    button.disabled = false;
  }
});

body.addEventListener('input', () => {
  if (isEmpty(body.value)) {
    addDangerClass(body, bodyError, msgError.body.empty);
  } else {
    removeDangerClass(body, bodyError);
    button.disabled = false;
  }
});

button.addEventListener('mouseover', () => {
  if (!isValidForm()) {
    button.disabled = true;
  }
})
