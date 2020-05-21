<template>
  <div class="add">
    <van-address-edit
      :area-list="areaList"
      show-set-default
      :address-info="addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import areaList from "../utils/area";
import { AddressEdit, Toast } from "vant";
export default {
  props: {
    daCode: [Number,String]
  },
  components: {
    [AddressEdit.name]: AddressEdit
  },
  data() {
    return {
      areaList,
      addressInfo: {
        id: 1,
        name: "",
        tel: "",
        province: "",
        areaCode: "",
        addressDetail: "",
        isDefault: false
      }
    };
  },
  methods: {
    onSave(content) {
      //   console.log(content);
      let parms = {
        daName: content.name,
        daMobile: content.tel,
        areaName: content.province + content.city + content.county,
        areaCode: content.areaCode,
        daAcquiesceType: content.isDefault ? 1 : 0,
        daDetailAddress: content.addressDetail,
        objToken: localStorage.memToken
      };
      if (this.daCode) {
        parms.daCode = this.addressInfo.id;
        this.$api.mall.modifyDeliveryAddress(parms).then(res => {
          if (res.resultCode === 1) {
            Toast("修改成功！");
            // this.$router.push("/addressList");
            this.$emit('closeAdd',1)
          }
        });
      } else {
        this.$api.mall.addAddress(parms).then(res => {
          if (res.resultCode === 1) {
            Toast("新增成功！");
            // this.$router.push("/addressList");
            this.$emit('closeAdd',1)
          }
        });
      }
    },
    getAddressInfo(daCode) {
      let parms = {
        opType: 403,
        daCode: this.daCode,
        xrymem_token_id: localStorage.memToken
      };
      this.$api.mall.addressInfo(parms).then(res => {
        if (res.resultCode === 1) {
          this.addressInfo.isDefault = res.data.daAcquiesceType === 1;
          this.addressInfo.areaCode = res.data.areaCode.toString();
          this.addressInfo.name = res.data.daName;
          this.addressInfo.tel = res.data.daMobile;
          this.addressInfo.addressDetail = res.data.daDetailAddress;
          this.addressInfo.id = res.data.daCode;
        }
      });
    }
  },
  mounted() {
    if (this.daCode) {
      this.getAddressInfo();
    }
  }
};
</script>

<style lang="less" scoped>
@s: 0.0133rem;
.van-button--danger {
  color: #fff;
  background-color: #20a1af;
  border: 1px solid #20a1af;
}
</style>