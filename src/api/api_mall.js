import { $ } from './axios'
import { stringify } from "qs";

export default {
    //产品列表
    homeList: p => $.post('/zqxry/shopping/productlist', stringify(p)),

    //产品详情
    homeDesc: p => $.post('/zqxry/shopping/productdetail', stringify(p)),

    //地址列表 
    addressList: p => $.post('/zqxry/shopping/service', stringify(p)),

    //新增地址 
    addAddress: p => $.post('/zqxry/shopping/addDeliveryAddress', p),

    //地址详情
    addressInfo: p => $.post('/zqxry/shopping/service', stringify(p)),

    //修改地址
    modifyDeliveryAddress: p => $.post('/zqxry/shopping/modifyDeliveryAddress', p),

    //默认地址
    defaultAddr: p => $.post('/zqxry/shopping/service', stringify(p)),

    // 下单
    order: p => $.post('/zqxry/shopping/service', stringify(p)),

     // 支付订单
     orderPay: p => $.get('/zqxry/payPbBill', p),

     //物流
     log: p => $.get('/zqxry/bizqry/service', p),

}