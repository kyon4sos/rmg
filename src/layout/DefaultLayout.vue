<template>
  <div class="default-layout">
    <el-container>
      <el-aside width="54px">
        <server></server>
      </el-aside>
      <el-container direction="vertical">
        <AppMenu />
        <!-- <el-header height="22px">
          <i class="icon close"></i>
          <i class="icon max-size"></i>
          <i class="icon mini-size"></i>
        </el-header> -->
        <!-- <n-header></n-header> -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Server from "@/components/server";
import AppMenu from "@/components/app-menu/AppMenu.vue";
export default {
  components: {
    Server,
    AppMenu,
  },
  methods: {},
};
</script>

<style lang="scss">
.default-layout {
  .el-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    // background-color: black;
  }
  .el-aside {
    height: 100vh;
    background-color: var(--primaryColor);
    padding: 16px 0;
    align-items: center;
  }
}
</style>
