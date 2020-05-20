const Router = require('koa-router');
const router = new Router();

const filelist_controller = require('../controllers/filelist_controller');

router.post('/upload',filelist_controller.uploadSDK);

module.exports = router;

