const schedule = require('../utils/scheduler')
const SnapshotController = require('../libs/SnapshotController')
const controller = new SnapshotController()
const axios = require('axios');

// axios.post('http://192.168.6.117:3000/create/screenshot',{
//     "url": "https://blog.csdn.net/z69183787/article/details/91983870",
//     "width": 1920,
//     "height": 1080,
//     "quality": 80,
//     "ratio": 2,
//     "fileType": "123",
//     "imageType": "jpeg"
// }).then(res =>{
//     console.log(res);
// })

schedule.schedule('30 * * * * *',function (){
    console.log('================schedule:' + new Date());
})
