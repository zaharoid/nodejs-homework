const fs = require('fs/promises')

const addContactsToDb = (contacts, path) => {
    fs.writeFile(path, JSON.stringify(contacts, null, 2))
}

module.exports = addContactsToDb