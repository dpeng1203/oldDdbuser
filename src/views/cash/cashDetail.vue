<template>
    <div class="agent">
        <div class="time">
            <input type="text" v-model="startTime" placeholder="开始时间" readonly @click="handStart">
            <img src="../../assets/img/rili.png" alt="">
            <input type="text" v-model="endTime" placeholder="结束时间" readonly @click="handEnd">
            <span @click="check">查询</span>
        </div>
        <div class="tabs">
            <div :class="{active: active == 0}" @click="active = 0">充值明细</div>
            <div :class="{active: active == 1}" @click="active = 1">消费明细</div>
        </div>

        <div class="list" v-show="active == 0">
            <div class="item" :class="{active: index%2!=0}" v-for="(item,index) in orderList" :key="index">
                <div class="title">
                    <span>充值</span>
                    <span class="num" :class="{out: active == 1}">+{{item.cpChCash}}</span>
                </div>
                <p>{{item.createTime}}</p>
            </div>
             <div class="foot" v-show="showTip1">暂无数据</div>
        </div>

        <div class="list" v-show="active == 1">
            <div class="item" :class="{active: index%2!=0}" v-for="(item,index) in consumptionList" :key="index">
                <div class="title">
                    <span>消费</span>
                    <span class="num" :class="{out: active == 1}">-{{item.oPayCash}}</span>
                </div>
                <p>{{item.createTime}}</p>
            </div>
             <div class="foot" v-show="showTip2">暂无数据</div>
        </div>

  
        <van-popup v-model="show" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="show = false"
                @confirm="confirm"
                :max-date="maxDate"
            />
        </van-popup>
        <van-popup v-model="showEnd" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @cancel="showEnd = false"
                @confirm="confirmEnd"
                :max-date="maxDate"
                :min-date="minDate"
            />
        </van-popup>
    </div>    
</template>

