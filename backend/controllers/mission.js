const Mission = require('../models/Mission');


exports.createMission = (req, res, next) => {
    delete req.body._id;
    const mission = new Mission ({
        ...req.body
    });
    mission.save()
    .then(() => res.status(201).json({message: 'mission enregistré !'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyMission = (req, res, next) => {
    Mission.updateOne({_id: req.params.id }, { ...req.body, _id: req.params.id})
    .then(() => res.status(201).json({ message: 'mission modifié !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteMission = (req, res, next) => {
    Mission.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Mission supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.getOneMission = (req, res, next) => {
    Mission.findOne({ _id: req.params.id })
      .then(mission => res.status(200).json(mission))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllMission = (req, res, next) => {
    Mission.find()
    .then(missions => res.status(200).json(missions))
    .catch(error => res.status(400).json({ error }));
  }