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
        <div ref="bgChoose1" class="xry" @click="payType(1)">
            <p class="xry_title"> SN：{{list.macCode}}</p>
            <van-divider />
            <p class="payTitle">{{at}}号养生议(15分钟)</p> 
            <span id="mainSpan" >{{list.macPrice}}元</span>
           
        </div>
        <div ref="bgChoose2" class="xry"   @click="payType(2)" v-if="list.price1 && time(list.serviceTime1)">
            <p class="xry_title"> SN：{{list.macCode}}</p>
             <van-divider />
           <p class="payTitle">{{at}}号养生议</p>
           <p class="payTime">{{time(list.serviceTime1)}}分钟理疗时间</p> 
           <span>{{list.price1}}元</span> 

        </div>
        <div ref="bgChoose3" class="xry" @click="payType(3)" v-if="list.price2 && time(list.serviceTime2)">
            <p class="xry_title"> SN：{{list.macCode}}</p>
             <van-divider />
            <p class="payTitle">{{at}}号养生议</p>
            <p class="payTime">{{time(list.serviceTime2)}}分钟理疗时间</p>  
            <span>{{list.price2}}元</span>
            
        </div>
        <div class="pay-type" >
            <div class="title">支付方式</div>
            <div class="item"  @click="cashPay">
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
        <van-popup 
            v-model="show" 
            :style="{ width: '80%' }" 
            round 
            :close-on-click-overlay="false">
                
        </van-popup>

        <div class="p-icon"  v-if="show">
            <img src="../../assets/img/gzh.jpg" alt="" class="gzh">
            <div class="icon-close" @click="show = false">
                <van-icon name="clear" size=".9rem" color="#fff"/>
            </div>
        </div>
        <!-- 蒙层 -->
        <!-- <van-popup 
            v-model="showKeyboard" 
            :overlay-style='{zIndex: 22}' 
        >
        </van-popup> -->
        <van-popup
            v-model="showKeyboard"
            position="top"
            :style="{ height: '32%' }" 
        >   
            <div class="pw-box">
                <input type="password" pattern="[0-9]*" placeholder="请输入支付密码" v-model="value" class="pw">
                <van-button type="primary" class="btn-pw" @click="refundPw">确认</van-button>
            </div>
        </van-popup>
        <!-- 密码输入框 -->
        <!-- <div class="pwbox" v-show="showKeyboard">
            <van-password-input
                :value="value"
                info="请输入支付密码，如未设置请先设置支付密码"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
            />
            <van-button type="primary" class="btn" @click="refundPw">确认</van-button>
        </div> -->
        <!-- 数字键盘 -->
        <!-- <van-number-keyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
        /> -->
    </div>    
</template>

