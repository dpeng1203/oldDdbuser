<template>
    <div>
        <div class="item">
            <img src="../../assets/img/act4.png" alt="" @click="toDetail(4)">
            <img src="../../assets/img/act3.png" alt="" @click="toDetail(3)">
            <img src="../../assets/img/act2.png" alt="" @click="toDetail(2)">
            <img src="../../assets/img/act1.png" alt=""  @click="toDetail(1)">
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
        toDetail(n) {
            this.$router.push({path: '/joinAct',query: {act: n}})
        }
    }
}
</script>

<style lang="less" scoped>
.item{
    background: #fff;
    
}
</style>