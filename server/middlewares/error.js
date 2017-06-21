const error = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.status = error.statusCode || error.status || 500
        ctx.body = {
            error: true,
            success: false,
            status: ctx.status,
            message: error.message,
        }
        console.error(error)
    }
}

module.exports = error