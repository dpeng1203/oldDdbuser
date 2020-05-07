<template>
	<div class="home">
		<!-- <div class="head">
			<img src="../assets/img/logo.jpg" alt="" class="head-img">
			<div class="info">
				<p class="phone">{{phone}}</p>
				<p class="id">ID：{{memId}}</p>
			</div>
			<img src="../assets/img/enjoy.png" alt="" class="enjoy">
		</div> -->
		<div class="info">
			<p class="phone">昵称：{{phone}}</p>
			<p class="id">ID：{{memId}}</p>
		</div>
		<img src="../assets/img/ddb_logo.png" alt="" class="logo-img">
		<div class="box" >
			<div class="item" @click="$router.push('/recharge')">
				<img src="../assets/img/home_1.png" alt="">
				<p>充值</p>
			</div>
			<div class="item" @click="toCash">
				<img src="../assets/img/home_2.png" alt="">
				<p>我的余额</p>
				<!-- <div class="num">{{cash}}</div> -->
			</div>
		</div>
		<div class="cont">
			<div class="item" @click="$router.push('/ticket')">
				<img src="../assets/img/home_3.png" alt="" class="pw">
				<span>我的体验券</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
			<div class="item" @click="$router.push('/buyTicket')" v-if="show">
				<img src="../assets/img/home_3.png" alt="" class="pw">
				<span>购买卡券</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
			<div class="item" @click="$router.push('/transfer')" v-if="show">
				<img src="../assets/img/home_3.png" alt="" class="pw">
				<span>卡券转移</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
			<div class="item" @click="$router.push('/qr')" v-if="show">
				<img src="../assets/img/home_4.png" alt="" class="pw">
				<span>推荐好友</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
			<div class="item" @click="$router.push('/friendList')" v-if="show">
				<img src="../assets/img/home_5.png" alt="" class="pw">
				<span>好友列表</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
			<div class="item" @click="$router.push('/actList')" v-if="show">
				<img src="../assets/img/home_6.png" alt="" class="pw">
				<span>参与活动</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
		</div>
		<div class="cont">
			<div class="item" @click="$router.push('/setting')">
				<img src="../assets/img/home_7.png" alt="" class="pw">
				<span>个人设置</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
			<div class="item" @click="$router.push('/service')" v-if="show">
				<img src="../assets/img/home_8.png" alt="" class="pw">
				<span>客服中心</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
			<div class="item" @click="$router.push('/about')" v-if="show">
				<img src="../assets/img/home_9.png" alt="" class="pw">
				<span>关于我们</span>
				<img src="../assets/img/home_10.png" alt="">
			</div>
		</div>
		<!-- <div class="foot" @click="out">退出</div> -->
	</div>
</template>

<script>
	// @ is an alias to /src

	export default {
		name: 'home',
		data() {
			return {
				id: localStorage.memToken,
				memId: localStorage.memId,
				phone: localStorage.phone,
				cash: '',
				code: '',
				isBuy: false
			}
		},
		computed: {
			show() {
				return this.phone !== '18888888888'
			}
		},
		methods: {
			// 是否有购买记录
			getList() {
				let data = {
					xrymem_token_id: localStorage.memToken,
					opType: 313,
					pageNum: 1,
					pageSize: 20
				}
				this.$api.ticket.merTicket(data).then( res => {
					if(res.resultCode == 1) {
						if(res.data.total > 0) {
							this.isBuy = true
						}

					}
				})
			},
			getCash() {
				let data = {
					xrymem_token_id: localStorage.memToken,
					opType: 301,
					code: this.code
				}
				this.$api.cash.cash(data).then( res => {
					if(res.resultCode == 1) {
						this.cash = Number(res.data.caAcct1 + res.data.caAcct2).toFixed(2)
					}
				})
			},
			toCash() {
				this.$router.push({path: '/cash',query: {cash: this.cash}})
			},
			
			//授权
			accredit() {
				let url = window.location.href.split('#')[0]
				this.$api.wx.memberAuthorization({url}).then(res => {
					if(res.resultCode === 1) {
						window.location.href = res.data
					}
				})
			},
		},
		mounted() {
			let url = window.location.href
			if(url.indexOf('code') > -1) {
				let search = url.split('?')[1]
				let keyVal = search.split('#')[0]
				let arr = keyVal.split('&')
				arr.forEach(ele => {
					if(ele.indexOf('code') > -1) {
						this.code = ele.split('=')[1]
					}
				})
			}else {
				this.accredit()
			}
			this.getCash()
			this.getList()
		}
	}
</script>

<style lang="less" scoped>
	@s: 0.0133rem;
	.home{
		padding-bottom: 50*@s;
		min-height: 100vh;
		background-image: url(../assets/img/home_back.png);
		background-size: 100% 100%;
		position: relative;
		.info{
			font-size: 33*@s;
			font-weight: bold;
			color: #fff;
			text-align: center;
			padding-top: 80*@s;
			margin-bottom: 100*@s;
			.id{
				background-color: #37C579;
				display: inline-block;
				padding: 0 40*@s;
				font-size: 20*@s;
				border-radius: 5*@s;
			}
		}
		.logo-img{
			position: absolute;
			top: 205*@s;
			left: 305*@s;
			width: 138*@s;
		}
		.box{
			background-color: #fff;
			display: flex;
			align-items: center;
			width: 667*@s;
			margin: 0 auto;
			padding: 90*@s 0 45*@s;
			border-radius: 10*@s;
			box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.02);
			.item{
				flex: 1;
				text-align: center;
				img{
					height: 36*@s;
				}
				p{
					margin-top: 10*@s;
					font-size: 24*@s;
				}
			}
		}
		.cont{
			background: #fff;
			padding: 0 70*@s 0 20*@s;
			margin-right: 20*@s;
			margin-top: 45*@s;
			.item{
				border-bottom: 1px solid #F7F7F7;
				height: 108*@s;
				display: flex;
				align-items: center;
				color: #44444E;
				img{
					width: 11*@s;
				}
				span{
					flex: 1;
					margin-left: 30*@s;
					font-size: 24*@s;
					color: #7E7D7D;
					font-weight: bold;
				}
				.num{
					color: #88888E;
					margin-right: 30*@s;
				}
				.pw{
					width: 32*@s;
				}
			}
			&:last-child {
				margin-top: 25*@s;
			}
		}
	}
</style>