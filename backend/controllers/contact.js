const Contact = require('../models/Contact');


exports.createContact = (req, res, next) => {
    delete req.body._id;
    const contact = new Contact ({
        ...req.body
    });
    contact.save()
    .then(() => res.status(201).json({message: 'contact enregistré !'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyContact = (req, res, next) => {
    Contact.updateOne({_id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'contact modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteContact = (req, res, next) => {
    Contact.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'contact supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.getOneContact = (req, res, next) => {
    Contact.findOne({ _id: req.params.id })
      .then(contact => res.status(200).json(contact))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllContact = (req, res, next) => {
   Contact.find()
    .then(contacts => res.status(200).json(contacts))
    .catch(error => res.status(400).json({ error }));
  }