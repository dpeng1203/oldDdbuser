<template>
    <div class="friend">
        <!-- <h3>已推荐好友列表（共 {{num}} 人）</h3>
        <div class="title">
            <p>编号</p>
            <p>昵称</p>
            <p>卡券数量</p>
        </div>
        <div class="cont" v-for="item in list" :key="item.memCode">
            <p>{{item.memCode}}</p>
            <p>{{item.memName}}</p>
            <p>{{item.couponSum}}</p>
        </div> -->
        <div class="box">
            <img src="../../assets/img/top.jpg" alt="" class="top">
            <p class="num">共邀请 {{num}} 人</p>
            <div class="title">
                <p>编号</p>
                <p>昵称</p>
                <p>卡券数量</p>
            </div>
            <div class="wrap">
                <div class="cont" v-for="item in list" :key="item.memCode">
                    <p>{{item.memCode}}</p>
                    <p>{{item.memName}}</p>
                    <p>{{item.couponSum}}</p>
                </div>
            </div>
            <div class="tip" v-if="num == 0">暂无邀请好友</div>
        </div>
        <img src="../../assets/img/bottom.jpg" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return{
            num: 0,
            list: [],
            parms: {
                xrymem_token_id: localStorage.memToken,
                opType: 311,
                pageNum: 1,
                pageSize: 100,
            }
        }
    },
    methods: {
        getList() {
            this.$api.ticket.merTicket(this.parms).then(res => {
                if(res.resultCode == 1) {
                    this.list = res.data.data
                    this.num = this.list.length
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
.friend{
    // padding: 0 30*@s 30*@s;
    background: #fd8d65;
    height: 100vh;
    box-sizing: border-box;
    padding: 50*@s 30*@s;
    .box{
        background: #fff3cd;
        text-align: center;
        border: 2px solid #f94e11;
        padding: 30*@s 50*@s 50*@s;
        border-radius: 20*@s;
        margin-bottom: 100*@s;
        .top{
            width: 348*@s;
        }
        .num{
            font-weight: bold;
            margin-bottom: 10*@s;
        }
    }
    h3{
        padding: 10*@s 0;
    }
    .title{
        display: flex;
        align-items: center;
        padding: 10*@s 0;
        background: #fff;
        p{
            flex: 1;
            font-weight: bold;
            text-align: center;
        }
    }
    .wrap{
        background: #fff;
        height: 42vh;
        overflow: auto;
    }
    .cont{
        display: flex;
        align-items: center;
        padding: 10*@s 0;
        // border-top: 1px solid #f2f2f2;
        // height: 52vh;
        
        p{
            flex: 1;
            text-align: center;
        }
    }
    .tip{
        color: #ccc;
        background: #fff;
        padding: 10*@s;
    }
}
</style>