<script>
import { DatetimePicker,Popup, Toast } from 'vant';
export default {
    components:{
        [DatetimePicker.name]:DatetimePicker,
        [Popup.name]:Popup,
    },
    data() {
        return{
            active: 0,
            startTime: '',
            endTime: '',
            show: false,
            showEnd: false,
            currentDate: new Date(),
            maxDate: new Date(),
            minDate: '',
            list: [],
            orderList: [],
            consumptionList: [],
            showTip1: false ,
            showTip2: false ,
            data: {
                xrymem_token_id: localStorage.memToken,
                startTime:'',
                endTime:'',
                opType: ''
            },
            // parms: {
            //     xrymem_token_id: localStorage.memToken,
            //     startTime:'',
            //     endTime:'',
            //     opType: 304,
              
            // },
            // params:{
            //     xrymem_token_id: localStorage.memToken,
            //     opType: 306,
            //     startTime:'',
            //     endTime:'',
            // }
        }
    },
    methods: {
        handStart() {
            this.show = true
        },
        handEnd() {
            if(this.minDate) {
                this.showEnd = true
            }else{
                Toast('请选择开始时间！')
            }
            
        },
        confirm(value) {
            this.minDate = value
            this.startTime = this.getFormatDate(value)
            this.show = false
        },
        confirmEnd(value) {
            this.endTime = this.getFormatDate(value)
            this.showEnd = false
        },
        getFormatDate(date) {
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    
            return currentdate;

        },
        check() {
             if(this.active == 0) {
                this.getOrderList()
            }else if(this.active == 1) {
                this.getconsumptionList()
            }
        },

        // getStatsAgentList() {
        //     if(!this.startTime) {
        //         Toast('请选择开始时间')
        //         return
        //     }
        //     if(!this.endTime) {
        //         Toast('请选择结束时间')
        //         return
        //     }
        //     this.data.startTime = this.startTime + ' ' + '00:00:00'
        //     this.data.endTime = this.endTime + ' ' + '23:59:59'
           
        //     this.data.opType = 304;
        //     this.$api.cash.getStatsAgentList(this.data).then(res => {
        //         console.log(res)
        //         this.list.data = res
        //         if(res.length == 0) {
        //             this.showTip1 = true
        //         }else{
        //             this.showTip1 = false
        //         }
        //     })
        // },
        // getStatsAgentDetail() {
        //     if(!this.startTime) {
        //         Toast('请选择开始时间')
        //         return
        //     }
        //     if(!this.endTime) {
        //         Toast('请选择结束时间')
        //         return
        //     }
        //     this.data.startTime = this.startTime + ' ' + '00:00:00'
        //     this.data.endTime = this.endTime + ' ' + '23:59:59'
            
        //     this.data.opType = 306;
        //     this.$api.cash.getStatsAgentDetail(this.data).then(res => {
        //         // console.log(res)
        //         // this.orderList = res
        //         // if(res.length == 0) {
        //         //     this.showTip2 = true
        //         // }else{
        //         //     this.showTip2 = false
        //         //     this.orderList.forEach( ele => {
        //         //         ele.pc_sum = Number(ele.pc_sum).toFixed(2)
        //         //     })
        //         // }


        //          console.log(res)
        //         this.list = res
        //         if(res.length == 0) {
        //             this.showTip2 = true
        //         }else{
        //             this.showTip = false
        //         }



        //     })
        // },
       getOrderList() {
        //  var that = this
            this.data.opType = 304;
            if(this.startTime) {
                this.data.startTime =  this.startTime + ' ' + '00:00:00'
            }else {
                this.data.startTime = ''
            }
            if(this.endTime) {
                this.data.endTime = this.endTime + ' ' + '23:59:59'
            }else{
                this.data.endTime = ''
            }
            this.$api.cash.getOrderList(this.data).then(res => {
                console.log(res)
                // var data = res.data
                // that.orderList.push(...data)
                this.orderList = res.data
                if(res.data.length == 0) {
                    this.showTip1 = true
                }else{
                    this.showTip1 = false
                }
            })
       },
       
    
      getconsumptionList() {
        //  var that = this
            this.data.opType = 306;
            if(this.startTime) {
                this.data.startTime =  this.startTime + ' ' + '00:00:00'
            }else {
                this.data.startTime = ''
            }
            if(this.endTime) {
                this.data.endTime = this.endTime + ' ' + '23:59:59'
            }else{
                this.data.endTime = ''
            }
            this.$api.cash.getconsumptionList(this.data).then(res => {
                console.log(res)
                // var data = res.data
                // that.consumptionList.push(...data)
                this.consumptionList = res.data
                if(res.data.length == 0) {
                    this.showTip2 = true
                }else{
                    this.showTip2 = false
                }
            }) 

        }
         
    },
    mounted() {
        // this.data.aCode = JSON.parse(localStorage.user).aCode 
         this.getOrderList()
         this.getconsumptionList()
        
    }
}
</script>

<style scoped lang="less">
@s: 0.0133rem;
.agent{
    font-size: 28*@s;
    min-height: calc(100vh);
    background: #f2f2f2;
    .time{
        display: flex;
        background: #fff;
        align-items: center;
        padding: 20*@s; 
      
        img{
            flex-shrink: 0;
            margin: 0 20*@s;
            width: 36*@s;
        }
        input{
            border: 1px solid #ccc;
            text-align: center;
            width: 200*@s;
            flex: 1;
            line-height: 1;
            padding: 8*@s 0;
        }
        span{
            font-size: 28*@s;
            width: 114*@s;
            line-height: 54*@s;
            background: #81CF9B;
            text-align: center;
            color: #fff;
            margin-left: 20*@s;
            flex-shrink: 0;
        }
    }
    .foot{        
        text-align: center;
        color: #ccc;
        line-height: 88*@s;
        background: #f2f2f2;
    }  
    .tabs{
        font-size: 32*@s;
        font-weight: 500;
        display: flex;
        align-items: center;
        background: #fff;
        margin-top: 10*@s;
        div{
            flex: 1;
            text-align: center;
            border-bottom: 4*@s solid #fff;
            padding: 11*@s 0;
        }
        .active{
            border-bottom: 4*@s solid #81CF9B;
        }
    }
    .list{
        margin-top: 10*@s;
        
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
                    color: #81CF9B;
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
}
</style>
