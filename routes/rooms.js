const router = require('express').Router();
const group = require('../controllers/room_controller')
const auth = require('../middlewares/auth');

router.get('/', group.getAll);
router.get('/:id', group.show);
router.post('/', group.create);
router.put('/:id', group.update);
router.delete('/:id', group.destroy);

module.exports = router;