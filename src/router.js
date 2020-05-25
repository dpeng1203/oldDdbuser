import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Footer from "./components/footer.vue"

Vue.use(Router)

export default new Router({
  linkActiveClass: "active",//配置精确匹配，将router-link-active定义为active
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: 'DODO智能养生仪'
      }
    },
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login/login.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/resetPw',
      name: 'resetPw',
      component: () => import('./views/login/resetPw.vue'),
      meta: {
        title: '修改密码'
      }
    },
    {
      path: '/signqr',
      name: 'signqr',
      component: () => import('./views/login/signqr.vue'),
      meta: {
        title: '推荐注册'
      }
    },
    {
      path: '/cash',
      name: 'cash',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/cash/cash.vue'),
      meta: {
        title: '我的余额'
      }
    },
    {
      path: '/cashDetail',
      name: 'cashDetail',
      component: () => import('./views/cash/cashDetail.vue'),
      meta: {
        title: '余额明细'
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: () => import('./views/cash/recharge.vue'),
      meta: {
        title: '充值'
      }
    },
    //支付
    {
      path: '/pay',
      name: 'pay',
      component: () => import('./views/pay/pay.vue'),
      meta: {
        title: 'DODO智能养生仪'
      }
    },
    {
      path: '/payNext',
      name: 'payNext',
      component: () => import('./views/pay/payNext.vue'),
      meta: {
        title: 'DODO智能养生仪'
      }
    },
    {
      path: '/using',
      name: 'using',
      component: () => import('./views/pay/using.vue'),
      meta: {
        title: '使用中'
      }
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('./views/ticket/ticket.vue'),
      meta: {
        title: '活动体验券'
      }
    },
    {
      path: '/lock',
      name: 'lock',
      component: () => import('./views/lock/lock.vue'),
      meta: {
        title: '设置/修改支付密码'
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/lock/setting.vue'),
      meta: {
        title: '设置'
      }
    },
    {
      path: '/qr',
      name: 'qr',
      component: () => import('./views/act/qr.vue'),
      meta: {
        title: '推荐好友'
      }
    },
    {
      path: '/getTicket',
      name: 'getTicket',
      component: () => import('./views/act/getTicket.vue'),
      meta: {
        title: '领取卡券'
      }
    },
    {
      path: '/joinAct',
      name: 'joinAct',
      component: () => import('./views/act/joinAct.vue'),
      meta: {
        title: '参与活动'
      }
    },
    {
      path: '/friendList',
      name: 'friendList',
      component: () => import('./views/friendList/friendList.vue'),
      meta: {
        title: '好友列表'
      }
    },
    {
      path: '/service',
      name: 'service',
      component: () => import('./views/service/service.vue'),
      meta: {
        title: '客服中心'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about/about.vue'),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/actList',
      name: 'actList',
      component: () => import('./views/act/actList.vue'),
      meta: {
        title: '活动列表'
      }
    },
    {
      path: '/buyTicket',
      name: 'buyTicket',
      component: () => import('./views/ticket/buyTicket.vue'),
      meta: {
        title: '购买卡券'
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import('./views/transfer/tickTransfer.vue'),
      meta: {
        title: '卡券转移'
      }
    },
    {
      path: '/transferRecord',
      name: 'transferRecord',
      component: () => import('./views/transfer/transferRecord.vue'),
      meta: {
        title: '卡券转移记录'
      }
    },
    {
      path: "/mall",
      name: "footer",
      component: Footer,
      children: [{
        path: '/mall',
        name: 'productList',
        component: () => import("./views/mall/product/mall.vue"),
        meta: {
          title: '产品列表',
          keepAlive: true
        }
      },

      {
        path: '/class',
        name: 'class',
        component: () => import("./views/mall/class/class.vue"),
        meta: {
          title: '全部分类',
          keepAlive: true
        }
      },
      {
        path: '/car',
        name: 'car',
        component: () => import("./views/mall/car/car.vue"),
        meta: {
          title: '购物车',
          keepAlive: true
        }
      },
      {
        path: '/mallMine',
        name: 'mallMine',
        component: () => import("./views/mall/mallMine/mallMine.vue"),
        meta: {
          title: '我的',
          keepAlive: true
        }
      }
      ]
    },
    {
      path: '/productDesc',
      name: 'productDesc',
      component: () => import("./views/mall/product/productDesc.vue"),
      meta: {
        title: '产品详情'
      }
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: () => import("./views/mall/mallMine/addressList.vue"),
      meta: {
        title: '地址管理',
        keepAlive: true
      }
    },
    {
      path: '/mallPay',
      name: 'mallPay',
      component: () => import("./views/mall/product/mallPay.vue"),
      meta: {
        title: '订单支付',
      }
    },
  ]
})
