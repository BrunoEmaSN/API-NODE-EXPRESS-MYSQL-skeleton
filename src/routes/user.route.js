const express               = require('express');
const router                = express.Router();
const UserController        = require('../controllers/user.controller');
const Role                  = require('../utils/userRoles.utils');
const awaitHandlerFactory   = require('../middleware/awaitHandlerFactory.middleware');
const auth                  = require('../middleware/auth.middleware');
const {createUserSchema, updateUserSchema, validateLogin} = require('../middleware/validators/userValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(UserController.getAllUser));
router.get('/id/:id', auth(), awaitHandlerFactory(UserController.getUserById));
router.get('/username/:username', auth(), awaitHandlerFactory(UserController.getUserByUsername));

router.post('/',createUserSchema, awaitHandlerFactory(UserController.create));
router.put('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(UserController.update));
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(UserController.delete));

router.post('/login', validateLogin, awaitHandlerFactory(UserController.login));

module.exports = router;
