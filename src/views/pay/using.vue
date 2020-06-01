<template>
  <div class="using">
    <div class="using-top">
      <div class="wrap">
        <van-circle
          v-model="currentRate"
          color="#20a1af"
          size="4rem"
          layer-color="#E7F7FF"
          fill="#fff"
          :rate="rate"
          :speed="100"
          :stroke-width="50"
        ></van-circle>
        <div class="clock">
          <van-count-down :time="time">
            <template v-slot="timeData">
              <span class="item" v-if="timeData.minutes<10">{{ '0' + timeData.minutes }}</span>
              <span class="item" v-else>{{ timeData.minutes }}</span>
              <span class="symbal">:</span>
              <span class="item" v-if="timeData.seconds<10">{{ '0' + timeData.seconds }}</span>
              <span class="item" v-else>{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
      <div class="using-top-tip">
        <p>离开时请带好您的随身物品</p>
      </div>
    </div>

    <div class="using-order">
      <p class="using-order-title">订单信息</p>
      <div class="flex-space">
        <p class="name">机器编号：</p>
        <p>{{at}}</p>
      </div>
      <div class="flex-space">
        <p class="name">服务时间：</p>
        <p>{{serviceTime}}</p>
      </div>
      <div class="flex-space">
        <p class="name">已支付：</p>
        <p>{{money}}</p>
      </div>
    </div>
    <div class="imgwrap" @click="$router.push('/mall')">
      <img src="./../../assets/img/youxuan.png" alt />
    </div>
    <div class="demo">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <div class="tip">
      <div class="using-desc">
        <img src="./../../assets/img/sun.png" alt />
        <div class="desc">
          <p>在理疗过程中</p>
          <p>局部会出现灼热的刺痛感</p>
        </div>
      </div>
      <div class="using-desc">
        <img src="./../../assets/img/cup.png" alt class="teacup" />
        <div class="desc">
          <p>在理疗过程中</p>
          <p>需要多喝温水来补充身体的水分</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Circle, countDown, Toast } from "vant";
