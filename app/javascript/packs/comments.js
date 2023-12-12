const { isEmpty, addDangerClass, removeDangerClass, isValidInput } = require('./functions.js');

// select elements
const textArea = document.getElementById('comment_comment');
const button = document.getElementsByName('commit')[0];

// errors
const commentError = document.getElementById('comment-error');
const msgError = 'No se ha ingresado el comentario';


// validations

const isValidForm = () => {
  let valid = true;
  valid = valid && isValidInput(textArea, commentError, msgError);
  return valid;
}


// input changes

textArea.addEventListener('input', () => {
  if (isEmpty(textArea.value)) {
    addDangerClass(textArea, commentError, msgError);
  } else {
    removeDangerClass(textArea, commentError);
    button.disabled = false;
  }
})

button.addEventListener('mouseover', () => {
  if (!isValidForm()) {
    button.disabled = true;
  }
});
