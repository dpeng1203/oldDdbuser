<template>
    <div class="sign">
        <div class="login-cont">
            <div class="input">
                <input type="text" placeholder="用户名：4-14字符" v-model="name">
                <input type="password" placeholder="登录密码：6-20字符" v-model="password">
                <input type="number" pattern="[0-9]*" placeholder="手机号" v-model="phone">
                <input type="number" pattern="[0-9]*" placeholder="输入验证码" v-model="code">
                <span v-show="!timeObj.canGet">{{timeObj.waitTime+"s后重新获取"}}</span>
                <span @click="getCode" v-show="timeObj.canGet" class="code">获取验证码</span>
                <input type="password" pattern="[0-9]*" placeholder="支付密码：6位数字" v-model="memPayPwd">
            </div>
            <div class="btn" @click="toSign">立即注册</div>
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
    </div>
</template>

<script>
import { checkUserName,checkPhone,checkPassWord,checkCode,timeCountdown,checkPwd } from '../../utils'
import { Toast,Icon,Popup } from 'vant'
export default {
    name: 'sign',
    components: {
        [Icon.name]: Icon,
        [Popup.name]: Popup
    },
    props: {
        // recCode: [Number,String]
    },
    data() {
        return{
            show: false,
            name: '',
            password: '',
            phone: '',
            code: '',
            memPayPwd: '',
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
        getCode() {
            if(checkPhone(this.phone)) {
                let data = {
                    mobile: this.phone,
                    type: 'register'
                }
                this.$api.login.code(data).then(res => {
                    if(res.resultCode === 1) {
                        Toast('发送成功！')
                        //倒计时开始
                        timeCountdown(this.timeObj);  //参数为最终对象
                    }
                })
            }
        },
        toSign() {
            if(checkUserName(this.name) && checkPassWord(this.password) && checkPhone(this.phone) && checkPwd(this.memPayPwd)) {
                if(localStorage.recCode) {
                    let data = {
                        memName: this.name,
                        memMobile: this.phone,
                        verifyCode: this.code,
                        memPwd: this.password,
                        pMemCode: localStorage.recCode,
                        memPayPwd: this.memPayPwd
                    }
                    this.$api.login.signQr(data).then( res => {
                        if(res.resultCode === 1) {
                            Toast('注册成功！')
                            // this.$router.push('/')
                            this.$emit('memLogin',1)
                        }
                    })
                }else{
                    let data = {
                        memName: this.name,
                        memMobile: this.phone,
                        verifyCode: this.code,
                        memPwd: this.password,
                        memPayPwd: this.memPayPwd
                    }
                    this.$api.login.sign(data).then( res => {
                        if(res.resultCode === 1) {
                            Toast('注册成功！')
                            // this.$router.push('/')
                            this.$emit('memLogin',1)
                        }
                    })
                }
                
            }
            
        }
    }

}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.sign{
    .login-cont{
        text-align: center;
        .input{
            position: relative;
            input{
                width: 100%;
                // margin-top: 5*@s;
                padding: 12*@s;
                border-bottom: 1px solid #E6E6E6;
                box-sizing: border-box;
                font-size: 32*@s;
            }
            span{
                position: absolute;
                right: 0;
                bottom: 88*@s;
                border: 1px solid #ccc;
                color: #ccc;
                padding: 0 10*@s;
                line-height: 40*@s;
                border-radius: 20*@s;
            }
            .code{
                color: #81CF9B;
                border: 1px solid #81CF9B;
            }
        }
        .btn{
            font-size: 24*@s;
            margin-top: 50*@s;
            display: inline-block;
            width: 220*@s;
            line-height: 60*@s;
            border-radius: 47*@s;
            background: #81CF9B;
            color: #fff;
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
}
</style>