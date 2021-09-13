/*
 * @Desc: 调取 puppeteer 来生成接收到的html 数据生成图片
 * @version: 1.0.0
 */
const PuppeteerHelper = require('./PuppeteerHelper');

class SnapshotController {
    /**
     * 截图接口
     */
    async postSnapshotJson(ctx) {
        const result = await this.handleSnapshot(ctx)
        ctx.body = {code: 10000, message: 'ok', result}
    }

    /**
     * 生成截图接口
     */
    async handleSnapshot(ctx) {
        try {
            return await this.generateSnapshot(ctx);
        } catch (error) {
            ctx.status = 500;
            return ctx.throw(500, error.message);
        }
    }

    /**
     * 生成截图
     */
    async generateSnapshot(ctx) {
        // width: 1920,
        // height: 1080,
        const {
            url,
            width = 375,
            height = 667,
            quality = 80,
            ratio = 2,
            fileType = 'path',
            imageType = 'jpeg',
        } = ctx.request.body;

        if (!url) {
            return 'url 不能为空'
        }

        let imgBuffer;
        try {
            imgBuffer = await PuppeteerHelper.createImg({
                url,
                width,
                height,
                quality,
                ratio,
                imageType,
                fileType
            });
        } catch (err) {
            // logger
            console.log(err)
        }

        if(fileType === 'path') {
            let imgUrl = await this.uploadImage(imgBuffer)

            return {
                img: imgUrl || ''
            }
        }else {
            return {
                img: imgBuffer || ''
            }
        }
    }

    /**
     * 上传图片到 CDN 服务
     */
    async uploadImage(imgBuffer) {
        const str = 'public/'
        return `http://192.168.6.117:3000/${imgBuffer.slice(str.length)}`
    }
}

module.exports = SnapshotController
