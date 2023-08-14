const express = require('express');
const router = express.Router();

const contactCtrl = require('../controllers/contact');
const auth = require('../middleware/auth');

router.get('/', contactCtrl.getAllContact);
router.get('/:id', auth,  contactCtrl.getOneContact);
router.put('/:id', auth,  contactCtrl.modifyContact );
router.post('/',  contactCtrl.createContact );
module.exports = router;
