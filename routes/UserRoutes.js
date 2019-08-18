const { Router } = require('express');
const UserController = require('../controllers/UserController');
const { verify } = require('../utils/auth');

const router = Router();

router.get('/', verify);
router.get('/', UserController.getUsers);
//router.get('/:id', UserController.getUser);

router.post('/', verify);
router.post('/', UserController.addUser);

//router.put('/:id', UserController.updateUser);
router.post('/login', UserController.login);
router.post('/token', UserController.verifyToken);

module.exports = router;