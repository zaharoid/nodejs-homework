import { ctrlWrapper, HttpErr } from "../helpers/index.js";
import Contact from "../models/Contact.js";

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { favorite, limit = 10, page = 1 } = req.query;

  const findParams = favorite ? { owner, favorite } : { owner };

  const skip = (page - 1) * limit;

  const result = await Contact.find(findParams, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: id, owner }).populate(
    "owner",
    "email subscription"
  );
  if (!result) {
    throw HttpErr(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({
    ...req.body,
    owner,
  });
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpErr(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
  if (!contact) {
    throw HttpErr(404);
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findByIdAndUpdate({ _id: id, owner }, req.body);
  if (!contact) {
    throw HttpErr(404);
  }
  res.status(200).json(contact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  updateContact: ctrlWrapper(updateContact),
};
