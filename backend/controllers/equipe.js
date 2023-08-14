const Equipe = require('../models/Equipe');


exports.createEquipe = (req, res, next) => {
    const equipeObject = JSON.parse(req.body.equipe);
    delete equipeObject._id;
    const equipe = new Equipe ({
        ...equipeObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    equipe.save()
    .then(() => res.status(201).json({message: 'equipe enregistré !'}))
    .catch(error => res.status(400).json({error}));
}


exports.modifyEquipe = (req, res, next) => {
    const equipeObject = req.file ?
    {
        ...JSON.parse(req.body.equipe),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Equipe.updateOne({_id: req.params.id }, { ...equipeObject, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'equipe modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteEquipe = (req, res, next) => {
    Equipe.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'equipe supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.getOneEquipe = (req, res, next) => {
    Equipe.findOne({ _id: req.params.id })
      .then(equipe => res.status(200).json(equipe))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllEquipe = (req, res, next) => {
    Equipe.find()
    .then(equipes => res.status(200).json(equipes))
    .catch(error => res.status(400).json({ error }));
  }