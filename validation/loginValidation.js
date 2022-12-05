module.exports = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (email.trim().length === 0) {
    errors.email = "Email is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.trim().length === 0) {
    errors.password = "Password is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
