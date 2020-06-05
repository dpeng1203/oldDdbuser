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
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <div class="cont" v-for="item in list" :key="item.memCode">
                        <p>{{item.memCode}}</p>
                        <p>{{item.memName}}</p>
                        <p>{{item.couponSum}}</p>
                    </div>
                </van-list>
            </div>
            <div class="tip" v-if="num == 0">暂无邀请好友</div>
        </div>
        <img src="../../assets/img/bottom.jpg" alt="">
    </div>
</template>

<script>
import { List } from 'vant';
export default {
    components: {
        [List.name]: List
    },
    data() {
        return{
            loading: false,
            finished: false,
            num: 0,
            list: [],
            parms: {
                xrymem_token_id: localStorage.memToken,
                opType: 311,
                pageNum: 0,
                pageSize: 20,
            }
        }
    },
    methods: {
        getList() {
            this.$api.ticket.merTicket(this.parms).then(res => {
                // 加载状态结束
                this.loading = false;

                if(res.resultCode == 1) {
                    this.num = res.data.total
                    if(this.parms.pageNum === 1) {
                        this.list =  res.data.data
                    }else{
                        this.list =  [...this.list,...res.data.data]
                    }
                    if(this.list.length >= res.data.total) {
                        this.finished = true
                    }
                }
            })
        },
        onLoad() {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                this.parms.pageNum ++
                this.getList()
            }, 1000);
        },
    },
    mounted() {
        // this.getList()
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