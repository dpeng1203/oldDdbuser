<template>
    <div class="recharge">
        <!-- <div class="top">
            <span>金额：</span>
            <input type="number" pattern="[0-9]*" placeholder="请选择或输入充值金额">
            <img src="../../assets/img/clear.png" alt="">
        </div> -->
        <div class="money">
            <div class="item" :class="{active: item.cpCode == cpCode}" v-for="item in list" :key="item.cpCode" @click="cpCode = item.cpCode">
                <p>{{item.cpChCash}}元</p>
                <span>赠送{{item.cpChPromCash}}元</span>
                <span>(免费送券{{item.cpChCouponCount}}张)</span>
            </div>
        </div>
        <div class="pay">
            <div class="title">付款方式</div>
            <div class="cont">
                <img src="../../assets/img/wx.png" alt="">
                <div class="cont-text">
                    <p>微信</p>
                    <span>推荐已安装微信客户端的用户使用</span>
                </div>
                <img src="../../assets/img/recharge_1.png" alt="" class="sel">
            </div>
        </div>
        <div class="btn-wrapper">
            <div class="btn" @click="recharge">立即充值</div>
            <p @click="$router.push('/cashDetail')">查看余额明细</p>
        </div>
    </div>    
</template>

<script>
export default {
    data() {
        return{
            list:[],
            cpCode: -1,
        }
    },
    methods: {
        getList() {
            let data = {
                xrymem_token_id: localStorage.memToken,
                opType: 310,
            }
            this.$api.cash.rechargeList(data).then( res => {
                if(res.resultCode == 1) {
                    this.list = res.data
                }
            })
        },
        recharge() {
            let data = {
                xrymem_token_id: localStorage.memToken,
                cpCode: this.cpCode,
            }
            this.$api.cash.recharge(data).then(res => {
                if(res.resultCode ==1) {
                    window.location.href = res.msg
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
    .recharge{
        padding-top: 120*@s;
        height: 100vh;
        background-color: #fff;
        box-sizing: border-box;
        .top{
            background: #fff;
            padding: 0 40*@s;
            border-bottom: 1px solid #f7f7f7;
            display: flex;
            align-items: center;
            span{
                // padding: 30*@s 50*@s 30*@s 0;   
                padding-right: 40*@s;
                line-height: 1;
                border-right: 1px solid #ccc;
            }
            input{
                flex: 1;
                margin-left: 30*@s;
            }
            img{
                padding: 26*@s 0;
                width: 26*@s;
            }
        }
        .money{
            padding: 36*@s 0 30*@s;
            background: #fff;
            overflow: hidden;
            .item{
                margin-left: 50*@s;
                float: left;
                width: 300*@s;
                height: 128*@s;
                border-radius: 20*@s;
                border: 1px solid #81CF9B;
                margin-top: 30*@s;
                text-align: center;
                box-sizing: border-box;
                p{
                    font-size: 34*@s;
                    font-weight: bold;
                    margin-top: 30*@s;
                    line-height: 1;
                    color: #424242;
                }
                span{
                    font-size: 24*@s;
                    color: #81CF9B;
                    font-weight: 500;
                    margin-top: 15*@s;
                    line-height: 1;
                }
            }
            .active{
                background: #81CF9B;
                p, span{
                    color: #fff;
                }
                
                
            }
        }
        .pay{
            padding: 0 40*@s;
            margin-top: 5*@s;
            background: #fff;
            .title{
                line-height: 66*@s;
                border-bottom: 1px solid #f7f7f7;
            }
            .cont{
                display: flex;
                align-items: center;
                height: 114*@s;
                border-bottom: 1px solid #f7f7f7;
                img{
                    width: 55*@s;
                    margin-right: 20*@s;
                }
                .cont-text{
                    flex: 1;
                    span{
                        font-size: 24*@s;
                        color: #808080;
                    }
                }
                .sel{
                    width: 30*@s;
                }
            }
        }
        .btn-wrapper{
            background: #fff;
            padding: 77*@s 30*@s 30*@s;
            .btn{
                line-height: 80*@s;
                background: #81CF9B;
                color: #fff;
                border-radius: 40*@s;
                text-align: center;
            }
            p{
                font-size: 24*@s;
                text-align: right;
                color: #81CF9B;
                text-decoration: underline;
                margin-top: 15*@s;
                margin-right: 15*@s;
            }
        }
    }
</style>
