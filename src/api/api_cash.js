import { $ } from './axios'
import { stringify } from "qs";

export default {

    //余额
    cash: p => $.post('/zqxry/memedt/service', stringify(p),{ showLoading: false }),

    //充值列表
    rechargeList: p => $.post('/zqxry/memedt/service', stringify(p)),

    //充值
    recharge: p => $.get('/zqxry/payCharge', p),

    //购买卡券
    buyTicket: p => $.get('/zqxry/payChargeCoupon', p),


    //充值明细
    getOrderList: p => $.post('/zqxry/memedt/service', stringify(p)),
    

    //消费明细
    getconsumptionList: p => $.post('/zqxry/memedt/service', stringify(p)),

    //推荐赠送张数
    getTicketNumber: p => $.post('/zqxry/bizqry/service', stringify(p)),


    // getStatsAgentList: p => $.post('/zqxry/memedt/service', stringify(p)),
}