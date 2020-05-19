<template>
  <div class="list">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- <div class="btn">添加收货地址</div> -->
    <div class="tip" v-if="list.length === 0">暂无地址</div>
  </div>
</template>

<script>
import { AddressList, Toast } from "vant";
export default {
  components: {
    [AddressList.name]: AddressList
  },
  data() {
    return {
      chosenAddressId: 0,
      list: []
    };
  },
  methods: {
    onAdd() {
      //   Toast("新增地址");
      this.$router.push("/addAddress");
    },
    onEdit(item, index) {
      //   Toast("编辑地址:" + item.id);
      this.$router.push({
        path: "/addAddress",
        query: { daCode: item.daCode }
      });
    },
    getList() {
      let parms = {
        opType: 401,
        xrymem_token_id: localStorage.memToken
      };
      this.$api.mall.addressList(parms).then(res => {
        if (res.resultCode === 1) {
          let arr = res.data;
          arr.forEach(ele => {
            ele.name = ele.daName;
            ele.id = ele.daCode;
            ele.tel = ele.daMobile;
            ele.address = ele.areaName + ele.daDetailAddress;
            if (ele.daAcquiesceType === 1) {
              this.chosenAddressId = ele.daCode;
              ele.isDefault = true;
            }
          });
          this.list = arr;
        }
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.tip {
  color: #999;
  text-align: center;
}
</style>