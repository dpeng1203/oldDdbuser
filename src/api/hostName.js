// 配置开发环境与生产环境
let hostName;

if (process.env.NODE_ENV === "development") {
    // hostName = '/'; //测试
    hostName = '/api'
} else {
    hostName = window.location.origin
    // hostName = 'http://xry.dodohz.com'
}

export default hostName