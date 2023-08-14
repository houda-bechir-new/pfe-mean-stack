const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup',  userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getAllUser);
router.delete('/:id', auth,  userCtrl.deleteUser);
router.put('/password/:id', auth, userCtrl.modifyPassword);
router.put('/:id', auth, userCtrl.modifyUser)




module.exports = router;