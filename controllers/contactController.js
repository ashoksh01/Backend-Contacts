//

const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all Contacts route" });
};

const createContact = (req, res) => {
  console.log("The request body is :", req.body);
  const {name, email, phone} = req.body;
  if(!name || !email || !phone){
    res.status(400);
    throw new Error("All fields are midatory")
  }
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
