<template>
  <div class="wrapper">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar route safe-area-inset-bottom active-color="#20A1AF" inactive-color="#7A7A7A">
      <van-tabbar-item replace to="/mall" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/class" icon="apps-o">全部分类</van-tabbar-item>
      <van-tabbar-item replace to="/car" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/mallMine" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped lang="less">
@s: 0.0133rem;
.wrapper {
  padding-bottom: 100 * @s;
  box-sizing: border-box;
  min-height: 100vh;
}
.van-tabbar-item--active {
  font-weight: bold;
}
</style>