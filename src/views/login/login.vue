<template>
  <div class="login">
    <img src="../../assets/img/login_logo.png" alt />
    <div class="box">
      <div class="tab">
        <span :class="{active: active == 1}" @click="active = 1">登录</span>
        <span :class="{active: active == 2}" @click="active = 2">注册</span>
      </div>
      <div class="login-cont" v-if="active == 1">
        <div class="item">
          <input type="number" pattern="[0-9]*" placeholder="请输入手机号" v-model="phone" />
        </div>
        <div class="item">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <p @click="$router.push('/resetPw')">
          <span>忘记密码</span>
        </p>
        <div class="btn" @click="login">立即登陆</div>
      </div>
      <div class="login-cont" v-if="active == 2">
        <!-- <sign @memLogin='signed' :recCode='recCode'></sign> -->
        <sign @memLogin="signed"></sign>
      </div>
    </div>
  </div>
</template>

<script>
import {
  checkPhone,
  checkPassWord,
  checkCode,
  timeCountdown
} from "../../utils";
import { Toast, Search } from "vant";
import sign from "./sign.vue";
export default {
  name: "login",
  components: {
    sign
  },
  data() {
    return {
      active: 1,
      phone: "",
      password: "",
      recCode: ""
    };
  },
  methods: {
    login() {
      if (checkPhone(this.phone) && checkPassWord(this.password)) {
        let data = {
          mobile: this.phone,
          pwd: this.password
        };
        this.$api.login.login(data).then(res => {
          if (res.resultCode === 1) {
            localStorage.memToken = res.data.token;
            localStorage.phone = this.phone;
            localStorage.memName = res.data.member.memName;
            localStorage.memId = res.data.member.memCode;
            if(localStorage.memberProm) {
              this.$router.push('/mall')
            }else{
              this.$router.push("/home");
            }
            
          }
        });
      }
    },
    signed() {
      this.active = 1;
    }
  },
  mounted() {
    console.log(this.$route.query.memCode);
    // if(localStorage.memToken && this.$route.query.memCode) {
    //     Toast('已注册用户,自动登录!')
    //     this.$router.push('/home')
    // }
    // if(this.$route.query.memCode && !localStorage.memToken) {
    //     this.active = 2
    //     this.recCode = this.$route.query.memCode
    // }
    // if(localStorage.memToken) {
    //     this.$router.push('/home')
    // }
    if (localStorage.memToken) {
      this.$router.push("/home");
    } else {
      if (this.$route.query.memCode) {
        this.active = 2;
        // this.recCode = this.$route.query.memCode
        localStorage.recCode = this.$route.query.memCode;
      }
    }
  }
};
</script>

<style scoped lang="less">
@s: 0.0133rem;
.login {
  // min-height: calc(100vh);
  // background: #fff;
  // box-sizing: border-box;
  position: relative;
  .box {
    width: 578 * @s;
    border-radius: 30 * @s;
    position: absolute;
    left: 85 * @s;
    top: 548 * @s;
    background: #fff;
    box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.02);
    margin-bottom: 100 * @s;
  }
  .tab {
    font-size: 32 * @s;
    font-family: "STXihei";
    font-weight: bold;
    padding-top: 30 * @s;
    text-align: center;
    span {
      color: #c9c9c9;
      display: inline-block;
      line-height: 1;
      padding-bottom: 20 * @s;
      border-bottom: 1px solid #c9c9c9;
      width: 150 * @s;
    }
    .active {
      color: #00b616;
      border-bottom: 1px solid #00b616;
    }
  }
  .login-cont {
    padding: 0 75 * @s 80 * @s;
    text-align: center;
    box-sizing: border-box;
    margin-top: 50 * @s;
    .item {
      border-bottom: 1px solid #e6e6e6;
      padding: 20 * @s 10 * @s;
      padding-top: 30 * @s;
      font-size: 32 * @s;
      input {
        width: 100%;
      }
    }
    .btn {
      font-size: 24 * @s;
      margin-top: 50 * @s;
      display: inline-block;
      width: 220 * @s;
      line-height: 60 * @s;
      border-radius: 47 * @s;
      background: #81cf9b;
      color: #fff;
    }
    p {
      text-align: right;
      margin-top: 20 * @s;
      span {
        font-size: 24 * @s;
        border: 1px solid #83b092;
        color: #83b092;
        display: inline-block;
        padding: 0 20 * @s;
        border-radius: 20 * @s;
      }
    }
  }
}
</style>