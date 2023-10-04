const express = require("express");
const validationBody = require("../../middlewares");
const schemas = require("../../schemas");

const contactsRouter = express.Router();

const ctrl = require("../../controllers");

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getContactById);

contactsRouter.post(
  "/",
  validationBody(schemas.validateSchema),
  ctrl.createContact
);

contactsRouter.delete("/:id", ctrl.deleteContact);

contactsRouter.put(
  "/:id",
  validationBody(schemas.validateSchema),
  ctrl.updateContact
);

module.exports = contactsRouter;
