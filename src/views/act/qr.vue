<template>
    <div class="qr">
        <!-- <p>我的推荐码</p> -->
        <img src="../../assets/img/qr.jpg" alt="">
        <div class="qr-cont">
            <div class="qr-wrap">
                <qrcode :url="qrText" :iconurl="imageUrl" :wid='120' :hei='120'  :imgwid="24" :imghei="24"></qrcode>
            </div>
        </div>

        <van-popup 
            v-model="show" 
            :style="{ width: '80%' }" 
            round 
            :close-on-click-overlay="false">
                
        </van-popup>
        <div class="p-icon"  v-if="show">
            <img src="../../assets/img/gzh.jpg" alt="" class="gzh">
            <div class="icon-close" @click="show = false">
                <van-icon name="clear" size=".9rem" color="#fff"/>
            </div>
        </div>
        
        <!-- <div class="tip">每推荐一人赠送1张体验券</div> -->
    </div>
</template>

<script>
import qrcode from 'vue_qrcodes'
import wx from 'weixin-js-sdk'; 
import { Toast,Icon,Popup } from 'vant'
export default {
    components: {
        qrcode,
        [Icon.name]: Icon,
        [Popup.name]: Popup
    },
    data () {
        return {
            show: false,
            imageUrl: require('../../assets/img/logo.jpg'),
            qrText: '',
        }
    },
    methods: {
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
                        // wx.updateAppMessageShareData({
                        //     title: '【DODO养生仪】您的好友赠送您两张体验券',                                                            // 分享标题
                        //     link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/getTicket?memCode=' + localStorage.memId,             // 分享链接
                        //     desc: '“DODO智能养生仪”黑科技，追循古法，智慧养生！',                                                       // 分享描述
                        //     imgUrl: require('../../assets/img/shareLogo.jpg'),                                                           // 分享图
                        //     success () {
                        //         // Toast('分享成功！')
                        //     },
                        //     cancel () {
                        //         // opstion.error()
                        //     }
                        // });
                        wx.onMenuShareAppMessage({
                            title: '【DODO养生仪】您的好友赠送您两张体验券',                                                            // 分享标题
                            link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/getTicket?memCode=' + localStorage.memId,             // 分享链接
                            desc: '“DODO智能养生仪”黑科技，追循古法，智慧养生！',                                                       // 分享描述
                            imgUrl: require('../../assets/img/shareLogo.jpg'),                                                           // 分享图
                            success () {
                                // Toast('分享成功！')
                            },
                            cancel () {
                                // opstion.error()
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: '【DODO养生仪】您的好友赠送您两张体验券',                                                             // 分享标题
                            link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/getTicket?memCode=' + localStorage.memId,             // 分享链接
                            desc: '“DODO智能养生仪”黑科技，追循古法，智慧养生！',                                                         // 分享描述
                            imgUrl: require('../../assets/img/shareLogo.jpg'),                                                           // 分享图
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
    created() {
        if(localStorage.memId) {
            this.qrText = 'http://xry.dodohz.com/ddbxryuser/index.html#/?memCode=' + localStorage.memId
            this.wxRegister()
        }else{
            Toast('推荐人信息不存在，请重新登陆！')
            localStorage.clear()
            // this.$router.push('/')
            window.location.href = 'http://xry.dodohz.com/ddbxryuser/index.html#/'
        }
         
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.qr{
    // height: 100%;
    text-align: center;
    // background: #fff;
    // margin: 200*@s 40*@s;
    // border-radius: 20*@s;
    // padding-bottom: 30*@s; 
    // p{
    //     padding: 30*@s;
    //     font-size: 50*@s;
    // }
    // .tip{
    //     margin-top: 10*@s;
    //     color: #ccc;
    // }
    position: relative;
    .qr-cont{
        position: absolute;
        top: 1070*@s;
        left: 0;
        right: 0;
        text-align: center;
    }
    .qr-wrap{
        padding: 20*@s 20*@s 5*@s;
        background: #fff;
        display: inline-block;
    }
    .p-icon{
        position: fixed;
        left: 0;
        right: 0;
        top: 250*@s;
        z-index: 999999;
        img{
            width: 80%;
            border-radius: 30*@s;
        }
        .icon-close{
            margin-top: 60*@s;
        }
    }
}
</style>