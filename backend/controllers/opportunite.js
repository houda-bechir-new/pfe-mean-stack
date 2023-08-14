const Opportunite = require('../models/opportunite');


exports.createOpportunite = (req, res, next) => {
    delete req.body._id;
    const opportunite = new Opportunite ({
        ...req.body
    });
    oppotunite.save()
    .then(() => res.status(201).json({message: 'opportunite enregistré !'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyOpportunite = (req, res, next) => {
    Opportunite.updateOne({_id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'opportunite modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteOpportunite = (req, res, next) => {
    Opportunite.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Opportunite supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.getOneOpportunite = (req, res, next) => {
    Opportunite.findOne({ _id: req.params.id })
      .then(opportunite => res.status(200).json(opportunite))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllOpportunite = (req, res, next) => {
   Opportunite.find()
    .then(opportunite => res.status(200).json(opportunite))
    .catch(error => res.status(400).json({ error }));
  }