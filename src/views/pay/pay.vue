<template>
    <div class="pay-first">
        <div class="step">
            <div class="num active">1</div>
            <div class="line"></div>
            <div class="num">2</div>
            <div class="line"></div>
            <div class="num">3</div>
        </div>
        <div class="tip">确认身上金属制品是否摘除</div>
        <p>将患处靠近养生仪，距养生仪五厘米左右</p>
        <!-- <img src="../../assets/img/device-img.png" alt=""> -->
        <div class='demo'>
            <video-player 
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions">
            </video-player>
        </div>
        <div class="rule">
            <img src="../../assets/img/options.png" alt="" class="people">
            <!-- <img src="../../assets/img/rule.png" alt=""> -->
            <div class="rule-text">
                <p>1、体内有金属及美容假体等异物部位不宜直接照射；</p>
                <p>2、女性生理期间、开放性伤口未止血状态不宜；</p>
                <p>3、对温度不敏感者、孕妇及儿童不宜；  </p>
                <p>4、重症——包含癌症及其他病情严重者、身体极度虚弱者不宜；</p>
                <p>5、服用抗血栓药物（如阿司匹林、银杏产品等）者不宜；</p>
                <p>6、头部与心脏不宜直接照射；</p>
                <p>7、血压高于180以上者不宜；</p>
                <p>8、癫痫患者及精神异常者不宜；</p>
                <p>9、男性阴囊（睾丸）不能直接照射，照射前列腺时，如果疼痛感强烈，可用手适当遮挡禁忌部位；</p>
                <p>10、使用期间需补充不低于1.5L饮用水；</p>
                <p>11、同一部位每天照射不得超过两次；</p>
            </div>
        </div>
        <div class="foot">
            <div class="btn" @click="toNext">下一步</div>
        </div>
    </div>    
</template>

<script>
export default {
    data() {
        return{
            barcode: '',
            at: '',
            pcode: '',
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
                 preload: 'auto',
                 language: 'zh-CN',
                  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                //  aspectRatio: '16:9',
                  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                 fluid: true,
                 sources: [{
                     //类型
                     type: "video/mp4",
                     //url地址
                     src: 'http://ddbyan.oss-cn-zhangjiakou.aliyuncs.com/htdocs/ddbsp.mp4'
                 }],
                 //你的封面地址
                 poster: 'http://ddbyan.oss-cn-zhangjiakou.aliyuncs.com/htdocs/ddbphoto.png',
                  //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                 notSupportedMessage: '此视频暂无法播放，请稍后再试',
                 controlBar: {
                     timeDivider: true,
                     durationDisplay: true,
                     remainingTimeDisplay: false,
                     //全屏按钮
                     fullscreenToggle: true 
                 }
           },
        }
    },
    methods: {
        toNext() {
            this.$router.push({path: '/payNext',query: {barcode: this.barcode,at: this.at, pcode: this.pcode}})
        }
    },
    mounted() {
        this.barcode = this.$route.query.barcode
        this.at = this.$route.query.at
        this.pcode = this.$route.query.pcode
    }
}
</script>

<style lang="less" scoped>
	@s: 0.0133rem;
    .pay-first{
        text-align: center;
        .step{
            margin-top: 70*@s;
            display: flex;
            align-items: center;
            margin-left: 117*@s;
            .num{
                width: 44*@s;
                line-height: 44*@s;
                border-radius: 50%;
                background: #D2D2D2;
                color: #fff;
            }
            .line{
                width: 190*@s;
                height: 10*@s;
                background: #D2D2D2;
            }
            .active{
                background: #81CF9B;
            }
        }
        .tip{
            font-size: 36*@s;
            font-weight: bold;
            margin-top: 40*@s;
            line-height: 1;
            
        }
        p{
            font-size: 24*@s;
            font-weight: 500;
            margin-top: 20*@s;
            line-height: 1;
        }
        img{
            width: 393*@s;
            margin-top: 120*@s;
        }
        .demo{
            margin: 30*@s 0 20*@s;
            display: inline-block;
            width: 100%;
            height: auto;
            text-align: center;
            line-height: 100px;
            // border: 0;
            // border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            /* box-shadow: 0 1px 1px rgba(0, 0, 0, .2); */
            
        }
        .demo:hover{
            display: block;
        }　
        .vjs-custom-skin > .video-js .vjs-big-play-button {
            transform: scale(0.6) !important;
        }
        .rule{
            background: #fff;
            position: relative;
            text-align: left;
            margin-top: 80*@s;
            padding: 30*@s;
            margin-bottom: 130*@s;
            .rule-text{
                font-size: 30*@s;
                height: 350*@s;
                overflow: auto;
                p{
                    line-height: 1.5;
                    margin-top: 0;
                    font-size: 28*@s;
                }
            }
            .people{
                position: absolute;
                top: -200*@s;
                left: 20*@s;
                width: 106*@s;
            }
        }
        .foot{
            padding: 20*@s 75*@s;
            background: #fff;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            .btn{
                width: 600*@s;
                line-height: 80*@s;
                background: #81CF9B;
                color: #fff;
                border-radius: 15*@s;
            }
        }
    }
</style>
