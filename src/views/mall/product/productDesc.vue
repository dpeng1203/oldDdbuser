<template>
  <div class="desc">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swipeImg" :key="item.pOrder">
        <img :src="item.pPicUrl" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="prod">
      <p class="name">{{pName}}</p>
      <p class="price">￥ {{pPrice3}}</p>
      <p class="o-price">市场价：<span>￥ {{pPrice2}}</span> </p>
    </div>
    <div class="tip">商品详情</div>
    <div class="img-wrap">
      <img :src="item.pPicUrl" alt v-for="item in descImg" :key="item.pOrder" />
    </div>
    <!-- <div class="btn" @click="toPay">购 买</div> -->
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="主页" @click="$router.push('/mall')"/>
      <van-goods-action-icon icon="cart-o" text="购物车"  @click="$router.push('/car')"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="joinCar"/>
      <van-goods-action-button type="danger" text="立即购买" @click="toPay"/>
    </van-goods-action>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon, Toast,GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [Icon.name]: Icon,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
  },
  data() {
    return {
      swipeImg: [],
      descImg: [],
      pName: "",
      pPrice2: 0,
      pPrice3: 0,
      pCode: '',
      pMainPic: ''
    };
  },
  methods: {
    getDesc(pCode) {
      this.$api.mall.homeDesc({ pCode }).then(res => {
        if (res.resultCode === 1) {
          this.pPrice3 = res.data.pPrice3
          this.pPrice2 = res.data.pPrice2
          this.pMainPic = res.data.pMainPic
          this.pName = res.data.pName
          this.swipeImg = res.data.productDetail.filter(ele => {
            return ele.pType === 1;
          });
          this.descImg = res.data.productDetail.filter(ele => {
            return ele.pType === 0;
          });
        }
      });
    },
    toPay() {
      // Toast('开发中...')
      this.$router.push({path:'/mallPay',query: {pCode: this.pCode}})
    },
    joinCar() {
      let car = [], carList = []
      if(localStorage.car&&localStorage.car.length!=0) {
        car = JSON.parse(localStorage.car)
        if(car.indexOf(Number(this.pCode)) > -1) {
          let carList = JSON.parse(localStorage.carList)
          console.log(carList)
          carList.forEach(ele => {
            if(ele.pCode == this.pCode) {
              ele.pCount ++
            }
          })
          localStorage.carList = JSON.stringify(carList)
        }else{
          car = JSON.parse(localStorage.car)
          car.push(Number(this.pCode))
          carList = JSON.parse(localStorage.carList)
          carList.push({pCode: this.pCode,pCount: 1,pName: this.pName,pPrice2: this.pPrice2,pPrice3:this.pPrice3,pMainPic: this.pMainPic})
           localStorage.car = JSON.stringify(car)
          localStorage.carList = JSON.stringify(carList)
        }
      }else{
        car.push(Number(this.pCode))
        carList.push({pCode: this.pCode,pCount: 1,pName: this.pName,pPrice2: this.pPrice2,pPrice3:this.pPrice3,pMainPic: this.pMainPic})
        localStorage.car = JSON.stringify(car)
        localStorage.carList = JSON.stringify(carList)
      }
      Toast('加入购物车成功！')
    }
  },
  mounted() {
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
    .name{
      font-weight: bold;
    }
    .price{
      font-size: 40*@s;
      color: #D11529;
    }
    .o-price{
      color: #020B16;
      font-size: 20*@s;
      span{
        text-decoration: line-through;
      }
    }
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