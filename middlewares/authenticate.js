import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpErr } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw HttpErr(401, "Not authorized");
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(id);

    if (!user?.token) {
      throw HttpErr(401, "Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpErr(401, "Not authorized"));
  }
};

export default authenticate;
