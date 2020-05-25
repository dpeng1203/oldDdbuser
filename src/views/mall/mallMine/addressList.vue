<template>
  <area-list @close='close' ></area-list>
</template>

<script>
import areaList from '../../../components/areaList'
export default {
  components: {
    areaList
  },
  data() {
    return {
      
    };
  },
  methods: {
    close(item) {
      this.$router.push('/mallMine')
    },
  },
};
</script>

<style lang="less" scoped>
@s: 0.0133rem;
</style>