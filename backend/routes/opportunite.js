
const express = require('express');
const router = express.Router();

const opportuniteCtrl = require('../controllers/opportunite');
const auth = require('../middleware/auth');


router.post('/', auth, opportuniteCtrl.createOpportunite );
router.put('/:id', auth, opportuniteCtrl.modifyOpportunite );
router.delete('/:id', auth, opportuniteCtrl.deleteOpportunite);
router.get('/:id', auth, opportuniteCtrl.getOneOpportunite);
router.get('/',  opportuniteCtrl.getAllOpportunite);
  
module.exports = router;
 