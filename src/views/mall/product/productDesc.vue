<template>
  <div class="desc">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeImg" :key="item.pOrder">
        <img :src="item.pPicUrl" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="prod">
      <p class="name">{{pName}}</p>
      <p class="price">￥ {{pPrice2}}</p>
    </div>
    <div class="tip">商品详情</div>
    <div class="img-wrap">
      <img :src="item.pPicUrl" alt v-for="item in descImg" :key="item.pOrder" />
    </div>
    <div class="btn" @click="toPay">购 买</div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon, Toast } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon
  },
  data() {
    return {
      swipeImg: [],
      descImg: [],
      pName: "",
      pPrice2: 0,
      pCode: ''
    };
  },
  methods: {
    getDesc(pCode) {
      this.$api.mall.homeDesc({ pCode }).then(res => {
        if (res.resultCode === 1) {
          this.swipeImg = res.data.filter(ele => {
            return ele.pType === 1;
          });
          this.descImg = res.data.filter(ele => {
            return ele.pType === 0;
          });
        }
      });
    },
    toPay() {
      // Toast('开发中...')
      this.$router.push({path:'/mallPay',query: {pCode: this.pCode,pName: this.pName,pPrice2: this.pPrice2}})
    }
  },
  mounted() {
    this.pName = this.$route.query.pName;
    this.pPrice2 = this.$route.query.pPrice2;
    this.pCode = this.$route.query.pCode;
    this.getDesc(this.$route.query.pCode);
  }
};
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.desc {
  padding-bottom: 100 * @s;
  .prod {
    text-align: center;
    background: #fff;
    // border-top: 1px solid #CBCBCB;
    padding: 20 * @s 0;
  }
  .tip {
    line-height: 100 * @s;
    font-weight: bold;
    text-align: center;
    background: #f3f3f3;
  }
  .btn {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #D11529;
    line-height: 100 * @s;
    text-align: center;
    color: #fff;
    font-size: 32 * @s;
  }
}
</style>