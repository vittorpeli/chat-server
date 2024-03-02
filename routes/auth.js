const router = require('express').Router();
const user = require('../controllers/auth_controller')
const auth = require('../middlewares/auth');

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/', user.all);
router.get('/:id', user.one);

module.exports = router;