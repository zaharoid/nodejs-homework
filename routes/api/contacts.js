const express = require("express");

const contacts = require("../../models/contacts.js");

const contactsRouter = express.Router();

const { HttpErr, addContactValidation } = require("../../Utils");

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpErr(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    if (!Object.keys(body).length) {
      throw HttpErr(400, "all fields are required");
    }
    addContactValidation(body);
    const result = await contacts.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpErr(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
    console.log(12341234);
  }
});

contactsRouter.put("/:id", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpErr(400, "all fields are required");
    }
    addContactValidation(req.body);
    const { id } = req.params;
    console.log(req.params);
    const contact = await contacts.updateContact(id, req.body);
    if (!contact) {
      throw HttpErr(404, "Not found");
    }
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = contactsRouter;
