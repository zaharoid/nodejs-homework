import { HttpErr } from "../helpers/index.js";

const validationBody = (validateSchema) => {
  const fn = (req, res, next) => {
    const validateData = validateSchema.validate(req.body);
    if (validateData.error?.message) {
      throw HttpErr(400, validateData.error?.message);
    }
    next();
  };
  return fn;
};

export default validationBody;
