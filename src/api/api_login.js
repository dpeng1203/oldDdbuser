import { $ } from './axios'
import { stringify } from "qs";

export default {
    //获取手机验证码code
    code: p => $.post('/zqxry/memedt/sendVerifyCode',stringify(p)),

    //登陆
    login: p =>$.post('/zqxry/memlogin',stringify(p)),


    //注册
    sign: p =>$.post('/zqxry/memedt/register',p),
    //推荐注册
    signQr: p =>$.post('/zqxry/memedt/registerQR',p),

    //忘记密码
    resetPw: p =>$.post('/zqxry/memedt/findpwd',stringify(p)),

    
    
}

