/*
 * @Descripttion: 创建生成图片类
 * @version: 1.0.0
 * @Author: falost
 * @Date: 2019-08-27 11:43:41
 * @LastEditors: falost
 * @LastEditTime: 2019-09-08 18:20:51
 */
const puppeteer = require('puppeteer')
const { mkdirSync, formatNumber } = require('../utils/utils')

class PuppeteerHelper {
    async createImg(params) {
        const {
            url,
            width,
            height,
            ratio,
            fileType,
            imageType
        } = params
        const browser = await puppeteer.launch({
            headless: true, // 默认为 true 不打开浏览器，设置 false 打开
        })
        const date = new Date()
        const randomId = Number(Math.random().toString().substr(3, 6) + Date.now()).toString(36)

        // const path = `static/upload/${date.getFullYear()}/${formatNumber(date.getMonth() + 1)}`
        const path = `public/images/${date.getFullYear()}/${formatNumber(date.getMonth() + 1)}`
        mkdirSync(path)

        // 通过创建浏览器标签来打开
        const page = await browser.newPage()

        // 设置视窗大小
        await page.setViewport({
            width,
            height,
            deviceScaleFactor: ratio
        })

        // 加载url网页
        await page.goto(url);
        // await page.setContent(params.html)
        // await page.setContent()

        await this.waitForNetworkIdle(page, 50)

        let filePath
        // 根据 type 返回不同的类型 一种图片路径、一种 base64
        let fileName = `IMG_${randomId}`

        filePath = await page.screenshot({
            fullPage: false,
            omitBackground: true,
            encoding: 'base64'
        })

        if (fileType === 'path') {
            filePath = `${path}/${fileName}.${imageType}`
            await page.screenshot({
                path: filePath,
                fullPage: false,
                omitBackground: true
            })
        } else {
            filePath = await page.screenshot({
                fullPage: false,
                omitBackground: true,
                encoding: 'base64'
            })
            filePath = `data:image/png;base64,${filePath}`
        }

        browser.close()
        return filePath
    }
    // 等待HTML 页面资源加载完成
    waitForNetworkIdle(page, timeout, maxInflightRequests = 0) {
        page.on('request', onRequestStarted);
        page.on('requestfinished', onRequestFinished);
        page.on('requestfailed', onRequestFinished);

        let inflight = 0;
        let fulfill;
        let promise = new Promise(x => fulfill = x);
        let timeoutId = setTimeout(onTimeoutDone, timeout);
        return promise;

        function onTimeoutDone() {
            page.removeListener('request', onRequestStarted);
            page.removeListener('requestfinished', onRequestFinished);
            page.removeListener('requestfailed', onRequestFinished);
            fulfill();
        }

        function onRequestStarted() {
            ++inflight;
            if (inflight > maxInflightRequests)
                clearTimeout(timeoutId);
        }

        function onRequestFinished() {
            if (inflight === 0)
                return;
            --inflight;
            if (inflight === maxInflightRequests)
                timeoutId = setTimeout(onTimeoutDone, timeout);
        }
    }
}
module.exports = new PuppeteerHelper()
