module.exports = (values) => {
  const errors = {};

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
