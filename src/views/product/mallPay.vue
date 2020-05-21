<template>
<div>
    <div class="order" v-show="!showAreaList">
        <div class="contact" v-if="addrInfo.daMobile">
            <img src="../../assets/img/address.png" alt="">
            <div class="info">
                <div class="phone">{{addrInfo.daMobile}}</div>
                <div class="name">收货人：{{addrInfo.daName}}</div>
                <p>收货地址：{{addrInfo.areaName + addrInfo.daDetailAddress}}</p>
            </div>
            <div class="right" @click="chooseAddr">></div>
        </div>
        <div class="add-addr" @click="chooseAddr" v-if="!addrInfo.daMobile">
            <van-icon name="add-o" size="0.5rem"/>
            <span>增加收货地址</span>
        </div>
        <div class="line"><img src="../../assets/img/line.png" alt=""></div>
        <div class="sum">
            <div class="item">
                <div class="name">商品名称</div>
                <div class="value" >{{pName}}</div>
            </div>
            <div class="item">
                <div class="name">商品价格</div>
                <div class="value" >￥{{pPrice2}}</div>
            </div>
            <div class="item">
                <div class="name">商品数量</div>
                <div class="value" >x 1</div>
            </div>
            <div class="item">
                <div class="name">优惠金额</div>
                <div class="value" >- ￥0</div>
            </div>
            <div class="item">
                <div class="name">运费</div>
                <div class="value">￥0.00</div>
            </div>
            <div class="item">
                <div class="name"></div>
                <div class="value">合计：<span>￥{{pPrice2}}</span></div>
            </div>
        </div>
        <van-submit-bar
            :price="pPrice2*100"
            button-text="提交订单"
            @submit="onSubmit"
        />
    </div>
    <area-list @close='close' v-show="showAreaList"></area-list>
</div>
</template>

<script>
import { SubmitBar,Icon, Toast } from 'vant';
import areaList from '../../components/areaList'
export default {
    name: 'order',
    components: {
        [SubmitBar.name]: SubmitBar,
        [Icon.name]: Icon,
        areaList
    },
    data() {
        return{
            showAreaList: false,
            pPrice2: '',
            pName: '',
            pCode: '',
            podRemark: '',              //卖家留言
            merCode: localStorage.merCode,  
            orderInfo: {},
            proInfo: {},
            addrInfo: {
                daCode: '',
                daMobile: ''
            }
        }
    },
    methods: {
        close(item) {
            this.addrInfo = item
            this.showAreaList = false
        },
        onSubmit() {
            if(!this.addrInfo.daCode) {
                Toast('请增加收货地址！')
                return
            }
            let parms = {
                opType: 404,
                pCode: this.pCode,
                pCount: 1,
                daCode: this.addrInfo.daCode,
                xrymem_token_id: localStorage.memToken
            };
            this.$api.mall.order(parms).then( res => {
                if(res.resultCode ===1) {
                    let pbCode = res.data.pbCode
                    this.pay(pbCode)
                }
            })
        },
        pay(pbCode) {
            let parms = {
                priceType: 0,
                pbCode
            }
            this.$api.mall.orderPay(parms).then(res => {
                if(res.resultCode ===1) {
                    window.location.href = res.msg
                }
            })
        },
        chooseAddr() {
            this.showAreaList = true
        },
        getDefault() {
            let parms = {
                opType: 402,
                xrymem_token_id: localStorage.memToken
            };
            this.$api.mall.defaultAddr(parms).then( res => {
                if(res.resultCode ===1 && res.data) {
                    this.addrInfo = res.data
                }
            })
        }
    },
    mounted() {
        this.pCode = this.$route.query.pCode
        this.pName = this.$route.query.pName
        this.pPrice2 = this.$route.query.pPrice2
        //获取默认收货地址
        this.getDefault()
    }
}
</script>


<style lang="less" scoped>
@s: 0.0133rem;
.order{
    padding-top: 50*@s ;
    background: #fff;
    .contact{
        margin-top: 10*@s;
        padding: 0 36*@s 0 30*@s;
        display: flex;
        align-items: flex-start;
        img{
            width: 20*@s;
            margin-top: 28*@s;
            margin-right: 15*@s;
        }
        .info{
            margin-left: 16*@s;
            color: #333;
            overflow: hidden;
            width: 610*@s;
            
            .name, .phone{
                font-size: 30*@s;
                font-weight: bold;
            }
            .phone{
                float: right;
            }
            p{
                font-size: 24*@s;
                color: #808080;
                margin-top: 10*@s;
            }
        }
        .right{
            margin-left: 20*@s;
            margin-top: 30*@s;
            color: #808080;
        }
    }
    .add-addr{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30*@s 0 20*@s;
        background: #fff;
        span{
            margin-left: 20*@s;
        }
    }
    .line{
        padding: 0 9*@s;
        height: 2px;
        margin-top: 35*@s;
    }
    .title{
        line-height: 90*@s;
        background: #fff;
        margin-top: 15*@s;
        color: #333;
        img{
            width: 32*@s;
            margin: 30*@s 10*@s 0 30*@s;
        }
    }
    .sum{
        padding: 0 30*@s;
        font-size: 24*@s;
        background: #fff;
        margin-top: 30*@s;
        .item{
            display: flex;
            align-items: center;
            border-bottom: 1px solid #f2f2f2;
            height: 80*@s;
            .name{
                flex: 1;
            }
            input{
                width: 490*@s;
                flex-shrink: 0;
            }
            span{
                font-weight: bold;
                color: #FF0101;
            }
            .right{
                margin-left: 15*@s;
                color: #333;
            }
        }
    }
}
</style>
