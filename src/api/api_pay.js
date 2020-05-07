import { $ } from './axios'
import { stringify } from "qs";

export default {
    //支付
    pay: p => $.get('/zqxry/pay', p),

    //商家信息
    getProducts: p => $.post('/zqxry/bizqry/getProducts', stringify(p)),

    //商品价格
    getPrice: p => $.post('/zqxry/bizqry/getPrice', stringify(p)),

    //支付方式
    payType: p => $.post('/zqxry/getPayAcct', stringify(p),{ showLoading: false }),

    //会员支付
    merPay: p => $.post('/zqxry/acctPay', stringify(p)),

    getOrderInfo: p => $.get('/zqxry/bizqry/getOrderInfo', p,{ showLoading: false }),

    //获取支付密码的code
    payCode: p => $.post('/zqxry/memedt/sendCertCode',stringify(p)),

    //设置 修改支付密码
    changePw: p => $.post('/zqxry/memedt/service',stringify(p)),


}