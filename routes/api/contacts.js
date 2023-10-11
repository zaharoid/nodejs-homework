import express from "express";
import {
  validationBody,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import ctrl from "../../controllers/contacts.js";
import {
  validateSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrl.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validationBody(validateSchema),
  ctrl.createContact
);

contactsRouter.delete("/:id", isValidId, ctrl.deleteContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validationBody(validateSchema),
  ctrl.updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validationBody(contactUpdateFavoriteSchema),
  ctrl.updateStatusContact
);

export default contactsRouter;
