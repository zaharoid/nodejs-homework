const fs = require('fs/promises')
const {nanoid} = require('nanoid')

const path = require('path')
const contactsPath = path.resolve('models', 'contacts.json')

const {addToDb} = require('../Utils')

const listContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(contactsPath))
  return contacts;
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === id)
  if (contact === undefined) {
      return null
  }
  return contact
}

const addContact = async ({name, email, phone}) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
}
const contacts = await listContacts()
contacts.push(newContact)
await addToDb(contacts, contactsPath)
return newContact
}

const removeContact = async (id) => {
  const contacts = await listContacts() 
    const index = contacts.findIndex(contact => contact.id === id)
    if (index === -1 ) {
        return null
    }
    const [contact] = contacts.splice(index, 1)

    await addToDb(contacts, contactsPath)
    return contact
}

const updateContact = async (id, {name, email, phone}) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id)
    contacts[index] = {id, name, email, phone} 
    await addToDb(contacts, contactsPath)
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
