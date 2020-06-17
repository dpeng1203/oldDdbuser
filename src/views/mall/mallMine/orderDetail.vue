<template>
    <div class="order-detail">
        <div class="contact">
            <img src="../../../assets/img/address.png" alt="">
            <div class="info">
                <div class="phone">{{daMobile}}</div>
                <div class="name">收货人：{{daName}}</div>
                <p>收货地址：{{aAddress}}</p>
            </div>
        </div>
        <div class="cont" >
            <img :src="item.pMainPic" alt />
            <div class="info">
                <div class="title">{{item.pName}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="pro-price">
                <span class="ori-price">￥{{item.pPrice2}}</span>
                <span class="price">￥{{item.pPrice3}}</span>
                <span class="num">x {{pCount}}</span>
                </div>
            </div>
        </div>
        <div class="sum">
            <div class="item">
                <div class="name">订单总结</div>
            </div>
            <div class="item">
                <div class="name">商品价格</div>
                <div class="value" >￥{{(item.pPrice2*pCount).toFixed(2)}}</div>
            </div>
            <div class="item">
                <div class="name">优惠金额</div>
                <div class="value" >- ￥{{item.f_price}}</div>
            </div>
            <div class="item">
                <div class="name">运费</div>
                <div class="value">￥0.00</div>
            </div>
            <div class="item total">
                <div class="name"></div>
                <div class="value">总价：<span>￥{{(item.pPrice3*pCount).toFixed(2)}}</span></div>
            </div>
        </div>
        <div class="foot" v-if="status == 0">
            <van-submit-bar
                :price="item.pPrice3*pCount*100"
                button-text="支付"
                @submit="onSubmit"
            />
        </div>
    </div>
</template>

<script>
import { SubmitBar,Icon, Toast } from 'vant';
export default {
    components: {
        [SubmitBar.name]: SubmitBar,
        [Icon.name]: Icon,
    },
    data() {
        return{
            pbCode: '',
            status: '',
            daName: '',
            daMobile: '',
            aAddress: '',
            pCount: '',
            price: '',
            item: {}
        }
    },
    methods: {
        onSubmit() {
            let parms = {
                priceType: 0,
                pbCode: this.pbCode
            }
            this.$api.mall.orderPay(parms).then(res => {
                if(res.resultCode ===1) {
                    window.location.href = res.msg
                }
            })
        },
        getDetail(pbCode) {
            let parms = {
                opType: 406,
                xrymem_token_id: localStorage.memToken,
                pbCode
            }
            this.$api.mall.order(parms).then(res => {
                if(res.resultCode === 1) {
                    this.daName = res.data.daName
                    this.daMobile = res.data.daMobile
                    this.aAddress = res.data.daAddress
                    this.pCount = res.data.pCount
                    this.price = res.data.price
                    this.getProDetail(res.data.pCode)
                }
            })
        },
        getProDetail(pCode) {
            this.$api.mall.homeDesc({ pCode }).then(res => {
                if (res.resultCode === 1) {
                    this.item = res.data
                    if(res.data.pDesc) {
                        this.item.desc = JSON.parse(res.data.pDesc)[0].desc;
                    }
                    this.item.f_price = ((this.item.pPrice2-this.item.pPrice3)*this.pCount).toFixed(2)
                }
            });
        }

    },
    mounted() {
        this.pbCode = this.$route.query.pbCode
        this.status = this.$route.query.status
        this.getDetail(this.pbCode)
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.order-detail{
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
    .cont{
        // padding-top: 18*@s;
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