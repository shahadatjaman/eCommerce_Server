module.exports = ({
  company_name,
  country,
  street_address,
  town_city,
  state_country,
  postcode_zip,
  phone,
}) => {
  const errors = {};

  if (!company_name) {
    errors.company = "Company name is required";
  }
  if (!country) {
    errors.country = "Country is required";
  }
  if (!street_address) {
    errors.street_address = "Street address is required";
  }
  if (!town_city) {
    errors.town_city = "Town or City is required";
  }
  if (!state_country) {
    errors.state_country = "State Country is required";
  }
  if (!postcode_zip) {
    errors.postcode_zip = "Postcode or zip code is required";
  }
  if (!phone) {
    errors.phone = "Phone is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
