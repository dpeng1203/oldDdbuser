<template>
    <div class="device-qr">
        <img src="../../../assets/img/qr_bg.jpg" alt="">
        <div class="wrap">
            <qrcode :url="qrText" :iconurl="imageUrl" :wid="150" :hei="150" :imgwid="25" :imghei="25"></qrcode>
        </div>
    </div>
</template>
<script>
// import VueQr from 'vue-qr'
// import logoimg from './../../assets/img/logo.jpg'
import qrcode from 'vue_qrcodes'
export default {
    components: {
        // VueQr,
        qrcode
    },
    data () {
        return {
            imageUrl: require('../../../assets/img/ddb_logo.png'),
            qrText: ''
        }
    },
    // computed: {
    //     qrText () {
    //         return 'http://xry.dodohz.com/ddbxry/index.html#/user/qrRecommend?aCode=' +
    //         JSON.parse(window.localStorage.user).aCode + '&aType=' + JSON.parse(window.localStorage.user).aType
    //     }
    // },
    created() {
        this.qrText = 'http://xry.dodohz.com/ddbxryuser/index.html?#/mall?memCode=' + window.localStorage.memId
            console.log(this.qrText)
    }
}
</script>
<style lang="less">
@s: 0.013rem;
.device-qr{
    position: relative;
    .wrap{
        position: absolute;
        top: 120px;
        left: 50%;
        margin-left: -90px;
        padding: 15px 15px 5px;
        background-color: #fff;
        border-radius: 10px;
    }
}
</style>