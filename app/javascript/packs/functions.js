const isEmpty = (value) => {
  return value.trim().length === 0;
}

const addDangerClass = (input, inputError, msg) => {
  input.classList.add('is-danger');
  inputError.innerHTML = msg;
}

const removeDangerClass = (input, inputError) => {
  input.classList.remove('is-danger');
  inputError.innerHTML = '';
}

const isValidInput = (input, inputError, msg) => {
  if (isEmpty(input.value)) {
    addDangerClass(input, inputError, msg);
    return false;
  } else {
    removeDangerClass(input, inputError);
    return true;
  }
}

module.exports = {
  isEmpty,
  addDangerClass,
  removeDangerClass,
  isValidInput
}
