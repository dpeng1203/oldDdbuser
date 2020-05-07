<template>
    <div class="set">
        <div class="item" @click="$router.push('/lock')">
            <img src="../../assets/img/set_1.png" alt="" class="pw">
            <span>设置支付密码</span>
        </div>
        <div class="btn" @click="out">
            退出登录
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    methods: {
        out() {
            localStorage.clear()
            window.location.href = 'http://xry.dodohz.com/ddbxryuser/index.html#/'
            // this.$router.push('/')
        },
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.set{
    .item{
        border-bottom: 1px solid #F7F7F7;
        height: 108*@s;
        display: flex;
        align-items: center;
        color: #44444E;
        background: #fff;
        padding-left: 20*@s;
        margin-top: 50*@s;
        span{
            flex: 1;
            margin-left: 30*@s;
            font-size: 24*@s;
            color: #7E7D7D;
            font-weight: bold;
        }
        .pw{
            width: 32*@s;
        }
    }
    .btn{
        width: 530*@s;
        margin: 0 auto;
        margin-top: 460*@s;
        background: #CB78BD;
        line-height: 78*@s;
        text-align: center;
        color: #fff;
        font-size: 34*@s;
        font-weight: bold;
        border-radius: 20*@s;
    }
}
</style>