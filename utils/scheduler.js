// const jdGetAxios = require('../modules/axios').jdGetAxios;
const schedule = require("node-schedule");

const customSchedule = {

    // * * * * * *
    // ┬ ┬ ┬ ┬ ┬ ┬
    // │ │ │ │ │  |
    // │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
    // │ │ │ │ └───── month (1 - 12)
    // │ │ │ └────────── day of month (1 - 31)
    // │ │ └─────────────── hour (0 - 23)
    // │ └──────────────────── minute (0 - 59)
    // └───────────────────────── second (0 - 59, OPTIONAL)

    /**
     * 间隔时间触发url
     * @param {string} ruleJson
     * @param callback
     */
    schedule(ruleJson, callback) {
        schedule.scheduleJob(ruleJson, function () {
            // jdGetAxios(url).then(function (data) {
            //     console.log(data)
            // });
            // console.log('已触发');
            callback()
        })
    },

    /**
     * 固定时间触发（只执行一次，时间过，就不会再执行）
     * @param date
     */
    scheduleFixed(date) {
        schedule.scheduleJob(date, function () {
            console.log("执行任务");
        });
    }
}
// let url = 'http://127.0.0.1:3908';
// Schedule.schedule({ "minute": [10, 40,55,56] }, `http://www.baidu.com`);
//GetAmoyListSchedule.scheduleFixed(new Date(2019, 10, 15, 23, 18, 0));
module.exports = customSchedule;
