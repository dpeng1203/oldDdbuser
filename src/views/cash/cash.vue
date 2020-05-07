<template>
    <div class="cash">
        <img src="../../assets/img/money.png" alt="">
        <p>我的余额</p>
        <div class="money">￥{{cash}}</div>
        <div class="btn" @click="$router.push('/recharge')">充值</div>
        <div class="detail" @click="$router.push('/cashDetail')">余额明细>></div>
    </div>

</template>

<script>
export default {
    data() {
        return{
            cash: ''
        }
    },
    mounted() {
        this.cash = this.$route.query.cash
    }
}
</script>

<style lang="less" scoped>
	@s: 0.0133rem;
    .cash{
        text-align: center;
        color: #333;
        height: 100vh;
        background: #fff;
        img{
            width: 177*@s;
            margin-top: 185*@s;
        }
        p{
            font-size: 36*@s;
            margin-top: 30*@s;
            line-height: 1;
        }
        .money{
            font-size: 60*@s;
            line-height: 1;
            margin-top: 30*@s;
        }
        .btn{
            display: inline-block;
            width: 630*@s;
            line-height: 88*@s;
            color: #fff;
            margin-top: 90*@s;
            background: #81CF9B;
            border-radius: 10*@s;
        }
        .detail{
            margin-top: 30*@s;
        }
    }
</style>
