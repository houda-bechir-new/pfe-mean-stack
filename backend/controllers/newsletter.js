const Newsletter = require('../models/Newsletter');


exports.createNewsletter = (req, res, next) => {
    delete req.body._id;
    const newsletter = new Newsletter ({
        ...req.body
    });
    newsletter.save()
    .then(() => res.status(201).json({message: 'newsletter enregistré !'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyNewsletter = (req, res, next) => {
    Newsletter.updateOne({_id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'newsletter modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteNewsletter = (req, res, next) => {
    Newsletter.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'newsletter supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.getOneNewsletter = (req, res, next) => {
    Newsletter.findOne({ _id: req.params.id })
      .then(newsletter => res.status(200).json(newsletter))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllNewsletter = (req, res, next) => {
    Newsletter.find()
    .then(newsletters => res.status(200).json(newsletters))
    .catch(error => res.status(400).json({ error }));
  }