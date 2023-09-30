const schemas = require("../schemas");
const HttpErr = require("../helpers/HttpErr");

const validationBody = (dataToValidate) => {
  const validateData = schemas.validateSchema.validate(dataToValidate);
  const errorMsg = validateData.error?.message;
  if (!errorMsg) {
    return;
  }
  throw HttpErr(400, errorMsg);
};

module.exports = validationBody;
