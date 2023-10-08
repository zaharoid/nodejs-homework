import express from "express";
import {
  validationBody,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import {
  validateSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";
import ctrl from "../../controllers/contacts.js";

const contactAddValidate = validationBody(validateSchema);
const contactUpdateFavoriteValidate = validationBody(
  contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getContactById);

contactsRouter.post("/", isEmptyBody, contactAddValidate, ctrl.createContact);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  ctrl.updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  ctrl.updateStatusContact
);

export default contactsRouter;
