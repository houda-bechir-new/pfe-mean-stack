const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const eventCtrl = require('../controllers/event');

router.get('/', eventCtrl.getAllEvent);
router.get('/:id', auth,  eventCtrl.getOneEvent);
router.put('/:id',  multer,  eventCtrl.modifyEvent );
router.post('/', auth, multer, eventCtrl.createEvent );
router.delete('/:id', auth,  eventCtrl.deleteEvent);

module.exports = router;
