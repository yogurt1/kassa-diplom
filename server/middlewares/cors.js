const cors = async (ctx, next) => {
    ctx.set('Acces-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    await next()
};

module.exports = cors
