<template>
<div>
  <div class="list" v-if="!showAdd">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @click-item="clickItem"
    />
    <!-- <div class="btn">添加收货地址</div> -->
    <div class="tip" v-if="list.length === 0">暂无地址</div>
  </div>
  <div v-if="showAdd">
    <add-area :daCode='daCode' @closeAdd='closeAdd'></add-area>
  </div>
</div>
</template>

<script>
import { AddressList, Toast } from "vant";
import addArea from './addArea'
export default {
  components: {
    [AddressList.name]: AddressList,
    addArea
  },
  data() {
    return {
      showAdd: false,
      chosenAddressId: 0,
      list: [],
      daCode: ''
    };
  },
  methods: {
    onAdd() {
      this.daCode = ''
      this.showAdd = true
    },
    onEdit(item, index) {
      this.daCode = item.daCode
      this.showAdd = true
      console.log(e)
    },
    clickItem(item,index) {
      // this.chosenAddressId = item.daCode
      this.$emit('close',item)
    },
    closeAdd() {
      this.showAdd = false
      this.getList()
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
              // this.chosenAddressId = ele.daCode;
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