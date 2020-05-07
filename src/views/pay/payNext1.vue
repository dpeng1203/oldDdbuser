<template>
    <div class="pay">
        <div class="step">
            <div class="num active">1</div>
            <div class="line active"></div>
            <div class="num active">2</div>
            <div class="line"></div>
            <div class="num">3</div>
        </div>
        <div class="tip">确认支付开启DODO智能养生仪</div>
        <p>驱寒祛湿 疏通经络 改善气血循环</p>
        <div class="xry">{{at}}号DODO智能养生仪 <span>{{money}}元</span></div>
        <div class="pay-type" >
            <div class="title">支付方式</div>
            <div class="item" @click="cashPay">
                <img src="../../assets/img/quan.png" alt="" >
                <span >账户余额 / 券支付</span>
                <img src="../../assets/img/choose.png" alt="" class="choose" v-if="active == 1">
                <img src="../../assets/img/unSel.png" alt="" class="choose" v-else>
            </div>
            <div class="item" @click="active = 2" >
                <img src="../../assets/img/pay-type.png" alt="" >
                <span >微信 / 支付宝支付</span>
                <img src="../../assets/img/choose.png" alt="" class="choose" v-if="active == 2">
                <img src="../../assets/img/unSel.png" alt="" class="choose" v-else>
            </div>
        </div>
        <!-- <div class="pay-type">
            <div class="title">体验券</div>
            <div class="item">
                <img src="../../assets/img/tick.png" alt="" class="tick">
            </div>
        </div> -->
        <div class="foot">
            <div class="btn" @click="paySubmit">马上启用</div>
        </div>
    </div>    
</template>

<script>
import { Dialog, Toast } from 'vant';
export default {
    data() {
        return{
            active: 0,
            at: '',
            barcode: '',
            pcode: '',
            params: {
                factSum: 10,
                at: '',
                sid: '',
                pcode: 1,
                barcode: ''
            },
            productList: [],
            pcode: '',
            ptime: '',
            pprice: 0,
            payTypeText: '',
            isMem: false
        }
    },
    computed: {
        money () {
            return this.pprice.toFixed(2)
        },
        time () {
            return this.ptime / 60
        }
    },
    methods: {
        paySubmit () {
            if(this.active == 1) {
                let data = {
                    barcode: this.barcode,
                    pCode: this.pcode,
                    xrymem_token_id: localStorage.memToken
                }
                this.$api.pay.merPay(data).then( res => {
                    if(res.resultCode == 1) {
                        this.$router.push({path: '/using',query: {orderid: res.msg}})
                    }
                })
            }else if(this.active == 2) {
                let param = {
                    barcode: this.barcode,
                    at: this.at,
                    pcode: this.pcode
                }
                this.$api.pay.pay(param).then(res => {
                    if(res.resultCode == 1) {
                        window.location.href = res.msg
                    }
                })
            }else{
                Toast('请选择支付方式！')
            }
            
        },
        cashPay() {
            if(localStorage.memToken) {
                this.getPayType()
            }else{
                Dialog.confirm({
                    title: '提示',
                    message: '暂未登录，去登录吗？'
                }).then(() => {
                    // on confirm
                    this.$router.push('/')
                }).catch(() => {
                    // on cancel
                    this.active = 2
                });
            }
        },
        getPayType() {
            let data = {
                barcode: this.barcode,
                xrymem_token_id: localStorage.memToken
            }
            this.$api.pay.payType(data).then(res => {
                if(Number(res.resultCode) > 0) {
                    this.payTypeText = res.msg
                    this.active = 1
                }else if(res.resultCode == -1) {
                    Dialog.confirm({
                        title: '提示',
                        message: '账户余额不足，去充值？'
                    }).then(() => {
                        // on confirm
                        this.$router.push('/recharge')
                    }).catch(() => {
                        // on cancel
                        this.active = 2
                    });
                }
            })
        }
    },
    mounted() {
        let barcode = this.$route.query.barcode
        let at = this.$route.query.at
        let pcode = this.$route.query.pcode
        this.barcode = barcode
        this.at = at
        Promise.all([
            this.$api.pay.getProducts({ pcode }),
            this.$api.pay.getPrice({ barcode })
        ]).then(res => {
            console.log(res)
            this.productList = res[0]
            this.pcode = res[0].data[0].pCode
            this.ptime = res[0].data[0].pTime
            this.pprice = +res[1].data.macPrice
        })
        // if(localStorage.memToken) {
        //     this.isMem = true
        //     this.getPayType()
        // }else{
        //     this.isMem = false
        // }
    }
}
</script>

<style lang="less" scoped>
	@s: 0.0133rem;
    .pay{
        text-align: center;
        .step{
            margin-top: 70*@s;
            display: flex;
            align-items: center;
            margin-left: 117*@s;
            .num{
                width: 44*@s;
                line-height: 44*@s;
                border-radius: 50%;
                background: #D2D2D2;
                color: #fff;
            }
            .line{
                width: 190*@s;
                height: 10*@s;
                background: #D2D2D2;
            }
            .active{
                background: #00b616;
            }
        }
        .tip{
            font-size: 36*@s;
            font-weight: bold;
            margin-top: 40*@s;
            line-height: 1;
            
        }
        p{
            font-size: 24*@s;
            font-weight: 500;
            margin-top: 20*@s;
            line-height: 1;
        }
        .xry{
            font-size: 36*@s;
            font-weight: 500;
            line-height: 130*@s;
            border-radius: 20*@s;
            background: #fff;
            padding: 0 40*@s;
            text-align: left;
            margin: 90*@s 30*@s;
            span{
                font-size: 48*@s;
                font-weight: bold;
                float: right;
                color: #FF0303;
            }
        }
        .pay-type{
            margin: 60*@s 30*@s;
            text-align: left;
            .title{
                margin-bottom: 10*@s;
            }
            .item{
                background: #fff;
                padding: 20*@s;
                display: flex;
                align-items: center;
                border-radius: 20*@s;
                border-bottom: 1px solid #f2f2f2;
                margin-top: 10*@s;
                img{
                    width: 55*@s;
                }
                span{
                    flex: 1;
                    margin-left: 20*@s;
                }
                .choose{
                    width: 30*@s;
                }
                .tick{
                    width: 100%
                }
            }
        }
        .foot{
            padding: 20*@s 75*@s;
            background: #fff;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            .btn{
                width: 600*@s;
                line-height: 80*@s;
                background: #00b616;
                color: #fff;
                border-radius: 15*@s;
            }
        }
    }
</style>
