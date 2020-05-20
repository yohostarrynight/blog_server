const Router = require('koa-router');
const router = new Router();

const userlist_controller = require('../controllers/userlist_controller');

router.post('/login',userlist_controller.login);
router.get('/getuserinfo',userlist_controller.getuserinfo);
router.post('/register',userlist_controller.register);
router.post('/deleteuserinfo',userlist_controller.deleteuserinfo);
router.post('/edituserinfo',userlist_controller.edituserinfo);

module.exports = router;

