const Event = require('../models/Event');


exports.createEvent = (req, res, next) => {
    const eventObject = JSON.parse(req.body.event);
    delete eventObject._id;
    const event = new Event ({
        ...eventObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    event.save()
    .then(() => res.status(201).json({message: 'event enregistré !'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyEvent = (req, res, next) => {
    const eventObject = req.file ?
      {
        ...JSON.parse(req.body.event),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Event.updateOne({ _id: req.params.id }, { ...eventObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Event modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteEvent = (req, res, next) => {
    Event.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'event supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }


exports.getOneEvent = (req, res, next) => {
    Event.findOne({ _id: req.params.id })
      .then(event => res.status(200).json(event))
      .catch(error => res.status(404).json({ error }));
  }

exports.getAllEvent = (req, res, next) => {
    Event.find()
    .then(events => res.status(200).json(events))
    .catch(error => res.status(400).json({ error }));
  }