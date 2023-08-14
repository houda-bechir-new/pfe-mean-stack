const Publication = require('../models/Publication');


exports.createPublication = (req, res, next) => {
    const publicationObject = JSON.parse(req.body.publication);
    delete req.body._id;
    const publication = new Publication ({
        ...publicationObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    });
    publication.save()
    .then(() => res.status(201).json({message: 'publication enregistré !'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyPublication = (req, res, next) => {
    const publicationObject = req.file ?
    {
        ...JSON.parse(req.body.publication),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Publication.updateOne({_id: req.params.id }, { ...publicationObject, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'publication modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deletePublication = (req, res, next) => {
    Publication.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Publication supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.getOnePublication = (req, res, next) => {
    Publication.findOne({ _id: req.params.id })
      .then(publication => res.status(200).json(publication))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllPublication = (req, res, next) => {
   Publication.find()
    .then(publications => res.status(200).json(publications))
    .catch(error => res.status(400).json({ error }));
  }