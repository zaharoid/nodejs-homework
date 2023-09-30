const express = require("express");
const contactsRouter = express.Router();

const ctrl = require("../../controllers");

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getContactById);

contactsRouter.post("/", ctrl.createContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.put("/:id", ctrl.updateContact);

module.exports = contactsRouter;
