import { $ } from './axios'
import { stringify } from "qs";

export default {
    //产品列表
    homeList: p => $.post('/zqxry/shopping/productlist',stringify(p)),

    //产品详情
    homeDesc: p => $.post('/zqxry/shopping/productdetail',stringify(p))
    
}