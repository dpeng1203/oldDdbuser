<template>
  <div class="car">
    <div class="list">
        <div class="item" v-for="(item,index) in list" :key="index">
            <van-checkbox v-model="item.check" checked-color="#ee0a24" shape="square"></van-checkbox>
            <img :src="item.pMainPic" alt="">
            <div class="info">
                <div class="title">{{item.pName}}</div>
                <div class="desc">{{item.desc}}</div>
                <div class="pro-price">
                    <span class="ori-price">￥{{item.pPrice2}}</span>
                    <span class="price">￥{{item.pPrice3}}</span>
                    <p class="num" ><van-stepper v-model="item.pCount" /></p>
                </div>
            </div>
        </div>
    </div>
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" checked-color="#ee0a24" @click="selAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { Checkbox,Stepper,SubmitBar, Toast } from "vant";
// import { SubmitBar,Icon, Toast,Stepper  } from 'vant';
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper,
    [SubmitBar.name]: SubmitBar
  },
  data() {
    return {
      checked: false,
      list: []
    };
  },
  computed: {
    total() {
      let sum = 0
      this.list.forEach(ele => {
        if(ele.check) {
          sum += ele.pPrice3*ele.pCount
        }
      })
      return sum*100
    }
  },
  watch: {
    list: {
      handler(val) {
        let arr = val.filter(ele => {
          return ele.check 
        })
        if(arr.length < this.list.length) {
          this.checked = false
        }else(
          this.checked = true
        )
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
   onSubmit() {
     Toast('敬请等候...')
   },
   selAll() {
      if(this.checked) {
        this.list.forEach(ele => {
          ele.check = true
        })
      }else{
        this.list.forEach(ele => {
          ele.check = false
        })
      }
   }
  },
  mounted() {
    // this.getList()
    let arr = []
    if(localStorage.carList) {
      arr = JSON.parse(localStorage.carList)
    }
    if(arr&&arr.length!=0){
      arr.forEach(ele => {
        ele.check = false
      });
    }
    
    this.list = arr || []
  }
};
</script>

<style scoped lang='less'>
@s: 0.0133rem;
.van-submit-bar{
  bottom: 110*@s;
}
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
      flex: 1;
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
      .num{
        text-align: right;
      }
    }
  }
}
</style>