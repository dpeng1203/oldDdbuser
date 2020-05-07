<template>
    <div class="login">
        <div class="login-cont">
            <div class="input">
                <input type="number" pattern="[0-9]*" placeholder="提现手机号" v-model="phone">
                <input type="number" pattern="[0-9]*" placeholder="输入验证码" v-model="code">
                <span v-show="!timeObj.canGet">{{timeObj.waitTime+"s后重新获取"}}</span>
                <span @click="getCode" v-show="timeObj.canGet" class="getCode">获取验证码</span>
                
                <input type="password" pattern="[0-9]*" placeholder="设置/修改支付密码" v-model="pw">
                <!-- <input type="password" pattern="[0-9]*" placeholder="重复密码" v-model="newPw"> -->
            </div>
            <!-- 密码输入框 -->
            <!-- <van-password-input
                :value="pw"
                info="设置/修改支付密码"
                :focused="showKeyboard"
                @focus="showKeyboard = true"
            /> -->
            <div class="btn" @click="changePw">完成</div>
        </div>
        
        <!-- 数字键盘 -->
        <van-number-keyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
            @blur="showKeyboard = false"
        />
    </div>
</template>

<script>
import { checkPhone,checkPassWord,timeCountdown,checkNumPw } from '../../utils'
import { Toast,PasswordInput, NumberKeyboard } from 'vant'
export default {
    name: 'resetPw',
    components: {
        [PasswordInput.name]: PasswordInput,
        [NumberKeyboard.name]: NumberKeyboard
    },
    data() {
        return{
            showKeyboard: false,     //数字键盘
            phone: '',
            code: '',
            pw: '',
            newPw: '',
            timeCountObj: { //倒计时临时对象
                canGet: true,
                timer: null,
                waitTime: 60
            },
        }
    },
    computed: {
        timeObj(){ //最终对象
            if(!this.timeCountObj.canGet){
                return timeCountdown(this.timeCountObj);
            }else{
                return this.timeCountObj;
            }
        }
    },
    methods: {
        onInput(key) {
            this.pw = (this.pw + key).slice(0, 6);
        },
        onDelete() {
            this.pw = this.pw.slice(0, this.pw.length - 1);
        },
        getCode() {
            if(checkPhone(this.phone)) {
                let data = {
                    mobile: this.phone,
                }
                this.$api.pay.payCode(data).then(res => {
                    if(res.resultCode === 1) {
                        Toast('发送成功！')
                        //倒计时开始
                        timeCountdown(this.timeObj);  //参数为最终对象
                    }
                })
            }
        },
        changePw() {
            if(checkPhone(this.phone) && checkNumPw(this.pw)) {
                // if(this.newPw !== this.pw) {
                //     Toast('两次输入密码不一致！')
                //     return
                // }else {
                    // if(this.pw.length != 6) {
                    //     Toast('密码为六位数字!')
                    //     return
                    // }
                    let data = {
                        xrymem_token_id: localStorage.memToken,
                        opType : 308,
                        certCode : this.code,
                        payPwd : this.pw
                    }  
                    this.$api.pay.changePw(data).then( res => {
                        if(res.resultCode === 1) {
                            Toast('密码设置/修改成功！')
                            this.$router.go(-1)
                        }
                    })
                // }
            }
        }
    }
}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.login{
    font-size: 28*@s;
    .login-title{
        text-align: center;
        font-size: 36*@s;
        font-weight: 500;
        color: #010101;
        line-height: 88*@s;
        position: relative;
        img{
            position: absolute;
            left: 20*@s;
            top: 19*@s;
            width: 50*@s;
            height: 50*@s;
        }
        span{
            font-weight: 500;
        }
    }
    .login-cont{
        height: calc(100vh);
        padding: 0 75*@s;
        text-align: center;
        background: #fff;
        .input{
            padding-top: 140*@s;
            position: relative;
            margin-bottom: 80*@s;
            input{
                width: 100%;
                margin-top: 70*@s;
                padding: 12*@s;
                font-size: 32*@s;
                border-bottom: 1px solid #ccc;
            }
            span{
                position: absolute;
                right: 0;
                bottom: 160*@s;
                border: 1px solid #ccc;
                color: #ccc;
                width: 200*@s;
                line-height: 40*@s;
                border-radius: 20*@s;
            }
            .getCode{
                background: #81CF9B;
                color: #fff;
            }
        }
        .btn{
            font-size: 30*@s;
            margin-top: 150*@s;
            display: inline-block;
            width: 300*@s;
            line-height: 80*@s;
            border-radius: 12*@s;
            background: #81CF9B;
            color: #fff;
        }
    }
    [class*=van-hairline]::after {
        border: 0 solid rgb(116, 113, 110);
    }
    .van-hairline--left::after {
        border-left-width: 1px;
    }
    .van-hairline--surround::after {
        border-width: 1px;
    }
}
</style>