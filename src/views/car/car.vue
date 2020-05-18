<template>
  <div class="car">
    car
    <!-- <div class="list">
        <div class="item" v-for="item in list" :key="item.pCode" @click="toDesc(item)">
            <van-checkbox v-model="checked" shape="square"></van-checkbox>
            <img :src="item.pMainPic" alt="">
            <div class="info">
                <div class="title">{{item.pName}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="pro-price">
                    <span class="ori-price">￥{{item.pPrice2}}</span>
                    <span class="price">￥{{item.pPrice2}}</span>
                </div>
            </div>
        </div>
    </div>-->
  </div>
</template>

<script>
import { Checkbox } from "vant";

export default {
  components: {
    [Checkbox.name]: Checkbox
  },
  data() {
    return {
      checked: true,
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
      // this.$router.push({path: '/desc',query:{pCode: item.pCode,pName: item.pName,pPrice2: item.pPrice2}})
    }
  },
  mounted() {
    // this.getList()
  }
};
</script>

<style scoped lang='less'>
@s: 0.0133rem;
.list {
  background: #fff;
  padding-bottom: 30 * @s;
  // padding-left: 30*@s;
  flex: 1;
  height: calc(100vh);
  overflow: auto;
  box-sizing: border-box;
  .item {
    padding: 30 * @s;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .van-icon {
      background-color: #000;
      border-color: #000;
    }
    img {
      width: 160 * @s;
      height: 160 * @s;
      margin-left: 30 * @s;
    }
    .info {
      display: inline-block;
      margin-left: 30 * @s;
      .title {
        font-size: 24 * @s;
        // font-weight: bold;
      }
      .desc {
        color: #808080;
        margin-top: 10 * @s;
        font-size: 24 * @s;
        margin-bottom: 10 * @s;
      }
      .ori-price {
        font-size: 28 * @s;
        margin-right: 10 * @s;
        text-decoration: line-through;
      }
      .price {
        color: #ed0c17;
        font-size: 32 * @s;
        font-weight: bold;
      }
    }
  }
}
</style>