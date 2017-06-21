const Koa = require('koa')
const serveStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const cors = require('./middlewares/cors')
const error = require('./middlewares/error')
const router = require('./routes')
const config = require('./config')

const app = new Koa();

app
    .use(serveStatic(config.paths.public))
    .use(bodyParser())
    .use(cors)
    .use(error)
    .use(router.routes())
    .use(router.allowedMethods())

require('./seed')()

module.exports = app;
