<template>
    <div>
        <img src="../../assets/img/act.jpg" alt="" v-if="actNum == 1">
        <img src="../../assets/img/ac2_detail.jpg" alt="" v-if="actNum == 2">
        <img src="../../assets/img/ac3_detail.jpg" alt="" v-if="actNum == 3">
        <img src="../../assets/img/ac4_detail.jpg" alt="" v-if="actNum == 4">
    </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import {Toast} from 'vant'
export default {
    data() {
        return{
            actNum: null
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
                            // 'onMenuShareTimeline',
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
                        if(this.actNum == 1) {
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
                        }else if(this.actNum == 2) {
                            wx.onMenuShareAppMessage({
                                title: '【邀请注册有好礼相送哦】',                                                             // 分享标题
                                link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/joinAct?act=2',             // 分享链接
                                desc: '奖励：“家庭防护套装、迪士尼同款净水机、DODO智能养生仪”',                                                         // 分享描述
                                imgUrl: require('../../assets/img/enjoy_2.png'),                                                           // 分享图
                                success () {
                                    // Toast('分享成功！')
                                },
                                cancel () {
                                    // opstion.error()
                                }
                            });
                        }else if(this.actNum == 3) {
                            wx.onMenuShareAppMessage({
                                title: '【百日行动派礼】',                                                             // 分享标题
                                link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/joinAct?act=3',             // 分享链接
                                desc: '推荐好友奖励：“家庭防护套装、DODO智能养生仪、全国运营商权益”',                                                         // 分享描述
                                imgUrl: require('../../assets/img/enjoy_3.png'),                                                           // 分享图
                                success () {
                                    // Toast('分享成功！')
                                },
                                cancel () {
                                    // opstion.error()
                                }
                            });
                        }else if(this.actNum == 4) {
                            wx.onMenuShareAppMessage({
                                title: '【百日行动派】',                                                             // 分享标题
                                link: 'http://xry.dodohz.com/ddbxryuser/index.html?#/joinAct?act=4',             // 分享链接
                                desc: '使用设备奖励：“家庭防护套装、DODO智能养生仪、联合运营商权益”',                                                         // 分享描述
                                imgUrl: require('../../assets/img/enjoy_4.png'),                                                           // 分享图
                                success () {
                                    // Toast('分享成功！')
                                },
                                cancel () {
                                    // opstion.error()
                                }
                            });
                        }
                        
                        // wx.onMenuShareTimeline({
                        //     title: '【邀请注册有好礼相送哦】',                                                             // 分享标题
                        //     link: 'http://xry.dodohz.com/ddbxryuser/index.html#/joinAct?act=2',             // 分享链接
                        //     desc: '奖励：“、家庭防护套装、迪士尼同款净水机、DODO智能养生仪”',                                                         // 分享描述
                        //     imgUrl: require('../../assets/img/enjoy_2.png'),                                                           // 分享图
                        //     success () {
                        //         // Toast('分享成功！')
                        //     },
                        //     cancel () {
                        //         // opstion.error()
                        //     }
                        // })
                    });
                }
            })
        },
    },
    mounted() {
        this.actNum = this.$route.query.act
        if(this.actNum === 1 || this.actNum === 2) {
            Toast('活动已结束！')
        }
        
        this.wxRegister() 
    }
}
</script>

<style>

</style>