<script>
import { Popup,Dialog, Toast,Divider,Icon,PasswordInput, NumberKeyboard,Button } from 'vant';
import { checkNumPw } from '../../utils'
export default {
    components: {
        [Divider.name]: Divider,
        [Popup.name]: Popup,
        [Icon.name]: Icon,
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard,
        [Button.name]: Button
    },
    data() {
        return{
            showKeyboard: false,        
            value: '',                  //支付密码
            show: true,
            checked: false,
            active: 0,
            at: '',
            barcode: '',
            pcode: '',
            // params: {
            //     factSum: 10,
            //     at: '',
            //     sid: '',
            //     pcode: 1,
            //     barcode: ''
            // },
            productList: [],
            list: [],
            pcode: 1,
            ptime: '',
            payTypeText: '',
            isMem: false,
            bizType: 1,
            serviceList:[],
        
           
        }
    },
    computed: {
       
    },
    methods: {
        //密码输入
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        //密码删除
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        refundPw() {
            if(checkNumPw(this.value)) {
                let data = {
                    xrymem_token_id: localStorage.memToken,
                    opType : 309,
                    payPwd : this.value
                }  
                this.$api.pay.changePw(data).then( res => {
                    if(res.resultCode === 1) {
                        this.showKeyboard = false
                        let param = {
                            priceType: this.bizType-1,
                            barcode: this.barcode,
                            pcode: this.pcode,
                            price: this.serviceList[this.bizType-1].price,
                            serviceTime: this.serviceList[this.bizType-1].serviceTime,
                            xrymem_token_id: localStorage.memToken
                        }
                        this.$api.pay.merPay(param).then( res => {
                            if(res.resultCode == 1) {
                                this.$router.push({path: '/using',query: {orderid: res.msg}})
                            }
                        })
                    }else{
                        Toast('密码错误！') 
                    }
                })
            }
            
        },
        paySubmit () {
            if(!this.active) {
                Toast('请选择支付放方式！')
                return
            }
            let param = {
                    priceType:this.bizType-1,
                    barcode: this.barcode,
                    pcode: this.pcode,
                    price: this.serviceList[this.bizType-1].price,
                    serviceTime: this.serviceList[this.bizType-1].serviceTime,
                    xrymem_token_id: localStorage.memToken
                }
            console.log(param)
            if(this.active == 1) {
                this.showKeyboard = true
                // this.$api.pay.merPay(param).then( res => {
                //     if(res.resultCode == 1) {
                //         this.$router.push({path: '/using',query: {orderid: res.msg}})
                //     }
                // })
            }else if(this.active == 2) {
                this.$api.pay.pay(param).then(res => {
                    if(res.resultCode == 1) {
                        window.location.href = res.msg
                    }
                })
            }           
        },
        payType(type){
            this.bizType = type
            console.log(this.bizType)
            this.bizType === 1 ? this.pcode = this.pcode : this.pcode = 0
            console.log(this.pcode)
            if(this.bizType === 1){
                this.$refs.bgChoose1.style.background = "rgba(232, 245, 255, 1)" 
                this.$refs.bgChoose2.style.background = "rgba(255, 255, 255, 1)"    
                this.$refs.bgChoose3.style.background = "rgba(255, 255, 255, 1)"
            }else if(this.bizType === 2){
                this.$refs.bgChoose1.style.background = "rgba(255, 255, 255, 1)"   
                this.$refs.bgChoose2.style.background = "rgba(232, 245, 255, 1)" 
                this.$refs.bgChoose3.style.background = "rgba(255, 255, 255, 1)"   
            }else{
                this.$refs.bgChoose1.style.background = "rgba(255, 255, 255, 1)"   
                this.$refs.bgChoose3.style.background = "rgba(232, 245, 255, 1)" 
                this.$refs.bgChoose2.style.background = "rgba(255, 255, 255, 1)" 
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
        },
       time(s) {
         return Math.floor(s/60)
       }



    },
    mounted() {
        this.at = this.$route.query.at
        this.macCode = this.$route.query.macCode
        this.pcode = this.$route.query.pcode
        this.barcode = this.$route.query.barcode
        // let pcode = this.pcode
        // console.log(pcode)
        // this.barcode = 'd3efd86d51e389e6c116d6f2d98600b9'
        // let barcode = this.barcode
        // this.at = '98'
        Promise.all([
            this.$api.pay.getProducts({ pcode:this.pcode }),
            this.$api.pay.getPrice({ barcode:this.barcode })
        ]).then(res => {
            console.log(res)
            let data0 = res[0].data[0]
            this.productList = res[0]
            this.pcode = data0.pCode
            this.ptime = data0.pTime
            this.list = res[1].data
            // this.list.price1 = 0
            var service = {
                price:this.list.macPrice,
                serviceTime:data0.pTime,
            }
            this.serviceList.push(service);

            this.serviceList.push({
                price:this.list.price1,
                serviceTime:this.list.serviceTime1
            });

            this.serviceList.push({
                price:this.list.price2,
                serviceTime:this.list.serviceTime2
            })
            
            console.log(res[1].data)
           

        })
        // if(localStorage.memToken) {
        //     this.isMem = true
        //     this.getPayType()
        // }else{
        //     this.isMem = false
        // }
        // 默认选中第一个
        this.$refs.bgChoose1.style.background = 'rgba(232, 245, 255, 1)'
       
        this.bizType = 1
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
                background: #81CF9B;
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
            position: relative;
            overflow: hidden;
            font-size: 35*@s;
            font-weight: 500;
            line-height: 130*@s;
            border-radius: 20*@s;
            background: rgba(255, 255, 255, 1);
            padding: 0 40*@s;
            text-align: left;
            margin:25*@s 30*@s;
            padding-bottom: 7*@s;
           .van-divider{
            margin-top: 20*@s;
            width: 105%;
            
            margin-left: -20*@s;
            }
           #mainSpan{
             margin: -55*@s 0*@s 0*@s -20*@s;

           }
           .xry_title{
               margin: 35*@s 0*@s 10*@s -20*@s;
               font-size: 20*@s;
           }
           .payTitle{
               float: left;
               display: block;
               font-size: 35*@s;
               font-family:' PingFang-SC-Medium';
               margin: -13*@s 0*@s 0*@s -20*@s;
               font-weight:600;
           }
           .payTime{
               position: absolute;
               top: 138*@s;
               left: 20*@s; 
               float: left;
               font-size: 24*@s;
               font-family:' PingFang-SC-Medium';
               display: block;
               color: #808080;

           }
            .check{
               position: absolute;
               top: 53*@s;
               right:38*@s; 
            }
            span{
                margin-right: 50*@s;
                margin-top: -30*@s;
                font-size: 40*@s;
                font-weight: bold;
                float: right;
                color: #FF0303;
            }
        }
        .pay-type{
            margin: 50*@s 30*@s;
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
                background: #81CF9B;
                color: #fff;
                border-radius: 15*@s;
            }
        }
        .p-icon{
            position: fixed;
            left: 0;
            right: 0;
            top: 250*@s;
            z-index: 999999;
            img{
                width: 80%;
                border-radius: 30*@s;
            }
            .icon-close{
                margin-top: 60*@s;
            }
        }
        .pwbox{
            position: fixed;
            left: 0;
            right: 0;
            top: 200*@s;
            z-index: 100; 
            text-align: center;
            .van-password-input__info{
                color: #fff;
            }
            .btn{
                margin-top: 80*@s;
                width: 280*@s;
                
            }
        }
        .pw-box{
            padding-bottom: 100*@s;
        }
        .pw{
            padding: 20*@s;
            width: 600*@s;
            border: 1px solid #eaeae8;
            margin: 90*@s 50*@s 0;
            box-sizing: border-box;
            border-radius: 10*@s;
        }
        .btn-pw{
            margin-top: 80*@s;
            width: 280*@s;
            background: #89d3a2;
        }
    }
</style>