import api from "@/api/api";
export default {
  components: {
    [Circle.name]: Circle,
    [countDown.name]: countDown
  },
  data() {
    return {
      currentRate: 0,
      rate: 0,
      text: "启动中……",
      barcode: "",
      at: 0,
      pcode: "",
      ptime: 0,
      pprice: 0,
      serviceTime: "设备启动中……",
      orderId: "",
      status: 0,
      orderInfo: {},
      statusTimer: null,
      useText: "理疗中...",
      time: 0,
      timeData: {
        minutes: 0,
        seconds: 0
      },
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        //  aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src:
              "http://ddbyan.oss-cn-zhangjiakou.aliyuncs.com/htdocs/ddbsp2.mp4"
          }
        ],
        //你的封面地址
        poster:
          "http://ddbyan.oss-cn-zhangjiakou.aliyuncs.com/htdocs/ddbphoto2.png",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      }
    };
  },
  computed: {
    money() {
      return this.pprice.toFixed(2);
    }
  },
  beforeRouteEnter(to, from, next) {
    let orderId = to.query.orderid;
    api.pay.getOrderInfo({ orderId }).then(res => {
      // alert(res)resultCode
      if (res.resultCode == 1) {
        if (res.data.length !== 0 && (res.data[0]).oPayBizType == 0) {
          next();
        } else {
          Toast.success("成功！");
          // Toast('充值成功！')
          next(vm => {
            vm.$router.push("/home");
          });
        }
      }
    });
  },
  mounted() {
    this.orderId = this.$route.query.orderid;

    let _self = this;

    this.$nextTick(function() {
      if (!_self.orderInfo.oMacStartStatus) {
        this.statusTimer = setInterval(function() {
          _self.getOrderInfo(_self.orderId);
          console.log(_self.orderInfo.oMacStartStatus);
          if (_self.orderInfo.oMacStartStatus === 1) {
            _self.serviceTime = _self.orderInfo.oMacStart;
            _self.ptime = _self.orderInfo.pTime;
            _self.time = _self.orderInfo.pTime * 1000;
            _self.timeData.minutes = Math.floor(_self.ptime / 60);
            _self.timeData.seconds = _self.ptime % 60;
            let goTime = 0;
            setInterval(function() {
              goTime++;
              if (goTime >= _self.ptime) {
                _self.currentRate = 100;
                _self.useText = "理疗结束";
              } else {
                _self.currentRate = (goTime / _self.ptime) * 100;
              }
            }, 1000);
            clearInterval(_self.statusTimer);
            // _self.countDown()
          }
        }, 2000);
      } else {
        // this.countDown(_self)
      }
    });
  },
  methods: {
    formart(val) {
      if (val >= 10) return val;
      else return "0" + val;
    },
    getOrderInfo(orderId) {
      this.$api.pay.getOrderInfo({ orderId }).then(res => {
        if (res.resultCode == 1) {
          if (res.data.length == 1) {
            this.orderInfo = res.data[0];
            this.pprice = this.orderInfo.oPayCash;
            this.at = this.orderInfo.macId;
          }
        }
      });
      // .catch(err => Toast.fail(err.msg))
    },
    countDown() {
      // 倒计时
      let _self = this;
      let count = 0;
      let min = Math.floor(_self.ptime / 60);
      let sec = _self.ptime % 60;
      if (!sec) {
        min = Math.floor(_self.ptime / 60) - 1;
      }
      _self.timer = setInterval(function() {
        if (sec === 0) {
          sec = 60;
        }
        sec--;
        count++;
        min = Math.floor((_self.ptime - count) / 60);
        _self.rate = (count / _self.ptime) * 100;
        _self.currentRate = (count / _self.ptime) * 100;
        if (count === _self.ptime) {
          _self.useText = "理疗结束";
          clearInterval(_self.timer);
        }
        _self.text = _self.formart(min) + " : " + _self.formart(sec);
      }, 1000);
    }
  },

  beforeDestroy() {
    // clearInterval(this.timer)
    clearInterval(this.statusTimer);
    this.statusTimer = null;
  }
};
</script>
<style lang="less" >
@s: 0.0133rem;
.using {
  .using-top {
    height: 550 * @s;
    text-align: center;
    padding-top: 56 * @s;
    background: #8cdbe3;
    box-sizing: border-box;
    position: relative;
    .wrap {
      width: 389 * @s;
      height: 389 * @s;
      background: #e7f7ff;
      border-radius: 50%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .clock {
        position: absolute;
        top: 235 * @s;
        left: 0;
        right: 0;
        text-align: center;
        .item {
          display: inline-block;
          color: #000;
          font-size: 80 * @s;
          text-align: center;
          background-color: rgba(0, 0, 0, 0);
        }
        .symbal {
          color: #000;
          font-size: 80 * @s;
        }
      }
    }
    .using-top-tip {
      margin-top: 36 * @s;
      color: #e6f7ff;
      font-size: 30 * @s;
      line-height: 1;
    }
  }
  .using-order {
    font-size: 24 * @s;
    text-align: center;
    padding: 20 * @s 30 * @s 20 * @s;
    margin: 20 * @s 30 * @s;
    border-radius: 30 * @s;
    color: #333;
    background: #fff;
    &-title {
      line-height: 1;
      margin-bottom: 20 * @s;
      &::before {
        content: " ";
        height: 0px;
        display: inline-block;
        border-top: 2 * @s solid #b5b5b5;
        width: 75 * @s;
        vertical-align: middle;
        margin-right: 12 * @s;
      }
      &::after {
        content: " ";
        height: 0px;
        display: inline-block;
        border-top: 2 * @s solid #b5b5b5;
        width: 75 * @s;
        vertical-align: middle;
        margin-left: 12 * @s;
      }
    }
    .flex-space {
      display: flex;
      align-items: center;
      p {
        line-height: 1;
        margin-top: 15 * @s;
        font-weight: bold;
      }
      .name {
        flex: 1;
        text-align: left;
        font-weight: normal;
      }
    }
  }
  .tip {
    padding: 0 50 * @s;
    margin: 20 * @s 30 * @s;
    border-radius: 30 * @s;
    color: #333;
    background: #fff;
    .using-desc {
      display: flex;
      align-items: center;
      font-size: 24 * @s;
      border-bottom: 5 * @s solid #f2f2f2;
      padding: 30 * @s 0;
      .desc {
        flex: 1;
        text-align: center;
        color: #333;
        font-weight: normal;
      }
      p {
        text-align: center;
        line-height: 2;
      }
      img {
        width: 107 * @s;
      }
      .teacup {
        width: 98 * @s;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
  .demo {
    padding: 0.266rem 0.399rem;
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: auto;
    text-align: center;
    line-height: 100px;
    // border: 0;
    // border-radius: 4px;
    overflow: hidden;
    position: relative;
    /* box-shadow: 0 1px 1px rgba(0, 0, 0, .2); */
  }
  .demo:hover {
    display: block;
  }
  　 .vjs-custom-skin > .video-js .vjs-big-play-button {
    transform: scale(0.6) !important;
  }
  .imgwrap {
    margin: 0.266rem 0.399rem;
  }
}
</style>
