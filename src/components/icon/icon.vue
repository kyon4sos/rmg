<template>
  <div class="n-icon" v-on="$listeners">
    <i :class="icon"></i>
  </div>
</template>

<script>
export default {
  name: "n-icon",
  props: {
    icon: {
      type: String,
      default: "el-icon-plus",
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.n-icon {
  // width: 20px;
  // height: 20px;
  line-height: 30px;
  border-radius: 8px;
  display: inline-block;
  color: #fff;
  text-align: center;
  // transition: all 0.3s ease;
  // i::after {
  //   content: "";
  //   display: inline-block;
  //   width: 60px;
  //   height: 60px;
  //   position: absolute;
  // }
}
.n-icon:hover {
  width: 28px;
  height: 28px;
  background-color: var(--hoverBgColor);
  color: #3b3b3b;
  cursor: pointer;
}
</style>
