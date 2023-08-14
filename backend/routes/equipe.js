const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const equipeCtrl = require('../controllers/equipe');

router.get('/', equipeCtrl.getAllEquipe);
router.get('/:id', auth,  equipeCtrl.getOneEquipe);
router.put('/:id', auth, multer, equipeCtrl.modifyEquipe );
router.post('/', auth, multer, equipeCtrl.createEquipe );
router.delete('/:id', auth,  equipeCtrl.deleteEquipe);
module.exports = router;
