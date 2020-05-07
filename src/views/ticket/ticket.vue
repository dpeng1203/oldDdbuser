<template>
    <div class="ticket">
        <van-tabs v-model="active" title-active-color="#00b616" line-height="2px" color="#00b616" line-width="2.5rem">
            <van-tab :title="unusedTitle">
                <div class="list">
                    <div class="item" v-for="item in unusedList" :key="item.c_code">
                        <img src="../../assets/img/tick.png" alt="">
                        <div class="end">
                            有效期至：<br>
                            {{item.c_end}}
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="usedTitle">
                <div class="list">
                    <div class="item" v-for="item in usedList" :key="item.c_code">
                        <img src="../../assets/img/tick_ccc.png" alt="">
                        <div class="end">
                            有效期至：<br>
                            {{item.update_time}}
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab :title="timedTitle">
                <div class="list">
                    <div class="item" v-for="item in timedList" :key="item.c_code">
                        <img src="../../assets/img/tick_ccc.png" alt="">
                        <div class="end">
                            有效期至： <br>
                            {{item.c_end}}
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
        <div class="more">没有更多了</div>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
export default {
    components: {   
        [Tab.name]: Tab,
        [Tabs.name]: Tabs
    },
    data() {
        return{
            active: 0,
            unusedTitle: '未使用',
            usedTitle: '已使用',
            timedTitle: '已过期',
            unusedList: [],
            usedList: [],
            timedList: [],
            parms: {
                xrymem_token_id: localStorage.memToken,
                opType: 303,
            }
        }
    },
    methods: {
        getList() {
            this.$api.ticket.merTicket(this.parms).then(res => {
                if(res.resultCode == 1) {
                    let list = res.data
                    if(list.length != 0) {
                        this.unusedList = list.filter(ele => {
                            return ele.c_status == 0
                        })
                        
                        this.usedList = list.filter(ele => {
                            return ele.c_status == 2
                        })
                        this.timedList = list.filter(ele => {
                            return ele.c_status == 3
                        })
                        this.unusedTitle = `未使用 (${this.unusedList.length}张)`
                        this.usedTitle = `已使用 (${this.usedList.length}张)`
                        this.timedTitle = `已过期 (${this.timedList.length}张)`
                    }
                    
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
.ticket{
    padding-bottom: 20*@s;
    .list{
        .item{
            margin: 20*@s 30*@s 0;
            position: relative;
            img{
                width: 100%
            }
            .end{
                position: absolute;
                bottom: 12*@s;
                left: 210*@s;
                right: 200*@s;
                // overflow: hidden;
                // text-overflow:ellipsis;
                // white-space: nowrap;
                font-size: 20*@s;
                font-weight: bold;
                color: #fff;
            }
        }
        
    }
    .more{
        text-align: center;
        color: #666;
        margin-top: 30*@s;
    }
}
</style>
