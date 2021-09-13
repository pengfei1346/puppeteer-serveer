const schedule = require('../utils/scheduler')
const SnapshotController = require('../libs/SnapshotController')
const controller = new SnapshotController()
const axios = require('axios');

//每天早上三点执行
schedule.schedule('0 0 3 * * *',function (){
    console.log('================schedule:' + new Date());
    axios.post('http://192.168.6.117:3000/create/screenshot',{
        "url": "https://www.baidu.com/",
        "width": 1920,
        "height": 1080,
        "quality": 80,
        "ratio": 2,
        "fileType": "path", //  12 path
        "imageType": "jpeg"
    }).then(res =>{
        console.log(res);
    })
})
