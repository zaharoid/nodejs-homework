const HttpErr = require("../helpers/HttpErr");

const validationBody = (validateSchema) => {
  const fn = (req, res, next) => {
    const validateData = validateSchema.validate(req.body);
    console.log(validateData);
    if (validateData.error?.message) {
      throw HttpErr(400, validateData.error?.message);
    }
    next();
  };
  return fn;
};

module.exports = validationBody;
