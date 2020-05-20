const Router = require('koa-router');
const router = new Router();

const articlelist_controller = require('../controllers/articlelist_controller');

router.get('/getarticleinfo',articlelist_controller.getarticleinfo);
router.get('/getdetailarticle',articlelist_controller.getdetailarticle);
router.post('/insertarticle',articlelist_controller.insertarticle);
router.post('/editarticle',articlelist_controller.editarticle);
router.post('/deletearticle',articlelist_controller.deletearticle);

module.exports = router;

