const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;

export function validateEmail(email) {
  const errors = [];

  if (!EMAIL_REGEXP.test(email)) {
    errors.push('this doesn\'t look like a valid email');
  }

  return errors;
}

export function validatePassword(password) {
  const errors = [];

  if (password.length < 5) {
    errors.push('at least 5 characters required!')
  }

  return errors;
}

export function validateUsername(username) {
  const errors = [];

  if (username.length < 2) {
    errors.push('at least 2 characters required!');
  }

  return errors;
}
