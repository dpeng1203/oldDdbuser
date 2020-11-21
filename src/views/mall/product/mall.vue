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

    <!-- 多多甄选 -->
    <div class="img-title" style="marginTop: .133rem" v-if="list2.length!==0">
      <img src="../../../assets/img/mall_list_title.png" alt="">
    </div>
    <div class="list">
      <div class="item" v-for="item in list2" :key="item.pCode" >
        <img :src="item.pMainPic" alt  />
        <div class="wrap">
          <img src="../../../assets/img/shoukong.png" class="sk" alt="" v-if="item.spStock === 0">
          <p>{{item.pName}}</p>
          <div class="desc">{{item.desc}}</div>
          <div class="rate">
            <span>商品热度</span>
            <van-rate v-model="value" />
          </div>
          <div class="o-price">￥ {{item.pPrice1}}</div>
          <div class="btn">
            <div class="price"><span class="coin">￥</span>{{item.pPrice3}} <span>[DODO优选价]</span> </div>
            <div class="buy-btn btn2" @click="toDesc(item)">马上抢购</div>
          </div>
        </div>
      </div>
    </div>


    <div class="img-title">
      <img src="../../../assets/img/ddzx.png" alt="">
    </div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.pCode" >
        <img :src="item.pMainPic" alt />
        <div class="wrap">
          <img src="../../../assets/img/shoukong.png" class="sk" alt="" v-if="item.spStock === 0">
          <p>{{item.pName}}</p>
          <div class="desc">{{item.desc}}</div>
          <div class="rate">
            <span>商品热度</span>
            <van-rate v-model="value" />
          </div>
          <div class="o-price">￥ {{item.pPrice1}}</div>
          <div class="btn">
            <div class="price"><span class="coin">￥</span>{{item.pPrice3}} <span>[DODO优选价]</span> </div>
            <div class="buy-btn" @click="toDesc(item)">马上抢购</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { Swipe, SwipeItem, Icon, Rate } from "vant";
import wx from 'weixin-js-sdk'; 
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
      list2: [],  
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
          res.data.data.forEach(ele => {
            if(ele.pDesc) {
              ele.desc = JSON.parse(ele.pDesc)[0].desc;
            }
          });
          let spStockList = []
          res.data.data.forEach(ele => {
            if(ele.spStock === 0) {
              spStockList.push(ele.pCode)
            }
          })
          console.log(spStockList)
          // 清楚购物车为空商品
          if(localStorage.carList) {
            let carList = JSON.parse(localStorage.carList)
            carList = carList.filter(ele => {
              return !spStockList.includes(Number(ele.pCode))
            })
            console.log(carList)
            localStorage.carList = JSON.stringify(carList)
          }
          this.list = res.data.data.filter(ele => {
            return ele.pType === 0
          });
          this.list2 = res.data.data.filter(ele => {
            return ele.pType === 1
          });
        }
      });
    },
    toDesc(item) {
      this.$router.push({
        path: "/productDesc",
        query: { pCode: item.pCode,spStock: item.spStock }
      });
    },
    wxRegister () {
        let url = window.location.href.split('#')[0]
        this.$api.wx.sign({url}).then(res => {
            if(res.resultCode == 1) {
                wx.config({
                    debug: false,
                    appId: res.data.appId,
                    timestamp: res.data.timestamp,
                    nonceStr: res.data.noncestr,
                    signature: res.data.signature,
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        // 'updateAppMessageShareData'
                    ]
                });
                wx.ready( () => {
                    wx.onMenuShareAppMessage({
                        title: '【DODO优选】',                                                            // 分享标题
                        link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/mall',             // 分享链接
                        desc: '【多多优选】致力于甄选全国好物带给多多邦广大用户以极具性价比的价格将优质商品或服务。',                                                       // 分享描述
                        imgUrl: require('../../../assets/img/ddyx.png'),                                                           // 分享图
                        success () {
                            // Toast('分享成功！')
                        },
                        cancel () {
                            // opstion.error()
                        }
                    });
                    wx.onMenuShareTimeline({
                        title: '【DODO优选】',                                                             // 分享标题
                        link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/mall',             // 分享链接
                        desc: '【多多优选】致力于甄选全国好物带给多多邦广大用户以极具性价比的价格将优质商品或服务。',                                                         // 分享描述
                        imgUrl: require('../../../assets/img/ddyx.png'),                                                           // 分享图
                        success () {
                            // Toast('分享成功！')
                        },
                        cancel () {
                            // opstion.error()
                        }
                    })
                });
            }
        })
    },
  },
  mounted() {
    this.wxRegister()
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
      position: relative;
    }

    img{
      width: 100%;
      height: 351*@s;
    }
    .sk{
        position: absolute;
        top: 30*@s;
        right: 100*@s;
        width: 144*@s;
        height: 126*@s;
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
      .btn2{
        background: #92DFE7;
      }
    }
  }
}
</style>