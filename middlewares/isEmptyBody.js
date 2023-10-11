import { HttpErr } from "../helpers/index.js";

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpErr(400, "missing fields");
  }
  next();
};

export default isEmptyBody;
