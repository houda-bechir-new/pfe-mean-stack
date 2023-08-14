const Thing = require('../models/Thing');





//200 : requete reussite
//201 : Une création de données réussie
//400 : erreur

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        //recuperer body mta3ik ll BD
     ...req.body
 });
  thing.save()
  .then(() => res.status(201).json({message: 'objet enregistré !'}))
  .catch(error => res.satus(400).json({error}));
}

exports.modifyThing =  (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(201).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }

  exports.getAllThings = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  }