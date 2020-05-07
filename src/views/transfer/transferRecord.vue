<template>
    <div class="list">
        <div class="item" :class="{active: index%2!=0}" v-for="(item,index) in orderList" :key="index">
            <div class="title">
                <span>转移使用券</span>
                <span class="num" >-{{item.transferCount}} 张</span>
            </div>
            <p><span style="margin-right: .4rem">ID: {{item.receiveCode}}</span> {{item.createTime}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            orderList: []
        }
    },
    methods: {
        getList() {
            let data = {
                xrymem_token_id: localStorage.memToken,
                opType: 315,
                tType: 'transfer',
                pageNum: 1,
                pageSize: 100
            }
            this.$api.ticket.merTicket(data).then(res => {
                if(res.resultCode == 1) {
                    this.orderList = res.data.data
                }
            })
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.list{
    
    background: #fff;
    .item{
        padding: 30*@s 40*@s;
        .title{
            font-size: 34*@s;
            font-weight: 500;
            color: #4D4D4D;
            line-height: 1;
            .num{
                font-weight: bold;
                float: right;
                color: #FF291E;
            }
            .out{
                color: #FF291E
            }
        }
        p{
            font-size: 24*@s;
            color: #A6A6A6;
            line-height: 1;
            margin-top: 25*@s;
        }
    }
    .active{
        background: #f5fafe
    }
}
</style>