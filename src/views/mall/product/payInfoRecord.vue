<template>
    <div class="list">
        <div class="wrap" v-for="(item,index) in list" :key="index">
            <div class="item" >
                <div class="name">支付时间：</div>
                <div class="value">{{item.createTime}}</div>
            </div>
            <div class="item" >
                <div class="name">支付金额（元）：</div>
                <div class="value">{{item.oPayCash}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            pbCode: '',
            list: []
        }
    },
    methods: {
        getPayList() {
            let parms = {
                opType: 413,
                pb_code: this.pbCode,
                xrymem_token_id: localStorage.memToken
            }
            this.$api.mall.prdBillpayList(parms).then(res => {
                if(res.resultCode ===1) {
                    this.list = res.data.filter(ele => {
                        return ele.oPayStatus == 2
                    })
                }
            })
        }
    },
    mounted() {
        this.pbCode = this.$route.query.pbCode
        this.getPayList()
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.wrap{
    margin: .4rem;
    background: #fff;
    padding: .4rem;
    border-radius: 20*@s;
    .item{
        display: flex;
        align-items: center;
        height: 68*@s;
        .name{
            flex: 1;
        }
    }
}
</style>