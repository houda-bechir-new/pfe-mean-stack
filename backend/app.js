const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/stuff');
const missionRoutes = require('./routes/mission');
const opportuniteRoutes = require('./routes/opportunite');
const newsletterRoutes = require('./routes/newsletter');
const equipeRoutes = require('./routes/equipe');
const contactRoutes = require('./routes/contact');
const eventRoutes = require('./routes/event');
const publicationRoutes = require('./routes/publication');

//connexion au mongodb
mongoose.connect('mongodb://localhost:27017/CelluleDB',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// next() : Elle passe l'exécution au prochain middleware de la chaîne

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      return res.status(200).json({});
  };
    next();
  });
//Rend les données du corps de la requête exploitable
  app.use(bodyParser.json());
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/mission', missionRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/api/stuff', stuffRoutes);
  app.use('/api/user', userRoutes);

  app.use('/api/opportunite', opportuniteRoutes);
  app.use('/api/newsletter', newsletterRoutes);
  app.use('/api/equipe', equipeRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/event', eventRoutes);
  app.use('/api/publication', publicationRoutes);


  module.exports = app;