<template>
  <el-header height="36px">
    <n-icon icon="el-icon-setting" @click="drawer = true"></n-icon>
    <n-drawer :visible.sync="drawer" direction="rtl" title="设置"></n-drawer>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      settingDrawer: false,
    };
  },
};
</script>

<style lang="scss" ></style>