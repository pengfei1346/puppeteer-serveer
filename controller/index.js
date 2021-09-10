const router = require('koa-router')()
const SnapshotController = require('../libs/SnapshotController')
const controller = new SnapshotController()

router.get('/test', async (ctx, next) => {
    ctx.body = {
        text: "测试",
        data: "测试数据"
    }
})

router.post('/create/screenshot', async (ctx, next) => {
    return await controller.postSnapshotJson(ctx)
})

module.exports = router;
