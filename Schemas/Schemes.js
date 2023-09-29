const Joi = require("joi");
const HttpErr = require("../helpers/HttpErr");

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": 'missing required "name" field' }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({ "any.required": 'missing required "email" field' }),
  phone: Joi.number()
    .required()
    .messages({ "any.required": 'missing required "phone" field' }),
});

const addContactValidation = (dataToValidate) => {
  const validateData = addSchema.validate(dataToValidate);
  const errorMsg = validateData.error?.message;
  if (!errorMsg) {
    return;
  }
  throw HttpErr(400, errorMsg);
};

module.exports = addContactValidation;
