<template>
    <div class="transfer">
        <div class="top">
            <div class="left">
                <div class="name">会员昵称</div>
                <div class="val">{{name}} (ID:{{id}})</div>
            </div>
            <div class="right">
                <div class="name">我的卡券</div>
                <div class="val">{{num}} 张</div>
            </div>
        </div>
        <img src="../../assets/img/transfer.png" alt="" style="margin-top: .8rem">
        <p>使用券转移后无法撤销，请谨慎操作！</p>
        <div class="wrap">
            <div class="item first">
                <div class="name">对方会员ID</div>
                <input type="number" pattern="[0-9]*" placeholder="填写会员接收ID号" v-model="receiveCode">
            </div>
            <div class="item">
                <div class="name">转移卡券（张）</div>
                <input type="number" pattern="[0-9]*" placeholder="填写转出卡券数量" v-model="couponSum">
            </div>
        </div>
        <div class="btn">
            <div class="btn-left" @click="transfer">转移卡券</div>
            <div class="btn-right" @click="$router.push('/transferRecord')">转移记录</div>
        </div>

        <van-popup
            v-model="showKeyboard"
            position="top"
        >   
            <div class="pw-box">
                <input type="password" pattern="[0-9]*" placeholder="请输入支付密码" v-model="value" class="pw">
                <van-button type="primary" class="btn-pw" @click="refundPw">确认</van-button>
            </div>
            
            
        </van-popup>
    </div>
</template>

<script>
import { Toast,Popup,Button } from 'vant'
import { checkNumPw } from '../../utils'
export default {
    components: {
        [Popup.name]: Popup,
        [Button.name]: Button
    },
    data() {
        return{
            showKeyboard: false,
            value: null,
            name: localStorage.memName,
            id: localStorage.memId,
            couponSum: null,
            receiveCode: null,
            num: 0,
        }
    },
    methods: {
        getInfo() {
            let data = {
                xrymem_token_id: localStorage.memToken,
                opType: 316,
            }
            this.$api.ticket.merTicket(data).then(res => {
                if(res.resultCode == 1) {
                    this.num = res.data
                }
            })
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
                        let parms = {
                            xrymem_token_id: localStorage.memToken,
                            opType: 314,
                            couponSum: this.couponSum,
                            receiveCode: this.receiveCode
                        }
                        this.$api.ticket.merTicket(parms).then(res => {
                            if(res.resultCode == 1) {
                                Toast('转移成功')
                            }
                        })
                    }else{
                        Toast('密码错误！') 
                    }
                })
            }


            
        },
        transfer() {
            
            if(!this.receiveCode) {
                Toast('请输入会员接收ID号')
                return
            }
            if(this.couponSum < 1 || this.couponSum > this.num) {
                Toast('请输入合适的卡券数量，不能多于持有卡券数量')
                return
            }
            this.showKeyboard = true
            
        }
    },
    mounted() {
        this.getInfo()
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.transfer{
    padding: 50*@s;
    background: #fff;
    min-height: 100vh;
    .top{
        background: #81CF9B;
        padding: 40*@s;
        display: flex;
        align-items: center;
        border-radius: 20*@s;
        color: #fff;
        .left{
            flex: 1;
            border-right: 1px solid #fff;
        }
        .right{
            flex: 1;
            text-align: right;
        }
        .val{
            margin-top: 15*@s;
        }
    }
    p{
        color: red;
        margin: 80*@s 0 40*@s;
    }
    .wrap{
        border-radius: 10*@s;
        border: 1px solid #ddd;
        padding: 20*@s;
        .first{
            border-bottom: 1px solid #ccc;
        }
        .item{
            display: flex;
            align-items: center;
            padding: 15*@s;
            .name{
                flex-shrink: 0;
            }
            input{
                flex: 1;
                text-align: right;
            }
        }
    }
    .btn{
        margin-top: .8rem;
        text-align: center;
        &-left{
            display: inline-block;
            line-height: 88*@s;
            border-radius: 44*@s;
            background: #81CF9B;
            color: #fff;
            width: 380*@s;
        }
        &-right{
            display: inline-block;
            line-height: 88*@s;
            border-radius: 44*@s;
            background: #fff;
            width: 220*@s;
            margin-left: 30*@s;
            color: #81CF9B;
            border: 1px solid #81CF9B;
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
            text-align: center;
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
        }
}
</style>