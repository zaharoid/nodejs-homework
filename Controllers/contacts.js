import { ctrlWrapper, HttpErr } from "../helpers/index.js";
import Contact from "../models/Contact.js";

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpErr(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpErr(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body);
  if (!contact) {
    throw HttpErr(404);
  }
  res.status(200).json(contact);
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(id, req.body);
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
