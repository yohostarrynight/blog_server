const Koa = require('koa');
const config = require('./config');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const koajwt = require('koa-jwt');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const errorHandle = require('./middlewares/errorHandle.js');

const app = new Koa();
mongoose.connect(config.db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
  if(err) {
    console.error('falied');
  } else {
    console.log('successfully');
  }
});

app.use(cors());
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 500 * 1024 * 1024
  }
}))
app.use(bodyParser());
app.use(errorHandle);
app.use(koajwt({
  secret: 'lcy'
}).unless({
  path: [
    '/login',
    '/getarticleinfo',
    '/getdetailarticle'
  ]
}));

const userlist_router = require('./routes/userlist_router');
const articlelist_router = require('./routes/articlelist_router');
const filelist_router = require('./routes/filelist_router');

app.use(userlist_router.routes()).use(userlist_router.allowedMethods());
app.use(articlelist_router.routes()).use(articlelist_router.allowedMethods());
app.use(filelist_router.routes()).use(filelist_router.allowedMethods());

app.listen(config.port);

