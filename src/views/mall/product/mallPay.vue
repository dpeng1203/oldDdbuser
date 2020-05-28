<template>
<div>
    <div class="order" v-show="!showAreaList">
        <div class="contact" v-if="addrInfo.daMobile">
            <img src="../../../assets/img/address.png" alt="">
            <div class="info">
                <div class="phone">{{addrInfo.daMobile}}</div>
                <div class="name">收货人：{{addrInfo.daName}}</div>
                <p>收货地址：{{addrInfo.areaName + addrInfo.daDetailAddress}}</p>
            </div>
            <div class="right" @click="chooseAddr">></div>
        </div>
        <div class="add-addr" @click="chooseAddr" v-if="!addrInfo.daMobile">
            <van-icon name="add-o" size=".8rem"/>
            <span>增加收货地址</span>
        </div>
        <!-- <div class="line"><img src="../../../assets/img/line.png" alt=""></div> -->
        <div class="product" >
<<<<<<< HEAD
          <img :src="pMainPic" alt />
=======
          <img :src="item.pMainPic" alt />
>>>>>>> 3c40e221e4de485f3698dc4198f26bfafeef1521
          <div class="info">
            <div class="title">{{pName}}</div>
            <div class="desc">{{desc}}</div>
            <div class="pro-price">
<<<<<<< HEAD
              <span class="ori-price">￥{{pPrice2}}</span>
              <span class="price">￥{{pPrice3}}</span>
              <span class="num"><van-stepper v-model="num" /></span>
=======
              <span class="ori-price">￥{{item.pPrice1}}</span>
              <span class="price">￥{{item.pPrice3}}</span>
              <span class="num">x 1</span>
>>>>>>> 3c40e221e4de485f3698dc4198f26bfafeef1521
            </div>
          </div>
        </div>
        <div class="sum">
            <div class="item">
                <div class="name">订单总结</div>
            </div>
            <div class="item">
                <div class="name">商品价格</div>
<<<<<<< HEAD
                <div class="value" >￥{{allTotal}}</div>
            </div>
            <div class="item">
                <div class="name">优惠金额</div>
                <div class="value" >- ￥{{f_price}}</div>
=======
                <div class="value" >￥{{item.pPrice2}}</div>
            </div>
            <div class="item">
                <div class="name">优惠金额</div>
                <div class="value" >- ￥{{item.f_price}}</div>
>>>>>>> 3c40e221e4de485f3698dc4198f26bfafeef1521
            </div>
            <div class="item">
                <div class="name">运费</div>
                <div class="value">￥0.00</div>
            </div>
            <div class="item total">
                <div class="name"></div>
<<<<<<< HEAD
                <div class="value">总价：<span>￥{{total}}</span></div>
            </div>
        </div>
        <van-submit-bar
            :price="total*100"
=======
                <div class="value">总价：<span>￥{{item.pPrice3}}</span></div>
            </div>
        </div>
        <van-submit-bar
            :price="item.pPrice3*100"
>>>>>>> 3c40e221e4de485f3698dc4198f26bfafeef1521
            button-text="提交订单"
            @submit="onSubmit"
        />
    </div>
    <area-list @close='close' v-show="showAreaList"></area-list>
</div>
</template>

<script>
import { SubmitBar,Icon, Toast,Stepper  } from 'vant';
import areaList from '../../../components/areaList'
export default {
    name: 'order',
    components: {
        [SubmitBar.name]: SubmitBar,
        [Icon.name]: Icon,
        areaList,
        [Stepper.name]: Stepper
    },
    data() {
        return{
            num: 1,
            showAreaList: false,
            pCode: '',
            podRemark: '',              //卖家留言
            merCode: localStorage.merCode,  
            orderInfo: {},
            proInfo: {},
            addrInfo: {
                daCode: '',
                daMobile: ''
            },
<<<<<<< HEAD
            pName: '',
            pMainPic: '',
            pPrice2: 0,
            pPrice3: 0,
            desc: '',
            f_price: 0,   //  优惠金额
            allTotal: 0,
            total: 0,
        }
    },
    watch: {
        num(val) {
            this.allTotal = (this.pPrice2*val).toFixed(2)
            this.total = (this.pPrice3*val).toFixed(2)
            this.f_price = (this.allTotal-this.total).toFixed(2)
=======
            item: {}
>>>>>>> 3c40e221e4de485f3698dc4198f26bfafeef1521
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
                pCount: this.num,
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
        },
        getDesc(pCode) {
            this.$api.mall.homeDesc({ pCode }).then(res => {
                if (res.resultCode === 1) {
<<<<<<< HEAD
                    this.pName = res.data.pName
                    this.pMainPic = res.data.pMainPic
                    this.pPrice2 = res.data.pPrice2
                    this.allTotal = res.data.pPrice2
                    this.pPrice3 = res.data.pPrice3
                    this.total = res.data.pPrice3
                    if(res.data.pDesc) {
                        this.desc = JSON.parse(res.data.pDesc)[0].desc;
                    }
                    this.f_price = (this.pPrice2-this.pPrice3).toFixed(2)
=======
                    this.item = res.data
                    this.item.desc = JSON.parse(res.data.pDesc)[0].desc;
                    this.item.f_price = (this.item.pPrice2-this.item.pPrice3).toFixed(2)
>>>>>>> 3c40e221e4de485f3698dc4198f26bfafeef1521
                }
            });
        },
    },
    mounted() {
        this.pCode = this.$route.query.pCode
        //获取默认收货地址
        this.getDefault()
        this.getDesc(this.pCode);
    }
}
</script>


<style lang="less" scoped>
@s: 0.0133rem;
.order{
    background: #fff;
    min-height: 100vh;
    .contact{
        padding: 50*@s 36*@s 35*@s 30*@s;
        display: flex;
        align-items: flex-start;
        background: #F7F7F7;
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
        padding: 60*@s 0;
        background: #F7F7F7;
        span{
            margin-left: 20*@s;
            font-weight: bold;
        }
    }
    .line{
        padding: 0 9*@s;
        height: 2px;
        // margin-top: 35*@s;
    }
    .product {
        padding: 30 * @s;
        display: flex;
        align-items: center;
        img {
            width: 160 * @s;
            height: 160 * @s;
        }
        .info {
            flex: 1;
            margin-left: 30 * @s;
            .desc {
                color: #808080;
                margin-top: 10 * @s;
                font-size: 24 * @s;
                margin-bottom: 10 * @s;
            }
            .ori-price {
                font-size: 28 * @s;
                margin-right: 10 * @s;
                text-decoration: line-through;
            }
            .price {
                color: #ed0c17;
                font-size: 32 * @s;
                font-weight: bold;
            }
            .pro-price{
                display: flex;
                align-items: center;
                .price{
                    flex: 1
                }
                .num{
                    font-size: 22*@s;
                    color: #999;
                }
            }
        }
    }
    // .title{
    //     line-height: 90*@s;
    //     background: #fff;
    //     margin-top: 15*@s;
    //     color: #333;
    //     img{
    //         width: 32*@s;
    //         margin: 30*@s 10*@s 0 30*@s;
    //     }
    // }
    .sum{
        padding: 0 40*@s;
        font-size: 24*@s;
        background: #fff;
        margin-top: 30*@s;
        .item{
            display: flex;
            align-items: center;
            font-weight: bold;
            height: 80*@s;
            // padding-top: 35*@s;
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
            &:first-child{
                border-top: 1px solid #C8C8C8;
                font-size: 26*@s;
            }
        }
        .total{
            border-top: 1px solid #C8C8C8;
            padding-top: 30*@s;
        }
    }
}
</style>
