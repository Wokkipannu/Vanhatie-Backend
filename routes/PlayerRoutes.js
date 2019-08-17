const { Router } = require('express');
const PlayerController = require('../controllers/PlayerController');
const { verify } = require('../utils/auth');

const router = Router();

router.get('/', PlayerController.getPlayers);
router.get('/:id', PlayerController.getPlayer);

router.post('/', verify);
router.post('/', PlayerController.addPlayer);

router.put('/:id', verify);
router.put('/:id', PlayerController.updatePlayer);

module.exports = router;