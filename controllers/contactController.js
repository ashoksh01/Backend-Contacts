//

const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all Contacts route" });
};

const createContact = (req, res) => {
  res.status(201).json({ message: "Create contacts" });
};

const getContact = (req, res) => {
  res.status(200).json({ message: ` Get contact for ${req.params.id}` });
};

const updateContact = (req, res) => {
  res.status(200).json({ message: ` Update contact for ${req.params.id}` });
};

const deleteContact = (req, res) => (req, res) => {
  res.status(201).json({ message: `Delete contact for ${req.params.id}` });
};

module.export = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
