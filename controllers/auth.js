import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import path from "path";
import User from "../models/User.js";
import { ctrlWrapper, HttpErr, sendEmail } from "../helpers/index.js";

const { JWT_SECRET, BASE_URL } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpErr(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const { subscription } = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
    verificationToken,
  });

  const emailParams = {
    to: email,
    subject: "Verify email",
    html: `<p>Click <a target='_blank' href='${BASE_URL}/api/users/verify/${verificationToken}'>here</a> to verify your email</p>`,
  };

  await sendEmail(emailParams);

  res.status(201).json({
    user: {
      email,
      subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpErr(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpErr(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpErr(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

  const currentUser = {
    email: user.email,
    subscription: user.subscription,
  };

  await User.findByIdAndUpdate(user._id, { token });

  res.json({ token, user: currentUser });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No Content" });
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { email, subscription } = await User.findByIdAndUpdate(_id, req.body);

  res.status(200).json({ email, subscription });
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;

  const { path: oldPath, filename } = req.file;

  const newPath = path.join(avatarsPath, filename);

  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("/avatars", filename);

  Jimp.read(newPath, (err, avatar) => {
    if (err) throw err;
    avatar.resize(250, 250).write(newPath);
  });

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpErr(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({ message: "Verify success" });
};

const resendVerify = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpErr(404, "User not found");
  }

  if (user.verify) {
    throw HttpErr(400, "Verification has already been passed");
  }

  const emailParams = {
    to: email,
    subject: "Verify email",
    html: `<p>Click <a target='_blank' href='${BASE_URL}/api/users/verify/${user.verificationToken}'>here</a> to verify your email</p>`,
  };

  await sendEmail(emailParams);

  res.json({ message: "Verification email sent" });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
};
