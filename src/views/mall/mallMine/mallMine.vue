<template>
  <div class="mine">
    <div class="top">
      <div class="bg"></div>
      <div class="info">
        <div class="wrap">
          <img src="../../../assets/img/mem_logo.png" alt="">
        </div>
        <div class="name">{{phone}}</div>
        <p>普通会员</p>
        <div class="id">会员ID: {{memId}}</div>
      </div>
    </div>
    <div class="order-title">
        <span class="my">我的订单</span>
        <span class="check">查看全部订单</span>
        <van-icon name="arrow" color="#666" />
      </div>
    <div class="order">
      <div class="item">
        <img src="../../../assets/img/order_2.png" alt />
        <p>待发货</p>
      </div>
      <div class="item">
        <img src="../../../assets/img/order_3.png" alt />
        <p>待收货</p>
      </div>
      <div class="item">
        <img src="../../../assets/img/order_4.png" alt />
        <p>待付款</p>
      </div>
    </div>
    <div class="other">
      <div class="item" @click="toAddr">
        <span class="name">我的收货地址</span>
        <van-icon name="arrow" color="#666" />
      </div>
      <div class="item">
        <span class="name">我的足迹</span>
        <van-icon name="arrow" color="#666" />
      </div>
      <div class="item">
        <span class="name">相关政策</span>
        <van-icon name="arrow" color="#666" />
      </div>
      <div class="item">
        <span class="name">客服中心</span>
        <van-icon name="arrow" color="#666" />
      </div>
      <!-- <div class="item">
                <div class="wrap">
                    <img src="../../assets/img/mine_3.png" alt="" style="width: 0.43rem">
                </div>
                <span class="name">意见反馈</span>
                <span>></span>
      </div>-->
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  components: {
    [Icon.name]: Icon
  },
  data() {
    return{
      phone: localStorage.phone,
      memId: localStorage.memId
    }
  },
  methods: {
    toAddr() {
      this.$router.push({path: '/addressList'})
    },
  }
};
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.mine {
  background: #f2f2f2;
  .top {
    // height: 667 * @s;
    // background-image: url("../../../assets/img/mine_bg.jpg");
    // background-size: 100% 100%;
    background: #fff;
    .bg{
      background: #E4EEFE;
      height: 234*@s;
    }
    .info {
      // display: flex;
      // align-items: center;
      // padding: 208 * @s 0 0 120 * @s;
      padding-bottom: 20*@s;
      margin-top: -115*@s;
      text-align: center;
      .wrap {
        width: 173 * @s;
        height: 173 * @s;
        border-radius: 50%;
        background: #fff;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        color: #1A1A1A;
        font-weight: bold;
        margin-top: 20*@s;
      }
      p{
        color: #1A1A1A;
        font-size: 24*@s;
        margin-top: 20*@s;
      }
      .id{
        margin-top: 20*@s;
        color: #666;
        font-size: 20*@s;
      }
    }
    
  }
  .order-title{
    display: flex;
    align-items: center;
    height: 99*@s;
    border-bottom: 1px solid #F5F5F5;
    background: #fff;
    margin-top: 20*@s;
    padding: 0 30*@s;
    .my{
      flex: 1;
    }
    .check{
      color: #666;
      margin-right: 20*@s;
    }
  }
  .order {
    display: flex;
    align-items: center;
    padding: 30*@s 40*@s;
    background: #fff;
    .item {
      // width: 150 * @s;
      margin-right: 80*@s;
      text-align: center;
      img {
        width: 74 * @s;
        height: 74*@s;
      }
      p {
        margin-top: 20 * @s;
        color: #666;
        font-size: 24 * @s;
      }
    }
  }
  .other {
    padding: 0 30*@s;
    background: #fff;
    margin-top: 20*@s;
    .item {
      display: flex;
      align-items: center;
      height: 92 * @s;
      border-bottom: 1px solid #F5F5F5;
      .name {
        color: #333;
        font-size: 25 * @s;
        flex: 1;
      }
    }
  }
}
</style>