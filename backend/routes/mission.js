const express = require('express');
const router = express.Router();

const missionCtrl = require('../controllers/mission');
const auth = require('../middleware/auth');

router.get('/', missionCtrl.getAllMission);
router.get('/:id',  missionCtrl.getOneMission);
router.put('/:id', auth,  missionCtrl.modifyMission );
router.post('/', auth,  missionCtrl.createMission );
router.delete('/:id', auth,  missionCtrl.deleteMission);

module.exports = router;
