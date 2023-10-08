import { isValidObjectId } from "mongoose";
import { HttpErr } from "../helpers/index.js";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(HttpErr(404));
  }
  next();
};

export default isValidId;
