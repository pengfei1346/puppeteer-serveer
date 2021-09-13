'use strict';
//日志配置文件
const path = require('path');
let baseLogPath = path.resolve(__dirname, '../../logs');//日志根目录
let errorPath = "/error";//错误日志目录
let errorFileName = "error.log";//错误日志文件名
let errorLogPath = baseLogPath + errorPath + "/" + errorFileName;//错误日志输出完整路径
//let errorLogPath = path.resolve(__dirname, "../logs/error/error");
let responsePath = "/response";//响应日志目录
let responseFileName = "response.log";//响应日志文件名
let responseLogPath = baseLogPath + responsePath + "/" + responseFileName;//响应日志输出完整路径
module.exports = {
    //日志格式等设置
    appenders:
        {
            "rule-console": {"type": "console"},
            "errorLogger": {
                "type": "dateFile",
                "filename": errorLogPath,
                "pattern": "-yyyy-MM-dd-hh",
                "alwaysIncludePattern": true,
                "encoding":"utf-8",
                "daysToKeep":30,
                "keepFileExt":true
            },
            "resLogger": {
                "type": "dateFile",
                "filename": responseLogPath,
                "pattern": "-yyyy-MM-dd-hh",
                "alwaysIncludePattern": true,
                "encoding":"utf-8",
                "daysToKeep":30,
                "keepFileExt":true
            }
        },
    //供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "http": {"appenders": ["resLogger"],"level": "info"}
    },
    disableClustering: true,
    "baseLogPath": baseLogPath
}
