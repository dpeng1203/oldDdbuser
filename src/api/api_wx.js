import { $ } from './axios'
import { stringify } from "qs";

export default {

    //授权
    memberAuthorization: p =>$.post('/zqxry/memberAuthorization',stringify(p)),

    //签名
    sign: p =>$.post('/ddbxry/ddbWx/jsSign',stringify(p)),
    
}