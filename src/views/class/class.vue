<template>
  <div>
    <div class="top">
      <van-field v-model="value" input-align="center" left-icon="search" placeholder="洗手液" />
    </div>
    <div class="class">
      <div class="left">
        <div
          class="item"
          :class="{active: active==item.ccCode}"
          v-for="item in classList"
          :key="item.ccCode"
          @click="chooseItem(item.ccCode)"
        >{{item.ccName}}</div>
      </div>
      <div class="list">
        <div class="item" v-for="item in list" :key="item.pCode" @click="toDesc(item)">
          <img :src="item.pMainPic" alt />
          <div class="info">
            <div class="title">{{item.pName}}</div>
            <div class="desc">{{item.desc}}</div>
            <div class="pro-price">
              <!-- <span class="ori-price">￥{{item.pPrice2}}</span> -->
              <span class="price">￥{{item.pPrice2}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field } from "vant";
export default {
  components: {
    [Field.name]: Field
  },
  data() {
    return {
      classList: [
        {
          ccCode: 0,
          ccName: "全部"
        },
        {
          ccCode: 1,
          ccName: "防护用品"
        }
      ], //类列表
      list: [], //产品列表
      active: 0,
      value: ""
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
    },
    getClass() {
      let data = {
        ccType: 5
      };
      this.$api.group.class(data).then(res => {
        if (res.resultCode == 1) {
          this.classList = res.data;
          this.active = res.data[0].ccCode;
          this.getProList(this.active);
        }
      });
    },
    chooseItem(code) {
      this.active = code;
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.top {
  padding: 25 * @s 20 * @s;
  background: #f2f2f2;
  .van-field {
    height: 50 * @s;
    line-height: 50 * @s;
    border-radius: 25 * @s;
    background: #f2f2f2;
    border: 1px solid #d9d9d9;
    padding: 0 16 * @s;
  }
}
.class {
  display: flex;
  align-items: flex-start;
  .left {
    width: 140 * @s;
    height: calc(100vh - 2.7rem);
    overflow: auto;
    background: #f2f2f2;
    .item {
      text-align: center;
      line-height: 105 * @s;
      color: #333;
    }
    .active {
      background: #fff;
    }
  }
}
.list {
  background: #fff;
  padding-bottom: 30 * @s;
  // padding-left: 30*@s;
  flex: 1;
  height: calc(100vh - 2.7rem);
  overflow: auto;
  box-sizing: border-box;
  .item {
    padding: 30 * @s;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    img {
      width: 160 * @s;
      height: 160 * @s;
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