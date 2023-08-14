const express = require('express');
const router = express.Router();


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const publicationCtrl = require('../controllers/publication');

router.post('/', auth, multer, publicationCtrl.createPublication );
router.put('/:id', auth, multer, publicationCtrl.modifyPublication );
router.delete('/:id', auth, publicationCtrl.deletePublication);
router.get('/:id', auth, publicationCtrl.getOnePublication);
router.get('/',  publicationCtrl.getAllPublication);
  
module.exports = router;
