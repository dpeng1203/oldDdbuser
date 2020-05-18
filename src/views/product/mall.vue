<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="../../assets/img/swipe_1.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/img/swipe_2.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../assets/img/swipe_3.jpg" alt />
      </van-swipe-item>
    </van-swipe>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.pCode" @click="toDesc(item)">
        <img :src="item.pMainPic" alt />
        <p>{{item.pName}}</p>
        <span>{{item.desc}}</span>
        <div class="btn">
          <van-icon name="shopping-cart-o" />
          <span>￥ {{item.pPrice2}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon
  },
  data() {
    return {
      list: []
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
.list {
  padding: 25 * @s 0;
  overflow: hidden;
  .item {
    float: left;
    margin-left: 10 * @s;
    width: 356 * @s;
    margin-top: 20 * @s;
    padding-top: 20 * @s;
    text-align: center;
    border: 1px solid #d9d9d9;
    img {
      width: 203 * @s;
      height: 203 * @s;
    }
    p {
      margin-top: 30 * @s;
      font-size: 24 * @s;
    }
    span {
      display: inline-block;
      font-size: 22 * @s;
      color: #666;
      margin-top: 15 * @s;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .btn {
      width: 100%;
      height: 65 * @s;
      background: #9abef7;
      margin-top: 30 * @s;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 26 * @s;
        color: #fff;
        margin: 0 0 0 30 * @s;
      }
      .van-icon-shopping-cart-o {
        color: #fff;
        font-size: 30 * @s;
      }
    }
  }
}
</style>