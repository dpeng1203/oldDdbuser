<template>
    <div class="get">
        <img src="../../assets/img/get.jpg" alt="">
        <div class="btn" @click="getTicket"></div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            memCode: ''
        }
    },
    methods: {
        getTicket() {
            this.$router.push({path: '/',query: {memCode: this.memCode}})
        }
    },
    mounted() {
        if(this.$route.query.memCode) {
            this.memCode = this.$route.query.memCode
        }
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.get{
    position: relative;
    .btn{
        height: 300*@s;
        position: absolute;
        top: 800*@s;
        left: 0;
        right: 0;
    }
}
</style>