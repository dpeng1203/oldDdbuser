<template>
    <div>
        <div class="sum">
            <div class="item">
                <div class="name">支付详情</div>
            </div>
            <div class="item">
                <div class="name">商品总价：</div>
                <div class="value" >￥{{needPaySum}}</div>
            </div>
            <div class="item">
                <div class="name">已支付：</div>
                <div class="value" >￥{{paidSum}}</div>
            </div>
            <div class="item">
                <div class="name">待支付：</div>
                <div class="value">￥{{needPay}}</div>
            </div>
        </div>
        <div style="marginTop: .4rem">
            <van-field v-model="value" label="支付" placeholder="请输入支付金额" type="number"/>
        </div>
        <div class="btn" @click="pay">支付</div>
    </div>
        
</template>

<script>
import { Field, Toast } from 'vant';
export default {
    components: {
        [Field.name]: Field
    },
    data(){
        return{
            pbCode: '',
            allTotal: '',
            paidSum: '',
            needPaySum: '',
            needPay: '',
            total: '',
            value: ''
        }
    },
    methods: {
        getPayInfo() {
            this.$api.mall.prdBillPartPayInfo({ pbCode: this.pbCode }).then(res => {
                console.log(res)
                if(res.resultCode === 1) {
                    this.paidSum = res.data.paidSum.toFixed(2)
                    this.needPaySum = res.data.needPaySum.toFixed(2)
                    this.needPay = (res.data.needPaySum - res.data.paidSum).toFixed(2)
                }
            })
        },
        pay() {
            if(!this.value) {
                Toast('请输入金额！')
                return
            }
            let parms = {
                priceType: 0,
                pbCode: this.pbCode,
                paySum: this.value
            }
            this.$api.mall.prdBillpay(parms).then(res => {
                if(res.resultCode ===1) {
                    window.location.href = res.msg
                }
            })
        },
        getPayList() {
            let parms = {
                opType: 242,
                pbCode: this.pbCode,
            }
            this.$api.mall.prdBillpayList(parms).then(res => {
                if(res.resultCode ===1) {
                    window.location.href = res.msg
                }
            })
        }
    },
    mounted() {
        this.pbCode = this.$route.query.pbCode
        this.getPayInfo()
        this.getPayList()
    }

}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
    .sum{
        padding: 40*@s;
        font-size: 24*@s;
        background: #fff;
        // margin-top: 30*@s;
        .item{
            display: flex;
            align-items: center;
            font-weight: bold;
            height: 80*@s;
            // padding-top: 35*@s;
            .name{
                flex: 1;
            }
            input{
                width: 490*@s;
                flex-shrink: 0;
            }
            span{
                font-weight: bold;
                color: #FF0101;
            }
            .right{
                margin-left: 15*@s;
                color: #333;
            }
            &:first-child{
                border-bottom: 1px solid #C8C8C8;
                font-size: 26*@s;
            }
        }
        .total{
            border-top: 1px solid #C8C8C8;
            padding-top: 30*@s;
        }
    }
    .btn {
      font-size: 30 * @s;
      width: 500 * @s;
      line-height: 80 * @s;
      border-radius: 40 * @s;
      background: #81cf9b;
      color: #fff;
      text-align: center;
      margin: 50 * @s auto;
      margin-top: 200 * @s;
    }
</style>