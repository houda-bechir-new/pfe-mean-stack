const express = require('express');
const router = express.Router();

const newsletterCtrl = require('../controllers/newsletter');
const auth = require('../middleware/auth');


router.post('/', auth, newsletterCtrl.createNewsletter );
router.put('/:id', auth, newsletterCtrl.modifyNewsletter );
router.delete('/:id', auth, newsletterCtrl.deleteNewsletter);
router.get('/:id', auth, newsletterCtrl.getOneNewsletter);
router.get('/',  newsletterCtrl.getAllNewsletter);
  
module.exports = router;
