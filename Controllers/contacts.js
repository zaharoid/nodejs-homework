const contacts = require("../models/contacts.js");
const { HttpErr, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpErr(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const { body } = req;
  if (!Object.keys(body).length) {
    throw HttpErr(400, "missing fields");
  }

  const result = await contacts.addContact(body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpErr(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    throw HttpErr(400, "missing fields");
  }

  const { id } = req.params;
  const contact = await contacts.updateContact(id, req.body);
  if (!contact) {
    throw HttpErr(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
