<template>
    <div class="log-steps">
        <div class="top">
            <!-- <img src="../../assets/img/user.png" alt=""> -->
            <div class="info">
                <div class="title">快递: {{msg.ShipperCode}}</div>
                <p>运单号： {{msg.LogisticCode}}</p>
                <!-- <p>官方电话 123456</p> -->
            </div>
        </div>
        <div class="step">
            <van-steps 
            direction="vertical" 
            :active="active"
            >
                <van-step v-for="item in stepList" :key="item.time">
                    <h4>{{item.AcceptStation}}</h4>
                    <p>{{item.AcceptTime}}</p>
                </van-step>
                <!-- <van-step>
                    <h3>【城市】物流状态2</h3>
                    <p>2016-07-11 10:00</p>
                    <div slot="active-icon">
                        <img src="../../assets/img/log_step.png" alt="" style="width: 0.64rem">
                    </div>
                </van-step>
                <van-step>
                    <h3>快件已发货</h3>
                    <p>2016-07-10 09:30</p>
                    <div slot="active-icon">
                        <img src="../../assets/img/log_step.png" alt="" style="width: 0.64rem">
                    </div>
                </van-step> -->
            </van-steps>
        </div>
    </div>
</template>

<script>
import { Step, Steps } from 'vant';
export default {
    components: {
        [Steps.name]: Steps,
        [Step.name]: Step
    },
    data() {
        return{
            active: 5,
            pbCode: 0,
            msg: {},
            stepList: [
            ]
        }
    },
    methods: {
        getLog() {
            let parms = {
                opType: 408,
                pbCode: this.pbCode,
                xrymem_token_id: localStorage.memToken
            }
            this.$api.mall.log(parms).then(res => {
                if(res.resultCode === 1) {
                    this.msg = JSON.parse(res.msg)
                    this.stepList = this.msg.Traces
                    this.active = this.stepList.length - 1
                }
            })
        }
    },
    mounted() {
        this.pbCode = this.$route.query.pbCode
        this.getLog()
    }

}
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.log-steps{
    .top{
        padding: 20*@s 40*@s;
        background: #fff;
        img{
            width: 100*@s;
        }
        .info{
            display: inline-block;
            margin-left: 20*@s;
            color: #333;
            .title{
                font-size: 26*@s;
            }
            p{
                font-size: 22*@s;
            }
        }
    }
    .step{
        padding: 20*@s 40*@s;
        background: #fff;
        margin-top: 20*@s;
        h3{
            margin-left: 20*@s;
        }
    }
}
</style>