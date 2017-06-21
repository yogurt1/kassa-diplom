const fs = require('fs')
const Router = require('koa-router')
const config = require('../config')
const api = require('./api')

const router = new Router()

router.use('/api', api.routes(), api.allowedMethods())
// router.use('/pubsub', pubsub.routes(), pubsub.allowedMethods())

router.all('/*', async (ctx) => {
    ctx.type = 'html'
    ctx.body = fs.createReadStream(config.paths.indexHtml)
});

module.exports = router;
