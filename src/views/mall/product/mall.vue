<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="../../../assets/img/swipe_1.png" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../assets/img/swipe_2.png" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../assets/img/swipe_3.png" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="img-title">
      <img src="../../../assets/img/mall_list_title.png" alt="">
    </div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.pCode" >
        <img :src="item.pMainPic" alt />
        <div class="wrap">
          <p>{{item.pName}}</p>
          <div class="desc">{{item.desc}}</div>
          <div class="rate">
            <span>商品热度</span>
            <van-rate v-model="value" />
          </div>
          <div class="o-price">￥ {{item.pPrice1}}</div>
          <div class="btn">
            <div class="price"><span class="coin">￥</span>{{item.pPrice2}} <span>[DODO优选价]</span> </div>
            <div class="buy-btn" @click="toDesc(item)">马上抢购</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon, Rate } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    [Rate.name]: Rate
  },
  data() {
    return {
      list: [],
      value: 5   //商品热度
    };
  },
  methods: {
    getList() {
      let parms = {
        pageNum: 1,
        pageSize: 20
      };
      this.$api.mall.homeList(parms).then(res => {
        if (res.resultCode === 1) {
          this.list = res.data.data;
          this.list.forEach(ele => {
            ele.desc = JSON.parse(ele.pDesc)[0].desc;
          });
        }
      });
    },
    toDesc(item) {
      this.$router.push({
        path: "/productDesc",
        query: { pCode: item.pCode, pName: item.pName, pPrice2: item.pPrice2 }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.img-title{
  height: 96*@s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  img{
    width: 326*@s;
    height: 31*@s;
  }
}
.list {
  margin-top: -30*@s;
  .item {
    padding-top: 30 * @s;
    background: #fff;
    border-bottom: 1px solid #eee;
    .wrap{
      padding: 0 40*@s 0 30*@s;
    }
    img{
      width: 100%;
      height: 351*@s;
    }
    p {
      margin-top: 40 * @s;
      font-size: 28 * @s;
    }
    .desc {
      display: inline-block;
      font-size: 22 * @s;
      color: #666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .rate{
      margin-top: 20*@s;
      display: flex;
      align-items: center;
      span{
        color: #777;
        margin-right: 20*@s;
      }
    }
    .o-price{
      margin-top: 20*@s;
      font-size: 34*@s;
      color: #FF3535;
      text-decoration: line-through;
    }
    .btn {
      margin-bottom: 40*@s;
      display: flex;
      align-items: center;
      .price{
        flex: 1;
        font-size: 60*@s;
        color: #FF3535;
        span{
          font-size: 20*@s;
          font-weight: bold;
          color: #FF3535;
        }
        .coin{
          font-size: 34*@s;
        }
      }
      .buy-btn{
        float: right;
        width: 183*@s;
        line-height: 64*@s;
        background: #A40000;
        text-align: center;
        color: #fff;
        font-size: 30*@s;
        border-radius: 10*@s;
      }
    }
  }
}
</style>